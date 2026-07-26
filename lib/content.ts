export type RemedyCategory = "baby" | "mum"

export const remedyCards = [
	{
		id: "colic",
		category: "baby" as RemedyCategory,
		title: "Colic",
		tips: [
			"Hold baby upright and offer slow, paced feeds to reduce swallowed air.",
			"Try gentle clockwise tummy massage for 2–3 minutes before sleep.",
			"Use white noise at a safe volume; many babies calm within a minute or two.",
		],
	},
	{
		id: "teething",
		category: "baby" as RemedyCategory,
		title: "Teething",
		tips: [
			"Offer a chilled (not frozen) teether for short supervised sessions.",
			"Use a clean finger to rub the gum ridge with light pressure.",
			"Keep drool dry with a soft cloth to prevent chin rash.",
		],
	},
	{
		id: "rash",
		category: "baby" as RemedyCategory,
		title: "Diaper rash",
		tips: [
			"Change promptly; rinse with warm water and pat fully dry.",
			"Apply a thick zinc-oxide barrier cream at every change for 48 hours.",
			"Give 10–15 minutes of diaper-free air time if safe and supervised.",
		],
	},
	{
		id: "after-birth-recovery",
		category: "mum" as RemedyCategory,
		title: "After-birth recovery",
		tips: [
			"Rest whenever baby sleeps — recovery is a priority, not a luxury.",
			"Stay hydrated and eat simple, nourishing meals; ask your partner or support person to help with food.",
			"Contact your provider for heavy bleeding, fever, severe pain, or feelings that something is “off.”",
		],
	},
	{
		id: "stretch-marks",
		category: "mum" as RemedyCategory,
		title: "Stretch marks",
		tips: [
			"Moisturize daily — cocoa butter, shea butter, or unscented lotion right after shower while skin is still damp.",
			"Gently massage affected areas for a few minutes; marks often fade from pink or purple to lighter silver over months.",
			"Stay hydrated and eat protein-rich foods. Ask your provider about safe options (retinoids, laser) only if marks still bother you after breastfeeding.",
		],
	},
	{
		id: "postpartum-hair-loss",
		category: "mum" as RemedyCategory,
		title: "Postpartum hair loss",
		tips: [
			"It’s normal — many moms shed heavily around 3–6 months as hormones shift; growth usually returns on its own.",
			"Use a wide-tooth comb, avoid tight ponytails, and choose gentle sulfate-free shampoo to reduce breakage.",
			"Eat iron- and protein-rich foods. Mention heavy shedding past 12 months to your doctor.",
		],
	},
	{
		id: "skin-changes",
		category: "mum" as RemedyCategory,
		title: "Dry or sensitive skin",
		tips: [
			"Take lukewarm (not hot) showers and apply fragrance-free moisturizer within 3 minutes of bathing.",
			"Wear loose cotton clothing on irritated areas; patch-test new products on a small spot first.",
			"Call your provider for a spreading rash, fever, or painful blisters — you may need treatment beyond home care.",
		],
	},
	{
		id: "birth-healing",
		category: "mum" as RemedyCategory,
		title: "Healing after birth (scars & stitches)",
		tips: [
			"Keep incisions or tears clean and dry; pat gently — never rub. Follow your provider’s soak or spray instructions.",
			"For C-section scars, once cleared by your doctor, silicone sheets or gel may soften the scar over several weeks.",
			"Avoid heavy lifting until cleared. Call if you see increasing redness, pus, or worsening pain.",
		],
	},
	{
		id: "postpartum-swelling",
		category: "mum" as RemedyCategory,
		title: "Swelling (hands, feet, face)",
		tips: [
			"Elevate feet when resting, drink water steadily, and take short walks to help fluid move.",
			"Cut back on extra salt; compression socks can help leg swelling if your provider says they’re safe for you.",
			"Sudden swelling with headache or vision changes needs urgent care — contact your doctor or emergency services right away.",
		],
	},
	{
		id: "breast-changes",
		category: "mum" as RemedyCategory,
		title: "Breast changes & tenderness",
		tips: [
			"Wear a supportive, well-fitting bra — avoid underwire if it presses on sore areas.",
			"Use warm compresses before feeds and cool packs after for engorgement or general tenderness.",
			"See your provider or lactation consultant for hard lumps, fever, or cracked nipples that don’t improve in a day or two.",
		],
	},
	{
		id: "belly-and-core",
		category: "mum" as RemedyCategory,
		title: "Belly & core after birth",
		tips: [
			"Start with gentle breathing and pelvic floor awareness before hard core workouts.",
			"Support your belly when coughing or lifting; stop if you feel pain, bulging, or heaviness.",
			"Ask about physiotherapy if you notice a lasting gap in the midline (diastasis) or pelvic pressure.",
		],
	},
] as const

export const screenFreeTips = [
	{
		id: "sf1",
		title: "Sensory play",
		tip: "Fill a shallow tray with dry rice, pasta, or water and let them scoop and pour with cups.",
	},
	{
		id: "sf2",
		title: "Story corner",
		tip: "Stack a few books nearby and read one short story aloud — even babies love the sound of your voice.",
	},
	{
		id: "sf3",
		title: "Music & movement",
		tip: "Play a song and clap, sway, or dance together for a few minutes.",
	},
	{
		id: "sf4",
		title: "Kitchen helper",
		tip: "Give a wooden spoon and a safe bowl so they can “cook” beside you while you prepare a meal.",
	},
	{
		id: "sf5",
		title: "Outdoor reset",
		tip: "A short walk, balcony time, or looking at trees and birds can reset everyone’s energy.",
	},
	{
		id: "sf6",
		title: "Simple building",
		tip: "Blocks, cardboard boxes, or stacking cups keep little hands busy without a screen.",
	},
] as const

export const encouragementNotes = [
	"You’re doing amazing — one day at a time is enough.",
	"Showing up today already counts as success.",
	"You are enough for your baby, exactly as you are.",
	"Rest is productive. Give yourself permission to pause.",
	"Hard days don’t mean you’re failing — they mean you’re human.",
	"Small acts of care add up. You’ve got this.",
	"Your love is the most important thing in this house.",
	"It’s okay to ask for help. Strong moms lean on people too.",
	"You are building a safe world for someone who needs you.",
	"Progress, not perfection. You’re doing beautifully.",
] as const

export const partnerEncouragementNotes = [
	"Your support tonight can change her whole day.",
	"Small help counts — dishes, feeds, and rest matter.",
	"When she’s tired, stepping in is love in action.",
	"You’re part of the village. Show up with care.",
	"Handling night duties so she can rest is powerful support.",
] as const

export function getDailyNote(notes: readonly string[], date = new Date()) {
	const dayOfYear = Math.floor(
		(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
			Date.UTC(date.getFullYear(), 0, 0)) /
			24 /
			60 /
			60 /
			1000,
	)
	return notes[dayOfYear % notes.length]
}

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
