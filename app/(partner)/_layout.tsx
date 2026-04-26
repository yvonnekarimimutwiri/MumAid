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
					title: "Home",
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
				name="romance-hub"
				options={{
					title: "Romance",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "heart" : "heart-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
		</Tabs>
	)
}
