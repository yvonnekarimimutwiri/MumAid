import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"

export const options = { title: "Admin · Opportunities" }

const seed = [
	{ id: "1", title: "Pelvic floor workshop", interested: 12, deadline: "May 2, 2026" },
	{ id: "2", title: "Donated pump bundle", interested: 5, deadline: "Apr 28, 2026" },
]

export default function AdminScreen() {
	const [password, setPassword] = useState("")
	const [authed, setAuthed] = useState(false)

	function login() {
		setAuthed(password.trim().length > 0)
	}

	if (!authed) {
		return (
			<View className="flex-1 justify-center bg-mum-bg px-6">
				<Text className="mb-2 text-center text-lg font-semibold text-mum-ink">Admin login</Text>
				<Text className="mb-6 text-center text-sm text-mum-ink/70">
					Replace with secure auth (e.g. OAuth) before production.
				</Text>
				<TextInput
					secureTextEntry
					value={password}
					onChangeText={setPassword}
					placeholder="Password"
					placeholderTextColor="#C9A5E4"
					className="rounded-xl border border-mum-purple/25 bg-white px-3 py-3 text-mum-ink"
				/>
				<Pressable
					onPress={login}
					className="mt-4 flex-row items-center justify-center gap-2 rounded-xl bg-mum-purpleDeep py-3 active:opacity-90"
				>
					<Ionicons name="log-in-outline" size={20} color="white" />
					<Text className="font-semibold text-white">Sign in</Text>
				</Pressable>
			</View>
		)
	}

	return (
		<ScrollView className="flex-1 bg-mum-bg px-4 pb-8 pt-2" showsVerticalScrollIndicator={false}>
			<Text className="mb-4 text-sm text-mum-ink/80">
				Create opportunities, export interested mothers to CSV, and optionally notify all users — connect
				forms to your API.
			</Text>

			<View className="mb-6 rounded-2xl border border-fuchsia-200 bg-white p-4">
				<Text className="font-semibold text-mum-ink">New opportunity</Text>
				<TextInput
					placeholder="Title"
					placeholderTextColor="#C9A5E4"
					className="mt-3 rounded-xl border border-mum-purple/20 bg-white/70 px-3 py-2.5"
				/>
				<TextInput
					placeholder="Description"
					multiline
					placeholderTextColor="#C9A5E4"
					className="mt-2 min-h-[88px] rounded-xl border border-mum-purple/20 bg-white/70 px-3 py-2.5"
				/>
				<TextInput
					placeholder="Deadline"
					placeholderTextColor="#C9A5E4"
					className="mt-2 rounded-xl border border-mum-purple/20 bg-white/70 px-3 py-2.5"
				/>
				<TextInput
					placeholder="Location or online"
					placeholderTextColor="#C9A5E4"
					className="mt-2 rounded-xl border border-mum-purple/20 bg-white/70 px-3 py-2.5"
				/>
				<Pressable className="mt-4 self-start rounded-full bg-fuchsia-600 px-5 py-2.5 active:opacity-90">
					<Text className="font-semibold text-white">Publish</Text>
				</Pressable>
			</View>

			<Text className="mb-2 font-semibold text-mum-ink">All opportunities</Text>
			{seed.map((row) => (
				<View
					key={row.id}
					className="mb-3 flex-row items-center justify-between rounded-2xl border border-mum-purple/20 bg-white p-4"
				>
					<View className="flex-1 pr-2">
						<Text className="font-medium text-mum-ink">{row.title}</Text>
						<Text className="text-xs text-mum-purpleDeep">{row.deadline}</Text>
					</View>
					<Text className="text-sm text-fuchsia-800">{row.interested} interested</Text>
				</View>
			))}

			<View className="mt-4 flex-row flex-wrap gap-2">
				<Pressable className="rounded-full border border-mum-purple/25 bg-white px-4 py-2 active:opacity-90">
					<Text className="text-sm font-medium text-mum-ink/90">Export CSV</Text>
				</Pressable>
				<Pressable className="rounded-full border border-mum-purple/25 bg-white px-4 py-2 active:opacity-90">
					<Text className="text-sm font-medium text-mum-ink/90">Push notify all</Text>
				</Pressable>
			</View>
		</ScrollView>
	)
}
