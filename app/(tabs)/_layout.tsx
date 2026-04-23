import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { Platform } from "react-native"

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#6E3F9C",
				tabBarInactiveTintColor:
					Platform.OS === "ios" ? "#000000" : "#52637a",
				tabBarStyle: {
					backgroundColor: "#fefbfd",
					borderTopColor: "#f1f5f9",
					height: 88,
					paddingBottom: 28,
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
							name={focused ? "play-circle" : "play-circle-outline"}
							color={color}
							size={24}
						/>
					),
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
			<Tabs.Screen
				name="partnerf"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen name="tips" options={{ href: null }} />
		</Tabs>
	)
}
