import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import "./global.css"

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<StatusBar style="dark" />
			<Stack
				screenOptions={{
					headerStyle: { backgroundColor: "#fdf2f8" },
					headerTintColor: "#B57EDC",
					headerShadowVisible: false,
					headerTitleStyle: { fontWeight: "600", color: "#2A1B3D", fontSize: 17 },
					contentStyle: { backgroundColor: "#fdf2f8" },
				}}
			>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</SafeAreaProvider>
	)
}
