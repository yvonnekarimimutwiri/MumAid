import { Location as MilkLoc } from "@/utils/geo"

export const MILK_LOCATIONS: MilkLoc[] = [
	{
		name: "Central Clinic",
		description: "Accepting frozen donations.",
		lat: -1.286389,
		lng: 36.817223,
		type: "DONATE",
	},
	{
		name: "Baby Wellness Center",
		description: "Buy pasteurized milk.",
		lat: -1.3,
		lng: 36.8,
		type: "BUY",
	},
	{
		name: "Goodlife",
		description: "Biggest bank in Nairobi",
		lat: -1.2325,
		lng: 36.8781,
		type: "BOTH",
	},
	{
		name: "Touchstone",
		description: "",
		lat: -1.236,
		lng: 36.865,
		type: "BOTH",
	},
	{
		name: "Surpreme",
		description: "Surpreme x Medicine collaboration",
		lat: -0.2871,
		lng: 36.0758,
		type: "BOTH",
	},
	{
		name: "Tofa",
		description: "Like Toffee, but for medicine",
		lat: -0.2921,
		lng: 36.0875,
		type: "BOTH",
	},
	{
		name: "Lakewood",
		description: "",
		lat: -0.3432,
		lng: 36.1709,
		type: "BOTH",
	},
	{
		name: "Simba",
		description: "",
		lat: -0.351,
		lng: 36.1837,
		type: "BOTH",
	},
	{
		name: "Jyka",
		description: "",
		lat: -0.5045,
		lng: 36.3178,
		type: "BOTH",
	},
	{
		name: "Goodlife",
		description: "Delamere GoodLife",
		lat: -0.6933,
		lng: 36.42,
		type: "BOTH",
	},
	{
		name: "Pharmaplus",
		description: "",
		lat: -0.7549,
		lng: 36.4724,
		type: "BOTH",
	},
]

export type CommentType = {
	text: string
	user: string
	replies?: CommentType[]
}

interface VideoType {
	id: string
	source: string
	topic: string
	caption: string
	comments: CommentType[]
}

export const VIDEOS: VideoType[] = [
	// {
	// 	id: "1",
	// 	// source: require("@/assets/uploads/first_time_mom_5_hacks.mp4"),
	// 	source: "",
	// 	topic: "LIFESTYLE",
	// 	caption: "5 hacks for first-time mums.",
	// 	comments: [
	// 		{ text: "Cool", user: "John Doe" },
	// 		{ text: "Beautiful", user: "Daryl" },
	// 		{
	// 			text: "Very helpful",
	// 			user: "Earl Davis",
	// 			replies: [{ text: "Yes, learnt a lot", user: "Mr. Andrews" }],
	// 		},
	// 	],
	// },
	{
		id: "2",
		// source: require("@/assets/uploads/newborn_tips_for_beginners.mp4"),
		source: "",
		topic: "FEEDING",
		caption: "Newborn nany tips",
		comments: [{ text: "Very insightful", user: "Robert Davids" }],
	},
	{
		id: "3",
		// source: require("@/assets/uploads/tips_for_expecting_mums.mp4"),
		source: "",
		topic: "TIPS",
		caption: "Tips for expecting mums.",
		comments: [
			{
				text: "I like the first tip",
				user: "Davidson Roberts",
				replies: [
					{
						text: "Children are fragile, picking them up should be treated with importance",
						user: "Sharon Matthews",
						replies: [
							{
								text: "So many people just picking up kids however they want",
								user: "Angela Davies",
							},
						],
					},
					{ text: "Facts", user: "Monicah Falange" },
				],
			},
		],
	},
]
