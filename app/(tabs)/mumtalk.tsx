import MumTalkUploadButton from "@/components/MumTalkUploadButton"
import VideoItem, { VideoData } from "@/components/VideoItem"
import { useAuth } from "@/context/AuthContext"
import { feedApi } from "@/utils/feed"
import { useFocusEffect, useIsFocused } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "expo-router"
import { setStatusBarStyle } from "expo-status-bar"
import { useCallback, useEffect, useState } from "react"
import {
	ActivityIndicator,
	Dimensions,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native"

export default function FeedScreen() {
	const { token } = useAuth()
	const navigation = useNavigation()
	const isFocused = useIsFocused()

	const [videos, setVideos] = useState<VideoData[]>([])
	const [viewHeight, setViewHeight] = useState(
		Dimensions.get("window").height,
	)
	const [activeIndex, setActiveIndex] = useState(0)
	const [loading, setLoading] = useState(true)
	const [isVideoReady, setIsVideoReady] = useState(false)

	// RESTORED: TabBar & Status Bar Styling
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

	if (loading) return <ActivityIndicator className="flex-1" color="#d946ef" />

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

			{videos.length === 0 ? (
				<View className="h-screen flex-1 items-center justify-center p-4">
					<Text className="text-lg font-bold text-white">
						No videos available
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
							onLoad={() => {
								if (activeIndex === index) setIsVideoReady(true)
							}}
						/>
					))}
				</ScrollView>
			)}
		</View>
	)
}
