import { MILK_LOCATIONS as LOCATIONS } from "@/data/mockdata"
import { Location as MilkLoc } from "@/utils/geo"
import * as LocationGeos from "expo-location"
import { useCallback, useEffect, useState } from "react"

const INITIAL_GRID_STEP = 0.1
const MAX_GRID_STEP = 1

export function useMilkNearby(mode: "DONATE" | "BUY" | undefined) {
	const [userLoc, setUserLoc] = useState<{
		latitude: number
		longitude: number
	} | null>(null)
	const [filteredLocations, setFilteredLocations] = useState<MilkLoc[]>([])
	const [loading, setLoading] = useState(true)

	const findNearby = useCallback(
		(lat: number, lng: number) => {
			let currentStep = INITIAL_GRID_STEP
			let found: MilkLoc[] = []

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
		},
		[mode],
	)

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

				const location = await LocationGeos.getCurrentPositionAsync({
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
	}, [findNearby])

	return { userLoc, filteredLocations, loading }
}
