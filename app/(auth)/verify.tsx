import { authApi } from "@/utils/auth"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState, useRef } from "react"
import {
	Alert,
	Pressable,
	Text,
	TextInput,
	View,
	ActivityIndicator,
} from "react-native"

export default function VerifyScreen() {
	const { email } = useLocalSearchParams()
	const [otp, setOtp] = useState(["", "", "", "", "", ""])
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const inputs = useRef<Array<TextInput | null>>([])

	const handleOtpChange = (value: string, index: number) => {
		const newOtp = [...otp]
		newOtp[index] = value
		setOtp(newOtp)

		if (value.length !== 0 && index < 5) {
			inputs.current[index + 1]?.focus()
		}
	}

	const handleKeyPress = (e: any, index: number) => {
		if (
			e.nativeEvent.key === "Backspace" &&
			otp[index] === "" &&
			index > 0
		) {
			inputs.current[index - 1]?.focus()
		}
	}

	const handleVerify = async () => {
		const otpString = otp.join("")
		if (otpString.length < 6)
			return Alert.alert("Wait", "Please enter the full 6-digit code.")

		setLoading(true)
		try {
			const res = await authApi.verifyOtp(email as string, otpString)
			if (res.ok) {
				Alert.alert("Verified", "You can now log in.")
				router.replace("/(auth)/login")
			} else {
				Alert.alert(
					"Invalid Code",
					"Please check your OTP and try again.",
				)
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<View className="flex-1 bg-white p-8 justify-center items-center">
			<Text className="text-2xl font-bold text-mum-purpleDeep">
				Check your email
			</Text>
			<Text className="text-zinc-500 text-center mt-2 mb-8">
				We sent a code to {email}
			</Text>

			{/* OTP Input Container */}
			<View className="flex-row justify-between w-full mb-10">
				{otp.map((digit, index) => (
					<TextInput
						key={index}
						ref={(ref) => {
							inputs.current[index] = ref
						}}
						className="w-[14%] aspect-square bg-zinc-100 rounded-xl text-center text-2xl font-bold text-mum-purpleDeep border border-zinc-200 focus:border-fuchsia-500"
						keyboardType="number-pad"
						maxLength={1}
						value={digit}
						onChangeText={(value) => handleOtpChange(value, index)}
						onKeyPress={(e) => handleKeyPress(e, index)}
						autoFocus={index === 0}
					/>
				))}
			</View>

			<Pressable
				disabled={loading}
				onPress={handleVerify}
				className={`w-full p-4 rounded-full items-center ${loading ? "bg-zinc-300" : "bg-fuchsia-500"}`}
			>
				{loading ? (
					<ActivityIndicator color="white" />
				) : (
					<Text className="text-white font-bold text-lg">
						Verify Account
					</Text>
				)}
			</Pressable>
		</View>
	)
}
