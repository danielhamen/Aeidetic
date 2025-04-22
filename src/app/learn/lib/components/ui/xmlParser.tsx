import { Children, ReactNode } from "react";
import {
  Flex,
  P as WebP,
  H1 as WebH1,
  H2 as WebH2,
  H3 as WebH3,
  H4 as WebH4,
  Code as WebCode,
  Text,
} from "api/components/web";
import { Highlight as Prism, themes } from "prism-react-renderer";
import { InlineMath } from "api/components/web";
import { FontRegistry } from "api/app/__layout/__font";

/** <b> tag → bold text */
export function B({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return <b className="font-semibold">{children}</b>;
}

/** Wraps the main content block */
export function Content({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <Flex direction="column" className="gap-4 space-y-4">
      {children}
    </Flex>
  );
}

/** Placeholder for your custom Graph component */
export function Graph({
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  // Eventually, you'd import and render your Plotly Graph here
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 my-4">
      <Text className="text-gray-600 text-sm">
        Graph placeholder: {props.id}
      </Text>
    </div>
  );
}

/** <definition> → hover tooltip or highlight */
export function Definition({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  const title = `${props.word ? props.word + ": " : ""}${props.meaning ?? ""}`;
  return (
    <span
      {...props}
      title={title}
      className="font-semibold text-indigo-600 hover:text-indigo-700 border-b border-dotted border-indigo-300 transition cursor-help"
    >
      {children}
    </span>
  );
}

/** Horizontal rule */
export function Divider() {
  return <div className="h-px bg-gray-200 my-6" />;
}

/** H1 → big section title */
export function H1({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <WebH2 className="text-xl font-bold text-gray-900 leading-tight mt-0">
      {children}
    </WebH2>
  );
}

/** H2 → medium heading */
export function H2({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <WebH3 className="text-lg font-semibold text-gray-800 mt-6 mb-2 leading-tight">
      {children}
    </WebH3>
  );
}

/** H3 → smaller heading */
export function H3({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <WebH4 className="text-sm font-medium text-gray-700 mt-4 mb-1 leading-tight">
      {children}
    </WebH4>
  );
}

/** <i> → italic text */
export function I({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return <i {...props}>{children}</i>;
}

// =======================================================
// <summary>
// A brief, italicized summary block with a muted background.
// =======================================================
export function Summary({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <Flex
      {...props}
      className="bg-gray-100 border-l-4 border-gray-400 pl-4 italic text-gray-700 my-4"
    >
      {children}
    </Flex>
  );
}

// =======================================================
// <aside>
// A side note area with a soft blue background and border.
// =======================================================
export function Aside({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <Flex
      {...props}
      className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4"
    >
      {children}
    </Flex>
  );
}

// =======================================================
// <highlight>
// A small inline block to emphasize text with a yellow background.
// =======================================================
export function Highlight({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <span
      {...props}
      className="bg-yellow-100 text-yellow-800 px-1 rounded-sm font-semibold"
    >
      {children}
    </span>
  );
}

// =======================================================
// <box>
// A container box with a light border and subtle shadow.
// =======================================================
export function Box({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <Flex
      {...props}
      className="border border-gray-300 rounded-md p-4 my-4 shadow-sm"
    >
      {children}
    </Flex>
  );
}

// =======================================================
// <panel>
// A container panel with different styles based on panel type.
// Supported types: "critical", "warning", "note", "info" (default: "info").
// =======================================================
export function Panel({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  // Determine panel type from props; default to "info"
  const panelType = props.type ?? "info";
  // Map of panel types to Tailwind class strings
  const panelClassMap: Record<string, string> = {
    critical: "bg-red-50 border-red-300 text-red-800",
    warning: "bg-yellow-50 border-yellow-300 text-yellow-800",
    note: "bg-blue-50 border-blue-300 text-blue-800",
    info: "bg-green-50 border-green-300 text-green-800",
  };
  const panelClasses = panelClassMap[panelType] || panelClassMap.info;

  // Remove the "type" attribute so it isn't spread onto the DOM element
  const { type, ...rest } = props;

  return (
    <Flex {...rest} className={`border ${panelClasses} rounded-lg p-4 my-4`}>
      {children}
    </Flex>
  );
}

/** Root <lesson> tag → wraps the entire lesson content */
export function Lesson({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <Flex direction="column" className="gap-4">
      {children}
    </Flex>
  );
}

/** <li> → list item */
export function Li({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return <WebP className="list-item leading-6 ml-6">{children}</WebP>;
}

/** <math> → inline or block math via <InlineMath> */
export function Math({ props }: { props: Record<string, string> }) {
  const alignClass =
    props.align === "left"
      ? "justify-start"
      : props.align === "center"
        ? "justify-center"
        : props.align === "right"
          ? "justify-end"
          : "justify-start";

  return (
    <Flex className={`my-3 ${alignClass}`}>
      <InlineMath tex={props.tex ?? ""} />
    </Flex>
  );
}

/** <ol> → ordered list */
export function Ol({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <ol className="list-decimal pl-8 space-y-1 text-gray-700">{children}</ol>
  );
}

/** <p> → paragraph */
export function P({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <WebP className="text-gray-800 text-[16px] leading-relaxed mb-3">
      {children}
    </WebP>
  );
}

/** <quote> → fancy blockquote */
export function Quote({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600 my-3">
      {children}
    </blockquote>
  );
}

/** <section> → a grouping of content */
export function Section({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <Flex direction="column" className="gap-2">
      {children}
    </Flex>
  );
}

/** <title> → optionally used for sub-headings or special titles */
export function Title({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <WebH1 className="text-2xl font-bold text-gray-800 leading-snug mt-4">
      {children}
    </WebH1>
  );
}

/** <u> → underlined text */
export function U({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return <u className="decoration-2">{children}</u>;
}

/** <ul> → bullet list */
export function Ul({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return <ul className="list-disc pl-8 space-y-1 text-gray-700">{children}</ul>;
}

export function Pre({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return <pre>{children}</pre>;
}

export function Code({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return <WebCode>{children}</WebCode>;
}

export function Table({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <table {...props} className="w-full border-collapse mb-4">
      {children}
    </table>
  );
}

export function Tr({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <tr {...props} className="border-b border-gray-200 last:border-0">
      {children}
    </tr>
  );
}

export function Th({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <th
      {...props}
      className="px-4 py-2 text-left font-bold text-gray-700 border-b border-gray-200"
    >
      <Text fontWeight={"600"}>{children}</Text>
    </th>
  );
}

export function Td({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <td {...props} className="px-4 py-2 text-gray-800 border-b border-gray-200">
      {children}
    </td>
  );
}

// =======================================================
// DEFINITION LIST COMPONENTS
// =======================================================

export function Dl({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <dl {...props} className="mb-4">
      {children}
    </dl>
  );
}

export function Dt({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <dt {...props} className="font-bold text-gray-900">
      {children}
    </dt>
  );
}

export function Dd({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <dd {...props} className="mb-2 ml-4 text-gray-800">
      {children}
    </dd>
  );
}

// =======================================================
// EXTRA COMPONENTS
// =======================================================

/** Anchor/link component with a clean underline */
export function Anchor({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <a {...props} className="text-blue-600 hover:underline">
      {children}
    </a>
  );
}

/** Figure and figcaption for images or diagrams */
export function Figure({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <figure {...props} className="my-4">
      {children}
    </figure>
  );
}

export function Figcaption({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <figcaption {...props} className="text-sm text-gray-600 mt-2 text-center">
      {children}
    </figcaption>
  );
}

export function Console({
  children,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  return (
    <Flex className="w-full rounded-lg bg-gray-800 overflow-x-auto border border-gray-700 flex-col p-2 px-3 text-sm">
      <WebCode textColor="white">{children}</WebCode>
    </Flex>
  );
}

export function CodeBlock({
  children,
  props,
}: {
  children: ReactNode;
  props: Record<string, string>;
}) {
  const lang = props.lang || "text";

  // Ensure code is treated as string (ReactNode might be array or JSX)
  const autoIndent = (code: string) => {
    if (props.autoIndent === "false") {
      return code;
    }

    const lines = code.split("\n");
    const indents: number[] = [];
    lines.forEach((line) => {
      if (line.trim().length === 0) {
        return;
      }
      let i = 0;
      while (i < line.length) {
        if (line.at(i) !== " ") {
          break;
        }
        i++;
      }

      indents.push(i);
    });

    const minIndent = window.Math.min(...indents);
    return lines
      .map((line) => line.slice(minIndent))
      .join("\n")
      .trim();
  };

  const code = autoIndent(
    typeof children === "string" ? children : (children as string[]).join(""),
  );
  const showLineNumbers = props.lineNumbers !== "false";

  return (
    <Flex className="w-full rounded-lg bg-gray-800 overflow-x-auto border border-gray-700 flex-col text-sm">
      <Flex className="bg-gray-900 px-3 py-2 rounded-t-lg border-b border-gray-700">
        <Text fontFamily="mono" textColor="gray-300">
          {lang.toUpperCase()}
        </Text>
      </Flex>

      <Flex className="p-4">
        <Prism theme={themes.shadesOfPurple} code={code} language={lang}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} w-full`}
              style={{ ...style, background: "none" }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {showLineNumbers && (
                    <span className="text-gray-500 pr-4 w-8 text-right select-none">
                      {i + 1}
                    </span>
                  )}
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token, key });
                    return (
                      <span
                        key={key}
                        {...tokenProps}
                        className={`${FontRegistry.mono.className} ${tokenProps.className}`}
                      />
                    );
                  })}
                </div>
              ))}
            </pre>
          )}
        </Prism>
      </Flex>
    </Flex>
  );
}

/** Parser code: Recursively parse XML nodes */
function parseChildren(nodes: Node[]): ReactNode[] {
  return Array.from(nodes)
    .map((node, idx) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) {
        return null;
      }

      const child = node as Element;
      const props: Record<string, string> = {};
      for (const attr of Array.from(child.attributes)) {
        props[attr.name] = attr.value;
      }
      const _children = parseChildren(Array.from(child.childNodes));

      switch (child.tagName.toLowerCase()) {
        case "lesson":
          return (
            <Lesson key={idx} props={props}>
              {_children}
            </Lesson>
          );
        case "b":
          return (
            <B key={idx} props={props}>
              {_children}
            </B>
          );
        case "i":
          return (
            <I key={idx} props={props}>
              {_children}
            </I>
          );
        case "content":
          return (
            <Content key={idx} props={props}>
              {_children}
            </Content>
          );
        case "definition":
          return (
            <Definition key={idx} props={props}>
              {_children}
            </Definition>
          );
        case "h1":
          return (
            <H1 key={idx} props={props}>
              {_children}
            </H1>
          );
        case "h2":
          return (
            <H2 key={idx} props={props}>
              {_children}
            </H2>
          );
        case "h3":
          return (
            <H3 key={idx} props={props}>
              {_children}
            </H3>
          );
        case "li":
          return (
            <Li key={idx} props={props}>
              {_children}
            </Li>
          );
        case "ol":
          return (
            <Ol key={idx} props={props}>
              {_children}
            </Ol>
          );
        case "p":
          return (
            <P key={idx} props={props}>
              {_children}
            </P>
          );
        case "divider":
          return <Divider key={idx} />;
        case "quote":
          return (
            <Quote key={idx} props={props}>
              {_children}
            </Quote>
          );
        case "section":
          return (
            <Section key={idx} props={props}>
              {_children}
            </Section>
          );
        case "u":
          return (
            <U key={idx} props={props}>
              {_children}
            </U>
          );
        case "ul":
          return (
            <Ul key={idx} props={props}>
              {_children}
            </Ul>
          );
        case "br":
          return <br />;
        case "code":
          return (
            <Code key={idx} props={props}>
              {_children}
            </Code>
          );
        case "table":
          return (
            <Table key={idx} props={props}>
              {_children}
            </Table>
          );
        case "tr":
          return (
            <Tr key={idx} props={props}>
              {_children}
            </Tr>
          );
        case "td":
          return (
            <Td key={idx} props={props}>
              {_children}
            </Td>
          );
        case "th":
          return (
            <Th key={idx} props={props}>
              {_children}
            </Th>
          );
        case "dl":
          return (
            <Dl key={idx} props={props}>
              {_children}
            </Dl>
          );
        case "dt":
          return (
            <Dt key={idx} props={props}>
              {_children}
            </Dt>
          );
        case "dd":
          return (
            <Dd key={idx} props={props}>
              {_children}
            </Dd>
          );
        case "anchor":
          return (
            <Anchor key={idx} props={props}>
              {_children}
            </Anchor>
          );
        case "figure":
          return (
            <Figure key={idx} props={props}>
              {_children}
            </Figure>
          );
        case "figcaption":
          return (
            <Figcaption key={idx} props={props}>
              {_children}
            </Figcaption>
          );
        case "pre":
          return (
            <Pre key={idx} props={props}>
              {_children}
            </Pre>
          );
        case "code-block":
          return (
            <CodeBlock key={idx} props={props}>
              {_children}
            </CodeBlock>
          );
        case "console":
          return (
            <Console key={idx} props={props}>
              {_children}
            </Console>
          );
        case "math":
          return <Math key={idx} props={props} />;
        case "summary":
          return (
            <Summary key={idx} props={props}>
              {_children}
            </Summary>
          );
        case "box":
          return (
            <Box key={idx} props={props}>
              {_children}
            </Box>
          );
        case "aside":
          return (
            <Aside key={idx} props={props}>
              {_children}
            </Aside>
          );
        case "highlight":
          return (
            <Highlight key={idx} props={props}>
              {_children}
            </Highlight>
          );
        case "panel":
          return (
            <Panel key={idx} props={props}>
              {_children}
            </Panel>
          );
        // case "graph":
        //   return <Graph key={idx} props={props} />;
        default:
          return null;
      }
    })
    .filter(Boolean);
}

/** The exported parse function for your <lesson> root element */
export function parseLesson(doc: Document): ReactNode {
  const root = doc.documentElement;

  if (!root) return null;
  if (root.tagName.toLowerCase() !== "lesson") {
    throw new Error("Root tag should be <lesson>");
  }

  const children = parseChildren(Array.from(root.children));
  return (
    <Lesson props={{}}>
      {Children.map(children, (child, idx) => (
        <Flex key={idx} className="gap-2">
          {child}
          <Divider />
        </Flex>
      ))}
    </Lesson>
  );
}
