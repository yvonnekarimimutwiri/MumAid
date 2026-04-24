import { Ionicons } from "@expo/vector-icons"
import { Linking, Pressable, Text, View } from "react-native"

export const options = { title: "Call-Support" }

export default function CallSupportScreen() {
	return (
		<View className="flex-1 justify-center bg-mum-bg px-6">
			<Text className="mb-6 text-center text-sm leading-5 text-mum-ink/80">
				Your pre-saved contact (partner, friend, family) from Settings. One tap places the call.
			</Text>
			<Pressable
				onPress={() => Linking.openURL("tel:+15555550999")}
				className="flex-row items-center justify-center gap-3 rounded-3xl bg-fuchsia-500 py-5 shadow-lg shadow-fuchsia-900/25 active:opacity-90"
			>
				<Ionicons name="call" size={28} color="white" />
				<Text className="text-xl font-bold text-white">Call support person</Text>
			</Pressable>
			<Text className="mt-4 text-center text-xs text-mum-ink/70">Placeholder number — configure in Settings</Text>
		</View>
	)
}
