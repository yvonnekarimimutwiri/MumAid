import { Ionicons } from "@expo/vector-icons"
import { Linking, Pressable, ScrollView, Text, View } from "react-native"

export const options = { title: "Healthcare" }

export default function HealthcareScreen() {
	return (
		<ScrollView
			className="flex-1 bg-mum-bg px-4 pb-8 pt-2"
			showsVerticalScrollIndicator={false}
		>
			<Text className="mb-4 text-sm leading-5 text-mum-ink/80">
				One-tap access to your saved OB or midwife, crisis lines, and ER lookup — save contacts in Settings.
			</Text>

			<Pressable
				onPress={() => Linking.openURL("tel:+15555550123")}
				className="mb-3 flex-row items-center gap-3 rounded-2xl border border-fuchsia-200 bg-white p-4 shadow-sm active:opacity-90"
			>
				<View className="rounded-2xl bg-fuchsia-100 p-3">
					<Ionicons name="person" size={26} color="#a21caf" />
				</View>
				<View className="flex-1">
					<Text className="text-base font-semibold text-mum-ink">Call OB / midwife</Text>
					<Text className="mt-1 text-sm text-mum-ink/70">Placeholder number — set in Settings</Text>
				</View>
				<Ionicons name="call" size={22} color="#B57EDC" />
			</Pressable>

			<Pressable
				onPress={() => Linking.openURL("sms:+15555550123")}
				className="mb-3 flex-row items-center gap-3 rounded-2xl border border-fuchsia-200 bg-white p-4 shadow-sm active:opacity-90"
			>
				<View className="rounded-2xl bg-mum-purple/12 p-3">
					<Ionicons name="chatbox-ellipses" size={26} color="#B57EDC" />
				</View>
				<View className="flex-1">
					<Text className="text-base font-semibold text-mum-ink">Text OB / midwife</Text>
					<Text className="mt-1 text-sm text-mum-ink/70">Opens SMS with saved contact</Text>
				</View>
			</Pressable>

			<Pressable
				onPress={() => Linking.openURL("sms:741741")}
				className="mb-3 flex-row items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 active:opacity-90"
			>
				<View className="rounded-2xl bg-rose-100 p-3">
					<Ionicons name="heart-dislike" size={26} color="#be123c" />
				</View>
				<View className="flex-1">
					<Text className="text-base font-semibold text-rose-950">Crisis text line</Text>
					<Text className="mt-1 text-sm text-rose-900/80">Example: US Crisis Text (configure region)</Text>
				</View>
			</Pressable>

			<View className="rounded-2xl border border-mum-purple/25 bg-white p-4">
				<Text className="text-sm font-semibold text-mum-ink">Nearest ER</Text>
				<Text className="mt-2 text-sm leading-5 text-mum-ink/80">
					Filters: maternal mental health crisis + baby emergencies (breathing, high fever, falls). Wire to maps
					API with your facility list.
				</Text>
				<Pressable
					onPress={() =>
						Linking.openURL("https://www.google.com/maps/search/?api=1&query=emergency+room+near+me")
					}
					className="mt-3 self-start rounded-full bg-mum-purpleDeep px-4 py-2 active:opacity-90"
				>
					<Text className="font-semibold text-white">Open map search</Text>
				</Pressable>
			</View>
		</ScrollView>
	)
}
