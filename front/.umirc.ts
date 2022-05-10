import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  mfsu: {},
  layout: {
    name: '思之社区',
  },
  routes: [
    { path: '/', component: '@/pages/index', name: '首页' },
    { path: '/myDefine', component: '@/pages/myDefine', name: '我的定文' },
    { path: '/defines', component: '@/pages/defines', name: '订阅定文' },
    { path: '/feeds', component: '@/pages/feeds', name: '信息源' },
    { path: '/rss', component: '@/pages/rss', name: 'RSS' },
    { path: '/builder', component: '@/pages/builder', name: 'Builder' },
    { path: '/logs', component: '@/pages/logs', name: '日志' },
  ],
  fastRefresh: {},
});
