import { useFocusEffect } from "@react-navigation/native"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation, useRouter } from "expo-router"
import { setStatusBarStyle } from "expo-status-bar"
import { useCallback, useEffect, useState } from "react"
import {
	ActivityIndicator,
	Platform,
	StyleSheet,
	Text,
	View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function FeedScreen() {
	const insets = useSafeAreaInsets()
	const navigation = useNavigation()
	const [loading, setLoading] = useState(true)

	const router = useRouter()

	useEffect(() => {
		setLoading(true)
		router.replace("/(mumtalk)")
		setLoading(false)
	}, [])

	// RESTORED: TabBar & Status Bar Styling
	useFocusEffect(
		useCallback(() => {
			setStatusBarStyle("light")
			navigation?.setOptions({
				tabBarStyle: {
					backgroundColor: "#000000",
					borderTopColor: "rgba(0,0,0,0)",
					height: insets.bottom > 0 ? insets.bottom + 65 : 88,
					paddingBottom: insets.bottom > 0 ? insets.bottom : 28,
					paddingTop: 12,
				},
				tabBarActiveTintColor: "#d946ef",
				tabBarInactiveTintColor: "#ffffff",
			})

			return () => {
				setStatusBarStyle("dark")
				navigation?.setOptions({
					tabBarStyle: {
						backgroundColor: "#fefbfd",
						borderTopColor: "#f1f5f9",
					},
					tabBarActiveTintColor: "#6E3F9C",
					tabBarInactiveTintColor:
						Platform.OS === "ios" ? "#000000" : "#52637a",
				})
			}
		}, [navigation]),
	)

	return (
		<View className="flex-1 bg-black">
			<LinearGradient
				colors={["#501584", "#3b1060", "#000000"]}
				style={StyleSheet.absoluteFillObject}
				locations={[0, 0.3, 0.7]}
			/>

			{loading ? (
				<ActivityIndicator className="flex-1" color="#d946ef" />
			) : (
				<View className="flex-1 items-center justify-center">
					<Image
						source={require("@/assets/icons/mumaid-icon-no-bg.png")}
						style={{ width: 120, height: 120 }}
					/>
					<Text className="mt-4 text-zinc-500">
						Failed to Load MumTalk
					</Text>
				</View>
			)}
		</View>
	)
}
