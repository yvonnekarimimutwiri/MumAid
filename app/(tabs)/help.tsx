import { AnimatedBreathingButton } from "@/components/AnimatedBreathingButton"
import { HubLinkRow } from "@/components/HubLinkRow"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { Link } from "expo-router"
import { Pressable, ScrollView, Text, View, Dimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const { width } = Dimensions.get("window")

export default function HelpHubScreen() {
	const insets = useSafeAreaInsets()

	return (
		<View
			className="flex-1 bg-mum-bg"
			style={{ paddingTop: insets.top + 8 }}
		>
			<Text className="px-6 pb-2 text-3xl font-black text-mum-ink">
				Help
			</Text>
			<Text className="px-6 pb-6 text-sm leading-5 text-mum-ink/60">
				Emergency contacts and professional support.
			</Text>

			<ScrollView
				className="flex-1"
				contentContainerStyle={{
					paddingHorizontal: 20,
					paddingBottom: insets.bottom + 40,
				}}
				showsVerticalScrollIndicator={false}
			>
				<Link href="/emergency" asChild>
					<Pressable className="mb-8 flex-row items-center gap-5 rounded-[32px] border-b-[6px] border-[#b40e27] bg-[#fa2948] px-6 py-7 active:translate-y-1 active:border-b-0 shadow-lg shadow-rose-900/20">
						<View className="rounded-[20px] bg-white/20 p-4">
							<Ionicons name="warning" size={36} color="white" />
						</View>
						<View className="flex-1">
							<Text className="text-2xl font-black tracking-tight text-white">
								EMERGENCY
							</Text>
							<Text className="text-sm font-bold text-white/80">
								Silent alert + location
							</Text>
						</View>
						<Ionicons
							name="chevron-forward"
							size={24}
							color="white"
						/>
					</Pressable>
				</Link>

				<Text className="mb-4 px-1 text-xs font-bold uppercase tracking-widest text-mum-ink/40">
					Professional Support
				</Text>
				<View className="flex-row flex-wrap justify-between">
					<GridCard
						href="/healthcare"
						title="Healthcare"
						subtitle="OB & ER"
						icon="medical"
						bgColor="bg-slate-200"
						iconColor="#334155"
						width={(width - 52) / 2}
					/>

					<GridCard
						href="/therapist"
						title="Therapist"
						subtitle="Call/Text"
						icon="chatbubbles"
						gradient={["#c084fc", "#B57EDC", "#7e22ce"]}
						iconColor="white"
						width={(width - 52) / 2}
					/>
				</View>

				<View className="mt-4">
					<HubLinkRow
						href="/call-support"
						title="Call support person"
						subtitle="Immediate contact for help"
						icon="call"
					/>
					<HubLinkRow
						href="/opportunities"
						title="Opportunities"
						subtitle="Supplies and community aid"
						icon="sparkles"
					/>
				</View>

				<View className="mt-8 border-t border-mum-petal pt-6">
					<HubLinkRow
						href="/settings"
						title="App Settings"
						subtitle="Contacts, lock & partner link"
						icon="settings-outline"
					/>
				</View>

				<View className="mt-12 pb-10">
					<Link href="/admin" asChild>
						<Pressable className="opacity-10 active:opacity-100">
							<Text className="text-center text-[10px] font-bold uppercase tracking-widest text-mum-ink">
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

function GridCard({
	href,
	title,
	subtitle,
	icon,
	bgColor,
	iconColor,
	width,
	gradient,
}: any) {
	return (
		<Link href={href} asChild>
			<Pressable
				style={{ width }}
				className="mb-4 overflow-hidden rounded-[28px] active:scale-95 shadow-sm shadow-purple-900/10"
			>
				{gradient ? (
					<LinearGradient
						colors={gradient}
						locations={[0, 0.55, 1]}
						start={{ x: 0, y: 0.2 }}
						end={{ x: 1, y: 1 }}
						className="h-32 justify-between p-5"
					>
						<CardContent
							icon={icon}
							iconColor={iconColor}
							title={title}
							subtitle={subtitle}
							isGradient
						/>
					</LinearGradient>
				) : (
					<View className={`h-32 justify-between p-5 ${bgColor}`}>
						<CardContent
							icon={icon}
							iconColor={iconColor}
							title={title}
							subtitle={subtitle}
						/>
					</View>
				)}
			</Pressable>
		</Link>
	)
}

function CardContent({ icon, iconColor, title, subtitle, isGradient }: any) {
	return (
		<>
			<View
				className={`h-10 w-10 items-center justify-center rounded-xl ${isGradient ? "bg-white/20" : "bg-white/40"}`}
			>
				<Ionicons
					name={icon}
					size={22}
					color={isGradient ? "white" : iconColor}
				/>
			</View>
			<View>
				<Text
					className={`text-lg font-bold ${isGradient ? "text-white" : "text-mum-ink"}`}
				>
					{title}
				</Text>
				<Text
					className={`text-xs font-semibold ${isGradient ? "text-white/80" : "text-mum-ink/50"}`}
				>
					{subtitle}
				</Text>
			</View>
		</>
	)
}