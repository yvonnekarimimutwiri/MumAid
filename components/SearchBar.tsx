import { Ionicons } from "@expo/vector-icons"
import { TextInput, View } from "react-native"

type SearchBarProps = {
	value: string
	onChangeText: (text: string) => void
	placeholder?: string
}

export function SearchBar({ value, onChangeText, placeholder = "Search…" }: SearchBarProps) {
	return (
		<View className="mb-4 flex-row items-center rounded-2xl border border-fuchsia-200/90 bg-white px-3 py-1 shadow-sm shadow-fuchsia-900/5">
			<Ionicons name="search" size={20} color="#a21caf" />
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor="#C9A5E4"
				autoCapitalize="none"
				autoCorrect={false}
				clearButtonMode="while-editing"
				className="ml-2 flex-1 py-2.5 text-[15px] text-mum-ink"
			/>
		</View>
	)
}
