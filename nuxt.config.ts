// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  imports: {
    dirs: ["stores"],
    presets: [
      {
        from: "terra-draw",
        imports: [
          "TerraDraw",
          "TerraDrawMapLibreGLAdapter",
          "TerraDrawFreehandMode",
          "TerraDrawLineStringMode",
          "TerraDrawCircleMode",
          "TerraDrawGreatCircleMode",
          "TerraDrawPointMode",
          "TerraDrawPolygonMode",
          "TerraDrawRectangleMode",
          "TerraDrawSelectMode",
        ],
      },
    ],
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore"],
      },
    ],
  ],
});
