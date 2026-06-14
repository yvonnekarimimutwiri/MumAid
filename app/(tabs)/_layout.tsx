import { useTheme } from "@/context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { Tabs, useRouter } from "expo-router"
import { setStatusBarStyle } from "expo-status-bar"
import { Platform, Pressable, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function TabLayout() {
	const insets = useSafeAreaInsets()
	const { theme } = useTheme()
	const router = useRouter()
	setStatusBarStyle("dark")

	const inactiveColor =
		Platform.OS === "ios" ? theme["--color-mum-ink"] : "#52637a"

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: theme["--color-mum-purpleDeep"],
				tabBarInactiveTintColor: inactiveColor,
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
					tabBarButton: ({ style, accessibilityState }) => {
						const focused = accessibilityState?.selected
						// Use exact same color evaluation as screenOptions
						const activeColor = focused
							? theme["--color-mum-purpleDeep"]
							: inactiveColor

						return (
							<Pressable
								style={style}
								onPress={() => {
									// Push directly to the separate navigator root,
									// bypassing the template lifecycle crash on APK builds
									router.push("/(mumtalk)")
								}}
							>
								<View
									style={{
										alignItems: "center",
										justifyContent: "center",
										flex: 1,
									}}
								>
									<Ionicons
										name={
											focused
												? "play-circle"
												: "play-circle-outline"
										}
										color={activeColor}
										size={24}
									/>
									<Text
										style={{
											color: activeColor,
											fontSize: 12,
											fontWeight: "600",
											marginTop:
												Platform.OS === "ios" ? 0 : 3,
										}}
									>
										MumTalk
									</Text>
								</View>
							</Pressable>
						)
					},
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
