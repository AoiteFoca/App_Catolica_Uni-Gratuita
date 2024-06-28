module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // ou outros presets que você usa
    plugins: ["tailwindcss-react-native/babel"],
  };
};
