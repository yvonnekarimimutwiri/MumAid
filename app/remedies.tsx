import { remedyCards } from "@/lib/content"
import { ScrollView, Text, View } from "react-native"

export const options = { title: "Baby Remedies" }

export default function RemediesScreen() {
	return (
		<ScrollView
			className="flex-1 bg-mum-bg px-4 pb-8 pt-2"
			showsVerticalScrollIndicator={false}
		>
			<Text className="mb-4 text-sm leading-5 text-mum-ink/80">
				One tap per topic — three practical steps you can try now. When in doubt, call your pediatrician.
			</Text>
			{remedyCards.map((card) => (
				<View
					key={card.id}
					className="mb-4 rounded-2xl border border-fuchsia-200/90 bg-white p-4 shadow-sm shadow-fuchsia-900/5"
				>
					<Text className="text-lg font-semibold text-mum-ink">{card.title}</Text>
					<View className="mt-3 gap-2">
						{card.tips.map((tip, i) => (
							<View key={tip} className="flex-row gap-2">
								<Text className="mt-0.5 text-fuchsia-600">{i + 1}.</Text>
								<Text className="flex-1 text-[15px] leading-6 text-mum-ink/90">{tip}</Text>
							</View>
						))}
					</View>
				</View>
			))}
		</ScrollView>
	)
}
