<script setup>
// Import MapLibre
import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Import Terra Draw
import {
  TerraDraw,
  TerraDrawMapLibreGLAdapter,
  TerraDrawSelectMode,
  TerraDrawPolygonMode,
  TerraDrawPointMode,
  TerraDrawLineStringMode,
  TerraDrawGreatCircleMode,
  TerraDrawFreehandMode,
  TerraDrawCircleMode,
  TerraDrawRectangleMode,
} from "terra-draw";

const drawStore = useDrawStore();
let { draw } = drawStore;

console.log(draw);

let ready = ref(false);

onMounted(() => {
  // Initialize map
  const mapLibreMap = new MapLibreGL.Map({
    container: "map",
    style: {
      version: 8,
      sources: {
        "osm-tiles": {
          type: "raster",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        },
      },
      layers: [
        {
          id: "osm-tiles",
          type: "raster",
          source: "osm-tiles",
        },
      ],
    },
    center: [0, 0],
    zoom: 0,
    minZoom: 1,
    maxZoom: 20,
  });

  // Initialize Terra Draw
  draw.value = new TerraDraw({
    adapter: new TerraDrawMapLibreGLAdapter({
      lib: MapLibreGL,
      map: mapLibreMap,
      //coordinatePrecision: 9,
    }),

    // Modes
    modes: [
      //Select
      new TerraDrawSelectMode({
        // Mode features
        flags: {
          // polygon
          polygon: {
            feature: {
              scaleable: true,
              rotateable: true,
              draggable: true,
              coordinates: {
                midpoints: true,
                draggable: true,
                deletable: true,
              },
            },
          },
        },
      }),

      // Polygon
      new TerraDrawPolygonMode({
        allowSelfIntersections: false,
        pointerDistance: 30,
      }),

      // Point
      new TerraDrawPointMode({
        // The radius of the point
        radius: 20,
      }),

      // Line String
      new TerraDrawLineStringMode({
        // The radius of the point
        radius: 20,
      }),

      // Great Circle
      new TerraDrawGreatCircleMode({
        // The radius of the point
        radius: 20,
      }),

      // Freehand
      new TerraDrawFreehandMode({
        // The radius of the point
        radius: 20,
      }),

      // Circle
      new TerraDrawCircleMode({
        // The radius of the point
        radius: 20,
      }),

      // Rectangle
      new TerraDrawRectangleMode({
        // The radius of the point
        radius: 20,
      }),
    ],
  });

  // Start drawing
  draw.value.start();

  // Set the mode to polygon
  draw.value.setMode("polygon");

  ready.value = true;
});

onMounted(() => {
  console.log(drawStore.joe);
});
</script>

<template>
  <!-- START Container -->
  <div class="container">
    <!-- START Left (66.66% width) -->
    <div class="left">
      <!-- START Map -->
      <div id="map" />
    </div>

    <!-- START Right (33.33% width) -->
    <div class="right">
      <!-- START Draw Toolbar -->
      <og-toolbar-editor :draw="draw" />
      <!-- END Toolbar -->
    </div>
    <!-- END Right -->
  </div>
  <!-- END Container -->
</template>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: #333;
  background-color: #fff;
}

/* START Container */
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;

  /* START Left (66.66% width) */
  .left {
    width: 66.66%;
    height: 100%;
  }

  /* START Right (33.33% width) */
  .right {
    width: 33.33%;
    height: 100%;
    background-color: #f5f5f5;
    padding: 20px;

    /* START Toolbar */
    .toolbar {
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 50px;
      margin-bottom: 20px;

      /* START Toolbar Title */
      .toolbar-title {
        h3 {
          margin: 0;
        }
      }
      /* END Toolbar Title */

      /* START Toolbar Buttons */
      .toolbar-buttons {
        /* display: flex; */
        /* flex-direction: row; */
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;

        /* START Toolbar Button */
        .toolbar-button {
          button {
            width: 100%;
            height: 100%;
            border: 0;
            border-radius: 5px;
            background-color: #fff;
            cursor: pointer;
            outline: none;
            transition: background-color 0.2s ease-in-out;

            &:hover {
              background-color: #f5f5f5;
            }
          }
        }
      }
    }
    /* END Toolbar */

    /* START Info */
    .info {
      p {
        margin: 0;
        margin-bottom: 10px;
      }
    }
  }
}

/* START Map */
#map {
  width: 100%;
  height: 100%;
}
</style>
