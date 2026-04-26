import { ThemeProvider } from "@/context/ThemeContext"
import { tokenStorage } from "@/utils/storage"
import { Stack, useRouter, useSegments } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import "./global.css"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [isReady, setIsReady] = useState(false)
	const [hasToken, setHasToken] = useState(false)

	const segments = useSegments()
	const router = useRouter()

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const token = await tokenStorage.getAccessToken()
				setHasToken(!!token)
			} catch (e) {
				setHasToken(false)
			} finally {
				setIsReady(true)
			}
		}
		checkAuth()
	}, [])

	useEffect(() => {
		if (!isReady) return

		const inAuthGroup = segments[0] === "(auth)"

		const timeout = setTimeout(() => {
			if (!hasToken && !inAuthGroup) {
				router.replace("/(auth)/login")
			} else if (hasToken && inAuthGroup) {
				router.replace("/(tabs)")
			} else {
				SplashScreen.hideAsync()
			}
		}, 1)

		return () => clearTimeout(timeout)
	}, [hasToken, isReady, segments])

	if (!isReady) return null

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
					<Stack.Screen
						name="(auth)"
						options={{ headerShown: false }}
					/>
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
					<Stack.Screen name="milk" options={{ title: "Milk" }} />
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
