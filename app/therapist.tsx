import { therapists } from "@/lib/content"
import { Ionicons } from "@expo/vector-icons"
import { Linking, Pressable, ScrollView, Text, View } from "react-native"

export const options = { title: "Therapist" }

export default function TherapistScreen() {
	return (
		<ScrollView
			className="flex-1 bg-mum-bg px-4 pb-8 pt-2"
			showsVerticalScrollIndicator={false}
		>
			<Text className="mb-4 text-sm leading-5 text-mum-ink/80">
				Licensed perinatal therapists with verified credentials. Callback and secure messaging connect here in
				production.
			</Text>
			{therapists.map((t) => (
				<View
					key={t.id}
					className="mb-4 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm shadow-purple-900/5"
				>
					<Text className="text-lg font-semibold text-mum-ink">{t.name}</Text>
					<Text className="mt-1 text-sm text-mum-ink/70">{t.license}</Text>
					<Text className="mt-2 text-sm font-medium" style={{ color: "#B57EDC" }}>
						{t.wait}
					</Text>
					<View className="mt-4 flex-row gap-2">
						<Pressable
							onPress={() => Linking.openURL("tel:+15555550100")}
							className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-mum-purpleDeep py-3 active:opacity-90"
						>
							<Ionicons name="call" size={18} color="white" />
							<Text className="font-semibold text-white">Request call</Text>
						</Pressable>
						<Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-mum-purple/25 bg-white py-3 active:opacity-90">
							<Ionicons name="chatbubble-ellipses" size={18} color="#B57EDC" />
							<Text className="font-semibold text-mum-ink/90">Message</Text>
						</Pressable>
					</View>
				</View>
			))}
		</ScrollView>
	)
}
