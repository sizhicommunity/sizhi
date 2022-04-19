import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  layout: {},
  routes: [
    { path: '/', component: '@/pages/index', name: 'Home' },
    { path: '/defines', component: '@/pages/defines', name: 'Defines' },
  ],
  fastRefresh: {},
});
