import { Comment, MUMCHAT_POSTS, Post } from "@/data/mumChatData"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import React, { useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

export default function MumChatScreen() {
	return (
		<View className="flex-1 bg-black">
			<LinearGradient
				colors={["#501584", "#3b1060", "#000000"]}
				style={StyleSheet.absoluteFillObject}
				locations={[0, 0.3, 0.7]}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
			/>

				<Text className="text-2xl font-bold text-white mb-2 mt-10 mx-4">
					MumChat Threads
				</Text>
			<ScrollView className="flex-1 px-4 pt-4">
				{MUMCHAT_POSTS.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
				<View className="h-16" />
			</ScrollView>
		</View>
	)
}

function PostCard({ post }: { post: Post }) {
	const [likes, setLikes] = useState(post.likes)
	const [userVoted, setUserVoted] = useState(false)
	const [showComments, setShowComments] = useState(true)

	const toggleVote = () => {
		if (userVoted) {
			setLikes((prev) => prev - 1)
			setUserVoted(false)
		} else {
			setLikes((prev) => prev + 1)
			setUserVoted(true)
		}
	}

	const totalCommentCount = (comments: Comment[]): number => {
		return comments.reduce(
			(acc, curr) =>
				acc + 1 + (curr.replies ? totalCommentCount(curr.replies) : 0),
			0,
		)
	}

	return (
		<View className="mb-6 rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
			{/* Header / Category */}
			<View className="flex-row items-center justify-end">
				{/* <Text className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
					{""}
				</Text> */}
				<Text className="text-xs text-fuchsia-400">
					{post.author} • {post.timeAgo}
				</Text>
			</View>

			{/* Title & Body */}
			<Text className="mt-2 text-lg font-bold text-white leading-6">
				{post.title}
			</Text>
			<Text className="mt-2 text-sm text-zinc-300 leading-5">
				{post.body}
			</Text>

			{/* Post Action Bar */}
			<View className="mt-4 flex-row items-center gap-6 border-t border-zinc-800/80 pt-3">
				<Pressable
					onPress={toggleVote}
					className="flex-row items-center gap-1.5 bg-zinc-800 px-3 py-1.5 rounded-full"
				>
					<Ionicons
						name={userVoted ? "heart" : "heart-outline"}
						size={18}
						color={userVoted ? "#d946ef" : "#a1a1aa"}
					/>
					<Text
						className={`text-xs font-semibold ${
							userVoted ? "text-fuchsia-400" : "text-zinc-300"
						}`}
					>
						{likes}
					</Text>
				</Pressable>

				<Pressable
					onPress={() => setShowComments(!showComments)}
					className="flex-row items-center gap-1.5"
				>
					<Ionicons
						name="chatbubble-outline"
						size={16}
						color="#a1a1aa"
					/>
					<Text className="text-xs font-medium text-zinc-400">
						{totalCommentCount(post.comments)} replies
					</Text>
				</Pressable>
			</View>

			{/* Nested Comments Section */}
			{showComments && post.comments.length > 0 && (
				<View className="mt-4 border-t border-zinc-800/60 pt-4">
					{post.comments.map((comment) => (
						<CommentNode
							key={comment.id}
							comment={comment}
							depth={0}
						/>
					))}
				</View>
			)}
		</View>
	)
}

/**
 * Recursive Comment Tree Component
 */
function CommentNode({ comment, depth }: { comment: Comment; depth: number }) {
	const [likes, setLikes] = useState(comment.likes)
	const [liked, setLiked] = useState(false)

	const toggleLike = () => {
		setLikes((prev) => (liked ? prev - 1 : prev + 1))
		setLiked(!liked)
	}

	return (
		<View className="mt-3 flex-row">
			{/* Thread Line for nested levels */}
			{depth > 0 && (
				<View className="w-3 mr-2 items-center">
					<View className="w-[2px] h-fit bg-zinc-700/60 rounded-full" />
				</View>
			)}

			<View className="flex-1">
				{/* Comment Header */}
				<View className="flex-row items-center justify-between">
					<Text className="text-xs font-bold text-zinc-300">
						{comment.author}
					</Text>
					<Text className="text-[10px] text-zinc-500">
						{comment.timeAgo}
					</Text>
				</View>

				{/* Comment Body */}
				<Text className="mt-1 text-xs text-zinc-300 leading-4">
					{comment.text}
				</Text>

				{/* Comment Footer */}
				<View className="mt-2 flex-row items-center gap-4">
					<Pressable
						onPress={toggleLike}
						className="flex-row items-center gap-1"
					>
						<Ionicons
							name={liked ? "heart" : "heart-outline"}
							size={12}
							color={liked ? "#e11d48" : "#71717a"}
						/>
						<Text className="text-[10px] text-zinc-400 font-medium">
							{likes}
						</Text>
					</Pressable>
				</View>

				{/* Render Nested Replies Recursively */}
				{comment.replies && comment.replies.length > 0 && (
					<View className="mt-1">
						{comment.replies.map((reply) => (
							<CommentNode
								key={reply.id}
								comment={reply}
								depth={depth + 1}
							/>
						))}
					</View>
				)}
			</View>
		</View>
	)
}
