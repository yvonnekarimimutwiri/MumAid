import React, { useState } from "react"
import { View, Text, Pressable, TextInput, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type RootStackParamList = {
	BreathingMenu: undefined
	"bubble-screen": { durations: number[] }
}

const PRESETS = [
	{ name: "Sleep", pattern: "4-6-8" },
	{ name: "Focus", pattern: "5-0-5" },
	{ name: "Relaxation", pattern: "4-4-4-4" },
]

export default function BreathingMenu() {
	const [customPattern, setCustomPattern] = useState(["", "", "", ""])
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const updatePattern = (val: string, index: number) => {
		const newPattern = [...customPattern]
		newPattern[index] = val.replace(/[^0-9]/g, "").slice(0, 2)
		setCustomPattern(newPattern)
	}

	const handleStart = (pattern: string) => {
		// Clean the input and map to numbers
		const parts = pattern
			.split("-")
			.map(Number)
			.filter((n) => !isNaN(n))

		if (parts.length < 3) return

		// Logic: [Inhale, Hold, Exhale, Hold]
		// If 3 numbers (e.g. 4-6-8), last hold is 0.
		const durations = parts.length === 3 ? [...parts, 0] : parts

		navigation.navigate("bubble-screen", { durations })
	}

    const handleStartCustom = () => {
		// Convert strings to numbers, defaulting to 0 if empty
		const durations = customPattern.map((val) => parseInt(val) || 0)

		// Ensure at least inhale and exhale have values to avoid a static bubble
		if (durations[0] === 0 || durations[2] === 0) return

		navigation.navigate("bubble-screen", {
			durations: durations,
		})
	}

	return (
		<ScrollView className="flex-1 p-6">
			<Text className="text-2xl font-bold text-mum-ink mb-8">
				Breathing Exercises
			</Text>

			<Text className="text-sm font-semibold text-gray-500 uppercase mb-4">
				Presets
			</Text>
			{PRESETS.map((item) => (
				<Pressable
					key={item.name}
					onPress={() => handleStart(item.pattern)}
					className="bg-gray-50 p-5 rounded-2xl mb-4 border border-gray-100 flex-row justify-between items-center active:bg-gray-100"
					style={{ elevation: 3 }}
				>
					<View>
						<Text className="text-lg font-semibold text-mum-ink">
							{item.name}
						</Text>
						<Text className="text-gray-500">{item.pattern}</Text>
					</View>
					<Text className="text-mum-purpleDeep font-bold">→</Text>
				</Pressable>
			))}

			<Text className="text-sm font-semibold text-gray-500 uppercase mt-8 mb-4">
				Custom Pattern
			</Text>

			<View
				className="bg-gray-50 p-6 rounded-3xl border border-gray-100"
				style={{ elevation: 3 }}
			>
				<View className="flex-row justify-between items-center mb-6">
					{["In", "Hold", "Out", "Hold"].map((label, index) => (
						<View key={index} className="items-center">
							<Text className="text-[10px] uppercase font-bold text-gray-400 mb-2">
								{label}
							</Text>
							<TextInput
								value={customPattern[index]}
								onChangeText={(val) =>
									updatePattern(val, index)
								}
								placeholder="0"
								keyboardType="number-pad"
								maxLength={2}
								textAlign="center"
								className="w-14 h-14 bg-white rounded-xl border border-gray-200 text-lg font-bold text-mum-ink shadow-sm"
							/>
						</View>
					))}
				</View>

				<Pressable
					onPress={handleStartCustom}
					className="bg-mum-purpleDeep p-4 rounded-2xl items-center active:opacity-90 shadow-md"
				>
					<Text className="text-white font-bold text-base">
						Start Custom Exercise
					</Text>
				</Pressable>
			</View>
		</ScrollView>
	)
}
