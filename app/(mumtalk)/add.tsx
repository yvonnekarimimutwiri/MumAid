import { useAuth } from "@/context/AuthContext"
import { Ionicons } from "@expo/vector-icons"
import {
	CameraRecordingOptions,
	CameraView,
	useCameraPermissions,
	useMicrophonePermissions,
} from "expo-camera"
import * as ImagePicker from "expo-image-picker"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { Video, ResizeMode } from "expo-av"
import React, { useRef, useState } from "react"
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"

export default function AddVideoScreen() {
	const router = useRouter()
	const { token } = useAuth()

	// Media Selection/Recording State
	const [videoUri, setVideoUri] = useState<string | null>(null)
	const [facing, setFacing] = useState<"front" | "back">("front")
	const [isRecording, setIsRecording] = useState(false)

	// Form inputs
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")

	// Upload & Progress states
	const [uploading, setUploading] = useState(false)
	const [progress, setProgress] = useState(0)

	// Permissions Hooks
	const [cameraPermission, requestCameraPermission] = useCameraPermissions()
	const [microphonePermission, requestMicrophonePermission] =
		useMicrophonePermissions()
	const cameraRef = useRef<CameraView>(null)

	if (!cameraPermission || !microphonePermission) {
		return (
			<View className="flex-1 bg-black items-center justify-center">
				<ActivityIndicator color="#d946ef" size="large" />
			</View>
		)
	}

	if (!cameraPermission.granted || !microphonePermission.granted) {
		return (
			<View className="flex-1 bg-black items-center justify-center p-6">
				<Text className="text-white text-center text-lg font-semibold mb-4">
					We need camera and microphone permissions to record videos.
				</Text>
				<TouchableOpacity
					className="bg-magenta-cbd or bg-[#d946ef] px-6 py-3 rounded-full"
					onPress={async () => {
						await requestCameraPermission()
						await requestMicrophonePermission()
					}}
				>
					<Text className="text-white font-bold">
						Grant Permissions
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	// Pick Video from File Directory
	const pickVideo = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Videos,
			allowsEditing: true,
			quality: 1,
		})

		if (!result.canceled && result.assets && result.assets[0].uri) {
			setVideoUri(result.assets[0].uri)
		}
	}

	// Toggle Recording Actions
	const handleRecordToggle = async () => {
		if (isRecording) {
			cameraRef.current?.stopRecording()
			setIsRecording(false)
		} else {
			if (cameraRef.current) {
				try {
					setIsRecording(true)
					const options: CameraRecordingOptions = { maxDuration: 60 }
					const recordPromise = cameraRef.current.recordAsync(options)

					if (recordPromise) {
						const data = await recordPromise
						if (data?.uri) setVideoUri(data.uri)
					}
				} catch (err) {
					console.error("Failed to record video:", err)
				} finally {
					setIsRecording(false)
				}
			}
		}
	}

	// Simulated XMLHttpRequest to expose clean chunked upload tracking metrics
	const handleUpload = async () => {
		if (!videoUri || !title.trim()) return
		setUploading(true)
		setProgress(0)

		const formData = new FormData()
		// @ts-ignore
		formData.append("video", {
			uri:
				Platform.OS === "android"
					? videoUri
					: videoUri.replace("file://", ""),
			type: "video/mp4",
			name: "mumtalk_upload.mp4",
		})
		formData.append("title", title)
		formData.append("description", description)

		try {
			const xhr = new XMLHttpRequest()
			xhr.open("POST", "YOUR_BACKEND_UPLOAD_URL_HERE") // Replace with endpoint configuration
			xhr.setRequestHeader("Authorization", `Bearer ${token}`)

			xhr.upload.addEventListener("progress", (event) => {
				if (event.lengthComputable) {
					const percentage = Math.round(
						(event.loaded / event.total) * 100,
					)
					setProgress(percentage)
				}
			})

			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					setUploading(false)
					if (xhr.status === 200 || xhr.status === 201) {
						router.replace("/(mumtalk)")
					} else {
						alert(
							"Upload failed. Please check network connectivity.",
						)
					}
				}
			}

			xhr.send(formData)
		} catch (error) {
			console.error("Upload process crash error:", error)
			setUploading(false)
		}
	}

	const resetFlow = () => {
		setVideoUri(null)
		setTitle("")
		setDescription("")
		setProgress(0)
	}

	// STEP 2: Render metadata form inputs with embedded Video preview
	if (videoUri) {
		return (
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="flex-1 bg-black"
			>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps="handled"
				>
					<View className="flex-1 p-6 justify-center">
						<Text className="text-white text-2xl font-bold mb-6 text-center">
							Post to MumTalk
						</Text>

						{/* Video Preview Canvas */}
						<View className="w-full h-64 rounded-2xl overflow-hidden mb-6 bg-zinc-900 border border-zinc-800">
							<Video
								source={{ uri: videoUri }}
								rate={1.0}
								volume={1.0}
								isMuted={false}
								resizeMode={ResizeMode.CONTAIN}
								shouldPlay
								isLooping
								style={{ flex: 1 }}
							/>
						</View>

						{/* Form Inputs */}
						<Text className="text-zinc-400 font-semibold mb-2 ml-1">
							Title
						</Text>
						<TextInput
							value={title}
							onChangeText={setTitle}
							placeholder="Give your video a clear title..."
							placeholderTextColor="#52525b"
							className="bg-zinc-900 text-white p-4 rounded-xl mb-4 border border-zinc-800 focus:border-[#d946ef]"
							editable={!uploading}
						/>

						<Text className="text-zinc-400 font-semibold mb-2 ml-1">
							Description
						</Text>
						<TextInput
							value={description}
							onChangeText={setDescription}
							placeholder="Add context or advice details..."
							placeholderTextColor="#52525b"
							multiline
							numberOfLines={4}
							className="bg-zinc-900 text-white p-4 rounded-xl mb-6 border border-zinc-800 focus:border-[#d946ef] h-28 text-top"
							editable={!uploading}
						/>

						{/* Progress Metrics UI */}
						{uploading && (
							<View className="w-full mb-6">
								<View className="flex-row justify-between mb-2">
									<Text className="text-zinc-400 font-medium">
										Uploading video content...
									</Text>
									<Text className="text-[#d946ef] font-bold">
										{progress}%
									</Text>
								</View>
								<View className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
									<View
										style={{ width: `${progress}%` }}
										className="h-full bg-[#d946ef]"
									/>
								</View>
							</View>
						)}

						{/* Submissions Action Block */}
						{!uploading && (
							<View className="space-y-3">
								<TouchableOpacity
									disabled={!title.trim()}
									onPress={handleUpload}
									style={{ opacity: title.trim() ? 1 : 0.5 }}
									className="bg-[#d946ef] p-4 rounded-xl flex-row items-center justify-center"
								>
									<Ionicons
										name="cloud-upload-outline"
										size={20}
										color="white"
										className="mr-2"
									/>
									<Text className="text-white font-bold text-lg">
										Upload Post
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={resetFlow}
									className="bg-transparent border border-zinc-700 p-4 rounded-xl mt-2"
								>
									<Text className="text-zinc-400 font-bold text-center text-lg">
										Cancel & Retake
									</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		)
	}

	// STEP 1: Capture Interface Display (Camera Overlay / Gallery Target selection)
	return (
		<View className="flex-1 bg-black">
			<CameraView
				ref={cameraRef}
				facing={facing}
				mode="video"
				style={StyleSheet.absoluteFillObject}
			>
				<LinearGradient
					colors={[
						"rgba(0,0,0,0.6)",
						"transparent",
						"rgba(0,0,0,0.8)",
					]}
					style={StyleSheet.absoluteFillObject}
					locations={[0, 0.4, 0.85]}
				/>

				{/* Top Actions Floating Interface */}
				<View className="flex-row justify-between px-6 pt-14 items-center">
					<TouchableOpacity
						onPress={() => router.back()}
						className="p-2 rounded-full bg-black/40"
					>
						<Ionicons name="close" size={28} color="white" />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() =>
							setFacing((current) =>
								current === "front" ? "back" : "front",
							)
						}
						className="p-2 rounded-full bg-black/40"
					>
						<Ionicons
							name="camera-reverse-outline"
							size={28}
							color="white"
						/>
					</TouchableOpacity>
				</View>

				{/* Control Execution Base Bar */}
				<View className="absolute bottom-12 left-0 right-0 flex-row justify-around items-center px-8">
					{/* Gallery Selector Button */}
					<TouchableOpacity
						onPress={pickVideo}
						className="p-3 bg-black/40 rounded-full border border-zinc-700"
					>
						<Ionicons
							name="images-outline"
							size={26}
							color="white"
						/>
					</TouchableOpacity>

					{/* Center Native Recording Trigger */}
					<TouchableOpacity
						onPress={handleRecordToggle}
						className={`w-20 h-20 rounded-full border-4 justify-center items-center ${
							isRecording
								? "border-red-500 bg-red-500/20"
								: "border-white"
						}`}
					>
						<View
							className={`rounded-full ${isRecording ? "w-8 h-8 bg-red-500 rounded-md" : "w-16 h-16 bg-white"}`}
						/>
					</TouchableOpacity>

					{/* Aesthetic balancer item matching grid space */}
					<View className="w-14 h-14 items-center justify-center opacity-0" />
				</View>
			</CameraView>
		</View>
	)
}
