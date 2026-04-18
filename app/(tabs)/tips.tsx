import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
import { Pressable, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function TipsHubScreen() {
	const insets = useSafeAreaInsets()

	return (
		<View className="flex-1 bg-mum-bg" style={{ paddingTop: insets.top + 8 }}>
			<Text className="px-5 text-2xl font-bold text-mum-ink">Mum tips</Text>
			<Text className="mt-2 px-5 text-sm leading-5 text-mum-ink/65">
				Short vertical videos — sleep, soothing, pumping, and more. Full screen when you’re ready.
			</Text>

			<View className="flex-1 items-center justify-center px-8 pb-24">
				<View className="mb-8 h-40 w-40 items-center justify-center rounded-full border-4 border-[#e9d5ff] bg-white">
					<Ionicons name="phone-portrait-outline" size={72} color="#B57EDC" />
				</View>
				<Link href="/feed" asChild>
					<Pressable
						className="w-full max-w-sm rounded-2xl py-4 shadow-lg shadow-purple-900/15 active:opacity-90"
						style={{ backgroundColor: "#6E3F9C" }}
					>
						<Text className="text-center text-lg font-bold text-white">Open tips feed</Text>
					</Pressable>
				</Link>
				<Text className="mt-6 text-center text-xs leading-5 text-mum-ink/50">
					Moderation and reporting are available on each clip.
				</Text>
			</View>
		</View>
	)
}
