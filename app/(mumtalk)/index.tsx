import MumTalkUploadButton from "@/components/MumTalkUploadButton"
import VideoItem, { VideoData } from "@/components/VideoItem"
import { useAuth } from "@/context/AuthContext"
import { feedApi } from "@/utils/feed"
import { useIsFocused } from "@react-navigation/native"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import {
	ActivityIndicator,
	Dimensions,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native"

export default function FeedScreen() {
	const { token } = useAuth()
	const isFocused = useIsFocused()

	const [videos, setVideos] = useState<VideoData[]>([])
	const [viewHeight, setViewHeight] = useState(
		Dimensions.get("window").height,
	)
	const [activeIndex, setActiveIndex] = useState(0)
	const [loading, setLoading] = useState(true)
	const [isVideoReady, setIsVideoReady] = useState(false)

	useEffect(() => {
		const loadFeed = async () => {
			if (!token) return
			try {
				const res = await feedApi.getAllVideos(token)
				if (res.ok) {
					const data = await res.json()
					setVideos(data)
				}
			} finally {
				setLoading(false)
			}
		}
		loadFeed()
	}, [token])

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const index = Math.round(event.nativeEvent.contentOffset.y / viewHeight)
		if (index !== activeIndex) {
			setActiveIndex(index)
			setIsVideoReady(false)
		}
	}

	return (
		<View
			className="flex-1 bg-black"
			onLayout={(e) => setViewHeight(e.nativeEvent.layout.height)}
		>
			<LinearGradient
				colors={
					isVideoReady
						? ["#000000", "#000000", "#000000"]
						: ["#501584", "#3b1060", "#000000"]
				}
				style={StyleSheet.absoluteFillObject}
				locations={[0, 0.3, 0.7]}
			/>

			<MumTalkUploadButton
				onUploadSuccess={(newVid) =>
					setVideos((prev) => [newVid, ...prev])
				}
			/>

			{loading ? (
				<ActivityIndicator className="flex-1" color="#d946ef" />
			) : videos.length === 0 ? (
				<View className="flex-1 items-center justify-center">
					<Image
						source={require("@/assets/icons/mumaid-icon-no-bg.png")}
						style={{ width: 120, height: 120 }}
					/>
					<Text className="mt-4 text-zinc-500">
						No Videos Available
					</Text>
				</View>
			) : (
				<ScrollView
					pagingEnabled
					onScroll={handleScroll}
					scrollEventThrottle={16}
					snapToInterval={viewHeight}
					decelerationRate="fast"
					showsVerticalScrollIndicator={false}
				>
					{videos.map((video, index) => (
						<VideoItem
							key={video.id}
							video={video}
							screenHeight={viewHeight}
							isActive={isFocused && activeIndex === index}
							shouldLoad={Math.abs(activeIndex - index) <= 1}
							onLoad={(isTrue) => {
								if (activeIndex === index) {
									if (isTrue) {
										setIsVideoReady(true)
									} else {
										setIsVideoReady(false)
									}
								}
							}}
						/>
					))}
				</ScrollView>
			)}
		</View>
	)
}
