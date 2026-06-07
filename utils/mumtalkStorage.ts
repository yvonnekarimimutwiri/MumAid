import AsyncStorage from "@react-native-async-storage/async-storage"

const SAVED_VIDEOS_KEY = "mumtalk_saved_videos_v1"
const BLOCKED_USERS_KEY = "mumtalk_blocked_users_v1"
const DISLIKED_COMMENTS_KEY = "mumtalk_disliked_comments_v1"

export type SavedVideo = {
	id: number
	title: string
	description?: string
	videoUrl?: string
	savedAt: string
}

const readJson = async <T>(key: string, fallback: T): Promise<T> => {
	try {
		const raw = await AsyncStorage.getItem(key)
		if (!raw) return fallback
		return JSON.parse(raw) as T
	} catch {
		return fallback
	}
}

const writeJson = async (key: string, value: unknown) => {
	await AsyncStorage.setItem(key, JSON.stringify(value))
}

export const mumtalkStorage = {
	async getSavedVideos(): Promise<SavedVideo[]> {
		return readJson<SavedVideo[]>(SAVED_VIDEOS_KEY, [])
	},

	async isVideoSaved(id: number): Promise<boolean> {
		const saved = await this.getSavedVideos()
		return saved.some((video) => video.id === id)
	},

	async saveVideo(video: SavedVideo): Promise<void> {
		const saved = await this.getSavedVideos()
		const next = [
			video,
			...saved.filter((item) => item.id !== video.id),
		]
		await writeJson(SAVED_VIDEOS_KEY, next)
	},

	async unsaveVideo(id: number): Promise<void> {
		const saved = await this.getSavedVideos()
		await writeJson(
			SAVED_VIDEOS_KEY,
			saved.filter((video) => video.id !== id),
		)
	},

	async getBlockedUserIds(): Promise<number[]> {
		return readJson<number[]>(BLOCKED_USERS_KEY, [])
	},

	async blockUser(userId: number): Promise<void> {
		const blocked = await this.getBlockedUserIds()
		if (blocked.includes(userId)) return
		await writeJson(BLOCKED_USERS_KEY, [...blocked, userId])
	},

	async unblockUser(userId: number): Promise<void> {
		const blocked = await this.getBlockedUserIds()
		await writeJson(
			BLOCKED_USERS_KEY,
			blocked.filter((id) => id !== userId),
		)
	},

	async getDislikedCommentIds(): Promise<number[]> {
		return readJson<number[]>(DISLIKED_COMMENTS_KEY, [])
	},

	async isCommentDisliked(id: number): Promise<boolean> {
		const disliked = await this.getDislikedCommentIds()
		return disliked.includes(id)
	},

	async setCommentDisliked(id: number, disliked: boolean): Promise<void> {
		const current = await this.getDislikedCommentIds()
		const next = disliked
			? [...new Set([...current, id])]
			: current.filter((commentId) => commentId !== id)
		await writeJson(DISLIKED_COMMENTS_KEY, next)
	},
}
