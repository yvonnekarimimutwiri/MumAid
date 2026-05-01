import { BASE_URL } from "@/constants/Config"
import { useAuth } from "@/context/AuthContext"
import { authApi } from "@/utils/auth"
import { tokenStorage } from "@/utils/storage"
import { Ionicons } from "@expo/vector-icons"
import * as Linking from "expo-linking"
import { useRouter } from "expo-router"
import * as WebBrowser from "expo-web-browser"
import { useState } from "react"
import {
	ActivityIndicator,
	Alert,
	Pressable,
	Text,
	TextInput,
	View,
} from "react-native"

const GoogleLogo = require("@/assets/icons/googleg_standard_color_128dp.png")

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [googleLoading, setGoogleLoading] = useState(false)

	const { login } = useAuth()
	const router = useRouter()

	const handleLogin = async () => {
		if (!email || !password) {
			return Alert.alert(
				"Missing info",
				"Please enter both email and password",
			)
		}

		setLoading(true)
		try {
			const res = await authApi.login({ email, password })
			const data = await res.json()

			if (res.ok) {
				const accessToken = data.access

				const whoRes = await authApi.whoami(accessToken)

				if (whoRes.ok) {
					const userData = await whoRes.json()
					const role = userData.role

					await tokenStorage.saveTokens(
						data.access,
						data.refresh,
						email,
					)

					await tokenStorage.saveUserProfile({
						email: email,
						role: role,
					})

					login(accessToken, role)
				} else {
					Alert.alert(
						"Error",
						"Could not verify user role. Please try again.",
					)
				}
			} else {
				Alert.alert(
					"Login Failed",
					data.detail || "Invalid credentials",
				)
			}
		} catch (err) {
			Alert.alert("Error", "Check your internet connection")
		} finally {
			setLoading(false)
		}
	}

	const handleGoogleLogin = async () => {
		setLoading(true)
		try {
			const redirectUrl = Linking.createURL("/(auth)/login")

			const authUrl = `${BASE_URL}/auth/v1/google/login/?redirect_uri=${encodeURIComponent(redirectUrl)}`

			const result = await WebBrowser.openAuthSessionAsync(
				authUrl,
				redirectUrl,
			)

			if (result.type === "success") {
				const { queryParams } = Linking.parse(result.url)

				if (queryParams?.access && queryParams?.refresh) {
					await tokenStorage.saveTokens(
						String(queryParams.access),
						String(queryParams.refresh),
						String(queryParams.email || ""),
					)
					router.replace("/(tabs)")
				}
			} else {
				Alert.alert("Cancelled", "Google login was closed.")
			}
		} catch (err) {
			Alert.alert("Error", "Could not open Google Login.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<View className="flex-1 bg-white p-8 justify-center">
			<Text className="text-3xl font-bold text-mum-purpleDeep mb-2">
				Welcome Back
			</Text>
			<Text className="text-zinc-500 mb-8">
				Login to continue to MumAid
			</Text>

			<TextInput
				className="bg-zinc-100 p-4 rounded-2xl mb-4 text-zinc-800"
				placeholder="Email"
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
				onPress={handleLogin}
				disabled={loading}
				className={`p-4 rounded-full items-center mb-4 ${loading ? "bg-zinc-400" : "bg-mum-purpleDeep"}`}
			>
				{loading ? (
					<ActivityIndicator color="white" />
				) : (
					<Text className="text-white font-bold text-lg">Login</Text>
				)}
			</Pressable>

			{/* <View className="flex-row items-center my-6">
				<View className="flex-1 h-[1px] bg-zinc-200" />
				<Text className="mx-4 text-zinc-400 font-medium">OR</Text>
				<View className="flex-1 h-[1px] bg-zinc-200" />
			</View> */}

			{/* <Pressable
				onPress={handleGoogleLogin}
				disabled={googleLoading || loading}
				className="border border-zinc-200 p-4 rounded-full flex-row justify-center items-center gap-3 active:bg-zinc-50"
			>
				{googleLoading ? (
					<ActivityIndicator color="#71717a" />
				) : (
					<>
						<Image
							source={GoogleLogo}
							style={{ width: 22, height: 22 }}
							resizeMode="contain"
						/>
						<Text className="font-semibold text-zinc-800">
							Continue with Google
						</Text>
					</>
				)}
			</Pressable> */}

			<View className="flex-row justify-center mt-10">
				<Text className="text-zinc-500">Don't have an account? </Text>
				<Pressable onPress={() => router.push("/(auth)/register")}>
					<Text className="text-fuchsia-600 font-bold">Sign Up</Text>
				</Pressable>
			</View>
		</View>
	)
}
