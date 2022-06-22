module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@src': './src',
            '@root': './',
            "@assets": "./src/assets",
          },
          "react-native-sqlite-storage": {
            platforms: {
              android: {
                sourceDir:
                  "../node_modules/react-native-sqlite-storage/platforms/android-native",
                packageImportPath: "import io.liteglue.SQLitePluginPackage;",
                packageInstance: "new SQLitePluginPackage()"
              }
            }
          },
        },
      ],
    ],
  };
};
