import { useEffect, useRef } from "react"
import { Animated, Easing, Text, View } from "react-native"

export const options = { title: "Breathing Bubble" }

const CYCLE_MS = 10000
const INHALE_MS = 5000

export default function BreathingScreen() {
	const scale = useRef(new Animated.Value(0.92)).current

	useEffect(() => {
		const loop = Animated.loop(
			Animated.sequence([
				Animated.timing(scale, {
					toValue: 1.12,
					duration: INHALE_MS,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
				Animated.timing(scale, {
					toValue: 0.92,
					duration: CYCLE_MS - INHALE_MS,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
			]),
		)
		loop.start()
		return () => {
			loop.stop()
		}
	}, [scale])

	return (
		<View className="flex-1 items-center justify-center bg-mum-bg px-6">
			<Text className="mb-8 text-center text-sm text-mum-ink/80">
				Inhale while the bubble grows for about five seconds, exhale as it shrinks — full cycle in ten seconds.
			</Text>
			<Animated.View
				style={{ transform: [{ scale }] }}
				className="h-56 w-56 items-center justify-center rounded-full border-4 border-fuchsia-300/80 bg-fuchsia-200/70 shadow-lg shadow-fuchsia-900/20"
			>
				<Text className="text-center text-lg font-semibold text-mum-ink">Breathe</Text>
			</Animated.View>
			<Text className="mt-10 text-xs uppercase tracking-widest text-mum-purpleDeep">10 second cycle</Text>
		</View>
	)
}
