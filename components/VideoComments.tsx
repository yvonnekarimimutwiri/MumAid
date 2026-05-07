import React, { useState, useEffect, useCallback, useRef } from "react"
import {
	View,
	Text,
	Pressable,
	Modal,
	ScrollView,
	TextInput,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { BASE_URL } from "@/constants/Config"
import { useAuth } from "@/context/AuthContext"

interface Comment {
	id: number
	content: string
	created_at: string
	replies?: Comment[]
}

interface VideoCommentsProps {
	videoId: number
	visible: boolean
	onClose: () => void
}

export default function VideoComments({
	videoId,
	visible,
	onClose,
}: VideoCommentsProps) {
	const { token } = useAuth()
	const [comments, setComments] = useState<Comment[]>([])
	const [newComment, setNewComment] = useState("")
	const [replyingTo, setReplyingTo] = useState<Comment | null>(null)
	const [isRefreshing, setIsRefreshing] = useState(false)
	const inputRef = useRef<TextInput>(null)

	const fetchComments = useCallback(async () => {
		try {
			const res = await fetch(
				`${BASE_URL}/feeds/v1/videos/${videoId}/comments/`,
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			if (res.ok) {
				const data = await res.json()
				setComments(data)
			}
		} catch (e) {
			console.error("Failed to fetch comments", e)
		}
	}, [videoId, token])

	useEffect(() => {
		if (visible) fetchComments()
	}, [visible, fetchComments])

	const handlePostComment = async () => {
		if (!newComment.trim()) return

		const url = replyingTo
			? `${BASE_URL}/feeds/v1/comments/${replyingTo.id}/reply/`
			: `${BASE_URL}/feeds/v1/videos/${videoId}/comments/create/`

		try {
			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ content: newComment }),
			})
			if (res.ok) {
				setNewComment("")
				setReplyingTo(null)
				fetchComments()
			}
		} catch (e) {
			console.error("Post failed", e)
		}
	}

	const handleManualRefresh = async () => {
		setIsRefreshing(true)
		await fetchComments()
		setIsRefreshing(false)
	}

	return (
		<Modal visible={visible} animationType="slide" transparent>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="flex-1 bg-black/60"
			>
				<Pressable className="flex-1" onPress={onClose} />
				<View className="h-[75%] bg-zinc-950 rounded-t-[32px] border-t border-white/10 p-6">
					<View className="flex-row justify-between items-center mb-6">
						<View className="flex-row items-center gap-3">
							<Text className="text-white font-bold text-lg">
								Comments
							</Text>
							<Pressable
								onPress={handleManualRefresh}
								className="p-2 active:opacity-50"
							>
								{isRefreshing ? (
									<ActivityIndicator
										size="small"
										color="#d946ef"
									/>
								) : (
									<Ionicons
										name="refresh"
										size={18}
										color="#d946ef"
									/>
								)}
							</Pressable>
						</View>
						<Pressable onPress={onClose}>
							<Ionicons name="close" size={24} color="white" />
						</Pressable>
					</View>

					<ScrollView
						className="flex-1"
						showsVerticalScrollIndicator={false}
					>
						{comments.length === 0 ? (
							<Text className="text-zinc-600 text-center mt-10">
								No comments yet. Be the first!
							</Text>
						) : (
							comments.map((comment) => (
								<View key={comment.id} className="mb-6">
									<View className="flex-row gap-3">
										<View className="h-8 w-8 rounded-full bg-fuchsia-900 items-center justify-center">
											<Text className="text-white text-[10px]">
												U
											</Text>
										</View>
										<View className="flex-1">
											<Text className="text-white text-sm">
												{comment.content}
											</Text>
											<Pressable
												onPress={() => {
													setReplyingTo(comment)
													inputRef.current?.focus()
												}}
												className="mt-2"
											>
												<Text className="text-zinc-500 text-xs font-bold">
													Reply
												</Text>
											</Pressable>
										</View>
									</View>
									{comment.replies?.map((reply) => (
										<View
											key={reply.id}
											className="ml-10 mt-4 flex-row gap-3"
										>
											<View className="h-6 w-6 rounded-full bg-zinc-800 items-center justify-center">
												<Text className="text-white text-[8px]">
													U
												</Text>
											</View>
											<Text className="text-zinc-300 text-sm flex-1">
												{reply.content}
											</Text>
										</View>
									))}
								</View>
							))
						)}
					</ScrollView>

					<View className="pt-4 border-t border-white/5">
						{replyingTo && (
							<View className="flex-row justify-between mb-2 px-2">
								<Text className="text-fuchsia-400 text-xs">
									Replying to comment...
								</Text>
								<Pressable onPress={() => setReplyingTo(null)}>
									<Text className="text-zinc-500 text-xs">
										Cancel
									</Text>
								</Pressable>
							</View>
						)}
						<View className="flex-row items-center bg-zinc-900 rounded-2xl px-4 py-2">
							<TextInput
								ref={inputRef}
								className="flex-1 text-white py-2"
								placeholder="Add a comment..."
								placeholderTextColor="#555"
								value={newComment}
								onChangeText={setNewComment}
							/>
							<Pressable onPress={handlePostComment}>
								<Ionicons
									name="arrow-up-circle"
									size={32}
									color="#d946ef"
								/>
							</Pressable>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	)
}
