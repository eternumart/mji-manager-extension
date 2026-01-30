module.exports = {
	style: {
		sass: {
			loaderOptions: {
				additionalData: (content, loaderContext) => {
					if (loaderContext.resourcePath.includes("global.scss")) {
						return content;
					}
					return content;
				},
			},
		},
	},

	webpack: {
		configure: (webpackConfig, { env, paths }) => {
			return {
				...webpackConfig,
				mode: env === "development" ? "development" : "production", // Оставляем режим разработки
				devtool: env === "development" ? "eval-source-map" : false, // Включаем source maps для отладки
				optimization: {
					...webpackConfig.optimization,
					minimize: false, // Отключаем минификацию
				},
				entry: {
					main: [env === "development" && require.resolve("react-dev-utils/webpackHotDevClient"), paths.appIndexJs].filter(Boolean),
					content: "./src/chromeServices/DOMEvaluator.ts",
					bridge: "./src/chromeServices/bridge.ts",
					popup: "./src/components/Popup/index.ts",
				},
				output: {
					...webpackConfig.output,
					filename: "static/js/[name].js",
				},
			};
		},
	},
};

