import AsyncStorage from "@react-native-async-storage/async-storage"
import { vars } from "nativewind"
import React, { createContext, useContext, useEffect, useState } from "react"
import { View } from "react-native"

export const DEFAULT_THEME = {
	"--mum-purple": "#B57EDC",
	"--mum-purple-deep": "#6E3F9C",
	"--mum-bg": "#fdf2f8",
	"--mum-ink": "#2A1B3D",
	"--mum-mist": "#faf5ff",
	"--mum-petal": "#fce7f3",
}

const ThemeContext = createContext({
	theme: DEFAULT_THEME,
	updateTheme: (newColors: Partial<typeof DEFAULT_THEME>) => {},
	resetTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState(DEFAULT_THEME)

	useEffect(() => {
		const loadTheme = async () => {
			try {
				const saved = await AsyncStorage.getItem("user-theme")
				if (saved) setTheme(JSON.parse(saved))
			} catch {
				// Corrupt storage shouldn't block app startup
			}
		}
		loadTheme()
	}, [])

	const updateTheme = async (newColors: Partial<typeof DEFAULT_THEME>) => {
		const updated = { ...theme, ...newColors }
		setTheme(updated)
		await AsyncStorage.setItem("user-theme", JSON.stringify(updated))
	}

	const resetTheme = async () => {
		setTheme(DEFAULT_THEME)
		await AsyncStorage.removeItem("user-theme")
	}

	const nativeWindTheme = vars(theme)

	return (
		<ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
			<View style={[nativeWindTheme, { flex: 1 }]}>{children}</View>
		</ThemeContext.Provider>
	)
}

export const useTheme = () => useContext(ThemeContext)
