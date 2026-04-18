import { Ionicons } from "@expo/vector-icons"
import { Link, type Href } from "expo-router"
import { Pressable, Text, View } from "react-native"

const PURPLE = "#B57EDC"

type Props = {
	href: Href
	label: string
	icon: keyof typeof Ionicons.glyphMap
	accent: "rose" | "fuchsia" | "violet"
}

const accents = {
	rose: "border-pink-100 bg-white",
	fuchsia: "border-pink-100 bg-white",
	violet: "border-pink-100 bg-white",
}

export function QuickInsightCard({ href, label, icon, accent }: Props) {
	return (
		<Link href={href} asChild>
			<Pressable
				className={`mr-3 w-[148] rounded-2xl border-2 px-3 py-4 shadow-sm shadow-purple-900/5 active:opacity-90 ${accents[accent]}`}
			>
				<View className="mb-3 h-12 w-12 items-center justify-center self-center rounded-full bg-[#f3e8ff]">
					<Ionicons name={icon} size={26} color={PURPLE} />
				</View>
				<Text className="text-center text-[13px] font-semibold leading-snug text-mum-ink">{label}</Text>
			</Pressable>
		</Link>
	)
}
