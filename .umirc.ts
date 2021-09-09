import { defineConfig } from 'umi';
const { REACT_APP_ENV, NODE_ENV } = process.env;

const IS_DEV_ENV = NODE_ENV === 'development';


export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  mfsu: {},
  ...(IS_DEV_ENV ? {
    nodeModulesTransform: {
      type: 'none',
      exclude: [],
    },
    webpack5: {
      lazyCompilation: {
        imports: true,
      }
    }
  } : {
    chunks: ['vendors', 'umi', 'ant'],
    chainWebpack: function (config, { webpack }) {
      config.merge({
        optimization: {
          splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 2,
            automaticNameDelimiter: '.',
            cacheGroups: {
              umi: {
                name: 'umi',
                test({ resource }) {
                  return /(umi).*/.test(resource);
                },
                priority: 1,
              },
              vendor: {
                name: 'vendors',
                test({ resource }) {
                  return /[\\/]node_modules[\\/]/.test(resource);
                },
                priority: 10,
              },
              ant: {
                name: 'ant',
                test({ resource }) {
                  return /(ant)/.test(resource);
                },
                priority: 100,
              },
            },
          },
        },
      });
    },
  })
});
