import { useTheme } from "@/context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function TabLayout() {
	const insets = useSafeAreaInsets()
	const { theme } = useTheme()

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: theme["--color-mum-purpleDeep"],
				tabBarInactiveTintColor:
					Platform.OS === "ios"
						? theme["--color-mum-ink"]
						: "#52637a",
				tabBarStyle: {
					backgroundColor: theme["--color-mum-bg"],
					borderTopColor: theme["--color-mum-petal"],
					height: insets.bottom > 0 ? insets.bottom + 65 : 88,
					paddingBottom: insets.bottom > 0 ? insets.bottom : 28,
					paddingTop: 12,
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "600",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Today",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "home" : "home-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="baby"
				options={{
					title: "Baby",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "happy" : "happy-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="mumtalk"
				options={{
					title: "MumTalk",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={
								focused ? "play-circle" : "play-circle-outline"
							}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="mumtalkdummy"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="help"
				options={{
					title: "Get Help",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={
								focused ? "shield-checkmark" : "shield-outline"
							}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="partner"
				options={{
					title: "Partner",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "people" : "people-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen name="tips" options={{ href: null }} />
		</Tabs>
	)
}
