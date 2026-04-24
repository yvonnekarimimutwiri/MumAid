import React, { useEffect, useRef, useState } from "react"
import { Animated, Easing, StyleSheet, Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const INHALE_SIZE = 1.1
const EXHALE_SIZE = .75

interface BreathingBubbleProps {
	durations: number[]
}

const BUBBLE_SIZE = 224
const RADIUS = BUBBLE_SIZE / 2

export default function BreathingBubble({ durations }: BreathingBubbleProps) {
	const scale = useRef(new Animated.Value(EXHALE_SIZE)).current
	const [phaseText, setPhaseText] = useState("")
	const [seconds, setSeconds] = useState(0)

	useEffect(() => {
		const msDurations = durations.map((d) => d * 1000)
		let isCancelled = false
		let timerId: ReturnType<typeof setInterval>

		const sequenceSteps = msDurations
			.map((d, i) => {
				const isHoldOrExhale = i === 2 || i === 3
				const target = isHoldOrExhale ? EXHALE_SIZE : INHALE_SIZE

				return Animated.timing(scale, {
					toValue: target,
					duration: d,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				})
			})
			.filter((_, i) => durations[i] > 0)

		const playStep = (index: number) => {
			if (isCancelled || sequenceSteps.length === 0) return

			setSeconds(0)
			if (timerId) clearInterval(timerId)

			const phaseNames = ["Inhale", "Hold", "Exhale", "Hold"]
			const activePhases = durations
				.map((d, i) =>
					d > 0 ? { name: phaseNames[i], limit: d } : null,
				)
				.filter((p): p is { name: string; limit: number } => p !== null)

			const currentPhase = activePhases[index % activePhases.length]
			setPhaseText(currentPhase.name)

			timerId = setInterval(() => {
				setSeconds((prev) => {
					if (prev < currentPhase.limit) return prev + 1
					return prev
				})
			}, 1000)

			const currentAnim = sequenceSteps[index % sequenceSteps.length]
			currentAnim.start(({ finished }) => {
				if (finished && !isCancelled) {
					playStep(index + 1)
				}
			})
		}

		playStep(0)

		return () => {
			isCancelled = true
			scale.stopAnimation()
			if (timerId) clearInterval(timerId)
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
							<Text style={styles.counterText}>{seconds}</Text>
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
	counterText: {
		fontSize: 32,
		fontWeight: "300",
		fontVariant: ["tabular-nums"],
		color: "#2A1B3D",
		opacity: 0.8,
	},
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
		gap: 12,
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
