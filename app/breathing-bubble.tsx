import React, { useEffect, useRef, useState } from "react"
import { Animated, Easing, StyleSheet, Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const BUBBLE = 224
const R = BUBBLE / 2

// props: durations = [inhale, hold, exhale, hold] in seconds
export default function AnimatedBubble({ durations = [4, 4, 4, 4] }) {
	const scale = useRef(new Animated.Value(0.92)).current
	const [phaseText, setPhaseText] = useState("")

	useEffect(() => {
		const [inhale, hold1, exhale, hold2] = durations.map((d) => d * 1000)

		const createStep = (
			toValue: number,
			duration: number,
			text: string,
		) => {
			if (duration <= 0) return null
			return {
				anim: Animated.timing(scale, {
					toValue,
					duration,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
				text,
			}
		}

		const steps = [
			createStep(1.12, inhale, "Inhale"),
			createStep(1.12, hold1, "Hold"),
			createStep(0.92, exhale, "Exhale"),
			createStep(0.92, hold2, "Hold"),
		].filter(Boolean)

		let isCancelled = false

		const runSequence = () => {
			if (isCancelled) return

			const runStep = (index: number) => {
				const current = steps[index % steps.length]
				if (isCancelled || current == null) return
				setPhaseText(current.text)

				current.anim.start(({ finished }) => {
					if (finished && !isCancelled) {
						runStep(index + 1)
					}
				})
			}

			runStep(0)
		}

		runSequence()

		return () => {
			isCancelled = true
			scale.stopAnimation()
		}
	}, [durations])

	return (
		<View className="flex-1 items-center justify-center bg-mum-bg px-6">
			<Animated.View
				style={{
					width: BUBBLE,
					height: BUBBLE,
					transform: [{ scale }],
				}}
			>
				<View style={{ elevation: 14 }}>
					<View style={styles.bubbleContainer}>
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
						{/* Glossy Overlays */}
						<View
							pointerEvents="none"
							style={[
								styles.glint,
								{
									top: R * 0.12,
									left: R * 0.18,
									width: R * 0.95,
									height: R * 0.42,
								},
							]}
						/>
						<View
							pointerEvents="none"
							style={[
								styles.glint,
								{
									top: R * 0.22,
									left: R * 0.28,
									width: R * 0.35,
									height: R * 0.16,
								},
							]}
						/>

						<View style={styles.textOverlay}>
							<Text style={styles.mainText}>{phaseText}</Text>
						</View>
					</View>
				</View>
			</Animated.View>

			<Text className="mt-10 text-xs uppercase tracking-widest text-mum-purpleDeep">
				{durations.join("-")} Pattern
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	bubbleContainer: {
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
	},
	glint: {
		position: "absolute",
		borderRadius: R,
		backgroundColor: "rgba(255,255,255,0.55)",
		transform: [{ rotate: "-28deg" }],
	},
	textOverlay: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "center",
	},
	mainText: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
		color: "#2A1B3D",
		textShadowColor: "rgba(255,255,255,0.95)",
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 10,
	},
})
