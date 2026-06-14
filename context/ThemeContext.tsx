import AsyncStorage from "@react-native-async-storage/async-storage"
import { vars } from "nativewind"
import React, { createContext, useContext, useEffect, useState } from "react"
import { View } from "react-native"

export const DEFAULT_THEME = {
	"--color-mum-purple": "#B57EDC",
	"--color-mum-purpleDeep": "#6E3F9C",
	"--color-mum-bg": "#fdf2f8",
	"--color-mum-ink": "#2A1B3D",
	"--color-mum-mist": "#faf5ff",
	"--color-mum-petal": "#fce7f3",
	"--color-mumtalk-upload-idle": "#d946ef",
	"--color-mumtalk-upload-progress": "#d946ef",
	"--color-mumtalk-upload-cancel": "#ef4444",
	"--color-mumtalk-modal-bg": "#18181b",
	"--color-mumtalk-modal-input-bg": "#27272a",
	"--color-mumtalk-modal-label": "#a1a1aa",
	"--color-mumtalk-modal-placeholder": "#71717a",
	"--color-mumtalk-gradient-loading-top": "#501584",
	"--color-mumtalk-gradient-loading-mid": "#3b1060",
	"--color-mumtalk-gradient-loading-bottom": "#000000",
	"--color-mumtalk-gradient-ready-top": "#000000",
	"--color-mumtalk-gradient-ready-mid": "#000000",
	"--color-mumtalk-gradient-ready-bottom": "#000000",
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
