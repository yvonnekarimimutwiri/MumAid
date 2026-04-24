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
					<Stack.Screen
						name="bubble-screen"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="settings"
						options={{ title: "Settings" }}
					/>
					<Stack.Screen
						name="remedies"
						options={{ title: "Remedies" }}
					/>
					<Stack.Screen
						name="emergency"
						options={{ title: "Emergency" }}
					/>
					<Stack.Screen
						name="breathing-menu"
						options={{ title: "Breathing-menu" }}
					/>
					<Stack.Screen
						name="call-support"
						options={{ title: "Call-Support" }}
					/>
					<Stack.Screen
						name="opportunities"
						options={{ title: "Opportunities" }}
					/>
					<Stack.Screen
						name="exercises"
						options={{ title: "Exercises" }}
					/>
					<Stack.Screen
						name="milk"
						options={{ title: "Milk" }}
					/>
					<Stack.Screen
						name="healthcare"
						options={{ title: "Healthcare" }}
					/>
					<Stack.Screen
						name="therapist"
						options={{ title: "Therapist" }}
					/>
				</Stack>
			</SafeAreaProvider>
		</ThemeProvider>
	)
}
