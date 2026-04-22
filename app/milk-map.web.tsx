import { useMilkNearby } from "@/hooks/useMilkNearby"
import { getDistance } from "@/utils/geo"
import { Stack, useLocalSearchParams } from "expo-router"
import React from "react"
import { ScrollView, Text, View } from "react-native"

export default function MilkMapScreen() {
	const { mode } = useLocalSearchParams<{ mode: "DONATE" | "BUY" }>()
	const { userLoc, filteredLocations, loading } = useMilkNearby(mode)

	return (
		<View style={{ flex: 1 }} className="bg-mum-bg">
			<Stack.Screen
				options={{
					title: mode === "DONATE" ? "Donation Centers" : "Find Milk",
				}}
			/>

			{loading ? (
				<View className="flex-1 items-center justify-center">
					<Text className="font-bold text-mum-purpleDeep">
						Locating centers...
					</Text>
				</View>
			) : userLoc ? (
				<ScrollView
					className="flex-1 px-4"
					contentContainerStyle={{ paddingBottom: 24 }}
				>
					<Text className="py-4 text-sm text-mum-ink/70">
						Interactive maps run in the mobile app. Here are nearby
						places based on your browser location.
					</Text>
					{filteredLocations.length === 0 ? (
						<Text className="text-mum-ink/50">
							No locations matched nearby. Try the iOS or Android
							app for the full map.
						</Text>
					) : (
						filteredLocations.map((loc, idx) => (
							<View
								key={`${loc.lat}-${loc.lng}-${idx}`}
								className="mb-3 rounded-2xl border border-mum-petal bg-white p-4"
							>
								<Text className="text-base font-bold text-mum-ink">
									{loc.name}
								</Text>
								<Text className="mt-1 text-sm text-mum-ink/60">
									{loc.description || "—"}
								</Text>
								<Text className="mt-2 text-xs font-semibold uppercase text-mum-purpleDeep">
									Approx.{" "}
									{getDistance(
										userLoc.latitude,
										userLoc.longitude,
										loc.lat,
										loc.lng,
									).toFixed(1)}{" "}
									km away
								</Text>
							</View>
						))
					)}
				</ScrollView>
			) : (
				<View className="flex-1 items-center justify-center px-6">
					<Text className="text-center text-mum-ink/50">
						Unable to get your location. Allow location access in the
						browser, or open this screen in the Expo Go app.
					</Text>
				</View>
			)}
		</View>
	)
}
