import { opportunities } from "@/lib/content"
import { Ionicons } from "@expo/vector-icons"
import { Alert, Pressable, ScrollView, Text, View } from "react-native"

export const options = { title: "Opportunities" }

export default function OpportunitiesScreen() {
	return (
		<ScrollView
			className="flex-1 bg-mum-bg px-4 pb-8 pt-2"
			showsVerticalScrollIndicator={false}
		>
			<Text className="mb-4 text-sm leading-5 text-mum-ink/80">
				Time-sensitive programs and aid — newest first. Deadlines auto-hide after the date in production.
			</Text>
			{opportunities.map((o) => (
				<View
					key={o.id}
					className="mb-4 rounded-2xl border border-fuchsia-200 bg-white p-4 shadow-sm shadow-fuchsia-900/5"
				>
					<Text className="text-lg font-semibold text-mum-ink">{o.title}</Text>
					<Text className="mt-2 text-sm leading-5 text-mum-ink/80">{o.description}</Text>
					<View className="mt-3 flex-row flex-wrap gap-x-4 gap-y-1">
						<View className="flex-row items-center gap-1">
							<Ionicons name="calendar-outline" size={16} color="#a21caf" />
							<Text className="text-xs font-medium text-fuchsia-900">{o.deadline}</Text>
						</View>
						<View className="flex-row items-center gap-1">
							<Ionicons name="location-outline" size={16} color="#B57EDC" />
							<Text className="text-xs text-mum-ink/80">{o.location}</Text>
						</View>
					</View>
					<Pressable
						onPress={() =>
							Alert.alert(
								"Interest sent",
								"Admin would receive your user ID and contact preference (wire to backend).",
							)
						}
						className="mt-4 self-start rounded-full bg-mum-purpleDeep px-5 py-2.5 active:opacity-90"
					>
						<Text className="font-semibold text-white">I’m interested</Text>
					</Pressable>
				</View>
			))}
		</ScrollView>
	)
}
