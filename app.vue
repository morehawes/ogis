<script setup>
// Import the MapLibre mapping library
import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Import Terra Draw, we will import the MapLibre adapter, select mode and polygon mode
import {
  TerraDraw,
  TerraDrawMapLibreGLAdapter,
  TerraDrawSelectMode,
  TerraDrawPolygonMode,
} from "terra-draw";

let draw = ref(null);

onMounted(() => {
  // Initialize a new MapLibre map, providing the id of the div to display the map
  // Set the initial center (longitude, latitude) and the zoom level
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

  // Instantiate the TerraDraw API with a MapLibre adapter and custom modes
  draw = new TerraDraw({
    adapter: new TerraDrawMapLibreGLAdapter({
      // The MapLibre library object
      lib: MapLibreGL,

      // The MapLibre map object we created
      map: mapLibreMap,

      // The decimal precision of the coordinates created
      coordinatePrecision: 9,
    }),

    // Modes is an object containing all the modes we wish to
    // instantiate Terra Draw with
    modes: [
      new TerraDrawSelectMode({
        flags: {
          // Following flags determine what you can do in
          // select mode for features of a given mode - in this case polygon
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
      new TerraDrawPolygonMode({
        allowSelfIntersections: false,
        pointerDistance: 30,
      }),
    ],
  });

  // Start drawing
  draw.start();

  // Set the mode to polygon
  draw.setMode("polygon");
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
      <!-- START Toolbar -->
      <div class="toolbar">
        <!-- START Toolbar Title -->
        <div class="toolbar-title">
          <h3>Terra Draw</h3>
        </div>
        <!-- END Toolbar Title -->

        <!-- START Toolbar Buttons -->
        <div class="toolbar-buttons">
          <!-- START Toolbar Button -->
          <div class="toolbar-button">
            <button @click="draw.setMode('polygon')">Polygon</button>
          </div>
          <!-- END Toolbar Button -->

          <!-- START Toolbar Button -->
          <div class="toolbar-button">
            <button @click="draw.setMode('select')">Select</button>
          </div>
          <!-- END Toolbar Button -->
        </div>
        <!-- END Toolbar Buttons -->
      </div>
      <!-- END Toolbar -->

      <!-- START Info -->
      <div class="info">
        <p><strong>Click</strong> to add a point</p>
        <p><strong>Double click</strong> to finish</p>
      </div>
      <!-- END Info -->
    </div>
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

// START Container
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;

  // START Left (66.66% width)
  .left {
    width: 66.66%;
    height: 100%;
  }

  // START Right (33.33% width)
  .right {
    width: 33.33%;
    height: 100%;
    background-color: #f5f5f5;
    padding: 20px;

    // START Toolbar
    .toolbar {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 50px;
      margin-bottom: 20px;

      // START Toolbar Title
      .toolbar-title {
        h3 {
          margin: 0;
        }
      }
      // END Toolbar Title

      // START Toolbar Buttons
      .toolbar-buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;

        // START Toolbar Button
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
        // END Toolbar Button
      }
      // END Toolbar Buttons
    }
    // END Toolbar

    // START Info
    .info {
      p {
        margin: 0;
        margin-bottom: 10px;
      }
    }
    // END Info
  }
}

// START Map
#map {
  width: 100%;
  height: 100%;
}
</style>
