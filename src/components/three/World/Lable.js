import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Label {
  points = [];
  constructor() {
    this.experience = new Experience();
    this.ray = this.experience.ray;
    this.camera = this.experience.camera;
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    // this.initLable(arr);
  }
  initLabel(father, arr) {
    this.clearElement(father);
    arr.forEach((e, index) => {
      let el = document.createElement('div');
      el.innerHTML = `
      <div class="label">1</div>
      <div class="text"> Lorem ipsum, dolor sit amet consectetur adipisicing elit </div>`;
      // father.append(
      //   `
      //   <div class="point point-${index}">
      //     <div class="label">1</div>
      //     <div class="text"> Lorem ipsum, dolor sit amet consectetur adipisicing elit </div>
      //   </div>
      //   `
      // );
      el.classList.add('point', `point-${index}`);
      father.append(el);
      this.points.push({
        position: new THREE.Vector3(...e),
        element: el
      });
    });
    console.log(this.points);
  }
  clearElement(father) {
    this.points = [];
    console.log(father, document.getElementsByClassName('point'));
    // if (document.getElementsByClassName('point')) {
    //   father.remove(document.getElementsByClassName('point'));
    // }
  }
  updateLabel() {
    for (const point of this.points) {
      const screenPosition = point.position.clone();
      screenPosition.project(this.camera.instance);
      this.ray.instance.setFromCamera(screenPosition, this.camera.instance);
      const intersects = this.ray.instance.intersectObjects(this.scene.children, true);
      if (intersects.length === 0) {
        point.element.classList.add('visible');
      } else {
        const intersectionDistance = intersects[0].distance;
        const pointDistance = point.position.distanceTo(this.camera.instance.position);
        if (intersectionDistance < pointDistance) {
          point.element.classList.remove('visible');
        } else {
          point.element.classList.add('visible');
        }
      }
      const translateX = screenPosition.x * this.sizes.width * 0.5;
      const translateY = -screenPosition.y * this.sizes.height * 0.5;
      point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    }
  }
}
