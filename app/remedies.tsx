import { SearchBar } from "@/components/SearchBar"
import { remedyCards, type RemedyCategory } from "@/lib/content"
import { useLocalSearchParams } from "expo-router"
import { useMemo, useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

export const options = { title: "Remedies" }

function remedyMatchesQuery(
	card: (typeof remedyCards)[number],
	query: string,
): boolean {
	const q = query.trim().toLowerCase()
	if (!q) return true
	const blob = [card.title, card.category, ...card.tips]
		.join(" ")
		.toLowerCase()
	return blob.includes(q)
}

export default function RemediesScreen() {
	const params = useLocalSearchParams<{ focus?: string }>()
	const initialFocus: RemedyCategory | "all" =
		params.focus === "mum" || params.focus === "baby"
			? params.focus
			: "all"
	const [query, setQuery] = useState("")
	const [focus, setFocus] = useState<RemedyCategory | "all">(initialFocus)

	const filtered = useMemo(
		() =>
			remedyCards.filter((card) => {
				if (focus !== "all" && card.category !== focus) return false
				return remedyMatchesQuery(card, query)
			}),
		[query, focus],
	)

	const mumCards = filtered.filter((card) => card.category === "mum")
	const babyCards = filtered.filter((card) => card.category === "baby")

	return (
		<ScrollView
			className="flex-1 bg-mum-bg px-4 pb-8 pt-2"
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
		>
			<Text className="mb-4 text-sm leading-5 text-mum-ink/80">
				Practical steps for mum recovery and baby care. When in doubt,
				call your doctor or pediatrician.
			</Text>

			<View className="mb-4 flex-row gap-2">
				{(
					[
						{ id: "all", label: "All" },
						{ id: "mum", label: "Mum" },
						{ id: "baby", label: "Baby" },
					] as const
				).map((tab) => (
					<Pressable
						key={tab.id}
						onPress={() => setFocus(tab.id)}
						className={`rounded-full px-4 py-2 ${
							focus === tab.id
								? "bg-mum-purpleDeep"
								: "border border-fuchsia-200 bg-white"
						}`}
					>
						<Text
							className={`text-xs font-semibold ${
								focus === tab.id
									? "text-white"
									: "text-mum-purpleDeep"
							}`}
						>
							{tab.label}
						</Text>
					</Pressable>
				))}
			</View>

			<SearchBar
				value={query}
				onChangeText={setQuery}
				placeholder="Search remedies…"
			/>
			{filtered.length === 0 ? (
				<Text className="text-center text-sm text-mum-ink/60">
					No remedies match your search.
				</Text>
			) : null}

			{(focus === "all" || focus === "mum") && mumCards.length > 0 ? (
				<>
					<Text className="mb-2 mt-2 text-xs font-bold uppercase tracking-widest text-mum-ink/40">
						Mum · after birth & body changes
					</Text>
					{mumCards.map((card) => (
						<RemedyCard key={card.id} card={card} />
					))}
				</>
			) : null}

			{(focus === "all" || focus === "baby") && babyCards.length > 0 ? (
				<>
					<Text className="mb-2 mt-4 text-xs font-bold uppercase tracking-widest text-mum-ink/40">
						Baby
					</Text>
					{babyCards.map((card) => (
						<RemedyCard key={card.id} card={card} />
					))}
				</>
			) : null}
		</ScrollView>
	)
}

function RemedyCard({
	card,
}: {
	card: (typeof remedyCards)[number]
}) {
	return (
		<View className="mb-4 rounded-2xl border border-fuchsia-200/90 bg-white p-4 shadow-sm shadow-fuchsia-900/5">
			<Text className="text-lg font-semibold text-mum-ink">
				{card.title}
			</Text>
			<View className="mt-3 gap-2">
				{card.tips.map((tip, i) => (
					<View key={tip} className="flex-row gap-2">
						<Text className="mt-0.5 text-fuchsia-600">{i + 1}.</Text>
						<Text className="flex-1 text-[15px] leading-6 text-mum-ink/90">
							{tip}
						</Text>
					</View>
				))}
			</View>
		</View>
	)
}
