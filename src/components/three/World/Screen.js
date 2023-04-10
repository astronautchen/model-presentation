import Experience from '../Experience.js';
// import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import EventEmitter from '../Utils/EventEmitter';

export default class MonitorScreen extends EventEmitter {
  root;
  background;
  constructor() {
    super();
    this.Experience = new Experience();
    this.scene = this.Experience.scene;
    this.cssScene = this.Experience.cssScene;
    this.sizes = this.Experience.sizes;
    this.camera = this.Experience.camera;
    // this.screenSize = new THREE.Vector2(SCREEN_SIZE.w, SCREEN_SIZE.h);
    // this.rotation = new THREE.Euler(-3 * THREE.MathUtils.DEG2RAD, 0, 0);
    this.makeElementObject();
  }
  makeElementObject() {
    var iframe = document.createElement('div');
    iframe.textContent = 'http://10.64.70.19:5500/index.html';
    iframe.style.width = 10 + 'px';
    iframe.style.height = 10 + 'px';
    iframe.style.border = '1px sloid red';
    iframe.style.color = 'red';
    var cssObject = new CSS3DObject(iframe);

    cssObject.position.x = 0;
    cssObject.position.y = -5;
    cssObject.position.z = 0;

    // cssObject.rotation.x = rotation.x;
    // cssObject.rotation.y = rotation.y;
    // cssObject.rotation.z = rotation.z;
    this.cssScene.add(cssObject);
  }
}
