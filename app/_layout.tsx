import { AuthProvider, useAuth } from "@/context/AuthContext"
import { ThemeProvider, useTheme } from "@/context/ThemeContext"
import { Stack, useRouter, useSegments } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import "./global.css"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	return (
		<AuthProvider>
			<MainLayout />
		</AuthProvider>
	)
}

function MainLayout() {
	const { hasToken, userRole, isLoading } = useAuth()
	const segments = useSegments()
	const router = useRouter()

	useEffect(() => {
		if (isLoading) return

		const inAuthGroup = segments[0] === "(auth)"
		const inPartnerGroup = segments[0] === "(partner)"
		const inTabsGroup = segments[0] === "(tabs)"

		if ((!hasToken || !userRole) && !inAuthGroup) {
			router.replace("/(auth)/login")
		} else if (hasToken && userRole) {
			if (userRole === "partner" && (inTabsGroup || inAuthGroup)) {
				router.replace("/(partner)")
			} else if (
				userRole !== "partner" &&
				(inPartnerGroup || inAuthGroup)
			) {
				router.replace("/(tabs)")
			}
		}

		if (!isLoading) SplashScreen.hideAsync()
	}, [hasToken, userRole, isLoading, segments, router])

	if (isLoading) return null

	return (
		<ThemeProvider>
			<ThemedAppLayout />
		</ThemeProvider>
	)
}

function ThemedAppLayout() {
	const { theme } = useTheme()

	return (
		<SafeAreaProvider>
			<StatusBar style="dark" />
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: theme["--color-mum-bg"],
					},
					headerTintColor: theme["--color-mum-purple"],
					headerShadowVisible: false,
					headerTitleStyle: {
						fontWeight: "600",
						color: theme["--color-mum-ink"],
						fontSize: 17,
					},
					contentStyle: { backgroundColor: theme["--color-mum-bg"] },
				}}
			>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen
					name="(partner)"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="bubble-screen"
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="settings" options={{ title: "Settings" }} />
				<Stack.Screen name="remedies" options={{ title: "Remedies" }} />
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
	)
}
