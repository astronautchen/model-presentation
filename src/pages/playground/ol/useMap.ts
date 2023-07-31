import { ref } from 'vue';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Zoom, { Options } from 'ol/control/Zoom.js';
import MousePosition from 'ol/control/MousePosition.js';
import { fromLonLat } from 'ol/proj.js';
// import mitt from '@/utils/mitt';

export default function () {
  const map = ref<Map>();
  const initMap = () => {
    map.value = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([116.4074, 39.9042]),
        zoom: 2
      }),
      controls: []
    });
    // updataSize();
  };
  const zoomer = ref<Zoom | null>(null);
  const addZoomer = (options?: Options) => {
    zoomer.value = new Zoom(options);
    map.value?.addControl(zoomer.value as Zoom);
  };
  const removeZoomer = () => {
    map.value?.removeControl(zoomer.value as Zoom);
    zoomer.value = null;
  };

  const mousePosition = ref<MousePosition | null>(null);
  const addMousePosition = (options?: Options) => {
    mousePosition.value = new MousePosition(options);
    map.value?.addControl(mousePosition.value as MousePosition);
  };
  const removeMousePosition = () => {
    map.value?.removeControl(mousePosition.value as MousePosition);
    mousePosition.value = null;
  };
  // const updataSize = () => {
  //   mitt.on('resize', () => {
  //     console.log(1);
  //   });
  // };
  return {
    map,
    initMap,
    zoomer,
    addZoomer,
    removeZoomer,
    mousePosition,
    addMousePosition,
    removeMousePosition
  };
}
