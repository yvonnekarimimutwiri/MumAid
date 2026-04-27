import { AnimatedBreathingButton } from "@/components/AnimatedBreathingButton"
import { QuickInsightCard } from "@/components/today/QuickInsightCard"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { Link } from "expo-router"
import { useCallback, useMemo, useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

const PURPLE = "#B57EDC"
const PURPLE_DEEP = "#6E3F9C"
const PROFILE_PHOTO_KEY = "mumaid_profile_photo_uri"

const quickInsights = [
	{
		href: "/emergency" as const,
		label: "Emergency",
		icon: "warning" as const,
		accent: "rose" as const,
	},
	{
		href: "/breathing-menu" as const,
		label: "Breathe",
		icon: "radio-button-on" as const,
		accent: "fuchsia" as const,
	},
	{
		href: "/remedies" as const,
		label: "Baby help",
		icon: "medkit" as const,
		accent: "violet" as const,
	},
	{
		href: "/call-support" as const,
		label: "Call someone",
		icon: "call" as const,
		accent: "fuchsia" as const,
	},
]

export default function TodayScreen() {
	const insets = useSafeAreaInsets()
	const [profilePhotoUri, setProfilePhotoUri] = useState<string | null>(null)
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [calendarVisible, setCalendarVisible] = useState(false)
	const [displayedMonth, setDisplayedMonth] = useState(
		new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
	)
	const dateLabel = selectedDate.toLocaleDateString(undefined, {
		month: "long",
		day: "numeric",
	})
	const calendarDays = useMemo(
		() => buildCalendarDays(displayedMonth),
		[displayedMonth],
	)

	useFocusEffect(
		useCallback(() => {
			const loadProfilePhoto = async () => {
				const savedUri = await AsyncStorage.getItem(PROFILE_PHOTO_KEY)
				setProfilePhotoUri(savedUri)
			}

			void loadProfilePhoto()
		}, []),
	)

	return (
		<SafeAreaView className="flex-1 bg-mum-bg" edges={["top"]}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
			>
				<View className="flex-row items-center bg-mum-bg px-4 pb-3 pt-2">
					<View className="flex-1 items-start">
						<View className="h-10 w-10 flex items-center justify-center rounded-full overflow-hidden border border-pink-200/50 bg-white">
							{profilePhotoUri ? (
								<Image
									source={{ uri: profilePhotoUri }}
									contentFit="cover"
									style={{ width: "100%", height: "100%" }}
								/>
							) : (
								<Text className="text-lg">💗</Text>
							)}
						</View>
					</View>
					<View className="flex-1 items-center justify-center">
						<Text className="text-[17px] font-semibold text-mum-ink">
							{dateLabel}
						</Text>
					</View>
					<View className="flex-1 flex-row justify-end gap-1">
						<Pressable
							accessibilityLabel="Calendar"
							className="h-10 w-10 items-center justify-center rounded-full active:bg-white/60"
							onPress={() => setCalendarVisible(true)}
						>
							<Ionicons
								name="calendar-outline"
								size={22}
								color="#000000"
							/>
						</Pressable>
						<Link href="/settings" asChild>
							<Pressable className="h-10 w-10 items-center justify-center rounded-full active:bg-white/60">
								<Ionicons
									name="settings-outline"
									size={22}
									color="#000000"
								/>
							</Pressable>
						</Link>
					</View>
				</View>

				<LinearGradient
					colors={["#fff5f7", "#fdedf6", "#fad1e8"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					locations={[0, 0.4, 1]}
					style={{
						paddingHorizontal: 24,
						paddingTop: 28,
						paddingBottom: 36,
						borderBottomLeftRadius: 32,
						borderBottomRightRadius: 32,
					}}
				>
					<Text className="text-center text-sm font-medium text-mum-ink/75">
						You’re not alone
					</Text>
					<Text className="mt-2 text-center text-[32px] font-bold leading-tight text-mum-ink">
						Simplifying Motherhood, One Day at a Time
					</Text>
					<Text className="mt-3 text-center text-[15px] leading-5 text-mum-ink/70">
						Practical support — no mood logs or daily check‑ins
						required.
					</Text>
					<Link href="/baby" asChild>
						<Pressable
							className="mt-6 self-center rounded-full px-7 py-3.5 shadow-lg active:opacity-90"
							style={{ backgroundColor: PURPLE_DEEP }}
						>
							<Text className="text-[15px] font-semibold text-white">
								Browse care tools
							</Text>
						</Pressable>
					</Link>
				</LinearGradient>

				<View className="bg-mum-bg px-4 pt-6">
					<Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-mum-ink/45">
						Quick help · today
					</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						className="-mx-1"
					>
						<View className="flex-row pl-1 pr-4">
							{quickInsights.map((q) => (
								<QuickInsightCard key={q.href} {...q} />
							))}
						</View>
					</ScrollView>

					<Text className="mb-3 mt-10 text-xs font-semibold uppercase tracking-wider text-mum-ink/45">
						For you
					</Text>
					<Link href="/opportunities" asChild>
						<Pressable className="overflow-hidden rounded-3xl border border-pink-100 bg-white p-5 shadow-md shadow-purple-900/5 active:opacity-95">
							<View className="flex-row items-start justify-between gap-3">
								<View className="flex-1">
									<Text className="text-lg font-semibold text-mum-ink">
										Programs & opportunities
									</Text>
									<Text className="mt-2 text-sm leading-5 text-mum-ink/65">
										Free workshops, supplies, and support —
										tap to see what’s open near you.
									</Text>
								</View>
								<View className="rounded-2xl bg-[#f3e8ff] p-3">
									<Ionicons
										name="sparkles"
										size={28}
										color={PURPLE}
									/>
								</View>
							</View>
							<View className="mt-4 flex-row items-center">
								<Text
									className="text-sm font-semibold"
									style={{ color: PURPLE }}
								>
									View opportunities
								</Text>
								<Ionicons
									name="chevron-forward"
									size={18}
									color={PURPLE}
									style={{ marginLeft: 4 }}
								/>
							</View>
						</Pressable>
					</Link>

					<Link href="/exercises" asChild>
						<Pressable className="mt-4 overflow-hidden rounded-3xl border border-pink-100 bg-white p-5 shadow-md shadow-purple-900/5 active:opacity-95">
							<View className="flex-row items-start justify-between gap-3">
								<View className="flex-1">
									<Text className="text-lg font-semibold text-mum-ink">
										Movement exercises
									</Text>
									<Text className="mt-2 text-sm leading-5 text-mum-ink/65">
										Gentle routines for strength, posture,
										and recovery.
									</Text>
								</View>
								<View className="rounded-2xl bg-[#dbeafe] p-3">
									<Ionicons
										name="fitness"
										size={28}
										color="#3B82F6"
									/>
								</View>
							</View>
							<View className="mt-4 flex-row items-center">
								<Text
									className="text-sm font-semibold"
									style={{ color: PURPLE }}
								>
									Open exercises
								</Text>
								<Ionicons
									name="chevron-forward"
									size={18}
									color={PURPLE}
									style={{ marginLeft: 4 }}
								/>
							</View>
						</Pressable>
					</Link>
				</View>
			</ScrollView>
			<AnimatedBreathingButton />
			{calendarVisible ? (
				<View className="absolute inset-0 justify-center bg-black/35 px-6">
					<Pressable
						className="absolute inset-0"
						onPress={() => setCalendarVisible(false)}
					/>
					<View className="rounded-3xl bg-white p-5">
						<View className="mb-4 flex-row items-center justify-between">
							<Pressable
								onPress={() => {
									setDisplayedMonth(
										new Date(
											displayedMonth.getFullYear(),
											displayedMonth.getMonth() - 1,
											1,
										),
									)
								}}
								className="h-9 w-9 items-center justify-center rounded-full bg-mum-mist"
							>
								<Ionicons
									name="chevron-back"
									size={18}
									color="#2D1643"
								/>
							</Pressable>
							<Text className="text-base font-bold text-mum-ink">
								{displayedMonth.toLocaleDateString(undefined, {
									month: "long",
									year: "numeric",
								})}
							</Text>
							<Pressable
								onPress={() => {
									setDisplayedMonth(
										new Date(
											displayedMonth.getFullYear(),
											displayedMonth.getMonth() + 1,
											1,
										),
									)
								}}
								className="h-9 w-9 items-center justify-center rounded-full bg-mum-mist"
							>
								<Ionicons
									name="chevron-forward"
									size={18}
									color="#2D1643"
								/>
							</Pressable>
						</View>
						<View className="mb-2 flex-row">
							{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
								(day) => (
									<Text
										key={day}
										className="flex-1 text-center text-xs font-semibold text-mum-ink/50"
									>
										{day}
									</Text>
								),
							)}
						</View>
						{Array.from({ length: Math.ceil(calendarDays.length / 7) }).map(
							(_, rowIndex) => (
								<View key={`row-${rowIndex}`} className="mb-1 flex-row">
									{calendarDays
										.slice(rowIndex * 7, rowIndex * 7 + 7)
										.map((cell, cellIndex) => {
											const isSelected =
												cell !== null &&
												isSameDay(cell, selectedDate)
											return (
												<Pressable
													key={
														cell
															? cell.toISOString()
															: `empty-${rowIndex}-${cellIndex}`
													}
													disabled={cell === null}
													onPress={() => {
														if (!cell) return
														setSelectedDate(cell)
														setDisplayedMonth(
															new Date(
																cell.getFullYear(),
																cell.getMonth(),
																1,
															),
														)
														setCalendarVisible(false)
													}}
													className={`h-10 flex-1 items-center justify-center rounded-xl ${isSelected ? "bg-mum-purpleDeep" : ""}`}
												>
													<Text
														className={`text-sm ${isSelected ? "font-semibold text-white" : "text-mum-ink"}`}
													>
														{cell ? cell.getDate() : ""}
													</Text>
												</Pressable>
											)
										})}
								</View>
							),
						)}
					</View>
				</View>
			) : null}
		</SafeAreaView>
	)
}

function buildCalendarDays(month: Date): Array<Date | null> {
	const year = month.getFullYear()
	const monthIndex = month.getMonth()
	const firstDayOfWeek = new Date(year, monthIndex, 1).getDay()
	const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
	const cells: Array<Date | null> = []

	for (let i = 0; i < firstDayOfWeek; i += 1) {
		cells.push(null)
	}

	for (let day = 1; day <= daysInMonth; day += 1) {
		cells.push(new Date(year, monthIndex, day))
	}

	while (cells.length % 7 !== 0) {
		cells.push(null)
	}

	return cells
}

function isSameDay(a: Date, b: Date): boolean {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	)
}
