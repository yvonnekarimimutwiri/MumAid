const path = require("path")
const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")

const projectRoot = __dirname
const config = getDefaultConfig(projectRoot)
const withNW = withNativeWind(config, { input: "./app/global.css" })

const mapsWebStub = path.join(projectRoot, "shims", "react-native-maps.tsx")
const previousResolveRequest = withNW.resolver.resolveRequest

withNW.resolver.resolveRequest = (context, moduleName, platform) => {
	if (
		platform === "web" &&
		(moduleName === "react-native-maps" ||
			moduleName.startsWith("react-native-maps/"))
	) {
		return { type: "sourceFile", filePath: mapsWebStub }
	}
	if (previousResolveRequest) {
		return previousResolveRequest(context, moduleName, platform)
	}
	return context.resolveRequest(context, moduleName, platform)
}

module.exports = withNW
