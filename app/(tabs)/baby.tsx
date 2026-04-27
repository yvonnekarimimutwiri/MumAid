import { HubLinkRow } from "@/components/HubLinkRow"
import { ScrollView, Text, View, Dimensions, Pressable, TextInput } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Link } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useMemo, useState } from "react"
import { Image } from "expo-image"
import { AnimatedBreathingButton } from "@/components/AnimatedBreathingButton"
import AsyncStorage from "@react-native-async-storage/async-storage"

const { width } = Dimensions.get("window")
const CHILD_GENDER_KEY = "mumaid_child_gender"

export default function CareHubScreen() {
	const insets = useSafeAreaInsets()
	const [registrationDate, setRegistrationDate] = useState(
		new Date().toISOString().slice(0, 10),
	)
	const [manualAgeMonths, setManualAgeMonths] = useState("")
	const [childGender, setChildGender] = useState<"female" | "male">("female")

	useEffect(() => {
		const loadChildGender = async () => {
			const storedGender = await AsyncStorage.getItem(CHILD_GENDER_KEY)
			if (storedGender === "female" || storedGender === "male") {
				setChildGender(storedGender)
			}
		}

		void loadChildGender()
	}, [])

	useEffect(() => {
		void AsyncStorage.setItem(CHILD_GENDER_KEY, childGender)
	}, [childGender])

	const ageData = useMemo(() => {
		const manualMonths = parseManualAgeToMonths(manualAgeMonths)
		const hasManualAge = manualMonths !== null

		if (hasManualAge) {
			return buildAgeData(manualMonths, childGender)
		}

		const registration = new Date(registrationDate)
		if (Number.isNaN(registration.getTime())) {
			return buildAgeData(0, childGender)
		}

		const now = new Date()
		const diffMs = Math.max(0, now.getTime() - registration.getTime())
		const computedMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.4375))
		return buildAgeData(computedMonths, childGender)
	}, [registrationDate, manualAgeMonths, childGender])

	return (
		<View
			className="flex-1 bg-mum-bg"
			style={{ paddingTop: insets.top + 8 }}
		>
			<Text className="px-6 pb-6 text-3xl font-black text-[#2D1643]">
				Baby
			</Text>

			<ScrollView
				className="flex-1"
				contentContainerStyle={{
					paddingHorizontal: 20,
					paddingBottom: insets.bottom + 40,
				}}
				showsVerticalScrollIndicator={false}
			>
				<LinearGradient
					colors={["#fbcfe8", "#fce7f3"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					className="mb-6 rounded-[32px] p-6 shadow-sm border border-white/50"
				>
					<View className="flex-row items-center justify-between">
						<View>
							<Text className="text-xs font-bold uppercase tracking-widest text-pink-600/80">
								Baby is
							</Text>
							<Text className="mt-1 text-3xl font-black text-mum-ink">
								{ageData.label}
							</Text>
							<Text className="mt-1 text-sm font-medium text-mum-ink/50">
								{ageData.subLabel}
							</Text>
						</View>
						<View className="h-20 w-20 overflow-hidden rounded-2xl bg-white/40">
							<Image
								source={{ uri: ageData.imageUri }}
								contentFit="cover"
								style={{ width: "100%", height: "100%" }}
							/>
						</View>
					</View>
				</LinearGradient>

				<View className="mb-8 rounded-[28px] border border-mum-purpleSoft/30 bg-white p-5">
					<Text className="text-sm font-bold uppercase tracking-widest text-mum-ink/40">
						Baby Growth Input
					</Text>
					<Text className="mt-2 text-sm text-mum-ink/60">
						Age auto-calculates from registration date. You can also
						enter age in months or years.
					</Text>
					<Text className="mt-4 text-xs font-bold uppercase tracking-widest text-mum-ink/40">
						Registration Date (YYYY-MM-DD)
					</Text>
					<TextInput
						value={registrationDate}
						onChangeText={setRegistrationDate}
						placeholder="2026-01-15"
						className="mt-2 rounded-2xl border border-mum-purpleSoft/30 px-4 py-3 text-mum-ink"
					/>
					<Text className="mt-4 text-xs font-bold uppercase tracking-widest text-mum-ink/40">
						Manual Age (Months or Years)
					</Text>
					<TextInput
						value={manualAgeMonths}
						onChangeText={setManualAgeMonths}
						placeholder="e.g. 18, 2y, 2 years, 1y 6m"
						className="mt-2 rounded-2xl border border-mum-purpleSoft/30 px-4 py-3 text-mum-ink"
					/>
					<Text className="mt-2 text-xs text-mum-ink/50">
						Clear manual age to use registration-date calculation
						again.
					</Text>
					<Text className="mt-4 text-xs font-bold uppercase tracking-widest text-mum-ink/40">
						Child Gender
					</Text>
					<View className="mt-2 flex-row gap-2">
						<Pressable
							onPress={() => setChildGender("female")}
							className={`rounded-full px-4 py-2 ${childGender === "female" ? "bg-mum-purpleDeep" : "border border-mum-purpleSoft/40"}`}
						>
							<Text
								className={`text-xs font-semibold ${childGender === "female" ? "text-white" : "text-mum-purpleDeep"}`}
							>
								Female
							</Text>
						</Pressable>
						<Pressable
							onPress={() => setChildGender("male")}
							className={`rounded-full px-4 py-2 ${childGender === "male" ? "bg-mum-purpleDeep" : "border border-mum-purpleSoft/40"}`}
						>
							<Text
								className={`text-xs font-semibold ${childGender === "male" ? "text-white" : "text-mum-purpleDeep"}`}
							>
								Male
							</Text>
						</Pressable>
					</View>
				</View>

				<Text className="mb-2 px-1 text-sm font-bold uppercase tracking-widest text-[#2D1643]/40">
					Baby Essentials
				</Text>
				<Text className="mb-4 px-1 text-sm text-[#2D1643]/60">
					All your baby support in one place: remedies and feeding
					support.
				</Text>
				<View className="flex-col flex-wrap justify-center gap-4">
					<HubLinkRow
						href="/remedies"
						title="Remedies"
						icon="medkit"
						variant="remedies"
					/>
				</View>

				<Text className="mb-4 px-1 text-sm font-bold uppercase tracking-widest text-[#2D1643]/40">
					Feeding
				</Text>
				<HubLinkRow
					href="/milk"
					title="Milk Support"
					subtitle="Donate or find donor milk"
					icon="water"
				/>

				<View className="mt-4 rounded-2xl bg-amber-50/50 p-4 border border-amber-100">
					<View className="flex-row items-center gap-2 mb-1">
						<Ionicons
							name="information-circle"
							size={16}
							color="#B45309"
						/>
						<Text className="text-[12px] font-bold text-amber-800">
							Safety First
						</Text>
					</View>
					<Text className="text-[11px] leading-4 text-amber-800/70">
						MumAid connects mothers but does not screen milk. Always
						consult a pediatrician regarding milk safety and donor
						screening.
					</Text>
				</View>

				<View className="mt-16 pb-10">
					<Link href="/admin" asChild>
						<Pressable className="opacity-20 active:opacity-100">
							<Text className="text-center text-[10px] font-bold uppercase tracking-widest text-[#2D1643]">
								System Admin
							</Text>
						</Pressable>
					</Link>
				</View>
			</ScrollView>
			<AnimatedBreathingButton />
		</View>
	)
}

function GridCard({ href, title, icon, color, iconColor, width }: any) {
	return (
		<Link href={href} asChild>
			<Pressable
				style={{ width, backgroundColor: color }}
				className="mb-4 h-32 justify-between rounded-[28px] p-5 shadow-sm active:scale-95"
			>
				<Ionicons name={icon} size={28} color={iconColor} />
				<Text className="text-lg font-bold text-[#2D1643]">
					{title}
				</Text>
			</Pressable>
		</Link>
	)
}

function buildAgeData(ageMonths: number, childGender: "female" | "male") {
	const toddlerGrowthImage =
		"https://em-content.zobj.net/source/apple/391/child_1f9d2.png"
	const preschoolImage =
		childGender === "female"
			? "https://em-content.zobj.net/source/apple/391/girl_1f467.png"
			: "https://em-content.zobj.net/source/apple/391/boy_1f466.png"
	const schoolAgeImage =
		childGender === "female"
			? "https://em-content.zobj.net/source/apple/391/girl_1f467.png"
			: "https://em-content.zobj.net/source/apple/391/boy_1f466.png"
	const teenImage =
		childGender === "female"
			? "https://em-content.zobj.net/source/apple/391/woman_1f469.png"
			: "https://em-content.zobj.net/source/apple/391/man_1f468.png"
	const youngAdultImage =
		childGender === "female"
			? "https://em-content.zobj.net/source/apple/391/woman_1f469.png"
			: "https://em-content.zobj.net/source/apple/391/man_1f468.png"
	const matureAdultImage =
		childGender === "female"
			? "https://em-content.zobj.net/source/apple/391/woman_1f469.png"
			: "https://em-content.zobj.net/source/apple/391/man_1f468.png"
	const olderAdultImage =
		childGender === "female"
			? "https://em-content.zobj.net/source/apple/391/old-woman_1f475.png"
			: "https://em-content.zobj.net/source/apple/391/old-man_1f474.png"

	if (ageMonths < 4) {
		return {
			label: `${ageMonths * 4} Weeks`,
			subLabel: `${ageMonths} month${ageMonths === 1 ? "" : "s"} · Newborn stage`,
			imageUri: "https://em-content.zobj.net/source/apple/391/baby_1f476.png",
		}
	}

	if (ageMonths < 12) {
		return {
			label: `${ageMonths} Months`,
			subLabel: "Baby stage · Rolling and sitting",
			imageUri: "https://em-content.zobj.net/source/apple/391/baby_1f476.png",
		}
	}

	if (ageMonths < 36) {
		return {
			label: `${Math.floor(ageMonths / 12)} Year${Math.floor(ageMonths / 12) > 1 ? "s" : ""}`,
			subLabel: "Toddler stage · Walking and exploring",
			imageUri: toddlerGrowthImage,
		}
	}

	if (ageMonths < 72) {
		return {
			label: `${Math.floor(ageMonths / 12)} Years`,
			subLabel: "Preschool stage · Talking and learning",
			imageUri: toddlerGrowthImage,
		}
	}

	if (ageMonths < 144) {
		return {
			label: `${Math.floor(ageMonths / 12)} Years`,
			subLabel: "School-age stage · Growing independence",
			imageUri: toddlerGrowthImage,
		}
	}

	if (ageMonths < 216) {
		return {
			label: `${Math.floor(ageMonths / 12)} Years`,
			subLabel: "Teen stage · Identity and confidence",
			imageUri: toddlerGrowthImage,
		}
	}

	if (ageMonths < 480) {
		return {
			label: `${Math.floor(ageMonths / 12)} Years`,
			subLabel: "Young adult stage · Ongoing growth",
			imageUri: youngAdultImage,
		}
	}

	if (ageMonths < 780) {
		return {
			label: `${Math.floor(ageMonths / 12)} Years`,
			subLabel: "Mature adult stage · Stability and leadership",
			imageUri: matureAdultImage,
		}
	}

	return {
		label: `${Math.floor(ageMonths / 12)} Years`,
		subLabel: "Older adult stage · Wisdom and legacy",
		imageUri: olderAdultImage,
	}
}

function parseManualAgeToMonths(input: string): number | null {
	const value = input.trim().toLowerCase()
	if (!value) return null

	const plainNumber = Number(value)
	if (Number.isFinite(plainNumber) && plainNumber >= 0) {
		return Math.floor(plainNumber)
	}

	const yearsMatch = value.match(/(\d+(?:\.\d+)?)\s*(y|yr|yrs|year|years)/)
	const monthsMatch = value.match(/(\d+(?:\.\d+)?)\s*(m|mo|mos|month|months)/)

	if (!yearsMatch && !monthsMatch) {
		return null
	}

	const years = yearsMatch ? Number(yearsMatch[1]) : 0
	const months = monthsMatch ? Number(monthsMatch[1]) : 0
	const totalMonths = years * 12 + months

	if (!Number.isFinite(totalMonths) || totalMonths < 0) {
		return null
	}

	return Math.floor(totalMonths)
}
