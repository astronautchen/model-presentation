import * as THREE from 'three';
import Experience from './Experience.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import EventEmitter from './Utils/EventEmitter.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
// import World from './World/World';
export default class Camera extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.renderer = this.experience.renderer;
    this.world = this.experience.world;

    this.setInstance();
    this.setOrb();
    this.setControls();
    // this.setAxesHelper();
    // this.setDragControls();
    // this.setCameraHelper();
    this.distance = 0;
    // console.log('world', this.scene);
    // this.world.on('modelReady', (e) => {
    //   console.log('e', e);
    // });
    // this.Renderer
  }
  setCameraHelper() {
    const helper = new THREE.CameraHelper(this.instance);
    this.scene.add(helper);
  }
  setAxesHelper() {
    // const axesHelper = new THREE.AxesHelper(20);
    // this.scene.add(axesHelper);
    this.scene.add(new THREE.GridHelper(100, 10, 0x888888, 0x444444));
  }
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      3000
    );
    // this.instance.position.target(0, 4, 0);
    this.instance.position.set(24, 16, 32);
    // this.instance.rotateY = Math.PI / 2;
    this.instance.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.instance);
  }

  setOrb() {
    this.orbit = new OrbitControls(this.instance, this.canvas);
    this.orbit.enableDamping = true;
  }
  setDragControls() {
    this.dragControls = new DragControls([], this.camera, this.canvas);
    document.addEventListener('click', () => {
      console.log(123);
    });
    // this.controls.setMode('translate');
    // this.scene.add(this.controls);
    // this.controls.addEventListener('drag', render);
  }
  //transformContril
  setControls() {
    this.controls = new TransformControls(this.instance, this.canvas);
    // this.controls.setMode('translate');

    this.scene.add(this.controls);
    this.controls.addEventListener('dragging-changed', (event) => {
      this.orbit.enabled = !event.value;
    });
    window.addEventListener('keydown', () => {
      switch (event.keyCode) {
        case 87: // W
          this.controls.setMode('translate');
          break;

        case 69: // E
          this.controls.setMode('rotate');
          break;

        case 82: // R
          this.controls.setMode('scale');
          break;
        case 81: // Q
          // this.controls.enabled = !this.controls.enabled;
          // this.controls.dispose();
          this.scene.remove(this.controls);
          break;
      }
    });
    // this.World
    // this.renderer.on('onPointerDown', (e) => {
    //   console.log(e);
    // });
    // this.control.attach(this.scene.children);
    // this.controls.enableDamping = true;
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
    this.orbit.autoRotate = bol;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.orbit.update();
    // console.log(this.instance.position.distanceTo(new THREE.Vector3()));
    // if (this.instance.position.distanceTo(new THREE.Vector3()).toFixed(2) != this.distance) {
    //   this.distance = this.instance.position.distanceTo(new THREE.Vector3()).toFixed(2);
    //   console.log(this.distance);
    //   this.trigger('distance', [this.distance]);
    // }
  }
}
