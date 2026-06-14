import { Redirect, type Href } from "expo-router"

export default function MumTalkTabScreen() {
	return <Redirect href={"/(mumtalk)" as Href} />
}
