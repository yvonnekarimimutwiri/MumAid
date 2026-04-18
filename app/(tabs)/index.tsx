import { QuickInsightCard } from "@/components/today/QuickInsightCard"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { Link } from "expo-router"
import { Pressable, ScrollView, Text, View } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

const PURPLE = "#B57EDC"
const PURPLE_DEEP = "#6E3F9C"

const quickInsights = [
	{ href: "/emergency" as const, label: "Emergency", icon: "warning" as const, accent: "rose" as const },
	{ href: "/breathing" as const, label: "Breathe", icon: "radio-button-on" as const, accent: "fuchsia" as const },
	{ href: "/remedies" as const, label: "Baby help", icon: "medkit" as const, accent: "violet" as const },
	{ href: "/call-support" as const, label: "Call someone", icon: "call" as const, accent: "fuchsia" as const },
]

export default function TodayScreen() {
	const insets = useSafeAreaInsets()
	const now = new Date()
	const dateLabel = now.toLocaleDateString(undefined, { month: "long", day: "numeric" })

	return (
		<SafeAreaView className="flex-1 bg-mum-bg" edges={["top"]}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
			>
				<View className="flex-row items-center justify-between bg-mum-bg px-4 pb-3 pt-2">
					<View className="h-10 w-10 items-center justify-center rounded-full border border-pink-200/50 bg-white">
						<Text className="text-lg">💗</Text>
					</View>
					<Text className="text-[17px] font-semibold text-mum-ink">{dateLabel}</Text>
					<View className="flex-row items-center gap-1">
						<Pressable
							accessibilityLabel="Calendar"
							className="h-10 w-10 items-center justify-center rounded-full active:bg-white/60"
							onPress={() => {}}
						>
							<Ionicons name="calendar-outline" size={22} color={PURPLE} />
						</Pressable>
						<Link href="/settings" asChild>
							<Pressable className="h-10 w-10 items-center justify-center rounded-full active:bg-white/60">
								<Ionicons name="settings-outline" size={22} color={PURPLE} />
							</Pressable>
						</Link>
					</View>
				</View>

				<LinearGradient
					colors={["#fff5f7", "#fdf2f8", "#fce7f3"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={{
						paddingHorizontal: 24,
						paddingTop: 28,
						paddingBottom: 36,
						borderBottomLeftRadius: 32,
						borderBottomRightRadius: 32,
					}}
				>
					<Text className="text-center text-sm font-medium text-mum-ink/75">You’re not alone</Text>
					<Text className="mt-2 text-center text-[32px] font-bold leading-tight text-mum-ink">
						Help when you need it
					</Text>
					<Text className="mt-3 text-center text-[15px] leading-5 text-mum-ink/70">
						Practical support — no mood logs or daily check‑ins required.
					</Text>
					<Link href="/care" asChild>
						<Pressable
							className="mt-6 self-center rounded-full px-7 py-3.5 shadow-lg active:opacity-90"
							style={{ backgroundColor: PURPLE_DEEP }}
						>
							<Text className="text-[15px] font-semibold text-white">Browse care tools</Text>
						</Pressable>
					</Link>
				</LinearGradient>

				<View className="bg-mum-bg px-4 pt-6">
					<Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-mum-ink/45">
						Quick help · today
					</Text>
					<ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-1">
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
									<Text className="text-lg font-semibold text-mum-ink">Programs & opportunities</Text>
									<Text className="mt-2 text-sm leading-5 text-mum-ink/65">
										Free workshops, supplies, and support — tap to see what’s open near you.
									</Text>
								</View>
								<View className="rounded-2xl bg-[#f3e8ff] p-3">
									<Ionicons name="sparkles" size={28} color={PURPLE} />
								</View>
							</View>
							<View className="mt-4 flex-row items-center">
								<Text className="text-sm font-semibold" style={{ color: PURPLE }}>
									View opportunities
								</Text>
								<Ionicons name="chevron-forward" size={18} color={PURPLE} style={{ marginLeft: 4 }} />
							</View>
						</Pressable>
					</Link>

					<Link href="/feed" asChild>
						<Pressable className="mt-4 overflow-hidden rounded-3xl active:opacity-95">
							<LinearGradient
								colors={["#c084fc", "#B57EDC", "#7e22ce"]}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
								style={{ borderRadius: 24, padding: 20 }}
							>
								<View className="flex-row items-center justify-between">
									<View className="max-w-[72%]">
										<Text className="text-xs font-semibold uppercase tracking-widest text-white/90">
											Mum tips
										</Text>
										<Text className="mt-2 text-lg font-semibold text-white">
											15‑second clips from mums
										</Text>
									</View>
									<Ionicons name="play-circle" size={44} color="#fce7f3" />
								</View>
								<Text className="mt-3 text-sm text-white/90">Tap to open the full feed →</Text>
							</LinearGradient>
						</Pressable>
					</Link>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
