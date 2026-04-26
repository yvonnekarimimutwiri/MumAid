import RoleCard from "@/components/RoleCard"
import { authApi } from "@/utils/auth"
import { useRouter } from "expo-router"
import React, { useState } from "react"
import {
	ActivityIndicator,
	Alert,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native"

type UserRole = "mother" | "partner"

export default function RegisterScreen() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [role, setRole] = useState<UserRole>("mother") // Default to mother
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const handleRegister = async () => {
		if (!email || !password)
			return Alert.alert("Error", "Please fill all fields")

		setLoading(true)
		try {
			const res = await authApi.register({
				email,
				password,
				role, // Use the dynamic role state
			})
			const data = await res.json()

			if (res.ok) {
				Alert.alert("Success", data.detail)
				router.push({ pathname: "/(auth)/verify", params: { email } })
			} else {
				Alert.alert(
					"Registration Failed",
					data.detail || "Something went wrong",
				)
			}
		} catch (err) {
			Alert.alert("Error", "Network error")
		} finally {
			setLoading(false)
		}
	}

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			className="bg-white"
		>
			<View className="flex-1 p-8 justify-center">
				<Text
					style={{ color: "#6E3F9C" }}
					className="text-3xl font-bold mb-2"
				>
					Create Account
				</Text>
				<Text className="text-zinc-500 mb-8">
					Select your role to join the community
				</Text>

				<View className="flex-row gap-4 mb-8">
					<RoleCard
						title="Mother"
						icon="woman"
						selected={role === "mother"}
						onPress={() => setRole("mother")}
					/>
					<RoleCard
						title="Partner"
						icon="people"
						selected={role === "partner"}
						onPress={() => setRole("partner")}
					/>
				</View>

				<TextInput
					className="bg-zinc-100 p-4 rounded-2xl mb-4 text-zinc-800"
					placeholder="Email Address"
					placeholderTextColor="#a1a1aa"
					value={email}
					onChangeText={setEmail}
					autoCapitalize="none"
					keyboardType="email-address"
				/>
				<TextInput
					className="bg-zinc-100 p-4 rounded-2xl mb-8 text-zinc-800"
					placeholder="Password"
					placeholderTextColor="#a1a1aa"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>

				<Pressable
					onPress={handleRegister}
					disabled={loading}
					style={{ backgroundColor: loading ? "#a1a1aa" : "#6E3F9C" }}
					className={`p-4 rounded-full items-center`}
				>
					{loading ? (
						<ActivityIndicator color="white" />
					) : (
						<Text className="text-white font-bold text-lg">
							Register
						</Text>
					)}
				</Pressable>

				<View className="flex-row justify-center mt-8">
					<Text className="text-zinc-500">
						Already have an account?{" "}
					</Text>
					<Pressable onPress={() => router.push("/(auth)/login")}>
						<Text className="text-fuchsia-600 font-bold">
							Login
						</Text>
					</Pressable>
				</View>
			</View>
		</ScrollView>
	)
}
