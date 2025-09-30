module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          unstable_transformImportMeta: true,
        },
      ],
    ],
    plugins: [
      // si usas Reanimated en el proyecto
      "react-native-reanimated/plugin",
    ],
  };
};
