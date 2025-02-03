module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            return {
                ...webpackConfig,
                entry: {
                    main: [
                        env === 'development' && require.resolve('react-dev-utils/webpackHotDevClient'),
                        paths.appIndexJs,
                    ].filter(Boolean),
                    content: './src/chromeServices/DOMEvaluator.ts',  // Точка входа для контент-скриптов
                    popup: './src/components/Popup/index.ts',  // Точка входа для Popup-скриптов
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',  // Генерация отдельных файлов для каждой точки входа
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,  // Отключаем отдельный runtime файл для каждой точки входа
                    minimize: false,  // Отключаем минификацию
                },
            };
        },
    },
};
