"use client";
import {
  AppHeader,
  AppIcon,
  Flex,
  Button,
  Text,
  H3,
  Divider,
  Icon,
  TextAttribute,
  FlexProps,
  H4,
  C2,
  C3,
  Touchable,
} from "api/components/web";
import { useAuth } from "api/lib/hooks/useAuth";
import { ExpoProject } from "api/lib/lib/Common";
import clsx from "clsx";
import { useOnce } from "api/hooks/useOnce";
import Link from "next/link";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import MapModule from "./mods/map/index";
import NewsletterModule from "./mods/newsletter/index";
import DonateModule from "./mods/donate/index";
import TicketsModule from "./mods/tickets/index";
import RosterModule from "./mods/roster/index";
import { ModuleExport } from "./mods/Module";
export const Modules: ModuleExport[] = [
  MapModule,
  NewsletterModule,
  DonateModule,
  TicketsModule,
  RosterModule,
];

type ViewURL = "/" | "/project" | "404";
interface PageViewContext {
  viewUrl: ViewURL;
  setViewUrl: (_: ViewURL) => void;
  project: ExpoProject | null;
  setProject: (_: null) => void;
  updateProject: (_: Partial<ExpoProject>) => void;
  showCreateProjectDialog: boolean;
  setShowCreateProjectDialog: (_: boolean) => void;
  moduleView: ModuleExport | null | "404";
}

