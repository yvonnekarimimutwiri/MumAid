import { Link } from "expo-router"
import React, { useEffect, useRef } from "react"
import { Animated, Pressable, View } from "react-native"

export function AnimatedBreathingButton() {
	// Initial scale value
	const scaleAnim = useRef(new Animated.Value(1)).current

	useEffect(() => {
		const breathingAnimation = Animated.loop(
			Animated.sequence([
				Animated.timing(scaleAnim, {
					toValue: 1.25,
					duration: 4000,
					useNativeDriver: true,
				}),
				Animated.timing(scaleAnim, {
					toValue: 1,
					duration: 4000,
					useNativeDriver: true,
				}),
			]),
		)

		breathingAnimation.start()
		return () => breathingAnimation.stop()
	}, [scaleAnim])

	return (
		<View
			style={{
				position: "absolute",
				bottom: 30,
				right: 24,
				zIndex: 50,
			}}
		>
			<Link href="/breathing" asChild>
				<Pressable className="active:scale-90">
					<Animated.View
						style={{
							transform: [{ scale: scaleAnim }],
							opacity: 0.4,
							backgroundColor: "#B57EDC",
							width: 38,
							height: 38,
							borderRadius: 19,
							position: "absolute",
							top: -3,
							left: -3,
						}}
					/>
					<Animated.View
						style={{
							transform: [{ scale: scaleAnim }],
							backgroundColor: "#6E3F9C",
							width: 32,
							height: 32,
							borderRadius: 16,
							alignItems: "center",
							justifyContent: "center",
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 4 },
							shadowOpacity: 0.3,
							shadowRadius: 4.65,
							elevation: 8,
						}}
					>
						<View className="rounded-full bg-transparent border border-white/70 p-0.5">
							<View className="rounded-full w-3 h-3 bg-white/80" />
						</View>
					</Animated.View>
				</Pressable>
			</Link>
		</View>
	)
}
