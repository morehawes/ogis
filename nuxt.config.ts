// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  imports: {
    dirs: ["stores"],
    presets: [
      // Load Terra Draw
      {
        from: "terra-draw",
        imports: [
          "TerraDraw",

          //Adapters
          "TerraDrawMapLibreGLAdapter",
          "TerraDrawOpenLayersAdapter",
          "TerraDrawMapboxGLAdapter",
          "TerraDrawLeafletAdapter",

          //Modes
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
