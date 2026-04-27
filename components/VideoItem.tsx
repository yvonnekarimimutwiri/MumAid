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
	onLoad: () => void
}

export default function VideoItem({
	video,
	screenHeight,
	isActive,
	shouldLoad,
	onLoad,
}: VideoItemProps) {
	const [status, setStatus] = useState<string>("loading")
    // console.log(video.video_file)
    // https://momaid-backend.onrender.com/
	const player = useVideoPlayer(
		shouldLoad
			? video.video_file
			: null,
		(p) => {
			p.loop = true
		},
	)

	useEffect(() => {
		if (!player) return
		const sub = player.addListener(
			"statusChange",
			({ status: newStatus }) => {
				setStatus(newStatus)
				if (newStatus === "readyToPlay") onLoad()
			},
		)
		return () => sub.remove()
	}, [player, onLoad])

	useEffect(() => {
		if (isActive && status === "readyToPlay") player.play()
		else player.pause()
	}, [isActive, status])

	const isError = status === "error"

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
							resizeMode="contain"
						/>
						<Text className="mt-4 text-zinc-500 font-medium text-lg">
							Video not found
						</Text>
					</View>
				)}
			</View>

			{/* RESTORED: Caption Overlay Styling */}
			{!isError && (
				<View className="absolute bottom-0 w-full p-6 pb-16 flex-row justify-center z-50">
					<View className="w-full rounded-2xl border border-white/10 bg-black/40 p-4">
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
							<Pressable className="flex-row items-center gap-2">
								<Ionicons
									name="chatbubble"
									size={20}
									color="white"
								/>
								<Text className="text-white text-xs font-semibold">
									0
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			)}

			{status === "loading" && shouldLoad && !isError && (
				<View className="absolute inset-0 items-center justify-center">
					<ActivityIndicator size="large" color="#d946ef" />
				</View>
			)}
		</View>
	)
}