import { Ionicons } from "@expo/vector-icons"
import { Alert, Pressable, Text, View } from "react-native"

export const options = {
	title: "Emergency",
	headerStyle: { backgroundColor: "#fff1f2" },
}

export default function EmergencyScreen() {
	function sendEmergency() {
		Alert.alert(
			"Emergency sent (demo)",
			"In production: SMS with pre-written text + Google Maps link goes to your support person and OB/midwife. Optional push to crisis line.",
		)
	}

	return (
		<View className="flex-1 items-center justify-center bg-rose-50 px-6">
			<Text className="mb-6 text-center text-sm leading-5 text-rose-950/90">
				No extra confirmation — designed for speed. Location and saved contacts must be configured under
				Settings.
			</Text>
			<Pressable
				onPress={sendEmergency}
				className="h-52 w-52 items-center justify-center rounded-full bg-rose-600 shadow-2xl shadow-rose-900/40 active:opacity-90"
			>
				<Ionicons name="warning" size={48} color="white" />
				<Text className="mt-2 text-center text-lg font-bold text-white">Emergency</Text>
			</Pressable>
			<Text className="mt-8 text-center text-xs leading-5 text-rose-900/75">
				Silent SMS template: “MumAid emergency: [Name] needs help. Live location: [Maps link]”
			</Text>
		</View>
	)
}
