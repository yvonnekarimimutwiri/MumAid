import { Ionicons } from "@expo/vector-icons"
import { ScrollView, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const tasks = [
	"Take the night feed so mom can sleep 4 hours straight.",
	"Hold the baby so she can shower without rushing.",
	"Prep bottles / pump parts before bedtime.",
	"Handle dishes tonight — she did every daytime feed.",
]

export default function PartnerTabScreen() {
	const insets = useSafeAreaInsets()

	return (
		<View className="flex-1 bg-mum-bg" style={{ paddingTop: insets.top + 8 }}>
			<Text className="px-5 pb-2 text-2xl font-bold text-mum-ink">Partner</Text>
			<Text className="px-5 pb-4 text-sm leading-5 text-mum-ink/65">
				Shared account tasks and reminders — wire up invites later.
			</Text>
			<ScrollView
				className="flex-1 px-4"
				contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
				showsVerticalScrollIndicator={false}
			>
				<View className="mb-4 rounded-2xl border border-pink-200 bg-white p-4 shadow-sm">
					<Text className="text-xs font-semibold uppercase tracking-wide text-pink-600">Baby age</Text>
					<Text className="mt-2 text-2xl font-semibold text-mum-ink">Date spinner · 12 weeks</Text>
					<Text className="mt-1 text-sm text-mum-ink/70">Connect due date / birth date</Text>
				</View>

				<Text className="mb-2 text-sm font-semibold text-mum-ink">How to help</Text>
				{tasks.map((t) => (
					<View
						key={t}
						className="mb-2 flex-row gap-3 rounded-2xl border border-pink-100 bg-white p-3"
					>
						<Ionicons name="checkmark-circle" size={22} color="#B57EDC" />
						<Text className="flex-1 text-[15px] leading-6 text-mum-ink/90">{t}</Text>
					</View>
				))}
			</ScrollView>
		</View>
	)
}
