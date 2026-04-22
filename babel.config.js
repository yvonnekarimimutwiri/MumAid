module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // Required for react-native-reanimated; must be listed last.
    plugins: ["react-native-reanimated/plugin"],
  };
};