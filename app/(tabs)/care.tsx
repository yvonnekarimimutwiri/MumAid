import { HubLinkRow } from "@/components/HubLinkRow"
import { ScrollView, Text, View, Dimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Link } from "expo-router"
import { Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const { width } = Dimensions.get("window")

export default function CareHubScreen() {
	const insets = useSafeAreaInsets()

	return (
		<View
			className="flex-1 bg-mum-bg"
			style={{ paddingTop: insets.top + 8 }}
		>
			<Text className="px-6 pb-6 text-3xl font-black text-[#2D1643]">
				Care
			</Text>

			<ScrollView
				className="flex-1"
				contentContainerStyle={{
					paddingHorizontal: 20,
					paddingBottom: insets.bottom + 40,
				}}
				showsVerticalScrollIndicator={false}
			>
				<Link href="/breathing" asChild>
					<Pressable className="mb-8 overflow-hidden rounded-[32px] shadow-xl shadow-purple-200">
						<LinearGradient
							colors={["#6E3F9C", "#8B5CF6"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							className="flex-row items-center justify-between p-6"
						>
							<View className="flex-1 pr-4">
								<Text className="text-xs font-bold uppercase tracking-[2px] text-white/70">
									Instant Reset
								</Text>
								<Text className="mt-1 text-2xl font-bold text-white">
									Breathing Bubble
								</Text>
								<Text className="mt-1 text-white/80">
									10 seconds to find your calm
								</Text>
							</View>
							<View className="h-16 w-16 items-center justify-center rounded-full bg-white/20">
								<Ionicons
									name="radio-button-on"
									size={40}
									color="white"
								/>
							</View>
						</LinearGradient>
					</Pressable>
				</Link>

				<Text className="mb-4 px-1 text-sm font-bold uppercase tracking-widest text-[#2D1643]/40">
					Baby & Body
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
					<GridCard
						href="/exercises"
						title="Exercise"
						icon="fitness"
						color="#DBEAFE"
						iconColor="#3B82F6"
						width={(width - 52) / 2}
					/>
				</View>

				<Link href="/tips" asChild>
					<Pressable className="mt-4 mb-8 flex-row items-center gap-4 rounded-[24px] border border-purple-100 bg-purple-50/50 p-4 active:scale-[0.98]">
						<View className="rounded-xl bg-purple-200 p-3">
							<Ionicons
								name="play-circle"
								size={24}
								color="#6E3F9C"
							/>
						</View>
						<View className="flex-1">
							<Text className="text-lg font-bold text-[#2D1643]">
								Video Tips
							</Text>
							<Text className="text-sm text-[#2D1643]/60">
								15s clips from other mums
							</Text>
						</View>
						<Ionicons
							name="chevron-forward"
							size={20}
							color="#6E3F9C"
						/>
					</Pressable>
				</Link>

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
