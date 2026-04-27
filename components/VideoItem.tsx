import { BASE_URL } from "@/constants/Config"
import { useAuth } from "@/context/AuthContext"
import { Ionicons } from "@expo/vector-icons"
import { useVideoPlayer, VideoView } from "expo-video"
import { useState, useEffect, useCallback, useRef } from "react"
import {
	View,
	Text,
	Image,
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Modal,
	ScrollView,
	TextInput,
	KeyboardAvoidingView,
	Platform,
} from "react-native"

export interface VideoData {
	id: number
	video_file: string
	attributes: {
		title: string
		description?: string
	}
}

interface Comment {
	id: number
	content: string
	created_at: string
	replies?: Comment[]
}

interface VideoItemProps {
	video: VideoData
	screenHeight: number
	isActive: boolean
	shouldLoad: boolean
	onLoad: () => void
}

export default function VideoItem({
	video,
	screenHeight,
	isActive,
	shouldLoad,
	onLoad,
}: VideoItemProps) {
	const { token } = useAuth()
	const [status, setStatus] = useState<string>("loading")
	const [isUserPaused, setIsUserPaused] = useState(false)

	// Comment State
	const [showComments, setShowComments] = useState(false)
	const [comments, setComments] = useState<Comment[]>([])
	const [newComment, setNewComment] = useState("")
	const [replyingTo, setReplyingTo] = useState<Comment | null>(null)
	const inputRef = useRef<TextInput>(null)

	const player = useVideoPlayer(shouldLoad ? video.video_file : null, (p) => {
		p.loop = true
	})

	// 1. Fetch Comments
	const fetchComments = useCallback(async () => {
		try {
			const res = await fetch(
				`${BASE_URL}/api/feeds/v1/videos/${video.id}/comments/`,
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
	}, [video.id, token])

	useEffect(() => {
		if (showComments) fetchComments()
	}, [showComments, fetchComments])

	// 2. Play/Pause Logic
	useEffect(() => {
		if (!player) return
		if (isActive && !isUserPaused && status === "readyToPlay") {
			player.play()
		} else {
			player.pause()
		}
	}, [isActive, isUserPaused, status, player])

	useEffect(() => {
		if (!player) return
		const sub = player.addListener("statusChange", ({ status: s }) => {
			setStatus(s)
			if (s === "readyToPlay") onLoad()
		})
		return () => sub.remove()
	}, [player, onLoad])

	const togglePlay = () => setIsUserPaused(!isUserPaused)

	// 3. Post Comment/Reply
	const handlePostComment = async () => {
		if (!newComment.trim()) return

		const url = replyingTo
			? `${BASE_URL}/api/feeds/v1/comments/${replyingTo.id}/reply/`
			: `${BASE_URL}/api/feeds/v1/videos/${video.id}/comments/create/`

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

	const isError = status === "error"

	return (
		<View
			style={{ height: screenHeight }}
			className="w-full relative bg-black"
		>
			<View style={StyleSheet.absoluteFill} className="overflow-hidden">
				{!isError ? (
					<VideoView
						player={player}
						style={StyleSheet.absoluteFill}
						contentFit="contain"
						nativeControls={false}
					/>
				) : (
					<View className="flex-1 items-center justify-center">
						<Image
							source={require("@/assets/icons/mumaid-icon-no-bg.png")}
							style={{ width: 120, height: 120 }}
						/>
						<Text className="mt-4 text-zinc-500">
							Video not found
						</Text>
					</View>
				)}
			</View>

			{/* PAUSE LAYER: Invisible but clickable area between video and UI */}
			<Pressable
				onPress={togglePlay}
				style={StyleSheet.absoluteFill}
				className="z-20 items-center justify-center"
			>
				{isUserPaused && status === "readyToPlay" && (
					<View className="bg-black/40 p-6 rounded-full">
						<Ionicons
							name="play"
							size={50}
							color="rgba(255,255,255,0.7)"
						/>
					</View>
				)}
			</Pressable>

			{/* CAPTION OVERLAY: High Z-Index to stay above pause layer */}
			{!isError && (
				<View
					className="absolute bottom-0 w-full p-6 pb-16 z-30"
					pointerEvents="box-none"
				>
					<View className="w-full rounded-2xl border border-white/10 bg-black/50 p-4 shadow-2xl">
						<Text className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">
							{video.attributes.title}
						</Text>
						<Text className="mt-2 text-base font-medium leading-5 text-white">
							{video.attributes.description}
						</Text>

						<View className="mt-4 flex-row items-center gap-6">
							<Pressable className="flex-row items-center gap-2">
								<Ionicons
									name="heart"
									size={22}
									color="white"
								/>
								<Text className="text-white text-xs font-semibold">
									Like
								</Text>
							</Pressable>
							<Pressable
								onPress={() => setShowComments(true)}
								className="flex-row items-center gap-2"
							>
								<Ionicons
									name="chatbubble"
									size={20}
									color="white"
								/>
								<Text className="text-white text-xs font-semibold">
									Comments
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			)}

			{/* COMMENTS MODAL */}
			<Modal visible={showComments} animationType="slide" transparent>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					className="flex-1 bg-black/60"
				>
					<Pressable
						className="flex-1"
						onPress={() => setShowComments(false)}
					/>
					<View className="h-[75%] bg-zinc-950 rounded-t-[32px] border-t border-white/10 p-6">
						<View className="flex-row justify-between items-center mb-6">
							<Text className="text-white font-bold text-lg">
								Comments
							</Text>
							<Pressable onPress={() => setShowComments(false)}>
								<Ionicons
									name="close"
									size={24}
									color="white"
								/>
							</Pressable>
						</View>

						<ScrollView className="flex-1">
							{comments.map((comment) => (
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

									{/* 1-Level Nested Replies */}
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
							))}
						</ScrollView>

						{/* Input Bar */}
						<View className="pt-4 border-t border-white/5">
							{replyingTo && (
								<View className="flex-row justify-between mb-2 px-2">
									<Text className="text-fuchsia-400 text-xs">
										Replying to comment...
									</Text>
									<Pressable
										onPress={() => setReplyingTo(null)}
									>
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

			{(status === "loading" || status === "buffering") &&
				shouldLoad &&
				!isError && (
					<View className="absolute inset-0 items-center justify-center z-10">
						<ActivityIndicator size="large" color="#d946ef" />
					</View>
				)}
		</View>
	)
}
