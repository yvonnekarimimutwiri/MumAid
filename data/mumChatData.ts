export interface Comment {
	id: string
	author: string
	timeAgo: string
	text: string
	likes: number
	replies?: Comment[]
}

export interface Post {
	id: string
	title: string
	author: string
	timeAgo: string
	category: string
	body: string
	likes: number
	comments: Comment[]
}

export const MUMCHAT_POSTS: Post[] = [
	{
		id: "post-1",
		title: "How do you manage sleep regressions without going completely insane?",
		author: "MamaBear_92",
		timeAgo: "3h ago",
		category: "Sleep & Routine",
		body: "My 8-month-old was sleeping 6 hour stretches and suddenly hit a wall. She's up every 90 minutes wanting comfort. Any tried-and-true survival strategies for low-energy days?",
		likes: 42,
		comments: [
			{
				id: "c1",
				author: "CozyMom",
				timeAgo: "2h ago",
				text: "Honestly? Tag-teaming in 4-hour shifts with my partner saved us. One person sleeps with earplugs while the other stays on duty.",
				likes: 18,
				replies: [
					{
						id: "c1-1",
						author: "MamaBear_92",
						timeAgo: "1h ago",
						text: "We tried this last night! My husband took 10 PM - 2 AM and it was a life changer.",
						likes: 5,
					},
				],
			},
			{
				id: "c2",
				author: "NurseryRhyme99",
				timeAgo: "1h ago",
				text: "Don't introduce new habits you don't want to keep permanently right now, but give yourself grace if you need extra contact naps during the day.",
				likes: 9,
				replies: [
					{
						id: "c2-1",
						author: "SleeplessInSeattle",
						timeAgo: "30m ago",
						text: "Seconding this! Contact naps kept us sane through the 8-month regression.",
						likes: 3,
						replies: [
							{
								id: "c2-1-1",
								author: "MamaBear_92",
								timeAgo: "10m ago",
								text: "Good to know I'm not alone in this 😅",
								likes: 2,
							},
						],
					},
				],
			},
		],
	},
	{
		id: "post-2",
		title: "Quick 15-minute toddler meal recipes that aren't chicken nuggets?",
		author: "FoodieMama",
		timeAgo: "5h ago",
		category: "Nutrition",
		body: "Looking for simple dinner ideas that require zero fancy prep for a picky 2-year-old.",
		likes: 29,
		comments: [
			{
				id: "c3",
				author: "ChefMommy",
				timeAgo: "4h ago",
				text: "Cheesy quesadillas with hidden pureed spinach or zucchini inside the melted cheese! Works every time.",
				likes: 12,
			},
		],
	},
]
