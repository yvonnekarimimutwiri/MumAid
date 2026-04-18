import { Ionicons } from "@expo/vector-icons"
import { Link, type Href } from "expo-router"
import { Pressable, Text, View } from "react-native"

const PURPLE = "#B57EDC"

type Props = {
	href: Href
	title: string
	subtitle?: string
	icon: keyof typeof Ionicons.glyphMap
	variant?: "default" | "danger"
}

export function HubLinkRow({ href, title, subtitle, icon, variant = "default" }: Props) {
	const border =
		variant === "danger" ? "border-rose-200 bg-rose-50/80" : "border-pink-100 bg-white"

	const iconBg = variant === "danger" ? "bg-rose-100" : "bg-[#f3e8ff]"

	return (
		<Link href={href} asChild>
			<Pressable
				className={`mb-3 flex-row items-center gap-4 rounded-2xl border px-4 py-4 shadow-sm shadow-purple-900/5 active:opacity-90 ${border}`}
			>
				<View className={`rounded-2xl p-3 ${iconBg}`}>
					<Ionicons name={icon} size={24} color={variant === "danger" ? "#be185d" : PURPLE} />
				</View>
				<View className="min-w-0 flex-1">
					<Text className="text-base font-semibold text-mum-ink">{title}</Text>
					{subtitle ? (
						<Text className="mt-0.5 text-sm leading-5 text-mum-ink/65">{subtitle}</Text>
					) : null}
				</View>
				<Ionicons name="chevron-forward" size={20} color={PURPLE} />
			</Pressable>
		</Link>
	)
}
