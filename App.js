import { useFonts } from "expo-font";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from "react-native-safe-area-context";
import fonts from "./config/fonts";
import Navigation from "./navigation";
import { AuthProvider } from "./context/AuthContext";



export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  return !fontsLoaded ? null : (
    <SafeAreaProvider>
    <AuthProvider>
      <Navigation />
      <StatusBar />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
