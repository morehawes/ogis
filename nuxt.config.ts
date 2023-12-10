// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  runtimeConfig: {
    public: {
      MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    },
  },
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
          "TerraDrawGoogleMapsAdapter",
          "TerraDrawMapboxGLAdapter",

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
