import React, { useEffect } from "react"
import { Pressable, View } from "react-native"
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withTiming,
	Easing,
} from "react-native-reanimated"
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"

export function AnimatedBreathingFAB() {
	const scale = useSharedValue(1)
	const opacity = useSharedValue(0.6)

	useEffect(() => {
		scale.value = withRepeat(
			withTiming(1.3, {
				duration: 2000,
				easing: Easing.inOut(Easing.ease),
			}),
			-1,
			true,
		)
		opacity.value = withRepeat(
			withTiming(1, {
				duration: 2000,
				easing: Easing.inOut(Easing.ease),
			}),
			-1,
			true,
		)
	}, [])

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		opacity: opacity.value,
	}))

	return (
		<View
			style={{ position: "absolute", bottom: 30, right: 20, zIndex: 50 }}
		>
			<Link href="/breathing" asChild>
				<Pressable className="items-center justify-center">
					<Animated.View
						style={[
							{
								position: "absolute",
								width: 60,
								height: 60,
								borderRadius: 30,
								backgroundColor: "#B57EDC",
							},
							animatedStyle,
						]}
					/>
					<View
						className="h-16 w-16 items-center justify-center rounded-full shadow-lg"
						style={{ backgroundColor: "#6E3F9C" }}
					>
						<Ionicons
							name="radio-button-on"
							size={32}
							color="white"
						/>
					</View>
				</Pressable>
			</Link>
		</View>
	)
}
