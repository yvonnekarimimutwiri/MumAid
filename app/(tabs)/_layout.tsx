import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#B57EDC",
				tabBarInactiveTintColor: "#9ca3af",
				tabBarStyle: {
					backgroundColor: "#fdf2f8",
					borderTopColor: "#fce7f3",
					borderTopWidth: 1,
					paddingTop: 6,
					height: 62,
				},
				tabBarLabelStyle: { fontSize: 11, fontWeight: "500", marginBottom: 4 },
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Today",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="calendar-outline" color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="care"
				options={{
					title: "Care",
					tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="tips"
				options={{
					title: "Tips",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="phone-portrait-outline" color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="help"
				options={{
					title: "Help",
					tabBarIcon: ({ color, size }) => <Ionicons name="medkit-outline" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="partner"
				options={{
					title: "Partner",
					tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" color={color} size={size} />,
				}}
			/>
		</Tabs>
	)
}
