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
	Alert,
	Share,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { BASE_URL } from "@/constants/Config"
import { useAuth } from "@/context/AuthContext"
import {
	feedInteractions,
	REPORT_REASONS,
	type ReportReason,
} from "@/utils/feedInteractions"
import { mumtalkStorage } from "@/utils/mumtalkStorage"

interface CommentAuthor {
	id?: number
	username?: string
	email?: string
}

export interface Comment {
	id: number
	content: string
	created_at: string
	author?: CommentAuthor
	user?: CommentAuthor
	user_id?: number
	dislikes_count?: number
	is_disliked?: boolean
	replies?: Comment[]
}

interface VideoCommentsProps {
	videoId: number
	videoTitle?: string
	visible: boolean
	onClose: () => void
}

function getAuthorId(comment: Comment): number | null {
	return comment.author?.id ?? comment.user?.id ?? comment.user_id ?? null
}

function getAuthorLabel(comment: Comment): string {
	return (
		comment.author?.username ??
		comment.user?.username ??
		comment.author?.email ??
		comment.user?.email ??
		"User"
	)
}

function getInitial(label: string): string {
	return label.trim().charAt(0).toUpperCase() || "U"
}

function filterBlockedComments(
	comments: Comment[],
	blockedUserIds: Set<number>,
): Comment[] {
	return comments
		.filter((comment) => {
			const authorId = getAuthorId(comment)
			return authorId == null || !blockedUserIds.has(authorId)
		})
		.map((comment) => ({
			...comment,
			replies: comment.replies?.filter((reply) => {
				const authorId = getAuthorId(reply)
				return authorId == null || !blockedUserIds.has(authorId)
			}),
		}))
}

