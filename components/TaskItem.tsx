import React, { useState, useRef } from "react"
import { Animated, Pressable, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export function TaskItem({ task }: { task: string }) {
	const [checked, setChecked] = useState(false)

	// Animation values
	const scaleValue = useRef(new Animated.Value(1)).current
	const opacityValue = useRef(new Animated.Value(1)).current

	const toggleTask = () => {
		const toValue = checked ? 0 : 1

		// 1. Scale "Pop" effect
		Animated.sequence([
			Animated.timing(scaleValue, {
				toValue: 1.2,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(scaleValue, {
				toValue: 1,
				duration: 100,
				useNativeDriver: true,
			}),
		]).start()

		// 2. Fade text effect
		Animated.timing(opacityValue, {
			toValue: checked ? 1 : 0.4,
			duration: 200,
			useNativeDriver: true,
		}).start()

		setChecked(!checked)
	}

	return (
		<Pressable
			onPress={toggleTask}
			className={`mb-3 flex-row items-start gap-4 rounded-[24px] border p-5 shadow-sm active:scale-[0.98] ${
				checked
					? "border-transparent bg-mum-mist"
					: "border-mum-petal bg-white"
			}`}
		>
			{/* Animated Checkbox */}
			<Animated.View
				style={{ transform: [{ scale: scaleValue }] }}
				className={`mt-0.5 h-6 w-6 items-center justify-center rounded-full border-2 ${
					checked
						? "border-mum-purpleDeep bg-mum-purpleDeep"
						: "border-mum-purpleSoft bg-white"
				}`}
			>
				{checked && (
					<Ionicons name="checkmark" size={14} color="white" />
				)}
			</Animated.View>

			{/* Animated Task Text */}
			<Animated.View style={{ flex: 1, opacity: opacityValue }}>
				<Text
					className={`text-[16px] font-medium leading-6 ${
						checked
							? "text-mum-ink/40 line-through"
							: "text-mum-inkDeep"
					}`}
				>
					{task}
				</Text>
			</Animated.View>
		</Pressable>
	)
}
