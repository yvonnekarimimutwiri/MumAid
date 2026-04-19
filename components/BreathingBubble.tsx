import React, { useEffect } from "react"
import { View } from "react-native"
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withSequence,
	withTiming,
	Easing,
} from "react-native-reanimated"
import { Ionicons } from "@expo/vector-icons"

export function BreathingBubble({ size = 64, iconSize = 32 }) {
	const scale = useSharedValue(1)
	const opacity = useSharedValue(0.6)

	useEffect(() => {
		// 10-second total cycle: 4s inhale, 2s hold, 4s exhale
		scale.value = withRepeat(
			withSequence(
				withTiming(1.5, {
					duration: 4000,
					easing: Easing.out(Easing.ease),
				}), // Inhale
				withTiming(1.5, { duration: 2000 }), // Hold
				withTiming(1, {
					duration: 4000,
					easing: Easing.in(Easing.ease),
				}), // Exhale
			),
			-1, // Infinite loop
		)

		opacity.value = withRepeat(
			withSequence(
				withTiming(1, { duration: 4000 }),
				withTiming(1, { duration: 2000 }),
				withTiming(0.6, { duration: 4000 }),
			),
			-1,
		)
	}, [])

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		opacity: opacity.value,
	}))

	return (
		<View
			className="items-center justify-center"
			style={{ width: size, height: size }}
		>
			{/* The Animated Expanding Bubble  */}
			<Animated.View
				className="absolute rounded-full bg-purple-300/40"
				style={[{ width: size, height: size }, animatedStyle]}
			/>
			{/* Static Center Icon */}
			<View
				className="items-center justify-center rounded-full shadow-lg"
				style={{
					width: size,
					height: size,
					backgroundColor: "#6E3F9C",
				}}
			>
				<Ionicons
					name="radio-button-on"
					size={iconSize}
					color="white"
				/>
			</View>
		</View>
	)
}
