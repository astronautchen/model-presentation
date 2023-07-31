<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import 'ol/ol.css';
  import UseMap from './ol/useMap';
  import UseMarker from './ol/useMarker';
  import UsePopup from './ol/usePopup';
  import Style from 'ol/style/Style';
  import Icon from 'ol/style/Icon';
  const {
    map,
    initMap,
    removeZoomer,
    addZoomer,
    zoomer,
    mousePosition,
    addMousePosition,
    removeMousePosition
  } = UseMap();
  const data = ref([
    {
      id: 1,
      name: '11',
      longitude: -3e6,
      latitude: 1e6,
      state: 0
    },
    {
      id: 2,
      name: '22',
      longitude: -1e6,
      latitude: 1e6,
      state: 2
    }
  ]);
  const { createMarker, updateMarker } = UseMarker();
  const changeData = () => {
    setInterval(() => {
      data.value[0].state = Math.floor(Math.random() * 3);
      data.value[0].longitude = Math.floor(Math.random() * 10);
      data.value[0].latitude = Math.floor(Math.random() * 10);
    }, 10000);
  };
  watch(
    () => data.value,
    (val: any) => {
      updateMarker(val[0]);
    },
    {
      deep: true
    }
  );
  const { createPopup, select } = UsePopup();
  onMounted(() => {
    initMap();
    removeZoomer();
    createMarker(map.value!, data.value, {
      lon: 'longitude',
      lat: 'latitude',
      style: new Style({
        image: new Icon({
          src: '/mapImg/location.svg'
        })
      })
    });
    changeData();
    createPopup(map.value!, 'popUp');
  });
</script>
<template>
  <div full class="r6 p-6 box-border bg fcc">
    <div frc mb-2>
      <el-button @click="zoomer ? removeZoomer() : addZoomer()">zoomer</el-button>
      <el-button @click="mousePosition ? removeMousePosition() : addMousePosition()"
        >mousePosition</el-button
      >
    </div>
    <div flex-1 relative full>
      <div id="map" absolute full>
        <div id="popUp"> id:{{ select ? select[0].id : '-' }} </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  :deep(#popUp) {
    background-color: #3a3c3f;
    // background-color: #ffffff;
    color: #fff;
    position: absolute;
    padding: 10px;
    font-size: 12px;
    border-radius: 8px;
    min-width: 130px;
    width: auto;
    left: 10px;
    top: 10px;
  }
</style>
