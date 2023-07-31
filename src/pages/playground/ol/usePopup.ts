import Overlay from 'ol/Overlay';
import { ref } from 'vue';
import { Map, MapBrowserEvent } from 'ol';

export default function () {
  const popUp = ref();
  const createPopup = (map: Map, el: string) => {
    const container = document.getElementById(el);
    if (!container) {
      console.error(`${el} notfound`);
      return;
    }
    popUp.value = new Overlay({
      element: container as HTMLElement,
      autoPan: {
        animation: {
          duration: 250
        }
      }
    });
    map?.addOverlay(popUp.value);
    initMapEvent(map);
  };
  const select = ref<any>();
  const initMapEvent = (map: Map, eventType: any = 'pointermove') => {
    map?.on(eventType, function (e: MapBrowserEvent<any>) {
      const feature = map?.forEachFeatureAtPixel(e.pixel, function (f) {
        return f;
      });
      if (!feature) {
        select.value = [];
        popUp.value.setPosition(undefined);
      } else {
        select.value = [feature.getProperties(), e.coordinate];
        popUp.value.setPosition(e.coordinate);
      }
    });
  };
  const showPopUp = () => {
    popUp.value.setPosition(select.value[1]);
  };
  const hidePopUp = () => {
    popUp.value.setPosition(undefined);
  };
  return {
    createPopup,
    showPopUp,
    hidePopUp,
    select
  };
}
