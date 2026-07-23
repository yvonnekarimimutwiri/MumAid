import { Ionicons } from "@expo/vector-icons"
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av"
import { useState, useEffect, useCallback, useRef } from "react"
import {
	View,
	Text,
	Image,
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Share,
} from "react-native"
import VideoComments from "./VideoComments"
import { useAuth } from "@/context/AuthContext"
import { feedInteractions } from "@/utils/feedInteractions"
import { mumtalkStorage } from "@/utils/mumtalkStorage"

export interface VideoData {
	id: number
	video_file: string
	attributes: {
		title: string
		description?: string
	}
}

interface VideoItemProps {
	video: VideoData
	screenHeight: number
	isActive: boolean
	shouldLoad: boolean
	onLoad: (arg0: boolean) => void
}

export default function VideoItem({
	video,
	screenHeight,
	isActive,
	shouldLoad,
	onLoad,
}: VideoItemProps) {
	const { token } = useAuth()
	const videoRef = useRef<Video>(null)
	const [status, setStatus] = useState<string>("loading")
	const [isUserPaused, setIsUserPaused] = useState(false)
	const [showComments, setShowComments] = useState(false)
	const [isSaved, setIsSaved] = useState(false)

	const isError = status === "error"
	const videoUrl = shouldLoad
		? video.video_file.replace("video/upload/", "")
		: ""

	// Handle play/pause commands based on activation state change loops
	useEffect(() => {
		if (!videoRef.current || status === "loading" || status === "error")
			return

		if (isActive && !isUserPaused) {
			videoRef.current
				.playAsync()
				.catch((err) => console.log("Play failed: ", err))
		} else {
			videoRef.current
				.pauseAsync()
				.catch((err) => console.log("Pause failed: ", err))
		}
	}, [isActive, isUserPaused, status])

	// Monitor loading lifecycle metrics cleanly via inline context objects
	const handlePlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
		if (!playbackStatus.isLoaded) {
			if (playbackStatus.error) {
				setStatus("error")
				onLoad(false)
			} else {
				setStatus("loading")
			}
		} else {
			if (playbackStatus.isBuffering) {
				setStatus("buffering")
			} else {
				setStatus("readyToPlay")
				onLoad(true)
			}
		}
	}

	const togglePlay = () => setIsUserPaused(!isUserPaused)

	useEffect(() => {
		mumtalkStorage.isVideoSaved(video.id).then(setIsSaved)
	}, [video.id])

	const handleShare = async () => {
		const title = video.attributes.title
		const description = video.attributes.description
		try {
			await Share.share({
				message: `${title}${description ? `\n\n${description}` : ""}\n\nWatch on MumAid`,
				url: video.video_file,
			})
		} catch (e) {
			console.error("Share failed", e)
		}
	}

	const handleToggleSave = useCallback(async () => {
		if (!token) return
		const nextSaved = !isSaved
		setIsSaved(nextSaved)
		await feedInteractions.toggleVideoSave(
			token,
			{
				id: video.id,
				title: video.attributes.title,
				description: video.attributes.description,
				videoUrl: video.video_file,
			},
			nextSaved,
		)
	}, [token, isSaved, video])

	return (
		<View style={{ height: screenHeight }} className="w-full relative">
			<View style={StyleSheet.absoluteFill} className="overflow-hidden">
				{!isError && videoUrl ? (
					<Video
						ref={videoRef}
						source={{ uri: videoUrl }}
						style={StyleSheet.absoluteFill}
						resizeMode={ResizeMode.CONTAIN}
						shouldPlay={isActive && !isUserPaused}
						isLooping
						onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
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

						<View className="mt-4 flex-row items-center flex-wrap gap-5">
							<Pressable
								onPress={() => setShowComments(true)}
								className="flex-row items-center gap-2 active:opacity-70"
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
							<Pressable
								onPress={handleShare}
								className="flex-row items-center gap-2 active:opacity-70"
							>
								<Ionicons
									name="share-social-outline"
									size={20}
									color="white"
								/>
								<Text className="text-white text-xs font-semibold">
									Share
								</Text>
							</Pressable>
							<Pressable
								onPress={handleToggleSave}
								className="flex-row items-center gap-2 active:opacity-70"
							>
								<Ionicons
									name={
										isSaved
											? "bookmark"
											: "bookmark-outline"
									}
									size={20}
									color={isSaved ? "#d946ef" : "white"}
								/>
								<Text
									className={`text-xs font-semibold ${isSaved ? "text-fuchsia-400" : "text-white"}`}
								>
									{isSaved ? "Saved" : "Save"}
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			)}

			<VideoComments
				videoId={video.id}
				videoTitle={video.attributes.title}
				visible={showComments}
				onClose={() => setShowComments(false)}
			/>

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
