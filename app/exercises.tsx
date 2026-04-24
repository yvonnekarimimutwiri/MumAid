import { SearchBar } from "@/components/SearchBar"
import { exerciseClips } from "@/lib/content"
import { Ionicons } from "@expo/vector-icons"
import { useMemo, useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

export const options = { title: "Exercises" }

function exerciseMatchesQuery(
	clip: (typeof exerciseClips)[number],
	query: string,
): boolean {
	const q = query.trim().toLowerCase()
	if (!q) return true
	const blob = [clip.title, clip.focus, clip.note].join(" ").toLowerCase()
	return blob.includes(q)
}

export default function ExercisesScreen() {
	const [query, setQuery] = useState("")
	const filtered = useMemo(
		() => exerciseClips.filter((clip) => exerciseMatchesQuery(clip, query)),
		[query],
	)

	return (
		<ScrollView
			className="flex-1 bg-mum-bg px-4 pb-8 pt-2"
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
		>
			<Text className="mb-4 text-sm leading-5 text-mum-ink/80">
				Short loops you can finish between feeds. Placeholder tiles — plug in video or GIF assets later.
			</Text>
			<SearchBar
				value={query}
				onChangeText={setQuery}
				placeholder="Search exercises…"
			/>
			{filtered.length === 0 ? (
				<Text className="text-center text-sm text-mum-ink/60">No exercises match your search.</Text>
			) : null}
			{filtered.map((clip) => (
				<Pressable
					key={clip.id}
					className="mb-3 flex-row items-center gap-4 rounded-2xl border border-fuchsia-200/90 bg-white p-4 shadow-sm active:opacity-90"
				>
					<View className="h-16 w-16 items-center justify-center rounded-2xl bg-fuchsia-100">
						<Ionicons name="play-circle" size={40} color="#a21caf" />
					</View>
					<View className="flex-1">
						<Text className="text-base font-semibold text-mum-ink">{clip.title}</Text>
						<Text className="mt-0.5 text-xs font-medium uppercase tracking-wide text-fuchsia-700">
							{clip.focus}
						</Text>
						<Text className="mt-1 text-xs leading-5 text-mum-ink/70">{clip.note}</Text>
					</View>
				</Pressable>
			))}
		</ScrollView>
	)
}
