import { Ionicons } from "@expo/vector-icons"
import { Pressable, Text, View } from "react-native"

export default function RoleCard({
	title,
	icon,
	selected,
	onPress,
}: {
	title: string
	icon: any
	selected: boolean
	onPress: () => void
}) {
	return (
		<Pressable
			onPress={onPress}
			className={`flex-1 items-center justify-center p-6 rounded-3xl border-2 transition-all ${
				selected
					? "bg-fuchsia-50 border-fuchsia-500 shadow-sm"
					: "bg-zinc-50 border-zinc-100"
			}`}
		>
			<View
				className={`p-3 rounded-full mb-2 ${selected ? "bg-fuchsia-100" : "bg-zinc-100"}`}
			>
				<Ionicons
					name={icon}
					size={28}
					color={selected ? "#d946ef" : "#71717a"}
				/>
			</View>
			<Text
				className={`font-bold ${selected ? "text-fuchsia-700" : "text-zinc-500"}`}
			>
				{title}
			</Text>
			{selected && (
				<View className="absolute top-2 right-2">
					<Ionicons
						name="checkmark-circle"
						size={20}
						color="#d946ef"
					/>
				</View>
			)}
		</Pressable>
	)
}
