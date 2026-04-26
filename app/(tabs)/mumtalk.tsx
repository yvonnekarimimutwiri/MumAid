import { CommentType, VIDEOS } from "@/data/mockdata"
import { getTotalCommentsCount } from "@/utils/functions"
import { Ionicons } from "@expo/vector-icons"
import { useFocusEffect, useIsFocused } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "expo-router"
import { setStatusBarStyle } from "expo-status-bar"
import { useVideoPlayer, VideoView } from "expo-video"
import { useCallback, useEffect, useRef, useState } from "react"
import {
	ActivityIndicator,
	Dimensions,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	LayoutChangeEvent,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native"

export default function FeedScreen() {
	const [viewHeight, setViewHeight] = useState(
		Dimensions.get("window").height,
	)
	const [isVideoReady, setIsVideoReady] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)
	const isFocused = useIsFocused()

	const navigation = useNavigation()

	useFocusEffect(
		useCallback(() => {
			setStatusBarStyle("light")

			navigation?.setOptions({
				tabBarStyle: {
					backgroundColor: "#000000",
					borderTopColor: "rgba(0,0,0,0)",
					height: 88,
					paddingBottom: 28,
					paddingTop: 12,
				},
				tabBarActiveTintColor: "#d946ef",
				tabBarInactiveTintColor: "#ffffff",
			})

			return () => {
				setStatusBarStyle("dark")

				navigation?.setOptions({
					tabBarStyle: {
						backgroundColor: "#fefbfd",
						borderTopColor: "#f1f5f9",
					},
					tabBarActiveTintColor: "#6E3F9C",
					tabBarInactiveTintColor:
						Platform.OS === "ios" ? "#000000" : "#52637a",
				})
			}
		}, [navigation]),
	)

	const handleLayout = (event: LayoutChangeEvent) => {
		setViewHeight(event.nativeEvent.layout.height)
	}

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const yOffset = event.nativeEvent.contentOffset.y
		const index = Math.round(yOffset / viewHeight)
		if (index !== activeIndex) {
			setActiveIndex(index)
			setIsVideoReady(false)
		}
	}

	const pickVideo = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["videos"],
			allowsEditing: true,
			quality: 1,
		})
		if (!result.canceled) {
			console.log("Selected video:", result.assets[0].uri)
		}
	}

	return (
		<View className="flex-1 bg-black" onLayout={handleLayout}>
			<LinearGradient
				colors={
					isVideoReady
						? ["#000000", "#000000", "#000000"]
						: ["#501584", "#3b1060", "#000000"]
				}
				style={StyleSheet.absoluteFillObject}
				locations={[0, 0.3, 0.7]}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
			/>

			<View className="absolute top-12 left-auto right-[12px] z-50">
				<Pressable
					onPress={pickVideo}
					className="h-12 w-12 items-center justify-center rounded-full bg-fuchsia-500 shadow-lg active:scale-95"
				>
					<Ionicons name="add" size={30} color="white" />
				</Pressable>
			</View>

			<ScrollView
				pagingEnabled
				onScroll={handleScroll}
				scrollEventThrottle={16}
				showsVerticalScrollIndicator={false}
				snapToInterval={viewHeight}
				decelerationRate="fast"
				disableIntervalMomentum
				contentContainerStyle={{ height: viewHeight * VIDEOS.length }}
			>
				{VIDEOS.map((video, index) => (
					<VideoItem
						key={video.id}
						video={video}
						screenHeight={viewHeight}
						isActive={isFocused && activeIndex === index}
						shouldLoad={Math.abs(activeIndex - index) <= 1}
						onLoad={() => {
							if (activeIndex === index) setIsVideoReady(true)
						}}
					/>
				))}
			</ScrollView>
		</View>
	)
}

