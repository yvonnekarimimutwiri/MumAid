import { HubLinkRow } from "@/components/HubLinkRow"
import { ScrollView, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Link } from "expo-router"
import { Pressable } from "react-native"

export default function CareHubScreen() {
	const insets = useSafeAreaInsets()

	return (
		<View
			className="flex-1 bg-mum-bg"
			style={{ paddingTop: insets.top + 8 }}
		>
			<Text className="px-5 pb-2 text-2xl font-bold text-mum-ink">
				Care
			</Text>

			<ScrollView
				className="flex-1 px-4"
				contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
				showsVerticalScrollIndicator={false}
			>
				<View className="mb-6 mt-2">
					<HubLinkRow
						href="/breathing"
						title="Breathing bubble"
						subtitle="Ten seconds to reset your system"
						icon="radio-button-on"
					/>
				</View>

				<Text className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-mum-ink/45">
					Baby & body
				</Text>
				<HubLinkRow
					href="/remedies"
					title="Baby remedies"
					subtitle="Solutions for colic, teething, and rash"
					icon="medkit"
				/>
				<HubLinkRow
					href="/exercises"
					title="2‑minute exercises"
					subtitle="Postnatal‑safe movements"
					icon="fitness"
				/>
				<HubLinkRow
					href="/tips"
					title="Video Tips"
					subtitle="Watch quick 15s clips from other mums"
					icon="play-circle"
				/>

				<Text className="mb-2 mt-8 px-1 text-xs font-semibold uppercase tracking-wide text-mum-ink/45">
					Feeding
				</Text>
				<HubLinkRow
					href="/milk"
					title="Milk support"
					subtitle="Donate or find donor milk"
					icon="water"
				/>

				<View className="mt-3 rounded-xl bg-slate-50 p-4 border border-slate-100">
					<Text className="text-[11px] leading-4 text-slate-500">
						<Text className="font-bold text-slate-700">
							Medical Disclaimer:
						</Text>{" "}
						MumAid provides a platform for connection. We do not
						screen donors or milk. Please consult a professional
						regarding safety and screening before use.
					</Text>
				</View>

				<View className="mt-20 opacity-40">
					<Link href="/admin" asChild>
						<Pressable className="py-4">
							<Text className="text-center text-xs font-medium text-mum-ink">
								Admin Dashboard
							</Text>
						</Pressable>
					</Link>
				</View>
			</ScrollView>
		</View>
	)
}
