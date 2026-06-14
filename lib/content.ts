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
	{
		id: "stretch-marks",
		title: "Stretch marks",
		tips: [
			"Moisturize daily — cocoa butter, shea butter, or unscented lotion right after shower while skin is still damp.",
			"Gently massage affected areas for a few minutes; marks often fade from pink or purple to lighter silver over months.",
			"Stay hydrated and eat protein-rich foods. Ask your provider about safe options (retinoids, laser) only if marks still bother you after breastfeeding.",
		],
	},
	{
		id: "postpartum-hair-loss",
		title: "Postpartum hair loss",
		tips: [
			"It’s normal — many moms shed heavily around 3–6 months as hormones shift; growth usually returns on its own.",
			"Use a wide-tooth comb, avoid tight ponytails, and choose gentle sulfate-free shampoo to reduce breakage.",
			"Eat iron- and protein-rich foods. Mention heavy shedding past 12 months to your doctor.",
		],
	},
	{
		id: "skin-changes",
		title: "Dry or sensitive skin",
		tips: [
			"Take lukewarm (not hot) showers and apply fragrance-free moisturizer within 3 minutes of bathing.",
			"Wear loose cotton clothing on irritated areas; patch-test new products on a small spot first.",
			"Call your provider for a spreading rash, fever, or painful blisters — you may need treatment beyond home care.",
		],
	},
	{
		id: "birth-healing",
		title: "Healing after birth (scars & stitches)",
		tips: [
			"Keep incisions or tears clean and dry; pat gently — never rub. Follow your provider’s soak or spray instructions.",
			"For C-section scars, once cleared by your doctor, silicone sheets or gel may soften the scar over several weeks.",
			"Avoid heavy lifting until cleared. Call if you see increasing redness, pus, or worsening pain.",
		],
	},
	{
		id: "postpartum-swelling",
		title: "Swelling (hands, feet, face)",
		tips: [
			"Elevate feet when resting, drink water steadily, and take short walks to help fluid move.",
			"Cut back on extra salt; compression socks can help leg swelling if your provider says they’re safe for you.",
			"Sudden swelling with headache or vision changes needs urgent care — contact your doctor or emergency services right away.",
		],
	},
	{
		id: "breast-changes",
		title: "Breast changes & tenderness",
		tips: [
			"Wear a supportive, well-fitting bra — avoid underwire if it presses on sore areas.",
			"Use warm compresses before feeds and cool packs after for engorgement or general tenderness.",
			"See your provider or lactation consultant for hard lumps, fever, or cracked nipples that don’t improve in a day or two.",
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
