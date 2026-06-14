import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react"
import { tokenStorage } from "@/utils/storage"
import { authApi } from "@/utils/auth"

type AuthContextType = {
	token: string | null
	hasToken: boolean
	userRole: string | null
	isLoading: boolean
	login: (token: string, role: string) => void
	logout: () => void
	syncSessionFromStorage: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null)
	const [hasToken, setHasToken] = useState(false)
	const [userRole, setUserRole] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const syncSessionFromStorage = useCallback(async (): Promise<
		string | null
	> => {
		const storedToken = await tokenStorage.getAccessToken()
		const profile = await tokenStorage.getUserProfile()

		if (!storedToken) {
			setToken(null)
			setHasToken(false)
			setUserRole(null)
			return null
		}

		setToken(storedToken)
		setHasToken(true)
		let resolvedRole = profile?.role ?? null
		if (profile?.role) {
			setUserRole(profile.role)
		}

		try {
			const res = await authApi.whoami(storedToken)
			if (res.ok) {
				const data = (await res.json()) as {
					role?: string
					email?: string
				}
				if (data.role) {
					setUserRole(data.role)
					resolvedRole = data.role
				}
				const email = profile?.email ?? data.email
				if (email && data.role) {
					await tokenStorage.saveUserProfile({
						email,
						role: data.role,
					})
				}
			} else if (res.status === 401) {
				await tokenStorage.clearTokens()
				setToken(null)
				setHasToken(false)
				setUserRole(null)
				return null
			}
		} catch {
			// Offline or transient error — keep token and cached role from profile
		}

		return resolvedRole
	}, [])

	useEffect(() => {
		const init = async () => {
			try {
				const storedToken = await tokenStorage.getAccessToken()
				if (storedToken) {
					await syncSessionFromStorage()
				}
			} catch (e) {
				console.error(e)
			} finally {
				setIsLoading(false)
			}
		}
		void init()
	}, [syncSessionFromStorage])

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
			value={{
				token,
				hasToken,
				userRole,
				isLoading,
				login,
				logout,
				syncSessionFromStorage,
			}}
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
