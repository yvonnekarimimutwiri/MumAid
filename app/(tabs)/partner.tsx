import { Ionicons } from "@expo/vector-icons"
import { ScrollView, Text, View, Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { TaskItem } from "@/components/TaskItem" // Same component, reusable logic
import { Link } from "expo-router"
import { AnimatedBreathingButton } from "@/components/AnimatedBreathingButton"

const partnerTasks = [
	"Take the night feed so mom can sleep 4 hours straight.",
	"Hold the baby so she can shower without rushing.",
	"Prep bottles / pump parts before bedtime.",
	"Handle dishes tonight — she did every daytime feed.",
]

export default function PartnerScreen() {
	const insets = useSafeAreaInsets()

	return (
		<View
			className="flex-1 bg-mum-bg"
			style={{ paddingTop: insets.top + 8 }}
		>
			<Text className="px-6 pb-6 text-3xl font-black text-mum-ink">
				Partner Support
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
					colors={["#E9D5FF", "#F5F3FF"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					className="mb-8 rounded-[32px] p-6 shadow-sm border border-white/50"
				>
					<View className="flex-row items-center justify-between gap-4">
						<View className="h-16 w-16 items-center justify-center rounded-full bg-mum-purpleDeep shadow-sm">
							<Ionicons name="people" size={32} color="white" />
						</View>
						<View className="flex-1">
							<Text className="text-xs font-bold uppercase tracking-widest text-mum-purpleDeep/60">
								Partner Connection
							</Text>
							<Text className="text-xl font-bold text-mum-ink">
								Invite your partner
							</Text>
							<Text className="text-sm text-mum-ink/50">
								Send an invite so your partner can support tasks in real time.
							</Text>
						</View>
					</View>
					<Pressable className="mt-4 rounded-full bg-mum-purpleDeep px-6 py-3 active:opacity-90">
						<Text className="text-center font-bold text-white">
							Send Invite
						</Text>
					</Pressable>
					<Pressable className="mt-2 rounded-full border border-mum-purpleSoft/40 px-6 py-3 active:opacity-90">
						<Text className="text-center font-bold text-mum-purpleDeep">
							Copy Invite Link
						</Text>
					</Pressable>
					<Link href="/partnerf" asChild>
						<Pressable className="mt-2 rounded-full border border-mum-purpleDeep/30 bg-white/70 px-6 py-3 active:opacity-90">
							<Text className="text-center font-bold text-mum-purpleDeep">
								Go to Father Page
							</Text>
						</Pressable>
					</Link>
					<View className="mt-4 flex-row items-center gap-2">
						<Ionicons
							name="checkmark-circle"
							size={16}
							color="#6E3F9C"
						/>
						<Text className="text-xs text-mum-ink/50">
							Once accepted, your partner gets their support dashboard.
						</Text>
					</View>
				</LinearGradient>

				<View className="mb-8 rounded-[32px] bg-white p-6 border border-mum-petal shadow-sm">
					<Text className="text-lg font-bold text-mum-ink">
						Need a hand?
					</Text>
					<Text className="text-sm text-mum-ink/50 mb-4">
						Request a task to be added to his list.
					</Text>

					<View className="flex-row gap-2 flex-wrap">
						<QuickRequestChip label="Nap time" icon="moon" />
						<QuickRequestChip
							label="Diaper restock"
							icon="archive"
						/>
						<QuickRequestChip label="Meal prep" icon="restaurant" />
						<Pressable className="h-10 items-center justify-center rounded-2xl bg-mum-mist px-4 border border-mum-purpleSoft/30">
							<Text className="text-xs font-bold text-mum-purpleDeep">
								+ Custom
							</Text>
						</Pressable>
					</View>
				</View>

				<View className="flex-row items-center justify-between mb-4 px-1">
					<Text className="text-sm font-bold uppercase tracking-widest text-mum-ink/40">
						His Tasks Tonight
					</Text>
					<View className="rounded-full bg-mum-purpleSoft/20 px-3 py-1">
						<Text className="text-[10px] font-bold text-mum-purpleDeep uppercase">
							Real-time sync
						</Text>
					</View>
				</View>

				{partnerTasks.map((task, index) => (
					<TaskItem key={index} task={task} />
				))}

				<View className="mt-6 items-center px-4">
					<Ionicons name="heart" size={24} color="#db2777" />
					<Text className="mt-2 text-center text-xs italic text-mum-ink/40 leading-5">
						"Coming together is a beginning; keeping together is
						progress; working together is success."
					</Text>
				</View>
			</ScrollView>
			<AnimatedBreathingButton />
		</View>
	)
}

function QuickRequestChip({ label, icon }: { label: string; icon: any }) {
	return (
		<Pressable className="flex-row items-center gap-2 rounded-2xl bg-mum-purpleSoft/10 border border-mum-purpleSoft/20 px-4 py-2 active:scale-95">
			<Ionicons name={icon} size={14} color="#6E3F9C" />
			<Text className="text-xs font-bold text-mum-purpleDeep">
				{label}
			</Text>
		</Pressable>
	)
}
