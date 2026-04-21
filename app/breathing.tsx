import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useRef } from "react"
import { Animated, Easing, StyleSheet, Text, View } from "react-native"

export const options = { title: "Breathing Bubble" }

const CYCLE_MS = 10000
const INHALE_MS = 5000
const BUBBLE = 224
const R = BUBBLE / 2

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
				Inhale while the bubble grows for about five seconds, exhale as
				it shrinks — full cycle in ten seconds.
			</Text>
			<Animated.View
				style={{
					width: BUBBLE,
					height: BUBBLE,
					transform: [{ scale }],
				}}
			>
				<View style={{ elevation: 14 }}>
					<View
						style={{
							width: BUBBLE,
							height: BUBBLE,
							borderRadius: R,
							overflow: "hidden",
							borderWidth: 2,
							borderColor: "rgba(255,255,255,0.92)",
							shadowColor: "#6E3F9C",
							shadowOffset: { width: 0, height: 10 },
							shadowOpacity: 0.22,
							shadowRadius: 18,
						}}
					>
						<LinearGradient
							colors={[
								"rgba(255,255,255,0.65)",
								"rgba(224,242,254,0.42)",
								"rgba(233,213,255,0.5)",
								"rgba(253,230,138,0.18)",
								"rgba(167,139,250,0.35)",
								"rgba(255,255,255,0.28)",
							]}
							locations={[0, 0.18, 0.4, 0.52, 0.75, 1]}
							start={{ x: 0.08, y: 0 }}
							end={{ x: 0.92, y: 1 }}
							style={StyleSheet.absoluteFillObject}
						/>
						<LinearGradient
							colors={[
								"rgba(168,85,247,0.22)",
								"rgba(255,255,255,0)",
								"rgba(56,189,248,0.18)",
							]}
							start={{ x: 0, y: 0.45 }}
							end={{ x: 1, y: 0.55 }}
							style={StyleSheet.absoluteFillObject}
						/>
						{/* Main specular highlight (soap bubble glint) */}
						<View
							pointerEvents="none"
							style={{
								position: "absolute",
								top: R * 0.12,
								left: R * 0.18,
								width: R * 0.95,
								height: R * 0.42,
								borderRadius: R,
								backgroundColor: "rgba(255,255,255,0.55)",
								transform: [{ rotate: "-28deg" }],
							}}
						/>
						<View
							pointerEvents="none"
							style={{
								position: "absolute",
								top: R * 0.22,
								left: R * 0.28,
								width: R * 0.35,
								height: R * 0.16,
								borderRadius: R,
								backgroundColor: "rgba(255,255,255,0.35)",
								transform: [{ rotate: "-28deg" }],
							}}
						/>
						{/* Secondary glint */}
						<View
							pointerEvents="none"
							style={{
								position: "absolute",
								bottom: R * 0.32,
								right: R * 0.16,
								width: R * 0.2,
								height: R * 0.2,
								borderRadius: R,
								backgroundColor: "rgba(255,255,255,0.38)",
							}}
						/>
						{/* Thin inner edge (refraction) */}
						<View
							pointerEvents="none"
							style={{
								...StyleSheet.absoluteFillObject,
								margin: 5,
								borderRadius: R - 5,
								borderWidth: 1,
								borderColor: "rgba(255,255,255,0.35)",
							}}
						/>
						<View
							style={{
								...StyleSheet.absoluteFillObject,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Text
								className="text-center text-lg font-semibold"
								style={{
									color: "#2A1B3D",
									textShadowColor: "rgba(255,255,255,0.95)",
									textShadowOffset: { width: 0, height: 0 },
									textShadowRadius: 10,
								}}
							>
								Breathe
							</Text>
						</View>
					</View>
				</View>
			</Animated.View>
			<Text className="mt-10 text-xs uppercase tracking-widest text-mum-purpleDeep">
				10 second cycle
			</Text>
		</View>
	)
}
