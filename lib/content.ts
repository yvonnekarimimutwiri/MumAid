export const remedyCards = [
	{
		id: "colic",
		title: "Colic",
		tips: [
			"Hold baby upright and offer slow, paced feeds to reduce swallowed air.",
			"Try gentle clockwise tummy massage for 2–3 minutes before sleep.",
			"Use white noise at a safe volume; many babies calm within a minute or two.",
		],
	},
	{
		id: "teething",
		title: "Teething",
		tips: [
			"Offer a chilled (not frozen) teether for short supervised sessions.",
			"Use a clean finger to rub the gum ridge with light pressure.",
			"Keep drool dry with a soft cloth to prevent chin rash.",
		],
	},
	{
		id: "rash",
		title: "Diaper rash",
		tips: [
			"Change promptly; rinse with warm water and pat fully dry.",
			"Apply a thick zinc-oxide barrier cream at every change for 48 hours.",
			"Give 10–15 minutes of diaper-free air time if safe and supervised.",
		],
	},
] as const

export const exerciseClips = [
	{ id: "1", title: "Gentle core breath", focus: "Core · 2 min", note: "Postnatal-safe pacing; stop if you feel pain or bleeding." },
	{ id: "2", title: "Upper back openers", focus: "Back · 2 min", note: "Supports feeding posture and shoulder release." },
	{ id: "3", title: "Neck & shoulder resets", focus: "Shoulders · 2 min", note: "Small ranges; breathe steadily through each rep." },
] as const

export const mumTipsFeed = [
	{ id: "a", topic: "Sleep", caption: "Dim lights 30 min before bedtime — babies cue off your environment." },
	{ id: "b", topic: "Soothing", caption: "Slow “shhh” at the same volume as a vacuum — steady, not sharp." },
	{ id: "c", topic: "Pumping", caption: "Hands-on massage mid-session can bump output without extra time." },
] as const

export const therapists = [
	{ id: "t1", name: "Dr. Amira Collins, PMH-C", license: "LPC · Perinatal mental health", wait: "Callback within 15 min" },
	{ id: "t2", name: "Jordan Lee, LCSW", license: "LCSW · Birth trauma focus", wait: "Next opening today · 4:20 PM" },
] as const

export const opportunities = [
	{
		id: "o1",
		title: "Free pelvic floor workshop",
		description: "Small-group session with a women’s health physiotherapist.",
		deadline: "May 2, 2026",
		location: "Online · limited spots",
	},
	{
		id: "o2",
		title: "Donated breast pump bundle",
		description: "Hospital-grade pump + supplies for eligible applicants.",
		deadline: "Apr 28, 2026",
		location: "Pickup · downtown clinic",
	},
	{
		id: "o3",
		title: "Postpartum mental health circle",
		description: "Free 6-week facilitated group; childcare stipend available.",
		deadline: "May 10, 2026",
		location: "Hybrid",
	},
] as const
