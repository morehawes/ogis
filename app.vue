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
  const draw = new TerraDraw({
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
  <div>
    <div id="map" />
  </div>
</template>

<style>
#map {
  width: 300px;
  height: 300px;
}
</style>
