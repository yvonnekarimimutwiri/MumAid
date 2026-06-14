import { BASE_URL } from "@/constants/Config"
import { mumtalkStorage } from "@/utils/mumtalkStorage"

export type ReportReason =
	| "spam"
	| "harassment"
	| "inappropriate"
	| "misinformation"
	| "other"

export const REPORT_REASONS: { id: ReportReason; label: string }[] = [
	{ id: "spam", label: "Spam" },
	{ id: "harassment", label: "Harassment or bullying" },
	{ id: "inappropriate", label: "Inappropriate content" },
	{ id: "misinformation", label: "Misinformation" },
	{ id: "other", label: "Other" },
]

const authHeaders = (token: string) => ({
	"Content-Type": "application/json",
	Authorization: `Bearer ${token}`,
})

async function postWithFallback(
	url: string,
	token: string,
	body: Record<string, unknown>,
): Promise<boolean> {
	try {
		const res = await fetch(url, {
			method: "POST",
			headers: authHeaders(token),
			body: JSON.stringify(body),
		})
		return res.ok
	} catch {
		return false
	}
}

export const feedInteractions = {
	async toggleCommentDislike(
		token: string,
		commentId: number,
		disliked: boolean,
	): Promise<boolean> {
		const url = `${BASE_URL}/feeds/v1/comments/${commentId}/dislike/`
		const ok = disliked
			? await postWithFallback(url, token, {})
			: await (async () => {
					try {
						const res = await fetch(url, {
							method: "DELETE",
							headers: authHeaders(token),
						})
						return res.ok
					} catch {
						return false
					}
				})()

		await mumtalkStorage.setCommentDisliked(commentId, disliked)
		return ok || true
	},

	async reportComment(
		token: string,
		commentId: number,
		reason: ReportReason,
	): Promise<boolean> {
		return postWithFallback(
			`${BASE_URL}/feeds/v1/comments/${commentId}/report/`,
			token,
			{ reason },
		)
	},

	async reportUser(
		token: string,
		userId: number,
		reason: ReportReason,
	): Promise<boolean> {
		return postWithFallback(
			`${BASE_URL}/feeds/v1/users/${userId}/report/`,
			token,
			{ reason },
		)
	},

	async blockUser(token: string, userId: number): Promise<boolean> {
		const ok = await postWithFallback(
			`${BASE_URL}/feeds/v1/users/${userId}/block/`,
			token,
			{},
		)
		await mumtalkStorage.blockUser(userId)
		return ok || true
	},

	async toggleVideoSave(
		token: string,
		video: {
			id: number
			title: string
			description?: string
			videoUrl?: string
		},
		save: boolean,
	): Promise<boolean> {
		const url = `${BASE_URL}/feeds/v1/videos/${video.id}/save/`
		if (save) {
			const ok = await postWithFallback(url, token, {})
			await mumtalkStorage.saveVideo({
				id: video.id,
				title: video.title,
				description: video.description,
				videoUrl: video.videoUrl,
				savedAt: new Date().toISOString(),
			})
			return ok || true
		}

		let ok = false
		try {
			const res = await fetch(url, {
				method: "DELETE",
				headers: authHeaders(token),
			})
			ok = res.ok
		} catch {
			ok = false
		}
		await mumtalkStorage.unsaveVideo(video.id)
		return ok || true
	},
}
