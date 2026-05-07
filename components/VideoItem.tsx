import { Ionicons } from "@expo/vector-icons"
import { useVideoPlayer, VideoView } from "expo-video"
import { useState, useEffect } from "react"
import {
	View,
	Text,
	Image,
	ActivityIndicator,
	Pressable,
	StyleSheet,
} from "react-native"
import VideoComments from "./VideoComments" // Update with your actual path

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
	const [status, setStatus] = useState<string>("loading")
	const [isUserPaused, setIsUserPaused] = useState(false)
	const [showComments, setShowComments] = useState(false)

	const player = useVideoPlayer(
		shouldLoad ? video.video_file.replace("video/upload/", "") : null,
		(p) => {
			p.loop = true
		},
	)

	const isError = status === "error"

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
			if (s === "readyToPlay") {
				onLoad(true)
			} else if (s === "error") {
				onLoad(false)
			}
		})

		if (isActive && status === "readyToPlay") {
			onLoad(true)
		}

		return () => sub.remove()
	}, [player, onLoad, isActive, status])

	const togglePlay = () => setIsUserPaused(!isUserPaused)

	return (
		<View style={{ height: screenHeight }} className="w-full relative">
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

						<View className="mt-4 flex-row items-center gap-6">
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

			<VideoComments
				videoId={video.id}
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
