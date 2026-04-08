import { Stack } from "expo-router";
import { AppProvider } from "../context/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Welcome Screen dengan Splash Screen otomatis */}
        <Stack.Screen
          name="index"
          options={{
            gestureEnabled: false,
          }}
        />

        {/* Login Screen */}
        <Stack.Screen
          name="login"
          options={{
            gestureEnabled: false,
          }}
        />

        {/* Tabs Navigation */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack>
    </AppProvider>
  );
}