const PageContext = createContext<PageViewContext | null>(null);
function PageContextProvider({ children }: { children: ReactNode }) {
  const [viewUrl, setViewUrl] = useState<ViewURL>("/");
  const [project, setProject] = useState<ExpoProject | null>(null);
  const [moduleView, setModuleView] = useState<ModuleExport | null | "404">(
    null,
  );
  const [showCreateProjectDialog, setShowCreateProjectDialog] =
    useState<boolean>(false);
  const { getUserRecord, updateUserRecord, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname && user) {
      getUserRecord(user.uid)
        .then((record) => {
          const projects = record.serviceData.expoData?.projects;
          if (projects) {
            const slugs = pathname.split("/");
            setModuleView(null);
            if (pathname === "/expo/admin/project") {
              setViewUrl("/");
              setShowCreateProjectDialog(false);
              setModuleView(null);
            } else if (pathname === "/expo/admin/project/new") {
              setViewUrl("/");
              setShowCreateProjectDialog(true);
              setModuleView(null);
            } else if (pathname.startsWith("/expo/admin/project/")) {
              const projectId = slugs[4]; // safer than `Array.at(3)`
              const project = projects.find((p) => p.projectId === projectId);
              if (project) {
                setProject(project);
                setViewUrl("/project");
              } else {
                setViewUrl("404");
              }

              if (pathname.startsWith(`/expo/admin/project/${projectId}/m/`)) {
                const modSlug = slugs.length >= 6 ? slugs[6] : null;
                if (modSlug) {
                  const mod = Modules.find((m) => m.slug === modSlug);
                  if (mod) {
                    setModuleView(mod);
                  } else {
                    setModuleView("404");
                  }
                }
              }
            } else {
              setViewUrl("404");
            }
          }
        })
        .catch((err) => {
          console.error(err);
          alert(err);
        });
    }
  }, [router, pathname, user, getUserRecord]);
  const updateProject = useCallback(
    async (proj: Partial<ExpoProject>) => {
      if (!user) {
        throw "User not defined";
      }

      // ensure that the READONLY property 'projectId' was not requested to change
      if (proj.projectId !== project?.projectId) {
        throw "Cannot update user record of current project as the 'projectId' was requested to change.";
      }

      const record = await getUserRecord(user.uid);
      const updatedProjects = (
        record?.serviceData?.expoData?.projects ?? []
      ).map((p) => {
        if (p.projectId === proj.projectId && proj.projectId) {
          return {
            ...p,
            ...proj,
          };
        }
        return p;
      });

      // Update user record
      await updateUserRecord(user.uid, {
        serviceData: {
          expoData: {
            projects: updatedProjects,
            maxProjects: record.serviceData.expoData?.maxProjects ?? 5,
          },
        },
      });

      // Update project state
      const currProject = (
        (await getUserRecord(user.uid)).serviceData.expoData?.projects ?? []
      ).find((p) => p.projectId === proj.projectId);
      if (!currProject) throw "Fatal error";
      setProject(currProject);
    },
    [user, getUserRecord, updateUserRecord, project],
  );
  return (
    <PageContext.Provider
      value={{
        project,
        setProject,
        updateProject,
        viewUrl,
        setViewUrl,
        showCreateProjectDialog,
        setShowCreateProjectDialog,
        moduleView,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}
function useViewContext() {
  const ctx = useContext(PageContext);
  if (!ctx) {
    throw "`useViewContext` must be a descendent of a 'PageContextProvider'";
  }

  return ctx;
}

function Header() {
  return (
    <AppHeader
      title={
        <Text fontWeight={"semibold"} fontSize={28} textColor="red-500">
          Expo Admin
        </Text>
      }
      icon={<AppIcon name="looks" />}
    >
      <Link href="/expo/admin/project/new">
        <Button buttonStyle="link">Create Event</Button>
      </Link>
    </AppHeader>
  );
}

function ViewProjectSidebar() {
  const { project } = useViewContext();
  if (!project) return null;

  return (
    <Flex grow gap="4" className="p-4">
      <Flex>
        <H4>{project.projectName}</H4>
        <C3>{project.projectId}</C3>
      </Flex>
      <Divider />
      <Flex>
        {Modules.map((module, idx) => {
          return (
            <Link
              href={`/expo/admin/project/${project.projectId}/m/${module.slug}`}
              key={idx}
            >
              <Flex direction="row" align="center" gap="2">
                <Icon name={module.icon} size={16} />
                <Text>{module.name}</Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
}

function Sidebar() {
  const { viewUrl } = useViewContext();
  const [layout, setLayout] = useState<ReactNode | null>("/");
  useEffect(() => {
    switch (viewUrl) {
      // no sidebar for '/' home
      case "/":
        return setLayout(null);

      // event sidebar
      case "/project":
        return setLayout(<ViewProjectSidebar />);

      // no sidebar for error page
      case "404":
        return setLayout(null);
    }
  }, [viewUrl]);

  return layout === null ? null : (
    <Flex className={`w-1/5 bg-gray-50 border-r border-gray-100`}>
      {layout}
    </Flex>
  );
}

// Layout when viewUrl='/'
function ProjectCard({ project }: { project: ExpoProject }) {
  return (
    <Link
      href={`/expo/admin/project/${project.projectId}`}
      as={`/expo/admin/project/${project.projectId}`}
    >
      <Touchable
        animation={["scale", "opacity"]}
        scaleFactor={"0.99"}
        className="w-48 h-32"
      >
        <Flex className="p-4 w-full h-full bg-gray-50 rounded-xl shadow-md cursor-pointer select-none hover:shadow-lg transition-all duration-150 ease-in-out active:shadow-sm">
          <H4>{project.projectName}</H4>
          <C2>{project.projectId}</C2>
        </Flex>
      </Touchable>
    </Link>
  );
}

interface CreateProjectDialogProps extends FlexProps {
  visible: boolean;
  setVisible: (_: boolean) => void;
}
function CreateProjectDialog({
  visible,
  setVisible,
  ...props
}: CreateProjectDialogProps) {
  const { user, getUserRecord, updateUserRecord } = useAuth();
  const [projectName, setProjectName] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");
  const projectNameInputRef = useRef<null | HTMLInputElement>(null);
  const router = useRouter();
  useEffect(() => {
    setProjectName("");
    setProjectId("");

    if (visible && projectNameInputRef.current) {
      const input = projectNameInputRef.current;
      input.focus();
      input.select();
    }
  }, [visible]);
  useEffect(() => {
    const ID_EXPR = /([^a-zA-Z0-9_]+)/gi; // matches all except [a-zA-Z0-9_]
    const id = projectName
      .split(/\s+/g)
      .map((s) => s.trim().replace(ID_EXPR, "").toLowerCase())
      .filter(Boolean)
      .join("-");
    setProjectId(id);
  }, [projectName]);
  const createProject = useCallback(() => {
    if (user) {
      getUserRecord(user.uid)
        .then((record) => {
          const projects = record?.serviceData?.expoData?.projects ?? [];
          const maxProjects = record?.serviceData?.expoData?.maxProjects ?? 5;

          if (projects.length === maxProjects) {
            alert("Max Projects reached!");
            return;
          }

          // ensure not duplicate project id
          if (projects.find((p) => p.projectId === projectId)) {
            alert("Project ID already exists!");
            return;
          }

          // update record
          updateUserRecord(user.uid, {
            serviceData: {
              expoData: {
                projects: [
                  {
                    projectId: projectId,
                    projectName: projectName,
                    createdOn: new Date(),
                  },
                  ...projects,
                ],
                maxProjects: maxProjects,
              },
            },
          })
            .then(() => {
              router.push("/expo/admin/project");
            })
            .catch((err) => {
              alert("Error");
              console.error(err);
            });
        })
        .catch((err) => {
          alert("Error adding project");
          console.error(err);
        });
    }
  }, [getUserRecord, updateUserRecord, user, router, projectName, projectId]);
  return (
    <Flex
      gap={"4"}
      {...props}
      hidden={!visible}
      className={clsx(
        "p-4 w-1/2 bg-white rounded-xl shadow-lg",
        props.className,
      )}
      onSubmit={undefined}
    >
      <Flex direction="row" align="center" justify="space-between">
        <H4>Create New Project</H4>
        <Link href="/expo/admin/project" as="/expo/admin/project">
          <Icon
            name="close"
            size={16}
            color="gray-700"
            className="cursor-pointer"
          />
        </Link>
      </Flex>
      <Divider />
      <Flex grow>
        <C2 textColor="gray-500" className="my-1">
          Project Name
        </C2>
        <TextAttribute
          width="full"
          value={projectName}
          ref={projectNameInputRef}
          setValue={setProjectName}
          name="pname"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createProject();
            }
          }}
        />
        <C3 textColor="gray-600" className="my-1">
          Project ID: &quot;{projectId}&quot;
        </C3>
      </Flex>
      <Button width="full" textAlign="center" onClick={createProject}>
        Create Project
      </Button>
    </Flex>
  );
}
function RootLayout() {
  const { user, loading, getUserRecord } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<ExpoProject[] | null>(null);
  const { showCreateProjectDialog, setShowCreateProjectDialog } =
    useViewContext();
  useOnce(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        router.push("/expo/admin/project");
      }
    });
  });
  useEffect(() => {
    if (!loading && user) {
      getUserRecord(user.uid).then((p) => {
        const expoData = p.serviceData.expoData;
        if (!expoData) {
          throw "SemanticError: <RootLayout /> should never raise this exception. The reason this happened was because the `getUserRecord` failed to provide `expoData` (`serviceData.expoData`) which is generally okay but in this case, it should have been created within <Layout />. If this error occurred `updateUserRecord` showed no error but some error must have occurred.";
        }
        setProjects(expoData.projects);
      });
    }
  }, [loading, user, getUserRecord]);

  if (!projects) return null;

  return (
    <Flex grow className="p-2 lg:p-8 md:p-4" gap={"4"}>
      <Flex
        hidden={!showCreateProjectDialog}
        className={`absolute left-0 top-0 w-full h-full z-10`}
        align="center"
        justify="center"
      >
        <Flex className="absolute left-0 top-0 z-10 bg-black opacity-5 w-full h-full"></Flex>
        <CreateProjectDialog
          className="z-20"
          visible={showCreateProjectDialog}
          setVisible={setShowCreateProjectDialog}
        />
      </Flex>
      <Flex direction="row" align="center" gap={"2"}>
        <H3>Projects ({projects.length})</H3>
        <Link href="/expo/admin/project/new" as="/expo/admin/project/new">
          <Icon
            name="add"
            size={16}
            color="gray-600"
            className="cursor-pointer"
          />
        </Link>
      </Flex>
      <Divider />
      <Flex grow align="center" justify="center">
        {projects.length === 0 ? (
          <Flex className="mb-32" align="center">
            <H3>You have no Projects!</H3>
            <Button onClick={() => setShowCreateProjectDialog(true)}>
              Create one Now!
            </Button>
          </Flex>
        ) : (
          <Flex grow className="w-full" direction="row" wrap gap="4">
            {projects.map((project, idx) => {
              return <ProjectCard project={project} key={idx} />;
            })}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

function ProjectLayout() {
  const { project, moduleView } = useViewContext();
  const Component = useCallback((): ReactNode | null => {
    if (moduleView === null) return null;
    if (typeof moduleView === "string") return <Text>404</Text>;
    if (!project) return null;

    // const name = moduleView.title ?? moduleView.name;
    return (
      <Flex className="p-4">
        <Flex direction="row">
          <H3>{"Hello"}</H3>
        </Flex>
        <Divider />
        <Component />
        <moduleView.main project={project} />
      </Flex>
    );
  }, [project, moduleView]);

  return (
    <Flex>
      <Component />
    </Flex>
  );
}

function Main() {
  const { viewUrl } = useViewContext();
  const [layout, setLayout] = useState<ReactNode | null>(null);
  useEffect(() => {
    switch (viewUrl) {
      case "/":
        return setLayout(<RootLayout />);
      case "/project":
        return setLayout(<ProjectLayout />);
      case "404":
        return setLayout(<Text>Error 404</Text>);
    }
  }, [viewUrl]);

  return layout === null ? null : <Flex grow>{layout}</Flex>;
}

function Layout() {
  const { loading, user, getUserRecord, updateUserRecord } = useAuth();
  const [layout, setLayout] = useState<ReactNode | null>(null);
  useEffect(() => {
    if (loading) {
      return setLayout(<Text>Loading...</Text>);
    }

    // user is signed in
    else if (user) {
      // get user record
      getUserRecord(user.uid)
        .then((profile) => {
          // check if user has a Expo record
          const expoData = profile.serviceData.expoData;

          // user has never used Expo
          if (!expoData) {
            return setLayout(
              <Flex>
                <Text>Welcome to Expo! Click to get started!</Text>
                <Button
                  onClick={() => {
                    updateUserRecord(user.uid, {
                      serviceData: {
                        expoData: {
                          projects: [],
                          maxProjects: 5,
                        },
                      },
                    })
                      .then(() => {
                        console.log("Profile updated.");
                        window.location.reload();
                      })
                      .catch((err) => {
                        alert("Could not update profile.");
                        console.log("Could not update profile.");
                        console.error(err);
                      });
                  }}
                >
                  Get Started
                </Button>
              </Flex>,
            );
          }

          // show main page
          return setLayout(
            <>
              <Sidebar />
              <Main />
            </>,
          );
        })
        .catch((err) => {
          console.error(err);
          setLayout(<Text>An unknown error occurred: {err}</Text>);
        });
    }

    // user is not signed in
    else if (!user) {
      return setLayout(<Text>Not signed in.</Text>);
    }
  }, [loading, user, getUserRecord, updateUserRecord]);
  return (
    <Flex grow>
      <Header />
      <Flex direction="row" grow>
        {layout}
      </Flex>
    </Flex>
  );
}

export default function Page() {
  return (
    <PageContextProvider>
      <Layout />
    </PageContextProvider>
  );
}
