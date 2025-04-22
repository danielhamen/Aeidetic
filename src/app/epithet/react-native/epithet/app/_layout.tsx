import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import "react-native-reanimated";

// Use fonts:
import SpaceMono from "./../assets/fonts/SpaceMono-Regular.ttf";
import Urbanist from "./../assets/fonts/Urbanist.ttf";
import UrbanistItalic from "./../assets/fonts/Urbanist-Italic.ttf";
import Baskervville from "./../assets/fonts/Baskervville-Regular.ttf";
import BaskervvilleSC from "./../assets/fonts/BaskervvilleSC-Regular.ttf";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export enum NavigationPage {
  HOME = "home",
  BOOKMARKS = "bookmarks",
  SUBSTITUTIONS = "substitutions",
  PROFILE = "profile",
  SETTINGS = "settings",
}

export interface NavigationContextType {
  page: NavigationPage;
  setPage: (page: NavigationPage) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [page, setPage] = useState(NavigationPage.HOME);

  return (
    <NavigationContext.Provider value={{ page, setPage }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function StreakStatus() {
  return (
    <View style={{ padding: 4 }}>
      <Text>12 🔥</Text>
    </View>
  );
}

export function Header() {
  const { page } = useNavigation();
  return (
    <View
      style={{
        padding: 32,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text>{capitalize(page)}</Text>
      <StreakStatus />
    </View>
  );
}

export function Footer() {
  return <View style={{ backgroundColor: "red", padding: 32 }}></View>;
}

export function Substitutions() {
  return <View></View>;
}

export function Home() {
  return <View></View>;
}

export function Bookmarks() {
  return <View></View>;
}

export function Profile() {
  return <View></View>;
}

export function Settings() {
  return <View></View>;
}

export function Layout() {
  const { page } = useNavigation();
  const [presentNode, setPresentNode] = useState<ReactNode | null>(null);
  useEffect(() => {
    switch (page) {
      case NavigationPage.HOME:
        setPresentNode(<Home />);
        break;
      case NavigationPage.PROFILE:
        setPresentNode(<Profile />);
        break;
      case NavigationPage.SETTINGS:
        setPresentNode(<Settings />);
        break;
      case NavigationPage.BOOKMARKS:
        setPresentNode(<Bookmarks />);
        break;
      case NavigationPage.SUBSTITUTIONS:
        setPresentNode(<Substitutions />);
        break;
      default:
        setPresentNode(null);
        break;
    }
  }, [page]);

  if (!presentNode) {
    return null;
  }

  return (
    <View style={{ flexGrow: 1 }}>
      <Header />
      <View style={{ flexGrow: 1 }}>{presentNode}</View>
      <Footer />
    </View>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono,
    Urbanist,
    UrbanistItalic,
    Baskervville,
    BaskervvilleSC,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationProvider>
      <Layout />
      <StatusBar style="auto" />
    </NavigationProvider>
  );
}
