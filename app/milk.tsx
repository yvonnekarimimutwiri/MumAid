import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Pressable, ScrollView, Text, View } from "react-native"

export const options = { title: "Milk Support" }

export default function MilkScreen() {
	const router = useRouter()
	
	return (
		<ScrollView
			className="flex-1 bg-mum-bg px-4 pb-8 pt-2"
			showsVerticalScrollIndicator={false}
		>
			<View className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
				<Text className="text-sm font-semibold text-amber-950">
					Disclaimer
				</Text>
				<Text className="mt-2 text-sm leading-5 text-amber-950/90">
					MumAid does not provide medical advice or screen donor milk.
					Verify storage, handling, and health history with a
					professional. Meet in safe, public places for exchanges.
				</Text>
			</View>

			<Pressable
				onPress={() =>
					router.push({
						pathname: "/milk-map",
						params: { mode: "DONATE" },
					})
				}
				className="mb-3 flex-row items-center gap-3 rounded-2xl border border-fuchsia-200 bg-white p-4 shadow-sm active:opacity-90"
			>
				<View className="rounded-2xl bg-fuchsia-100 p-3">
					<Ionicons name="heart" size={28} color="#be185d" />
				</View>
				<View className="flex-1">
					<Text className="text-base font-semibold text-mum-ink">
						Donate milk
					</Text>
					<Text className="mt-1 text-sm text-mum-ink/85">
						Post availability & general location
					</Text>
				</View>
				<Ionicons name="chevron-forward" size={20} color="#B57EDC" />
			</Pressable>

			<Pressable
				onPress={() =>
					router.push({
						pathname: "/milk-map",
						params: { mode: "BUY" },
					})
				}
				className="mb-3 flex-row items-center gap-3 rounded-2xl border border-fuchsia-200 bg-white p-4 shadow-sm active:opacity-90"
			>
				<View className="rounded-2xl bg-mum-purple/12 p-3">
					<Ionicons name="search" size={28} color="#B57EDC" />
				</View>
				<View className="flex-1">
					<Text className="text-base font-semibold text-mum-ink">
						Find milk nearby
					</Text>
					<Text className="mt-1 text-sm text-mum-ink/85">
						Search donors by distance (backend TBD)
					</Text>
				</View>
				<Ionicons name="chevron-forward" size={20} color="#B57EDC" />
			</Pressable>

			<View className="rounded-2xl border border-mum-purple/25 bg-white p-4">
				<Text className="text-sm font-semibold text-mum-ink">
					Safety tips
				</Text>
				<Text className="mt-2 text-sm leading-5 text-mum-ink/80">
					Use sterile containers, label dates, transport with ice
					packs, and never pay under pressure. When unsure, ask your
					care team.
				</Text>
			</View>
		</ScrollView>
	)
}
