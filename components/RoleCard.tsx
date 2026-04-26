import { Ionicons } from "@expo/vector-icons"
import { Pressable, StyleSheet, Text, View } from "react-native"

export default function RoleCard({
	title,
	icon,
	selected,
	onPress,
}: {
	title: string
	icon: any
	selected: boolean
	onPress: () => void
}) {
	return (
		<Pressable
			onPress={onPress}
			style={[styles.card, selected ? styles.cardSelected : styles.cardDefault]}
		>
			<View style={[styles.iconWrap, selected ? styles.iconSelected : styles.iconDefault]}>
				<Ionicons
					name={icon}
					size={28}
					color={selected ? "#d946ef" : "#71717a"}
				/>
			</View>
			<Text style={[styles.title, selected ? styles.titleSelected : styles.titleDefault]}>
				{title}
			</Text>
			{selected && (
				<View style={styles.checkmark}>
					<Ionicons
						name="checkmark-circle"
						size={20}
						color="#d946ef"
					/>
				</View>
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
		borderRadius: 24,
		borderWidth: 2,
		position: "relative",
	},
	cardSelected: {
		backgroundColor: "#fdf2f8",
		borderColor: "#d946ef",
	},
	cardDefault: {
		backgroundColor: "#fafafa",
		borderColor: "#f4f4f5",
	},
	iconWrap: {
		padding: 12,
		borderRadius: 999,
		marginBottom: 8,
	},
	iconSelected: {
		backgroundColor: "#fae8ff",
	},
	iconDefault: {
		backgroundColor: "#f4f4f5",
	},
	title: {
		fontWeight: "700",
	},
	titleSelected: {
		color: "#a21caf",
	},
	titleDefault: {
		color: "#71717a",
	},
	checkmark: {
		position: "absolute",
		top: 8,
		right: 8,
	},
})
