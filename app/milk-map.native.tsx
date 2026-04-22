import { useMilkNearby } from "@/hooks/useMilkNearby"
import { getDistance } from "@/utils/geo"
import { Stack, useLocalSearchParams } from "expo-router"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import MapView, { Callout, Marker } from "react-native-maps"

export default function MilkMapScreen() {
	const { mode } = useLocalSearchParams<{ mode: "DONATE" | "BUY" }>()
	const { userLoc, filteredLocations, loading } = useMilkNearby(mode)

	return (
		<View style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					title: mode === "DONATE" ? "Donation Centers" : "Find Milk",
				}}
			/>

			{loading ? (
				<View className="flex-1 items-center justify-center bg-mum-bg">
					<Text className="font-bold text-mum-purpleDeep">
						Locating centers...
					</Text>
				</View>
			) : userLoc ? (
				<MapView
					style={StyleSheet.absoluteFillObject}
					initialRegion={{
						latitude: userLoc.latitude,
						longitude: userLoc.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
					showsUserLocation
					showsMyLocationButton
				>
					{filteredLocations.map((loc, idx) => (
						<Marker
							key={`${loc.lat}-${loc.lng}-${idx}`}
							coordinate={{
								latitude: loc.lat,
								longitude: loc.lng,
							}}
							pinColor={mode === "DONATE" ? "#be185d" : "#6E3F9C"}
						>
							<Callout tooltip>
								<View style={styles.customCallout}>
									<Text style={styles.calloutTitle}>
										{loc.name}
									</Text>
									<Text style={styles.calloutDesc}>
										{loc.description}
									</Text>

									<View style={styles.calloutDivider} />

									<Text style={styles.calloutDistance}>
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
							</Callout>
						</Marker>
					))}
				</MapView>
			) : (
				<View className="flex-1 items-center justify-center bg-mum-bg">
					<Text className="text-mum-ink/50">
						Unable to get your location.
					</Text>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	customCallout: {
		width: 200,
		padding: 12,
		backgroundColor: "white",
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#fce7f3",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 5,
	},
	calloutTitle: {
		fontWeight: "bold",
		color: "#2A1B3D",
		fontSize: 14,
	},
	calloutDesc: {
		fontSize: 12,
		color: "#3D2A55",
		opacity: 0.6,
		marginTop: 2,
	},
	calloutDivider: {
		height: 1,
		backgroundColor: "#faf5ff",
		marginVertical: 8,
	},
	calloutDistance: {
		fontSize: 10,
		fontWeight: "bold",
		color: "#6E3F9C",
		textTransform: "uppercase",
	},
})
