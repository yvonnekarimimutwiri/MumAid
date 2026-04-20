import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#6E3F9C",
				tabBarInactiveTintColor: "#94a3b8",
				tabBarStyle: {
					backgroundColor: "#ffffff",
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
				name="care"
				options={{
					title: "Care",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "heart" : "heart-outline"}
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
					title: "Father",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "person" : "person-outline"}
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