function VideoItem({
	video,
	screenHeight,
	isActive,
	shouldLoad,
	onLoad,
}: {
	video: any
	screenHeight: number
	isActive: boolean
	shouldLoad: boolean
	onLoad: () => void
}) {
	const [status, setStatus] = useState<string>("loading")
	const [isUserPaused, setIsUserPaused] = useState(false)
	const [showComments, setShowComments] = useState(false)
	const [commentText, setCommentText] = useState("")
	const [replyTarget, setReplyTarget] = useState<string | null>(null)
	const inputRef = useRef<TextInput>(null)

	const handleReplyRequest = (user: string) => {
		setReplyTarget(user)
		setCommentText(`@${user} `) // Pre-fill the mention
		inputRef.current?.focus()
	}

	const submitComment = () => {
		if (!commentText.trim()) return
		console.log(`Submitting to ${replyTarget || "Video"}: ${commentText}`)
		// Reset after submit
		setCommentText("")
		setReplyTarget(null)
		Keyboard.dismiss()
	}

	const player = useVideoPlayer(shouldLoad ? video.source : null, (p) => {
		p.loop = true
	})

	// Reset pause state when scrolling to a new video
	useEffect(() => {
		if (!isActive) {
			setIsUserPaused(false)
		}
	}, [isActive])

	// CORE PLAYBACK LOGIC
	useEffect(() => {
		if (!player) return

		if (isActive && !isUserPaused && status !== "error") {
			player.play()
		} else {
			player.pause()
		}
	}, [isActive, isUserPaused, player, status])

	useEffect(() => {
		if (!player) return
		const sub = player.addListener(
			"statusChange",
			({ status: newStatus }) => {
				setStatus(newStatus)
				if (newStatus === "readyToPlay") {
					onLoad()
				}
			},
		)
		return () => sub.remove()
	}, [player, isActive, onLoad])

	useEffect(() => {
		if (isActive && status === "readyToPlay") {
			onLoad()
		}
	}, [isActive, status, onLoad])

	const togglePlay = () => {
		if (!player || status === "error") {
			return
		}

		if (!isUserPaused) {
			player.pause()
			setIsUserPaused(true)
		} else {
			player.play()
			setIsUserPaused(false)
		}
	}

	const isError = status === "error"

	return (
		<View style={{ height: screenHeight }} className="w-full relative">
			<View style={StyleSheet.absoluteFill} className="overflow-hidden">
				{!isError ? (
					<VideoView
						player={player}
						style={{
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
							// aspectRatio: 9 / 16,
							height: "100%",
							width: "100%",
						}}
						contentFit="contain"
						nativeControls={false}
					/>
				) : (
					<View className="flex-1 items-center justify-center">
						<Image
							source={require("@/assets/icons/mumaid-icon-no-bg.png")}
							style={{ width: 120, height: 120 }}
							resizeMode="contain"
						/>
						<Text className="mt-4 text-zinc-500 font-medium text-lg">
							Video not found
						</Text>
					</View>
				)}
			</View>

			<Pressable
				onPress={togglePlay}
				style={StyleSheet.absoluteFill}
				className="z-30 justify-center items-center"
			>
				{/* Play Button Overlay */}
				{isUserPaused && status === "readyToPlay" && !isError && (
					<View
						pointerEvents="none"
						className="absolute inset-0 z-20 items-center justify-center"
					>
						<View className="bg-black/40 p-6 rounded-full">
							<Ionicons
								name="play"
								size={60}
								color="rgba(255,255,255,0.6)"
							/>
						</View>
					</View>
				)}

				{/* Loading */}
				{(status === "loading" || status === "buffering" || !player) &&
					shouldLoad &&
					!isError && (
						<View className="absolute inset-0 z-30 items-center justify-center">
							<ActivityIndicator size="large" color="#d946ef" />
						</View>
					)}
			</Pressable>

			{/* Caption Overlay */}
			{!isError && (
				<View
					// pointerEvents="box-none"
					className="absolute bottom-0 w-full p-6 pb-16 flex-row justify-center z-50"
				>
					<View className="w-full rounded-2xl border border-white/10 bg-black/40 p-4">
						<Text className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">
							{video.topic}
						</Text>
						<Text className="mt-2 text-base font-medium leading-5 text-white">
							{video.caption}
						</Text>
						<View className="mt-4 flex-row items-center gap-6">
							<Pressable
								onPress={() => console.log("Like")}
								className="flex-row items-center gap-2"
							>
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
								onPress={() => console.log("Share")}
								className="flex-row items-center gap-2"
							>
								<Ionicons
									name="share-social"
									size={22}
									color="white"
								/>
								<Text className="text-white text-xs font-semibold">
									Share
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
									{getTotalCommentsCount(video.comments)}
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			)}

			{showComments && (
				<View className="absolute inset-0 z-[60] bg-black/60">
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						className="flex-1"
					>
						<Pressable
							className="flex-1"
							onPress={() => setShowComments(false)}
						/>

						<View className="h-[70%] bg-zinc-950 rounded-t-[32px] border-t border-white/10 shadow-2xl">
							{/* Header */}
							<View className="flex-row items-center justify-between p-6 border-b border-white/5">
								<Text className="text-white font-bold text-lg">
									{video.comments.length} Comments
								</Text>
								<Pressable
									onPress={() => setShowComments(false)}
								>
									<Ionicons
										name="close"
										size={24}
										color="white"
									/>
								</Pressable>
							</View>

							{/* List */}
							<ScrollView
								className="flex-1 p-6"
								showsVerticalScrollIndicator={false}
							>
								{video.comments.map(
									(comment: CommentType, index: number) => (
										<CommentItem
											key={index}
											comment={comment}
											onReply={handleReplyRequest}
										/>
									),
								)}
							</ScrollView>

							{/* Input Area */}
							<View className="p-4 bg-zinc-950 border-t border-white/10">
								{replyTarget && (
									<View className="flex-row justify-between items-center mb-2 px-2">
										<Text className="text-zinc-500 text-xs">
											Replying to @{replyTarget}
										</Text>
										<Pressable
											onPress={() => setReplyTarget(null)}
										>
											<Text className="text-fuchsia-500 text-xs">
												Cancel
											</Text>
										</Pressable>
									</View>
								)}
								<View className="flex-row items-center gap-3 bg-zinc-900 rounded-2xl px-4 py-2">
									<TextInput
										ref={inputRef}
										className="flex-1 text-white py-2"
										placeholder="Add a comment..."
										placeholderTextColor="#71717a"
										value={commentText}
										onChangeText={setCommentText}
										multiline
									/>
									<Pressable
										onPress={submitComment}
										disabled={!commentText.trim()}
										className={
											commentText.trim()
												? "opacity-100"
												: "opacity-30"
										}
									>
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
				</View>
			)}
		</View>
	)
}

