import { SearchBar } from "@/components/SearchBar"
import { remedyCards } from "@/lib/content"
import { useMemo, useState } from "react"
import { ScrollView, Text, View } from "react-native"

export const options = { title: "Remedies" }

function remedyMatchesQuery(
	card: (typeof remedyCards)[number],
	query: string,
): boolean {
	const q = query.trim().toLowerCase()
	if (!q) return true
	const blob = [card.title, ...card.tips].join(" ").toLowerCase()
	return blob.includes(q)
}

export default function RemediesScreen() {
	const [query, setQuery] = useState("")
	const filtered = useMemo(
		() => remedyCards.filter((card) => remedyMatchesQuery(card, query)),
		[query],
	)

	return (
		<ScrollView
			className="flex-1 bg-mum-bg px-4 pb-8 pt-2"
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
		>
			<Text className="mb-4 text-sm leading-5 text-mum-ink/80">
				One tap per topic — three practical steps you can try now. When in doubt, call your pediatrician.
			</Text>
			<SearchBar
				value={query}
				onChangeText={setQuery}
				placeholder="Search remedies…"
			/>
			{filtered.length === 0 ? (
				<Text className="text-center text-sm text-mum-ink/60">No remedies match your search.</Text>
			) : null}
			{filtered.map((card) => (
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
