import { HubLinkRow } from "@/components/HubLinkRow"
import { ScrollView, Text, View, Dimensions, Pressable, TextInput } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Link } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useMemo, useState } from "react"
import { Image } from "expo-image"
import { AnimatedBreathingButton } from "@/components/AnimatedBreathingButton"

const { width } = Dimensions.get("window")

export default function CareHubScreen() {
	const insets = useSafeAreaInsets()
	const [registrationDate, setRegistrationDate] = useState(
		new Date().toISOString().slice(0, 10),
	)
	const [manualAgeMonths, setManualAgeMonths] = useState("")

	const ageData = useMemo(() => {
		const manualMonths = Number(manualAgeMonths)
		const hasManualAge = Number.isFinite(manualMonths) && manualMonths >= 0

		if (hasManualAge) {
			return buildAgeData(Math.floor(manualMonths))
		}

		const registration = new Date(registrationDate)
		if (Number.isNaN(registration.getTime())) {
			return buildAgeData(0)
		}

		const now = new Date()
		const diffMs = Math.max(0, now.getTime() - registration.getTime())
		const computedMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.4375))
		return buildAgeData(computedMonths)
	}, [registrationDate, manualAgeMonths])

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
						Age auto-calculates from registration date. You can also type age in months.
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
						Manual Age (Months)
					</Text>
					<TextInput
						value={manualAgeMonths}
						onChangeText={setManualAgeMonths}
						placeholder="e.g. 3"
						keyboardType="numeric"
						className="mt-2 rounded-2xl border border-mum-purpleSoft/30 px-4 py-3 text-mum-ink"
					/>
					<Text className="mt-2 text-xs text-mum-ink/50">
						Clear manual age to use registration-date calculation again.
					</Text>
				</View>

				<Text className="mb-2 px-1 text-sm font-bold uppercase tracking-widest text-[#2D1643]/40">
					Baby Essentials
				</Text>
				<Text className="mb-4 px-1 text-sm text-[#2D1643]/60">
					All your baby support in one place: remedies and feeding support.
				</Text>
				<View className="flex-row flex-wrap justify-between">
					<GridCard
						href="/remedies"
						title="Remedies"
						icon="medkit"
						color="#FEE2E2"
						iconColor="#EF4444"
						width={(width - 52) / 2}
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

function buildAgeData(ageMonths: number) {
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
			subLabel: "Infant stage · Rolling and sitting",
			imageUri: "https://em-content.zobj.net/source/apple/391/baby_1f476.png",
		}
	}

	return {
		label: `${Math.floor(ageMonths / 12)} Year${Math.floor(ageMonths / 12) > 1 ? "s" : ""}`,
		subLabel: "Toddler stage · Walking and exploring",
		imageUri: "https://em-content.zobj.net/source/apple/391/child_1f9d2.png",
	}
}
