import { HubLinkRow } from "@/components/HubLinkRow"
import { ScrollView, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function CareHubScreen() {
	const insets = useSafeAreaInsets()

	return (
		<View className="flex-1 bg-mum-bg" style={{ paddingTop: insets.top + 8 }}>
			<Text className="px-5 pb-2 text-2xl font-bold text-mum-ink">Care</Text>
			<Text className="px-5 pb-4 text-sm leading-5 text-mum-ink/65">
				Baby care, your body, and milk — open one section at a time.
			</Text>
			<ScrollView
				className="flex-1 px-4"
				contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
				showsVerticalScrollIndicator={false}
			>
				<Text className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-mum-ink/45">
					Baby & body
				</Text>
				<HubLinkRow
					href="/remedies"
					title="Baby remedies"
					subtitle="Three quick tips for colic, teething, and rash"
					icon="medkit"
				/>
				<HubLinkRow
					href="/exercises"
					title="2‑minute exercises"
					subtitle="Postnatal‑safe movement clips"
					icon="fitness"
				/>
				<HubLinkRow
					href="/breathing"
					title="Breathing bubble"
					subtitle="Ten seconds to reset"
					icon="radio-button-on"
				/>

				<Text className="mb-2 mt-6 px-1 text-xs font-semibold uppercase tracking-wide text-mum-ink/45">
					Feeding
				</Text>
				<HubLinkRow
					href="/milk"
					title="Milk support"
					subtitle="Donate or find donor milk"
					icon="water"
				/>
			</ScrollView>
		</View>
	)
}
