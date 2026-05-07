import { useAuth } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { Tabs, useRouter } from "expo-router"
import { setStatusBarStyle } from "expo-status-bar"
import { useEffect } from "react"
import { Platform, Pressable, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function TabLayout() {
	const insets = useSafeAreaInsets()
    const { userRole } = useAuth()
    const router = useRouter()
    setStatusBarStyle("light")

    useEffect(() => {setStatusBarStyle("light")}, [])

    const handleGoBack = () => {
		if (userRole === "partner") {
			router.replace("/(partner)")
        } else {
			router.replace("/(tabs)")
		}
	}

	return (
		<Tabs
			screenOptions={{
				headerShown: false,

				sceneStyle: { backgroundColor: '#000000' },

				tabBarActiveTintColor: "#d946ef",
				tabBarInactiveTintColor: "#ffffff",
				tabBarStyle: {
					backgroundColor: "#000000",
					borderTopColor: "rgba(0,0,0,0)",
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
					title: "",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "play" : "play-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="mumchat"
				options={{
					title: "MumChat",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={
								focused
									? "chatbubble-ellipses"
									: "chatbubble-ellipses-outline"
							}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="add"
				options={{
					title: "Add",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "add-circle" : "add-circle-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "person" : "person-outline"}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="back"
				options={{
					title: "Exit",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "arrow-back-circle" : "arrow-back-circle-outline"}
							color={color}
							size={24}
						/>
					),
					tabBarButton: ({ style, ...props }) => (
						<Pressable style={style} onPress={handleGoBack}>
							<View className="items-center justify-center">
								<Ionicons
									name="arrow-back-circle-outline"
									color={
										props.accessibilityState?.selected
											? "#d946ef"
											: "#ffffff"
									}
									size={24}
								/>
								<Text
									style={{
										fontSize: 12,
										fontWeight: "600",
										marginTop: 4,
									}}
									className="text-white"
								>
									Exit
								</Text>
							</View>
						</Pressable>
					),
				}}
			/>
		</Tabs>
	)
}
