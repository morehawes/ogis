<script setup>
const mapStore = useMapStore();
const { map } = mapStore;

const drawStore = useDrawStore();
const { draw } = drawStore;

console.log(map, draw);

debugger;

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
