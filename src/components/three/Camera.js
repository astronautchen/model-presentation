import * as THREE from 'three';
import Experience from './Experience.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import EventEmitter from './Utils/EventEmitter.js';
export default class Camera extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setControls();
    this.setAxesHelper();
    // this.setCameraHelper();
    this.distance = 0;
  }
  setCameraHelper() {
    const helper = new THREE.CameraHelper(this.instance);
    this.scene.add(helper);
  }
  setAxesHelper() {
    const axesHelper = new THREE.AxesHelper(20);
    this.scene.add(axesHelper);
  }
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);
    // this.instance.position.set(6, 4, 8);
    this.instance.position.set(24, 16, 32);
    // this.instance.rotateY = Math.PI / 2;
    this.instance.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }
  setCameraOrient(key) {
    switch (key) {
      case 'front':
        this.instance.position.set(3, 0.2, 0);
        break;
      case 'back':
        this.instance.position.set(-3, 0.2, 0);
        break;
      default:
        this.instance.position.set(6, 4, 8);
        break;
    }
  }
  setAutoRotate(bol) {
    this.controls.autoRotate = bol;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
    // console.log(this.instance.position.distanceTo(new THREE.Vector3()));
    if (this.instance.position.distanceTo(new THREE.Vector3()).toFixed(2) != this.distance) {
      this.distance = this.instance.position.distanceTo(new THREE.Vector3()).toFixed(2);
      console.log(this.distance);
      this.trigger('distance', [this.distance]);
    }
  }
}
