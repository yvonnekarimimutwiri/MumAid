import React from "react"
import { View, Pressable } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, useRouter } from "expo-router" // 1. Import these
import BreathingBubble from "@/components/BreathingBubble"

export default function BubbleScreen() {
	// 2. Use the hook to get params
	const { durations } = useLocalSearchParams<{ durations: string }>()
	const router = useRouter()

	// 3. Handle the data format
	// Expo Router often passes params as strings or arrays of strings.
	// We ensure it's an array of numbers for the bubble component.
	const parsedDurations = React.useMemo(() => {
		if (!durations) return [4, 4, 4, 4] // Default fallback
		if (Array.isArray(durations)) return durations.map(Number)
		return durations.split(",").map(Number)
	}, [durations])

	return (
		<View className="flex-1">
			<LinearGradient
				colors={["rgba(76, 29, 149, 0)", "#4c1d95"]}
				locations={[0.8, 1]}
				className="absolute inset-0"
			/>

			{/* Back Button using router.back() */}
			<View className="absolute top-12 left-6 z-50">
				<Pressable
					onPress={() => router.back()}
					className="p-2 bg-black/10 rounded-full"
				>
					<Ionicons name="close" size={28} color="white" />
				</Pressable>
			</View>

			<View className="flex-1 items-center justify-center">
				<BreathingBubble durations={parsedDurations} />
			</View>
		</View>
	)
}
