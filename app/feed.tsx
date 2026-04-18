import { mumTipsFeed } from "@/lib/content"
import { Ionicons } from "@expo/vector-icons"
import { Dimensions, ScrollView, Text, View } from "react-native"

export const options = {
	title: "Mum Tips Feed",
	headerStyle: { backgroundColor: "#3D2A55" },
	headerTintColor: "#fce7f3",
	headerTitleStyle: { color: "#fdf4ff", fontWeight: "600" as const },
}

const { height } = Dimensions.get("window")

export default function FeedScreen() {
	return (
		<View className="flex-1 bg-mum-ink">
			<ScrollView
				pagingEnabled
				showsVerticalScrollIndicator={false}
				snapToInterval={height * 0.72}
				decelerationRate="fast"
				contentContainerStyle={{ paddingBottom: 24 }}
			>
				{mumTipsFeed.map((item, index) => (
					<View
						key={item.id}
						style={{ minHeight: height * 0.72 }}
						className="justify-end px-5 pb-10 pt-16"
					>
						<View
							className={`rounded-3xl border p-5 ${
								index % 2 === 0
									? "border-fuchsia-300/40 bg-fuchsia-500/20"
									: "border-mum-purple/35 bg-mum-purple/20"
							}`}
						>
							<Text className="text-xs font-semibold uppercase tracking-widest text-fuchsia-100/90">
								{item.topic}
							</Text>
							<Text className="mt-3 text-lg leading-7 text-white">{item.caption}</Text>
							<View className="mt-4 flex-row items-center gap-2">
								<Ionicons name="flag-outline" size={18} color="#fbcfe8" />
								<Text className="text-xs text-fuchsia-100/80">Report · moderation flag (wire up)</Text>
							</View>
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	)
}
