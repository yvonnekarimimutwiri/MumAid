import { HubLinkRow } from "@/components/HubLinkRow"
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
import { Pressable, ScrollView, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function HelpHubScreen() {
	const insets = useSafeAreaInsets()

	return (
		<View
			className="flex-1 bg-mum-bg"
			style={{ paddingTop: insets.top + 8 }}
		>
			<Text className="px-5 pb-2 text-2xl font-bold text-mum-ink">
				Help
			</Text>
			<Text className="px-5 pb-4 text-sm leading-5 text-mum-ink/65">
				Healthcare contacts, crisis lines, and professional support.
			</Text>
			<ScrollView
				className="flex-1 px-4"
				contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
				showsVerticalScrollIndicator={false}
			>
				<Link href="/emergency" asChild>
					<Pressable className="mb-6 flex-row items-center gap-4 rounded-[28px] border-b-4 border-rose-300 bg-rose-50 px-5 py-6 active:translate-y-1 active:border-b-0">
						<View className="rounded-2xl bg-rose-200 p-4">
							<Ionicons
								name="warning"
								size={32}
								color="#be185d"
							/>
						</View>
						<View className="flex-1">
							<Text className="text-xl font-black text-rose-950">
								EMERGENCY
							</Text>
							<Text className="text-sm font-medium text-rose-800/80">
								Tap to alert your support team
							</Text>
						</View>
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
						<Text className="text-center text-xs font-medium text-mum-ink/55">
							Admin · opportunities
						</Text>
					</Pressable>
				</Link>
			</ScrollView>
		</View>
	)
}
