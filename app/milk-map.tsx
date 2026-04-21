import { MILK_LOCATIONS as LOCATIONS } from "@/data/mockdata"
import { getDistance, Location as MilkLoc } from "@/utils/geo"
import * as LocationGeos from "expo-location"
import { Stack, useLocalSearchParams } from "expo-router"
import React, { useEffect, useState } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import MapView, { Callout, Marker } from "react-native-maps"

const { width, height } = Dimensions.get("window")

const INITIAL_GRID_STEP = 0.1 // ~11km
const MAX_GRID_STEP = 1 // ~110km

export default function MilkMapScreen() {
	const { mode } = useLocalSearchParams<{ mode: "DONATE" | "BUY" }>()
	const [userLoc, setUserLoc] = useState<any>(null)
	const [filteredLocations, setFilteredLocations] = useState<MilkLoc[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		;(async () => {
			try {
				const { status: existingStatus } =
					await LocationGeos.getForegroundPermissionsAsync()
				let finalStatus = existingStatus

				if (existingStatus !== "granted") {
					const { status } =
						await LocationGeos.requestForegroundPermissionsAsync()
					finalStatus = status
				}

				if (finalStatus !== "granted") {
					console.warn("Permission to access location was denied")
					setLoading(false)
					return
				}

				let location = await LocationGeos.getCurrentPositionAsync({
					accuracy: LocationGeos.Accuracy.Balanced,
				})

				setUserLoc(location.coords)
				findNearby(location.coords.latitude, location.coords.longitude)
			} catch (error) {
				console.error("Error fetching location:", error)
			} finally {
				setLoading(false)
			}
		})()
	}, [])

	const findNearby = (lat: number, lng: number) => {
		let currentStep = INITIAL_GRID_STEP
		let found: MilkLoc[] = []

		// Search algorithm: Increment grid size until locations found or max reached
		while (found.length === 0 && currentStep <= MAX_GRID_STEP) {
			found = LOCATIONS.filter((loc) => {
				const matchesType =
					mode === "DONATE"
						? loc.type === "DONATE" || loc.type === "BOTH"
						: loc.type === "BUY" || loc.type === "BOTH"
				const inLatRange = Math.abs(loc.lat - lat) <= currentStep
				const inLngRange = Math.abs(loc.lng - lng) <= currentStep
				return matchesType && inLatRange && inLngRange
			})
			currentStep += 0.2
		}
		setFilteredLocations(found)
	}

	return (
		<View style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					title: mode === "DONATE" ? "Donation Centers" : "Find Milk",
				}}
			/>

			{loading ? (
				<View className="flex-1 items-center justify-center bg-mum-bg">
					<Text className="text-mum-purpleDeep font-bold">
						Locating centers...
					</Text>
				</View>
			) : userLoc ? (
				<MapView
					// Using explicit Style instead of just className for the Map
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
							{/* On Android, removing 'tooltip' can help if the custom view isn't showing.
       If you keep 'tooltip', you MUST use a standard style for width/height.
    */}
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
	map: {
		...StyleSheet.absoluteFillObject,
	},
	customCallout: {
		width: 200,
		padding: 12,
		backgroundColor: "white",
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#fce7f3", // mum-petal
		// Add shadow for iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		// Elevation for Android
		elevation: 5,
	},
	calloutTitle: {
		fontWeight: "bold",
		color: "#2A1B3D", // mum-ink
		fontSize: 14,
	},
	calloutDesc: {
		fontSize: 12,
		color: "#3D2A55", // mum-inkDeep
		opacity: 0.6,
		marginTop: 2,
	},
	calloutDivider: {
		height: 1,
		backgroundColor: "#faf5ff", // mum-mist
		marginVertical: 8,
	},
	calloutDistance: {
		fontSize: 10,
		fontWeight: "bold",
		color: "#6E3F9C", // mum-purpleDeep
		textTransform: "uppercase",
	},
})