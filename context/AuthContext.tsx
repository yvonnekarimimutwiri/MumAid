import React, { createContext, useContext, useState, useEffect } from "react"
import { tokenStorage } from "@/utils/storage"
import { authApi } from "@/utils/auth"

type AuthContextType = {
	token: string | null
	hasToken: boolean
	userRole: string | null
	isLoading: boolean
	login: (token: string, role: string) => void
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null)
	const [hasToken, setHasToken] = useState(false)
	const [userRole, setUserRole] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const checkAuth = async () => {
		try {
			const storedToken = await tokenStorage.getAccessToken()
			if (storedToken) {
                setToken(storedToken)
				setHasToken(true)
				const res = await authApi.whoami(storedToken)
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

	const login = (newToken: string, role: string) => {
        setToken(newToken)
		setHasToken(true)
		setUserRole(role)
	}

	const logout = async () => {
		await tokenStorage.clearTokens()
        setToken(null)
		setHasToken(false)
		setUserRole(null)
	}

	return (
		<AuthContext.Provider
			value={{ token, hasToken, userRole, isLoading, login, logout }}
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
