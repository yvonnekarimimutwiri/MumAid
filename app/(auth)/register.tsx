import RoleCard from "@/components/RoleCard"
import {
	authApi,
	formatAuthError,
	normalizeUsername,
	USERNAME_PATTERN,
	type UserRole,
} from "@/utils/auth"
import { Ionicons } from "@expo/vector-icons"
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

export default function RegisterScreen() {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [role, setRole] = useState<UserRole>("mother") // Default to mother
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const router = useRouter()

	const handleRegister = async () => {
		const trimmedUsername = normalizeUsername(username)
		const trimmedEmail = email.trim().toLowerCase()

		if (!trimmedUsername || !trimmedEmail || !password) {
			return Alert.alert("Error", "Please fill all fields")
		}
		if (!USERNAME_PATTERN.test(trimmedUsername)) {
			return Alert.alert(
				"Invalid username",
				"Use 3–30 characters: letters, numbers, and underscores only.",
			)
		}

		setLoading(true)
		try {
			const res = await authApi.register({
				email: trimmedEmail,
				username: trimmedUsername,
				password,
				role,
			})
			const data = await res.json()

			if (res.ok) {
				Alert.alert("Success", data.detail)
				router.push({
					pathname: "/(auth)/verify",
					params: { email: trimmedEmail },
				})
			} else {
				Alert.alert(
					"Registration Failed",
					formatAuthError(data, "Something went wrong"),
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
					placeholder="Username"
					placeholderTextColor="#a1a1aa"
					value={username}
					onChangeText={setUsername}
					autoCapitalize="none"
					autoCorrect={false}
				/>
				<Text className="text-zinc-400 text-xs mb-4 -mt-2 px-1">
					3–30 characters: letters, numbers, and underscores
				</Text>

				<TextInput
					className="bg-zinc-100 p-4 rounded-2xl mb-4 text-zinc-800"
					placeholder="Email Address"
					placeholderTextColor="#a1a1aa"
					value={email}
					onChangeText={setEmail}
					autoCapitalize="none"
					keyboardType="email-address"
				/>
				<View className="relative mb-8">
					<TextInput
						className="bg-zinc-100 p-4 rounded-2xl text-zinc-800"
						placeholder="Password"
						placeholderTextColor="#a1a1aa"
						secureTextEntry={showPassword ? false : true}
						value={password}
						onChangeText={setPassword}
					/>
					<View className="absolute h-full flex flex-col justify-center w-fit right-4">
						{showPassword ? (
							<Pressable onPress={() => setShowPassword(false)}>
								<Ionicons
									name={"eye-off"}
									size={28}
									color={"#71717a"}
								/>
							</Pressable>
						) : (
							<Pressable onPress={() => setShowPassword(true)}>
								<Ionicons
									name={"eye"}
									size={28}
									color={"#71717a"}
								/>
							</Pressable>
						)}
					</View>
				</View>

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