export default function VideoComments({
	videoId,
	videoTitle,
	visible,
	onClose,
}: VideoCommentsProps) {
	const { token } = useAuth()
	const [comments, setComments] = useState<Comment[]>([])
	const [newComment, setNewComment] = useState("")
	const [replyingTo, setReplyingTo] = useState<Comment | null>(null)
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [blockedUserIds, setBlockedUserIds] = useState<Set<number>>(
		new Set(),
	)
	const [dislikedIds, setDislikedIds] = useState<Set<number>>(new Set())
	const inputRef = useRef<TextInput>(null)

	const loadLocalState = useCallback(async () => {
		const [blocked, disliked] = await Promise.all([
			mumtalkStorage.getBlockedUserIds(),
			mumtalkStorage.getDislikedCommentIds(),
		])
		setBlockedUserIds(new Set(blocked))
		setDislikedIds(new Set(disliked))
	}, [])

	const fetchComments = useCallback(async () => {
		if (!token) return
		try {
			const res = await fetch(
				`${BASE_URL}/feeds/v1/videos/${videoId}/comments/`,
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			if (res.ok) {
				const data = (await res.json()) as Comment[]
				setComments(data)
			}
		} catch (e) {
			console.error("Failed to fetch comments", e)
		}
	}, [videoId, token])

	useEffect(() => {
		if (visible) {
			loadLocalState()
			fetchComments()
		}
	}, [visible, loadLocalState, fetchComments])

	const handlePostComment = async () => {
		if (!newComment.trim() || !token) return

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
		await Promise.all([loadLocalState(), fetchComments()])
		setIsRefreshing(false)
	}

	const handleToggleDislike = async (comment: Comment) => {
		if (!token) return
		const nextDisliked = !(
			dislikedIds.has(comment.id) || comment.is_disliked
		)
		setDislikedIds((prev) => {
			const next = new Set(prev)
			if (nextDisliked) next.add(comment.id)
			else next.delete(comment.id)
			return next
		})
		await feedInteractions.toggleCommentDislike(
			token,
			comment.id,
			nextDisliked,
		)
	}

	const handleShareComment = async (comment: Comment) => {
		const author = getAuthorLabel(comment)
		try {
			await Share.share({
				message: `"${comment.content}" — ${author}${videoTitle ? ` on "${videoTitle}"` : ""} via MumAid`,
			})
		} catch (e) {
			console.error("Share failed", e)
		}
	}

	const submitReport = async (
		type: "comment" | "user",
		target: Comment,
		reason: ReportReason,
	) => {
		if (!token) return
		const authorId = getAuthorId(target)
		const ok =
			type === "comment"
				? await feedInteractions.reportComment(
						token,
						target.id,
						reason,
					)
				: authorId
					? await feedInteractions.reportUser(
							token,
							authorId,
							reason,
						)
					: false

		Alert.alert(
			ok ? "Report submitted" : "Report recorded",
			ok
				? "Thanks for helping keep MumTalk safe."
				: "We saved your report locally and will sync when possible.",
		)
	}

	const showReportReasonPicker = (
		type: "comment" | "user",
		target: Comment,
	) => {
		if (type === "user" && !getAuthorId(target)) {
			Alert.alert(
				"Unavailable",
				"This comment does not include user details to report.",
			)
			return
		}

		Alert.alert(
			type === "comment" ? "Report comment" : "Report user",
			"Why are you reporting this?",
			[
				...REPORT_REASONS.map((reason) => ({
					text: reason.label,
					onPress: () => submitReport(type, target, reason.id),
				})),
				{ text: "Cancel", style: "cancel" as const },
			],
		)
	}

	const handleBlockUser = (comment: Comment) => {
		const authorId = getAuthorId(comment)
		const authorLabel = getAuthorLabel(comment)
		if (!authorId || !token) {
			Alert.alert(
				"Unavailable",
				"This comment does not include user details to block.",
			)
			return
		}

		Alert.alert(
			"Block user",
			`Hide all comments from ${authorLabel}?`,
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Block",
					style: "destructive",
					onPress: async () => {
						await feedInteractions.blockUser(token, authorId)
						setBlockedUserIds((prev) => new Set(prev).add(authorId))
						Alert.alert(
							"User blocked",
							`You will no longer see comments from ${authorLabel}.`,
						)
					},
				},
			],
		)
	}

	const showCommentMenu = (comment: Comment) => {
		Alert.alert("Comment options", undefined, [
			{
				text: "Report comment",
				onPress: () => showReportReasonPicker("comment", comment),
			},
			{
				text: "Report user",
				onPress: () => showReportReasonPicker("user", comment),
			},
			{
				text: "Block user",
				style: "destructive",
				onPress: () => handleBlockUser(comment),
			},
			{ text: "Cancel", style: "cancel" },
		])
	}

	const renderCommentActions = (comment: Comment, compact = false) => {
		const isDisliked =
			dislikedIds.has(comment.id) || !!comment.is_disliked
		const iconSize = compact ? 14 : 16

		return (
			<View className="mt-2 flex-row flex-wrap items-center gap-4">
				<Pressable
					onPress={() => handleToggleDislike(comment)}
					className="flex-row items-center gap-1 active:opacity-60"
				>
					<Ionicons
						name={isDisliked ? "thumbs-down" : "thumbs-down-outline"}
						size={iconSize}
						color={isDisliked ? "#f87171" : "#71717a"}
					/>
					<Text
						className={`text-xs font-bold ${isDisliked ? "text-red-400" : "text-zinc-500"}`}
					>
						{comment.dislikes_count && comment.dislikes_count > 0
							? comment.dislikes_count
							: "Dislike"}
					</Text>
				</Pressable>

				<Pressable
					onPress={() => {
						setReplyingTo(comment)
						inputRef.current?.focus()
					}}
					className="active:opacity-60"
				>
					<Text className="text-zinc-500 text-xs font-bold">
						Reply
					</Text>
				</Pressable>

				<Pressable
					onPress={() => handleShareComment(comment)}
					className="flex-row items-center gap-1 active:opacity-60"
				>
					<Ionicons
						name="share-outline"
						size={iconSize}
						color="#71717a"
					/>
					<Text className="text-zinc-500 text-xs font-bold">
						Share
					</Text>
				</Pressable>

				<Pressable
					onPress={() => showCommentMenu(comment)}
					className="active:opacity-60"
				>
					<Ionicons
						name="ellipsis-horizontal"
						size={iconSize + 2}
						color="#71717a"
					/>
				</Pressable>
			</View>
		)
	}

	const renderComment = (comment: Comment, isReply = false) => {
		const authorLabel = getAuthorLabel(comment)

		return (
			<View
				key={comment.id}
				className={isReply ? "ml-10 mt-4 flex-row gap-3" : "mb-6"}
			>
				{!isReply ? (
					<View className="flex-row gap-3">
						<View className="h-8 w-8 rounded-full bg-fuchsia-900 items-center justify-center">
							<Text className="text-white text-[10px]">
								{getInitial(authorLabel)}
							</Text>
						</View>
						<View className="flex-1">
							<Text className="text-zinc-400 text-[11px] font-semibold mb-1">
								{authorLabel}
							</Text>
							<Text className="text-white text-sm">
								{comment.content}
							</Text>
							{renderCommentActions(comment)}
						</View>
					</View>
				) : (
					<>
						<View className="h-6 w-6 rounded-full bg-zinc-800 items-center justify-center">
							<Text className="text-white text-[8px]">
								{getInitial(authorLabel)}
							</Text>
						</View>
						<View className="flex-1">
							<Text className="text-zinc-400 text-[10px] font-semibold mb-1">
								{authorLabel}
							</Text>
							<Text className="text-zinc-300 text-sm">
								{comment.content}
							</Text>
							{renderCommentActions(comment, true)}
						</View>
					</>
				)}

				{!isReply &&
					comment.replies?.map((reply) => renderComment(reply, true))}
			</View>
		)
	}

	const visibleComments = filterBlockedComments(comments, blockedUserIds)

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
						{visibleComments.length === 0 ? (
							<Text className="text-zinc-600 text-center mt-10">
								No comments yet. Be the first!
							</Text>
						) : (
							visibleComments.map((comment) =>
								renderComment(comment),
							)
						)}
					</ScrollView>

					<View className="pt-4 border-t border-white/5">
						{replyingTo && (
							<View className="flex-row justify-between mb-2 px-2">
								<Text className="text-fuchsia-400 text-xs">
									Replying to {getAuthorLabel(replyingTo)}...
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
