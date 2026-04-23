import React, { useEffect, useRef, useState } from "react"
import { Animated, Easing, StyleSheet, Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

interface BreathingBubbleProps {
	/** [Inhale, Hold, Exhale, Hold] in seconds */
	durations: number[]
}

const BUBBLE_SIZE = 224
const RADIUS = BUBBLE_SIZE / 2

export default function BreathingBubble({ durations }: BreathingBubbleProps) {
	const scale = useRef(new Animated.Value(0.92)).current
	const [phaseText, setPhaseText] = useState("")

	useEffect(() => {
		const [inhale, hold1, exhale, hold2] = durations.map((d) => d * 1000)
		let isCancelled = false

		// Fix 1: Explicitly type the sequenceSteps array
		const sequenceSteps: Animated.CompositeAnimation[] = []

		// 1. Inhale
		if (inhale > 0) {
			sequenceSteps.push(
				Animated.timing(scale, {
					toValue: 1.15,
					duration: inhale,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
			)
		}

		// 2. Hold (Full)
		if (hold1 > 0) {
			sequenceSteps.push(
				Animated.timing(scale, {
					toValue: 1.15,
					duration: hold1,
					useNativeDriver: true,
				}),
			)
		}

		// 3. Exhale
		if (exhale > 0) {
			sequenceSteps.push(
				Animated.timing(scale, {
					toValue: 0.92,
					duration: exhale,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
			)
		}

		// 4. Hold (Empty)
		if (hold2 > 0) {
			sequenceSteps.push(
				Animated.timing(scale, {
					toValue: 0.92,
					duration: hold2,
					useNativeDriver: true,
				}),
			)
		}

		const playStep = (index: number) => {
			if (isCancelled || sequenceSteps.length === 0) return

			const phaseNames = ["Inhale", "Hold", "Exhale", "Hold"]
			const activeSteps = [inhale, hold1, exhale, hold2]
				.map((d, i) => (d > 0 ? phaseNames[i] : null))
				.filter((name): name is string => name !== null)

			const currentText = activeSteps[index % activeSteps.length]
			setPhaseText(currentText || "")

			const currentAnim = sequenceSteps[index % sequenceSteps.length]

			// Fix 2: Type the 'finished' parameter
			currentAnim.start(({ finished }: { finished: boolean }) => {
				if (finished && !isCancelled) {
					playStep(index + 1)
				}
			})
		}

		playStep(0)

		return () => {
			isCancelled = true
			scale.stopAnimation()
		}
	}, [durations])

	return (
		<View className="flex-1 items-center justify-center bg-transparent">
			<Animated.View
				style={{
					width: BUBBLE_SIZE,
					height: BUBBLE_SIZE,
					transform: [{ scale }],
				}}
			>
				<View style={styles.shadowWrapper}>
					<View style={styles.bubbleContainer}>
						<LinearGradient
							colors={[
								"rgba(255,255,255,0.7)",
								"rgba(224,242,254,0.45)",
								"rgba(233,213,255,0.55)",
								"rgba(253,230,138,0.2)",
								"rgba(167,139,250,0.4)",
								"rgba(255,255,255,0.3)",
							]}
							locations={[0, 0.18, 0.4, 0.52, 0.75, 1]}
							start={{ x: 0.08, y: 0 }}
							end={{ x: 0.92, y: 1 }}
							style={StyleSheet.absoluteFillObject}
						/>

						<View
							pointerEvents="none"
							style={[styles.glint, styles.glintMain]}
						/>
						<View
							pointerEvents="none"
							style={[styles.glint, styles.glintSecondary]}
						/>
						<View
							pointerEvents="none"
							style={[styles.glint, styles.glintLower]}
						/>

						<View style={styles.textContainer}>
							<Text style={styles.statusText}>{phaseText}</Text>
						</View>
					</View>
				</View>
			</Animated.View>

			<Text className="mt-12 text-xs font-bold uppercase tracking-[4px] text-black/60">
				{durations.filter((d) => d > 0).join(" • ")} Seconds
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	shadowWrapper: {
		elevation: 20,
		shadowColor: "#6E3F9C",
		shadowOffset: { width: 0, height: 15 },
		shadowOpacity: 0.3,
		shadowRadius: 25,
	},
	bubbleContainer: {
		width: BUBBLE_SIZE,
		height: BUBBLE_SIZE,
		borderRadius: RADIUS,
		overflow: "hidden",
		borderWidth: 1.5,
		borderColor: "rgba(255,255,255,0.8)",
		backgroundColor: "rgba(255,255,255,0.1)",
	},
	glint: {
		position: "absolute",
		backgroundColor: "rgba(255,255,255,0.5)",
		borderRadius: RADIUS,
		transform: [{ rotate: "-28deg" }],
	},
	glintMain: {
		top: RADIUS * 0.12,
		left: RADIUS * 0.18,
		width: RADIUS * 0.95,
		height: RADIUS * 0.42,
	},
	glintSecondary: {
		top: RADIUS * 0.22,
		left: RADIUS * 0.28,
		width: RADIUS * 0.35,
		height: RADIUS * 0.16,
		backgroundColor: "rgba(255,255,255,0.3)",
	},
	glintLower: {
		bottom: RADIUS * 0.32,
		right: RADIUS * 0.16,
		width: RADIUS * 0.2,
		height: RADIUS * 0.2,
		backgroundColor: "rgba(255,255,255,0.35)",
		transform: [{ rotate: "0deg" }],
	},
	textContainer: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "center",
	},
	statusText: {
		fontSize: 22,
		fontWeight: "700",
		color: "#2A1B3D",
		letterSpacing: 0.5,
		textShadowColor: "rgba(255,255,255,0.8)",
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 12,
	},
})
