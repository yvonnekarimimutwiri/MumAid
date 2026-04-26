import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function AuthLayout() {
	return (
		<>
			<StatusBar style="dark" />

			<Stack
				screenOptions={{
					headerShown: false,
					animation: "fade",
					contentStyle: { backgroundColor: "#FFFFFF" },
				}}
			>
				<Stack.Screen
					name="login"
					options={{
						title: "Login",
					}}
				/>
				<Stack.Screen
					name="register"
					options={{
						title: "Register",
					}}
				/>
				<Stack.Screen
					name="verify"
					options={{
						title: "Verify Account",
					}}
				/>
			</Stack>
		</>
	)
}
