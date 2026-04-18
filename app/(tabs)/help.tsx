import { HubLinkRow } from "@/components/HubLinkRow"
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
import { Pressable, ScrollView, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function HelpHubScreen() {
	const insets = useSafeAreaInsets()

	return (
		<View className="flex-1 bg-mum-bg" style={{ paddingTop: insets.top + 8 }}>
			<Text className="px-5 pb-2 text-2xl font-bold text-mum-ink">Help</Text>
			<Text className="px-5 pb-4 text-sm leading-5 text-mum-ink/65">
				Healthcare contacts, crisis lines, and professional support.
			</Text>
			<ScrollView
				className="flex-1 px-4"
				contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
				showsVerticalScrollIndicator={false}
			>
				<Link href="/emergency" asChild>
					<Pressable className="mb-4 flex-row items-center gap-4 rounded-2xl border-2 border-rose-300 bg-rose-50 px-4 py-5 active:opacity-90">
						<View className="rounded-2xl bg-rose-100 p-3">
							<Ionicons name="warning" size={28} color="#be185d" />
						</View>
						<View className="flex-1">
							<Text className="text-lg font-bold text-rose-950">Emergency</Text>
							<Text className="mt-1 text-sm text-rose-900/80">Silent alert + your location</Text>
						</View>
						<Ionicons name="chevron-forward" size={22} color="#be185d" />
					</Pressable>
				</Link>

				<HubLinkRow
					href="/healthcare"
					title="Healthcare & ER"
					subtitle="OB, crisis text, nearest ER"
					icon="medical"
				/>
				<HubLinkRow
					href="/call-support"
					title="Call support person"
					subtitle="Someone you trust"
					icon="call"
				/>
				<HubLinkRow
					href="/therapist"
					title="Perinatal therapist"
					subtitle="Licensed · call or message"
					icon="chatbubbles"
				/>
				<HubLinkRow
					href="/opportunities"
					title="Opportunities"
					subtitle="Programs, supplies, and aid"
					icon="sparkles"
				/>

				<Text className="mb-2 mt-8 px-1 text-xs font-semibold uppercase tracking-wide text-mum-ink/45">
					App
				</Text>
				<HubLinkRow
					href="/settings"
					title="Settings"
					subtitle="Contacts, lock, partner link"
					icon="settings-outline"
				/>
				<Link href="/admin" asChild>
					<Pressable className="mt-2 rounded-2xl border border-dashed border-pink-200 bg-white px-4 py-3 active:opacity-90">
						<Text className="text-center text-xs font-medium text-mum-ink/55">Admin · opportunities</Text>
					</Pressable>
				</Link>
			</ScrollView>
		</View>
	)
}
