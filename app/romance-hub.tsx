import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useRef, useState } from "react"
import {
	Animated,
	Dimensions,
	Easing,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const { width } = Dimensions.get("window")
const ITEM_WIDTH = 220
const ITEM_SPACING = 12
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_SPACING

const DATE_IDEAS = [
	{
		title: "Go to the Movies",
		desc: "Popcorn and 2 hours of no baby talk.",
		icon: "film",
	},
	{
		title: "Visit a Museum",
		desc: "Walk through quiet halls at your own pace.",
		icon: "images",
	},
	{
		title: "Fancy Restaurant",
		desc: "Cloth napkins and no high chairs in sight.",
		icon: "restaurant",
	},
	{
		title: "Night Walk",
		desc: "Stroll through a quiet, well-lit neighborhood.",
		icon: "walk",
	},
	{
		title: "Bowling Alley",
		desc: "Low-stakes competition and arcade vibes.",
		icon: "trophy",
	},
	{
		title: "Coffee Shop Date",
		desc: "People watching and long-form conversation.",
		icon: "cafe",
	},
	{
		title: "Botanical Garden",
		desc: "Fresh air and beautiful scenery.",
		icon: "leaf",
	},
	{
		title: "Bookstore Hunt",
		desc: "Pick a book for each other and grab a latte.",
		icon: "book",
	},
	{
		title: "Live Music",
		desc: "Find a local jazz bar or acoustic set.",
		icon: "musical-notes",
	},
	{
		title: "Dessert Bar",
		desc: "Skip dinner, go straight for the sweets.",
		icon: "ice-cream",
	},
]

const RITUALS = [
	"Set an alarm 15 mins before baby wakes just to sit together with hot coffee.",
	"Take a 'Memory Lane' scroll through your photos from the year you met.",
	"Five-minute dance party in the kitchen to your wedding song.",
	"A 20-second hug after you both get home—it resets the nervous system.",
	"Leave a post-it note on the mirror for them to find.",
]

const ALL_TIPS = [
	"Refill her water bottle without being asked.",
	"Take the baby and say 'I've got this for 20 mins' when she looks tired.",
	"Compliment her on her personality, not just her mothering.",
	"Bring home her favorite snack just because.",
	"Handle the next diaper change without being asked.",
]

export default function RomanceHubScreen() {
	const insets = useSafeAreaInsets()
	const scrollX = useRef(new Animated.Value(0)).current
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
	const [isSpinning, setIsSpinning] = useState(false)
	const [dots, setDots] = useState("")

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>
		if (isSpinning) {
			interval = setInterval(() => {
				setDots((prev) => (prev.length < 3 ? prev + "." : ""))
			}, 400)
		} else {
			setDots("")
		}
		return () => clearInterval(interval)
	}, [isSpinning])

	const [dailyRitual] = useState(
		RITUALS[Math.floor(Math.random() * RITUALS.length)],
	)
	const [randomTips] = useState(() =>
		[...ALL_TIPS].sort(() => 0.5 - Math.random()).slice(0, 3),
	)

	const spinPicker = () => {
		if (isSpinning) return
		setIsSpinning(true)
		setSelectedIndex(null)

		scrollX.setValue(0)

		const totalItems = DATE_IDEAS.length
		const spins = 2
		const finalLanding = Math.floor(Math.random() * totalItems)
		const targetOffset =
			spins * totalItems * TOTAL_ITEM_WIDTH +
			finalLanding * TOTAL_ITEM_WIDTH

		Animated.timing(scrollX, {
			toValue: -targetOffset + (width / 2 - ITEM_WIDTH / 2 - 20),
			duration: 5000,
			easing: Easing.bezier(0.15, 0, 0, 1),
			useNativeDriver: true,
		}).start(() => {
			setSelectedIndex(finalLanding)
			setIsSpinning(false)
		})
	}

	return (
		<View className="flex-1 bg-mum-bg">
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
			>
				<View className="mx-6 mb-8 mt-6">
					<Text className="text-xs font-bold uppercase tracking-[2px] text-mum-purpleDeep/40">
						Today's Ritual
					</Text>
					<Text className="mt-2 text-lg font-medium italic text-mum-ink/80">
						"{dailyRitual}"
					</Text>
				</View>

				<View className="mb-10">
					<View className="flex-row items-center justify-between px-6 mb-4">
						<Text className="text-xs font-bold uppercase tracking-widest text-mum-ink/40">
							Date Night Roulette
						</Text>
						<Ionicons name="caret-down" size={20} color="#6E3F9C" />
					</View>

					<View className="relative h-[220px] overflow-hidden">
						{isSpinning && <View style={{opacity: .5}} className="absolute left-1/2 z-10 h-full w-1 -translate-x-0.5 bg-mum-purpleDeep"></View>}

						<Animated.View
							style={{
								flexDirection: "row",
								paddingLeft: 20,
								transform: [{ translateX: scrollX }],
							}}
						>
							{[...Array(4)].map((_, loopIdx) =>
								DATE_IDEAS.map((item, idx) => {
									const isTarget =
										selectedIndex === idx && !isSpinning
									return (
										<View
											key={`${loopIdx}-${idx}`}
											style={{
												width: ITEM_WIDTH,
												marginRight: ITEM_SPACING,
												elevation: isTarget ? 9 : 3,
												backgroundColor: isTarget
													? "#6E3F9C"
													: "#FFFFFF",
												borderColor: isTarget
													? "#FFFFFF00"
													: "#FCDCEA",
												transform: [
													{
														scale: isTarget
															? 1
															: 0.85,
													},
												],
											}}
											className="duration-200 h-[180px] rounded-[32px] p-6 justify-between border-2"
										>
											<View
												style={{
													backgroundColor: isTarget
														? "rgba(255,255,255,0.2)"
														: "#F5ECFA",
												}}
												className="h-10 w-10 items-center justify-center rounded-xl"
											>
												<Ionicons
													name={item.icon as any}
													size={20}
													color={
														isTarget
															? "white"
															: "#6E3F9C"
													}
												/>
											</View>
											<View>
												<Text
													className={`text-lg font-bold ${isTarget ? "text-white" : "text-mum-ink"}`}
												>
													{item.title}
												</Text>
												<Text
													numberOfLines={2}
													className={`text-xs ${isTarget ? "text-white/70" : "text-mum-ink/50"}`}
												>
													{item.desc}
												</Text>
											</View>
										</View>
									)
								}),
							)}
						</Animated.View>
					</View>

					<View className="px-10 mt-4">
						<Pressable
							onPress={spinPicker}
							disabled={isSpinning}
							style={{
								elevation: isSpinning ? 0 : 6,
								backgroundColor: isSpinning
									? "#EC489900"
									: "#6E3F9C",
							}}
							className="rounded-full py-4 active:opacity-90 flex-row justify-center items-center"
						>
							{/* Left spacer to offset the dots on the right and keep the word centered */}
							{isSpinning && <View style={{ width: 24 }} />}

							<Text
								className={`font-bold ${isSpinning ? "text-black" : "text-white"} uppercase tracking-widest text-center`}
							>
								{isSpinning ? "Choosing" : "Spin for Date Idea"}
							</Text>

							{isSpinning && (
								<View style={{ width: 24, marginLeft: 2 }}>
									<Text
										style={{ opacity: 0 }}
										className="font-bold tracking-widest"
									>
										...
									</Text>

									<Text
										className="font-bold tracking-widest position-absolute"
										style={{
											position: "absolute",
											left: 0,
										}}
									>
										{dots}
									</Text>
								</View>
							)}
						</Pressable>
					</View>
				</View>

				<Text className="px-6 mb-4 text-xs font-bold uppercase tracking-widest text-mum-ink/40">
					Support Tips
				</Text>
				<View className="px-6">
					{randomTips.map((tip, i) => (
						<View
							key={i}
							style={{
								backgroundColor: [
									"#fff7ed",
									"#f5f3ff",
									"#fdf2f8",
								][i % 3],
								transform: [
									{
										rotate: ["-1.5deg", "1deg", "-0.5deg"][
											i % 3
										],
									},
								],
								elevation: 3,
							}}
							className="mb-6 rounded-2xl p-6 border border-black/5"
						>
							<Text className="text-base font-medium leading-6 text-mum-inkDeep/80 italic">
								"{tip}"
							</Text>
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	)
}
