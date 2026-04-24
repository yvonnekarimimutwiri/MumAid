import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
import { useState } from "react"
import { Pressable, ScrollView, Switch, Text, TextInput, View } from "react-native"

export const options = { title: "Settings" }

export default function SettingsScreen() {
	const [bioLock, setBioLock] = useState(false)
	const [supportContacts, setSupportContacts] = useState([
		{ name: "", phone: "" },
	])

	const updateSupportContact = (
		index: number,
		field: "name" | "phone",
		value: string,
	) => {
		setSupportContacts((prev) =>
			prev.map((contact, i) =>
				i === index ? { ...contact, [field]: value } : contact,
			),
		)
	}

	const addSupportContact = () => {
		setSupportContacts((prev) =>
			prev.length >= 6 ? prev : [...prev, { name: "", phone: "" }],
		)
	}

	const removeSupportContact = (index: number) => {
		setSupportContacts((prev) => {
			if (prev.length <= 1) return prev
			return prev.filter((_, i) => i !== index)
		})
	}

	return (
		<ScrollView
			className="flex-1 bg-mum-bg px-4 pb-8 pt-2"
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
		>
			<Text className="mb-4 text-sm text-mum-ink/80">
				Save who to reach in emergencies and routine care. Data stays
				on-device until you connect a backend.
			</Text>

			<View className="mb-4 rounded-2xl border border-fuchsia-200 bg-white p-4">
				<Text className="text-sm font-semibold text-mum-ink">
					OB / midwife
				</Text>
				<TextInput
					placeholder="Name"
					placeholderTextColor="#C9A5E4"
					className="mt-2 rounded-xl border border-mum-purple/20 bg-white/70 px-3 py-2.5 text-mum-ink"
				/>
				<TextInput
					placeholder="Phone"
					keyboardType="phone-pad"
					placeholderTextColor="#C9A5E4"
					className="mt-2 rounded-xl border border-mum-purple/20 bg-white/70 px-3 py-2.5 text-mum-ink"
				/>
			</View>

			<View className="mb-4 rounded-2xl border border-fuchsia-200 bg-white p-4">
				<Text className="text-sm font-semibold text-mum-ink">
					Support person
				</Text>
				<Text className="mt-2 text-xs text-mum-ink/70">
					You can add up to 6 support contacts (name + number).
				</Text>
				{supportContacts.map((contact, index) => (
					<View
						key={`support-contact-${index}`}
						className="mt-3 rounded-xl border border-mum-purple/15 bg-white/70 p-3"
					>
						<Text className="text-xs font-semibold text-mum-ink/60">
							Support Person {index + 1}
						</Text>
						<TextInput
							value={contact.name}
							onChangeText={(value) =>
								updateSupportContact(index, "name", value)
							}
							placeholder={`Name ${index + 1}`}
							placeholderTextColor="#C9A5E4"
							className="mt-2 rounded-xl border border-mum-purple/20 bg-white px-3 py-2.5 text-mum-ink"
						/>
						<TextInput
							value={contact.phone}
							onChangeText={(value) =>
								updateSupportContact(index, "phone", value)
							}
							placeholder={`Phone ${index + 1}`}
							keyboardType="phone-pad"
							placeholderTextColor="#C9A5E4"
							className="mt-2 rounded-xl border border-mum-purple/20 bg-white px-3 py-2.5 text-mum-ink"
						/>
						<Pressable
							onPress={() => removeSupportContact(index)}
							disabled={supportContacts.length === 1}
							className="mt-2 self-start rounded-xl border border-mum-purple/20 px-3 py-2.5 active:opacity-80 disabled:opacity-40"
						>
							<Text className="text-xs font-semibold text-mum-purpleDeep">
								Remove
							</Text>
						</Pressable>
					</View>
				))}
				<Pressable
					onPress={addSupportContact}
					disabled={supportContacts.length >= 6}
					className="mt-2 self-start rounded-full border border-mum-purpleSoft/40 px-4 py-2 active:opacity-90 disabled:opacity-50"
				>
					<Text className="text-xs font-bold text-mum-purpleDeep">
						+ Add Support Person ({supportContacts.length}/6)
					</Text>
				</Pressable>
			</View>

			<Link href="/theme-customizer" asChild>
				<Pressable className="mb-4 flex-row items-center justify-between rounded-2xl border border-fuchsia-200 bg-white px-4 py-4 active:bg-mum-mist">
					<View className="flex-row items-center gap-3">
						<Ionicons
							name="color-palette"
							size={24}
							color="#B57EDC"
						/>
						<View>
							<Text className="font-medium text-mum-ink">
								Theme & Colors
							</Text>
							<Text className="text-xs text-mum-ink/70">
								Personalize your app experience
							</Text>
						</View>
					</View>
					<Ionicons
						name="chevron-forward"
						size={20}
						color="#C9A5E4"
					/>
				</Pressable>
			</Link>

			<View className="mb-4 flex-row items-center justify-between rounded-2xl border border-fuchsia-200 bg-white px-4 py-3">
				<View className="flex-row items-center gap-3 pr-2">
					<Ionicons name="finger-print" size={24} color="#B57EDC" />
					<View className="flex-1">
						<Text className="font-medium text-mum-ink">
							Biometric lock
						</Text>
						<Text className="text-xs text-mum-ink/70">
							Face ID / fingerprint / PIN
						</Text>
					</View>
				</View>
				<Switch
					value={bioLock}
					onValueChange={setBioLock}
					trackColor={{ true: "#B57EDC" }}
				/>
			</View>

			<View className="rounded-2xl border border-mum-purple/25 bg-white/85 p-4">
				<Text className="text-sm font-semibold text-mum-ink">
					Partner companion
				</Text>
				<Text className="mt-2 text-sm leading-5 text-mum-ink/80">
					Link a partner login to share tasks and reminders —
					implement invite flow with your auth provider.
				</Text>
				<Pressable className="mt-3 self-start rounded-full bg-mum-purpleDeep px-4 py-2 active:opacity-90">
					<Text className="font-semibold text-white">
						Set up partner
					</Text>
				</Pressable>
			</View>
		</ScrollView>
	)
}
