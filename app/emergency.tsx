import { Ionicons } from "@expo/vector-icons"
import * as Location from "expo-location"
import * as Linking from "expo-linking"
import { useEffect, useMemo, useState } from "react"
import {
	ActivityIndicator,
	Alert,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native"

export const options = {
	title: "Emergency",
	headerStyle: { backgroundColor: "#fff1f2" },
}

type Hospital = {
	id: number
	name: string
	phone?: string
	address?: string
	lat: number
	lon: number
	distanceKm: number
}

type OverpassElement = {
	id: number
	lat: number
	lon: number
	tags?: {
		name?: string
		phone?: string
		"contact:phone"?: string
		"addr:full"?: string
		"addr:street"?: string
		"addr:housenumber"?: string
	}
}

function toRad(value: number) {
	return (value * Math.PI) / 180
}

function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
	const earthRadiusKm = 6371
	const dLat = toRad(lat2 - lat1)
	const dLon = toRad(lon2 - lon1)
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) *
			Math.cos(toRad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2)
	return 2 * earthRadiusKm * Math.asin(Math.sqrt(a))
}

function formatAddress(tags?: OverpassElement["tags"]) {
	if (!tags) return undefined
	if (tags["addr:full"]) return tags["addr:full"]
	const street = tags["addr:street"] ?? ""
	const number = tags["addr:housenumber"] ?? ""
	const combined = `${number} ${street}`.trim()
	return combined || undefined
}

function sanitizePhone(raw?: string) {
	if (!raw) return undefined
	const cleaned = raw.replace(/[^\d+]/g, "")
	return cleaned.length >= 7 ? cleaned : undefined
}

export default function EmergencyScreen() {
	const [isLoadingHospitals, setIsLoadingHospitals] = useState(false)
	const [hospitalError, setHospitalError] = useState<string | null>(null)
	const [hospitals, setHospitals] = useState<Hospital[]>([])

	function sendEmergency() {
		Alert.alert(
			"Emergency sent (demo)",
			"In production: SMS with pre-written text + Google Maps link goes to your support person and OB/midwife. Optional push to crisis line.",
		)
	}

	useEffect(() => {
		let cancelled = false

		async function loadHospitals() {
			try {
				setIsLoadingHospitals(true)
				setHospitalError(null)

				const permission = await Location.requestForegroundPermissionsAsync()
				if (permission.status !== "granted") {
					setHospitalError(
						"Location permission is needed to find nearest hospitals.",
					)
					return
				}

				const current = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.Balanced,
				})

				const { latitude, longitude } = current.coords
				const radiusMeters = 10000
				const query = `[out:json][timeout:25];(node["amenity"="hospital"](around:${radiusMeters},${latitude},${longitude}););out center tags;`

				const response = await fetch("https://overpass-api.de/api/interpreter", {
					method: "POST",
					headers: { "Content-Type": "text/plain" },
					body: query,
				})

				if (!response.ok) {
					throw new Error("Could not load nearby hospitals.")
				}

				const data = (await response.json()) as {
					elements?: OverpassElement[]
				}

				const parsed = (data.elements ?? [])
					.map((element) => ({
						id: element.id,
						name: element.tags?.name ?? "Hospital",
						phone: sanitizePhone(
							element.tags?.phone ?? element.tags?.["contact:phone"],
						),
						address: formatAddress(element.tags),
						lat: element.lat,
						lon: element.lon,
						distanceKm: distanceKm(
							latitude,
							longitude,
							element.lat,
							element.lon,
						),
					}))
					.sort((a, b) => a.distanceKm - b.distanceKm)
					.slice(0, 8)

				if (!cancelled) {
					setHospitals(parsed)
					if (parsed.length === 0) {
						setHospitalError(
							"No hospitals were found near your current location.",
						)
					}
				}
			} catch {
				if (!cancelled) {
					setHospitalError("Could not fetch nearby hospitals right now.")
				}
			} finally {
				if (!cancelled) {
					setIsLoadingHospitals(false)
				}
			}
		}

		loadHospitals()

		return () => {
			cancelled = true
		}
	}, [])

	const hasHospitalPhones = useMemo(
		() => hospitals.some((hospital) => Boolean(hospital.phone)),
		[hospitals],
	)

	async function callHospital(phone?: string) {
		if (!phone) {
			Alert.alert("No phone number", "This hospital has no listed phone number.")
			return
		}
		const url = `tel:${phone}`
		const supported = await Linking.canOpenURL(url)
		if (!supported) {
			Alert.alert("Call unavailable", "Calling is not supported on this device.")
			return
		}
		await Linking.openURL(url)
	}

	return (
		<ScrollView className="flex-1 bg-rose-50 px-6 pt-6">
			<View className="items-center">
				<Text className="mb-6 text-center text-sm leading-5 text-rose-950/90">
					No extra confirmation - designed for speed. Location and saved contacts must be configured under
					Settings.
				</Text>
				<Pressable
					onPress={sendEmergency}
					className="h-52 w-52 items-center justify-center rounded-full bg-rose-600 shadow-2xl shadow-rose-900/40 active:opacity-90"
				>
					<Ionicons name="warning" size={48} color="white" />
					<Text className="mt-2 text-center text-lg font-bold text-white">Emergency</Text>
				</Pressable>
				<Text className="mt-8 text-center text-xs leading-5 text-rose-900/75">
					Silent SMS template: &quot;MumAid emergency: [Name] needs help. Live location: [Maps link]&quot;
				</Text>
			</View>

			<View className="mt-8 rounded-2xl bg-white p-4">
				<Text className="text-base font-bold text-rose-900">Nearest hospitals</Text>
				<Text className="mt-1 text-xs text-rose-900/70">
					Use Call to quickly contact a nearby hospital.
				</Text>

				{isLoadingHospitals ? (
					<View className="mt-4 flex-row items-center gap-2">
						<ActivityIndicator color="#e11d48" />
						<Text className="text-sm text-rose-900/80">Finding hospitals near you...</Text>
					</View>
				) : null}

				{hospitalError ? (
					<Text className="mt-4 text-sm text-rose-700">{hospitalError}</Text>
				) : null}

				{!isLoadingHospitals &&
					!hospitalError &&
					hospitals.map((hospital) => (
						<View
							key={hospital.id}
							className="mt-4 rounded-xl border border-rose-100 bg-rose-50 p-3"
						>
							<Text className="text-sm font-semibold text-rose-950">
								{hospital.name}
							</Text>
							<Text className="mt-1 text-xs text-rose-900/80">
								{hospital.distanceKm.toFixed(1)} km away
								{hospital.address ? ` - ${hospital.address}` : ""}
							</Text>
							<Pressable
								onPress={() => callHospital(hospital.phone)}
								className="mt-3 self-start rounded-lg bg-rose-600 px-3 py-2 active:opacity-90"
							>
								<Text className="text-xs font-semibold text-white">
									{hospital.phone ? `Call ${hospital.phone}` : "No phone listed"}
								</Text>
							</Pressable>
						</View>
					))}

				{!isLoadingHospitals && !hospitalError && !hasHospitalPhones ? (
					<Text className="mt-4 text-xs text-rose-800/75">
						Some hospitals may not provide a public phone number in map data.
					</Text>
				) : null}
			</View>
			<View className="h-10" />
		</ScrollView>
	)
}
