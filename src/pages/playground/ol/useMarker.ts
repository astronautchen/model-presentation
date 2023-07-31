import { Feature } from 'ol';
import { Point, Geometry } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { ref } from 'vue';
import { Map } from 'ol';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { transform } from 'ol/proj';
// import BaseLayer from 'ol/layer/Base';

interface MarkerData {
  lon: number;
  lat: number;
  [propName: string]: any;
}
const style = (color = '#0000ff') => {
  return new Style({
    image: new Icon({
      src: '/mapImg/map.svg',
      color
    })
  });
};
const colorList = ['#ff0000', '#00ff00', '#0000ff'];
function styleFunction(feature: any) {
  const imgColor = colorList[feature.get('state')];
  return style(imgColor);
}
const defaultOption: any = {
  lon: 'lon',
  lat: 'lat',
  state: 'state'
};
export default function () {
  const layer = ref(new VectorLayer());
  let _option = { ...defaultOption };
  const createMarker = (map: Map, data: any[], option?: any) => {
    _option = { ...defaultOption, ...option };
    const features = createFeature(data);
    layer.value.setSource(
      new VectorSource({
        features
      })
    );
    // console.log(_option.style);
    layer.value.setStyle(_option?.style || styleFunction);
    map.addLayer(layer.value as VectorLayer<VectorSource<Geometry>>);
  };
  const createFeature = (data: any[]) => {
    return data.map((i: MarkerData) => {
      const feature = new Feature({
        geometry: new Point([i[_option.lon], i[_option.lat]]),
        ...i
      });
      feature.setId(i.id);
      return feature;
    });
  };
  const updateMarker = (data: any) => {
    const feature = layer.value.getSource()?.getFeatureById(data.id) as any;
    if (feature) {
      feature.set('state', data.state);
      feature
        .getGeometry()
        .setCoordinates(
          transform([data[_option.lon], data[_option.lat]], 'EPSG:4326', 'EPSG:3857')
        );
    }
  };
  return {
    createMarker,
    updateMarker
  };
}
