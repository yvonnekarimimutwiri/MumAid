import { BASE_URL } from "@/constants/Config"

export type UserRole = "mother" | "partner"

export type RegisterPayload = {
	email: string
	username: string
	password: string
	role: UserRole
}

export type LoginPayload =
	| { email: string; password: string }
	| { username: string; password: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,30}$/

export function isEmail(value: string): boolean {
	return EMAIL_PATTERN.test(value.trim())
}

export function normalizeUsername(value: string): string {
	return value.trim().toLowerCase()
}

export function buildLoginPayload(
	identifier: string,
	password: string,
): LoginPayload {
	const trimmed = identifier.trim()
	if (isEmail(trimmed)) {
		return { email: trimmed.toLowerCase(), password }
	}
	return { username: normalizeUsername(trimmed), password }
}

export function formatAuthError(
	data: Record<string, unknown> | null | undefined,
	fallback: string,
): string {
	if (!data) return fallback
	if (typeof data.detail === "string") return data.detail
	for (const key of ["username", "email", "password", "non_field_errors"]) {
		const value = data[key]
		if (typeof value === "string") return value
		if (Array.isArray(value) && typeof value[0] === "string") {
			return value[0]
		}
	}
	return fallback
}

export const authApi = {
	register: (data: RegisterPayload) =>
		fetch(`${BASE_URL}/auth/v1/register/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}),

	verifyOtp: (email: string, otp: string) =>
		fetch(`${BASE_URL}/auth/v1/verify/token/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, otp }),
		}),

	login: (data: LoginPayload) =>
		fetch(`${BASE_URL}/auth/v1/login/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}),

	googleLogin: () =>
		fetch(`${BASE_URL}/auth/v1/google/login/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		}),

	whoami: (token: string) =>
		fetch(`${BASE_URL}/auth/v1/whoami/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}),
}
