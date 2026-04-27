import { Ionicons } from "@expo/vector-icons"
import { Link, type Href } from "expo-router"
import { Pressable, Text, View } from "react-native"

const PURPLE = "#B57EDC"

type Props = {
	href: Href
	title: string
	subtitle?: string
	icon: keyof typeof Ionicons.glyphMap
	variant?: "default" | "danger" | "remedies"
}

export function HubLinkRow({
	href,
	title,
	subtitle,
	icon,
	variant = "default",
}: Props) {
	const border =
		variant === "danger"
			? "border-rose-100 bg-rose-50/50"
			: variant === "remedies"
				? "border-[#FEE2E2] bg-[#FEE2E2]"
				: "border-slate-100 bg-white"
	const iconBg = variant === "danger" ? "bg-rose-100" : "bg-fuchsia-50"
	const iconColor =
		variant === "danger"
			? "#E11D48"
			: variant === "remedies"
				? "#EF4444"
				: "#6E3F9C"

	return (
		<Link href={href} asChild>
			<Pressable
				className={`mb-4 flex-row items-center gap-4 rounded-[24px] border px-5 py-5 shadow-sm shadow-purple-900/5 active:scale-[0.99] ${border}`}
			>
				<View className={`rounded-xl p-3 ${iconBg}`}>
					<Ionicons name={icon} size={24} color={iconColor} />
				</View>
				<View className="min-w-0 flex-1">
					<Text className="text-lg font-bold text-[#2D1643]">
						{title}
					</Text>
					{subtitle && (
						<Text className="mt-0.5 text-sm leading-5 text-[#2D1643]/50">
							{subtitle}
						</Text>
					)}
				</View>
				<Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
			</Pressable>
		</Link>
	)
}