function CommentItem({
	comment,
	depth = 0,
	onReply,
}: {
	comment: CommentType
	depth?: number
	onReply: (user: string) => void
}) {
	const [showReplies, setShowReplies] = useState(false)
	const hasReplies = comment.replies && comment.replies.length > 0

	return (
		<View style={{ marginLeft: depth > 0 ? 12 : 0 }} className="mb-4">
			<View className="flex-row gap-3">
				<View className="h-8 w-8 rounded-full bg-zinc-800 items-center justify-center border border-white/10">
					<Text className="text-white text-xs font-bold">
						{comment.user[0].toUpperCase()}
					</Text>
				</View>
				<View className="flex-1">
					<Text className="text-zinc-400 text-xs font-bold">
						@{comment.user}
					</Text>
					<Text className="text-white text-sm mt-0.5">
						{comment.text}
					</Text>

					<View className="flex-row items-center gap-4 mt-2">
						<Pressable onPress={() => onReply(comment.user)}>
							<Text className="text-zinc-500 text-xs font-bold">
								Reply
							</Text>
						</Pressable>

						{hasReplies && (
							<Pressable
								onPress={() => setShowReplies(!showReplies)}
							>
								<Text className="text-fuchsia-400 text-xs font-bold">
									{showReplies
										? "Hide"
										: `View ${comment.replies ? getTotalCommentsCount(comment.replies) : 0} replies`}
								</Text>
							</Pressable>
						)}
					</View>
				</View>
			</View>

			{showReplies && hasReplies && (
				<View className="mt-3 border-l-2 border-zinc-900 ml-4">
					{comment.replies!.map((reply, index) => (
						<CommentItem
							key={index}
							comment={reply}
							depth={depth + 1}
							onReply={onReply}
						/>
					))}
				</View>
			)}
		</View>
	)
}