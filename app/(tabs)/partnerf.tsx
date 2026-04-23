import { Ionicons } from "@expo/vector-icons"
import { ScrollView, Text, View, Pressable, TextInput } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { TaskItem } from "@/components/TaskItem"
import { Link } from "expo-router"
import { useMemo, useState } from "react"
import { Image } from "expo-image"

const tasks = [
	"Take the night feed so mom can sleep 4 hours straight.",
	"Hold the baby so she can shower without rushing.",
	"Prep bottles / pump parts before bedtime.",
	"Handle dishes tonight — she did every daytime feed.",
]

export default function PartnerTabScreen() {
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
			<Text className="px-6 pb-6 text-3xl font-black text-mum-ink">
				Partner
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
					className="mb-8 rounded-[32px] p-6 shadow-sm border border-white/50"
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

				<Link href="/romance-hub" asChild>
					<Pressable className="mb-8 overflow-hidden rounded-[32px] active:scale-[0.98]">
						<LinearGradient
							colors={["#FF9A8B", "#FF6A88", "#FF99AC"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							className="flex-row items-center justify-between p-6"
						>
							<View className="flex-1 pr-4">
								<Text className="text-xs font-bold uppercase tracking-widest text-white/80">
									Relationship
								</Text>
								<Text className="mt-1 text-2xl font-bold text-white">
									Date Night & Romance
								</Text>
								<Text className="mt-1 text-white/90">
									Keep the spark alive while baby sleeps
								</Text>
							</View>
							<View className="h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
								<Ionicons
									name="heart"
									size={32}
									color="white"
								/>
							</View>
						</LinearGradient>
					</Pressable>
				</Link>

				<View className="flex-row items-center justify-between mb-4 px-1">
					<Text className="text-sm font-bold uppercase tracking-widest text-mum-ink/40">
						Tonight's Support
					</Text>
					<Pressable className="active:opacity-50">
						<Text className="text-xs font-bold text-mum-purpleDeep">
							Shuffle tasks
						</Text>
					</Pressable>
				</View>

				{tasks.map((task, index) => (
					<TaskItem key={index} task={task} />
				))}

				<View className="mt-8 rounded-[28px] border border-dashed border-mum-purpleSoft p-6">
					<View className="items-center">
						<Ionicons name="infinite" size={32} color="#B57EDC" />
						<Text className="mt-2 text-center text-base font-bold text-mum-ink">
							Link to Mother's App
						</Text>
						<Text className="mt-1 text-center text-sm text-mum-ink/50 leading-5">
							Sync tasks in real-time so she can rest knowing
							you've got it handled.
						</Text>
						<Pressable className="mt-4 rounded-full bg-mum-purpleDeep px-6 py-2 active:opacity-90">
							<Text className="font-bold text-white">
								Send Invite
							</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>
		</View>
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
