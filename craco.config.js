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
				entry: {
					main: [env === "development" && require.resolve("react-dev-utils/webpackHotDevClient"), paths.appIndexJs].filter(Boolean),
					content: "./src/chromeServices/DOMEvaluator.ts",
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
