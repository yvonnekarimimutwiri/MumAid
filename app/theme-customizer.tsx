import React from "react"
import { ScrollView, Text, View, Pressable, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme, DEFAULT_THEME } from "../context/ThemeContext"
import { Stack } from "expo-router"

const PRESET_PALETTES = [
	{ name: "Original", primary: "#6E3F9C", bg: "#fdf2f8", accent: "#fce7f3" },
	{ name: "Ocean", primary: "#0891b2", bg: "#f0f9ff", accent: "#bae6fd" },
	{ name: "Sage", primary: "#166534", bg: "#f0fdf4", accent: "#dcfce7" },
	{ name: "Sunset", primary: "#9a3412", bg: "#fff7ed", accent: "#ffedd5" },
	{ name: "Slate", primary: "#334155", bg: "#f8fafc", accent: "#f1f5f9" },
]

export default function ThemeCustomizer() {
	const { theme, updateTheme, resetTheme } = useTheme()

	const handleReset = () => {
		Alert.alert(
			"Reset Theme",
			"Are you sure you want to return to the default colors?",
			[
				{ text: "Cancel", style: "cancel" },
				{ text: "Reset", style: "destructive", onPress: resetTheme },
			],
		)
	}

	return (
		<View className="flex-1 bg-mum-bg">
			<Stack.Screen options={{ title: "Customize Theme" }} />

			<ScrollView
				className="flex-1 px-6"
				contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
			>
				<Text className="mb-4 text-xs font-bold uppercase tracking-widest text-mum-ink/40">
					Live Preview
				</Text>
				<View className="mb-8 overflow-hidden rounded-[32px] border border-mum-petal bg-white shadow-sm">
					<View className="bg-mum-bg p-6">
						<View className="flex-row items-center gap-3">
							<View className="h-10 w-10 items-center justify-center rounded-xl bg-mum-purpleDeep">
								<Ionicons
									name="sparkles"
									size={20}
									color="white"
								/>
							</View>
							<View>
								<Text className="text-lg font-bold text-mum-ink">
									Sample Card
								</Text>
								<Text className="text-sm text-mum-ink/60">
									This is how your theme looks.
								</Text>
							</View>
						</View>
						<Pressable className="mt-4 items-center rounded-full bg-mum-purpleDeep py-3">
							<Text className="font-bold text-white">
								Action Button
							</Text>
						</Pressable>
					</View>
				</View>

				<Text className="mb-4 text-xs font-bold uppercase tracking-widest text-mum-ink/40">
					Presets
				</Text>
				<View className="flex-row flex-wrap justify-between">
					{PRESET_PALETTES.map((palette) => (
						<Pressable
							key={palette.name}
							onPress={() =>
								updateTheme({
									"--mum-purple-deep": palette.primary,
									"--mum-bg": palette.bg,
									"--mum-petal": palette.accent,
									"--mum-purple": palette.primary + "80", // Shaded version
								})
							}
							className="mb-4 w-[48%] rounded-2xl border border-mum-petal bg-white p-3 active:scale-95"
						>
							<View className="flex-row gap-1 mb-2">
								<View
									style={{ backgroundColor: palette.primary }}
									className="h-6 w-6 rounded-full"
								/>
								<View
									style={{ backgroundColor: palette.bg }}
									className="h-6 w-6 rounded-full border border-black/5"
								/>
								<View
									style={{ backgroundColor: palette.accent }}
									className="h-6 w-6 rounded-full"
								/>
							</View>
							<Text className="font-semibold text-mum-ink">
								{palette.name}
							</Text>
						</Pressable>
					))}
				</View>

				<View className="mt-10 items-center">
					<Pressable
						onPress={handleReset}
						className="flex-row items-center gap-2 rounded-full border border-red-200 bg-red-50 px-6 py-3 active:bg-red-100"
					>
						<Ionicons name="refresh" size={18} color="#ef4444" />
						<Text className="font-bold text-red-500">
							Restore Defaults
						</Text>
					</Pressable>
					<Text className="mt-3 text-center text-xs leading-5 text-mum-ink/40 px-6">
						This will delete your local color settings and return to
						the original MumAid theme.
					</Text>
				</View>
			</ScrollView>
		</View>
	)
}
