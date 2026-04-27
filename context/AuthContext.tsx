import React, { createContext, useContext, useState, useEffect } from "react"
import { tokenStorage } from "@/utils/storage"
import { authApi } from "@/utils/auth"

type AuthContextType = {
	hasToken: boolean
	userRole: string | null
	isLoading: boolean
	login: (token: string, role: string) => void
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [hasToken, setHasToken] = useState(false)
	const [userRole, setUserRole] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const checkAuth = async () => {
		try {
			const token = await tokenStorage.getAccessToken()
			if (token) {
				setHasToken(true)
				const res = await authApi.whoami(token)
				if (res.ok) {
					const data = await res.json()
					setUserRole(data.role)
				}
			}
		} catch (e) {
			setHasToken(false)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])

	const login = (token: string, role: string) => {
		setHasToken(true)
		setUserRole(role)
	}

	const logout = async () => {
		await tokenStorage.clearTokens()
		setHasToken(false)
		setUserRole(null)
	}

	return (
		<AuthContext.Provider
			value={{ hasToken, userRole, isLoading, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) throw new Error("useAuth must be used within an AuthProvider")
	return context
}
