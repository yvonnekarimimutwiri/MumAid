import { Ionicons } from "@expo/vector-icons"
import { ScrollView, Text, View, Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { TaskItem } from "@/components/TaskItem"

const tasks = [
	"Take the night feed so mom can sleep 4 hours straight.",
	"Hold the baby so she can shower without rushing.",
	"Prep bottles / pump parts before bedtime.",
	"Handle dishes tonight — she did every daytime feed.",
]

export default function PartnerTabScreen() {
	const insets = useSafeAreaInsets()

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
								12 Weeks
							</Text>
							<Text className="mt-1 text-sm font-medium text-mum-ink/50">
								3 months · Growth spurt expected
							</Text>
						</View>
						<View className="h-14 w-14 items-center justify-center rounded-2xl bg-white/40">
							<Ionicons
								name="calendar"
								size={28}
								color="#db2777"
							/>
						</View>
					</View>
				</LinearGradient>

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
