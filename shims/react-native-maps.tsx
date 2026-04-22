/**
 * Metro resolves `react-native-maps` to this file on web only.
 * The real package uses native-only codegen and cannot load in the browser.
 */
import React from "react"
import { View, type ViewProps } from "react-native"

type MapViewProps = ViewProps & {
	initialRegion?: unknown
	showsUserLocation?: boolean
	showsMyLocationButton?: boolean
	children?: React.ReactNode
}

export default function MapViewStub({ style, children }: MapViewProps) {
	return <View style={style}>{children}</View>
}

export function Marker({ children }: { children?: React.ReactNode }) {
	return <>{children}</>
}

export function Callout({ children }: { children?: React.ReactNode }) {
	return <>{children}</>
}

export const PROVIDER_GOOGLE = "google"
