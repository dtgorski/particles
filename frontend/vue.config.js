const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    productionSourceMap: false,
    transpileDependencies: true,
    chainWebpack: config => {
        config.performance
            .maxEntrypointSize(1024 * 1024)
            .maxAssetSize(1024 * 1024);
    }
});
