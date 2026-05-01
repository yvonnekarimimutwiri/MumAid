import { BASE_URL } from "@/constants/Config"
import { useAuth } from "@/context/AuthContext"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import React, { useRef, useState } from "react"
import {
	Alert,
	KeyboardAvoidingView,
	Modal,
	Platform,
	Pressable,
	Text,
	TextInput,
	View,
} from "react-native"

export default function MumTalkUploadButton({
	onUploadSuccess,
}: {
	onUploadSuccess: (v: any) => void
}) {
	const { token } = useAuth()
	const [isUploading, setIsUploading] = useState(false)
	const [uploadProgress, setUploadProgress] = useState(0)

	const [showModal, setShowModal] = useState(false)
	const [tempUri, setTempUri] = useState("")
	const [title, setTitle] = useState("") // Added title
	const [description, setDescription] = useState("")

	const xhrRef = useRef<XMLHttpRequest | null>(null)

	const uploadWithProgress = (
		uri: string,
		vidTitle: string,
		desc: string,
	) => {
		setIsUploading(true)
		setUploadProgress(0)
		setShowModal(false)

		const formData = new FormData()
		const cleanUri =
			Platform.OS === "ios" ? uri.replace("file://", "") : uri

		// @ts-ignore
		formData.append("video_file_path", {
			uri: cleanUri,
			type: "video/mp4",
			name: "upload.mp4",
		})

		formData.append(
			"attributes",
			JSON.stringify({
				attributes: {
					title: vidTitle,
					description: desc,
				},
			}),
		)

		const xhr = new XMLHttpRequest()
		xhrRef.current = xhr

		xhr.upload.onprogress = (event) => {
			if (event.lengthComputable) {
				const percentComplete = Math.min(
					100,
					Math.round((event.loaded / event.total) * 100),
				)
				setUploadProgress(percentComplete)
			}
		}

		xhr.onload = () => {
			if (xhr.status === 201 || xhr.status === 200) {
				try {
					const response = JSON.parse(xhr.response)
					onUploadSuccess(response.data)
					Alert.alert("Success", "Video uploaded!")
					setTitle("")
					setDescription("")
				} catch (error) {
					console.log("Upload response parse error:", error)
					Alert.alert(
						"Error",
						"Upload completed, but response was invalid.",
					)
				}
			} else {
				console.log("Server Error Body:", xhr.response)
				Alert.alert(
					"Error",
					`Server rejected the upload (${xhr.status}).`,
				)
			}
			setIsUploading(false)
			setUploadProgress(0)
		}

		xhr.onerror = () => {
			setIsUploading(false)
			setUploadProgress(0)
			Alert.alert("Error", "Network error.")
		}

		xhr.onabort = () => {
			setIsUploading(false)
			setUploadProgress(0)
		}

		xhr.open("POST", `${BASE_URL}/feeds/v1/upload/video/`)
		xhr.setRequestHeader("Authorization", `Bearer ${token}`)
		xhr.send(formData)
	}

	const pickVideo = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["videos"],
			allowsEditing: true,
			quality: 1,
		})

		if (!result.canceled) {
			setTempUri(result.assets[0].uri)
			setShowModal(true)
		}
	}

	return (
		<View className="absolute top-12 right-3 z-50 items-center">
			<Modal visible={showModal} transparent animationType="fade">
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					className="flex-1 bg-black/60 justify-center p-6"
				>
					<View className="bg-zinc-900 p-6 rounded-3xl border border-white/10 shadow-2xl">
						<Text className="text-white font-bold text-xl mb-6 text-center">
							Video Details
						</Text>

						<Text className="text-zinc-400 text-xs font-bold uppercase mb-2 ml-1">
							Title
						</Text>
						<TextInput
							className="bg-zinc-800 text-white p-4 rounded-xl mb-4 font-semibold"
							placeholder="Give your video a title..."
							placeholderTextColor="#71717a"
							value={title}
							onChangeText={setTitle}
						/>

						<Text className="text-zinc-400 text-xs font-bold uppercase mb-2 ml-1">
							Description
						</Text>
						<TextInput
							className="bg-zinc-800 text-white p-4 rounded-xl mb-6 h-28"
							placeholder="What's this video about?"
							placeholderTextColor="#71717a"
							multiline
							textAlignVertical="top"
							value={description}
							onChangeText={setDescription}
						/>

						<View className="flex-row gap-4">
							<Pressable
								className="flex-1 p-4 bg-zinc-800 rounded-2xl items-center active:bg-zinc-700"
								onPress={() => setShowModal(false)}
							>
								<Text className="text-zinc-300 font-bold">
									Cancel
								</Text>
							</Pressable>
							<Pressable
								className="flex-1 p-4 bg-fuchsia-600 rounded-2xl items-center active:bg-fuchsia-500"
								onPress={() =>
									uploadWithProgress(
										tempUri,
										title,
										description,
									)
								}
							>
								<Text className="text-white font-bold">
									Upload
								</Text>
							</Pressable>
						</View>
					</View>
				</KeyboardAvoidingView>
			</Modal>

			{/* Button UI */}
			<View className="flex-row items-center gap-2">
				{isUploading && (
					<Pressable
						onPress={() => {
							xhrRef.current?.abort()
							setIsUploading(false)
							setUploadProgress(0)
						}}
						className="h-10 w-10 items-center justify-center rounded-full bg-red-500/80"
					>
						<Ionicons name="close" size={20} color="white" />
					</Pressable>
				)}

				<Pressable
					onPress={pickVideo}
					disabled={isUploading}
					className={`h-14 w-14 items-center justify-center rounded-full shadow-xl ${isUploading ? "bg-zinc-800" : "bg-fuchsia-500 active:scale-95"}`}
				>
					{isUploading ? (
						<Text className="text-[10px] font-bold text-fuchsia-400">
							{uploadProgress}%
						</Text>
					) : (
						<Ionicons name="add" size={32} color="white" />
					)}
				</Pressable>
			</View>

			{isUploading && (
				<View className="mt-2 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
					<View
						className="h-full bg-fuchsia-500"
						style={{ width: `${uploadProgress}%` }}
					/>
				</View>
			)}
		</View>
	)
}
