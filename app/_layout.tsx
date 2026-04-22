import "react-native-gesture-handler"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import "./global.css"
import { ThemeProvider } from "@/context/ThemeContext"

export default function RootLayout() {
	return (
		<ThemeProvider>
			<SafeAreaProvider>
				<StatusBar style="dark" />
				<Stack
					screenOptions={{
						headerStyle: { backgroundColor: "#fdf2f8" },
						headerTintColor: "#B57EDC",
						headerShadowVisible: false,
						headerTitleStyle: {
							fontWeight: "600",
							color: "#2A1B3D",
							fontSize: 17,
						},
						contentStyle: { backgroundColor: "#fdf2f8" },
					}}
				>
					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: false }}
					/>
					{/* Explicitly defining the hub here fixes the context error */}
					<Stack.Screen
						name="romance-hub"
						options={{
							headerTitle: "Romance",
							presentation: "card",
						}}
					/>
				</Stack>
			</SafeAreaProvider>
		</ThemeProvider>
	)
}
