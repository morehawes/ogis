// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  imports: {
    dirs: ['stores'],
  },  
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore'],
      }
    ]
  ],  
});
