import { ThemeProvider } from "@/context/ThemeContext"
import { tokenStorage } from "@/utils/storage"
import { Stack, useRouter, useSegments } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import "./global.css"
import { authApi } from "@/utils/auth"
import { AuthProvider, useAuth } from "@/context/AuthContext"

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

		if (!hasToken && !inAuthGroup) {
			router.replace("/(auth)/login")
		} else if (hasToken && userRole) {
			if (userRole === "partner" && (inTabsGroup || inAuthGroup)) {
				router.replace("/(partner)")
			} else if (userRole !== "partner" && (inPartnerGroup || inAuthGroup)) {
				router.replace("/(tabs)")
			}
		}

		if (!isLoading) SplashScreen.hideAsync()
	}, [hasToken, userRole, isLoading, segments])

	if (isLoading) return null

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
						name="(partner)"
						options={{ headerShown: false }}
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
