import * as THREE from 'three';
import Experience from './Experience.js';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import EventEmitter from './Utils/EventEmitter.js';
export default class Renderer extends EventEmitter {
  // cssInstance;
  constructor() {
    super();
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.cssScene = this.experience.cssScene;
    // this.canvas.addEventListener('pointerdown', (event) => {
    //   // this.trigger('pointerdown', event);
    //   this.action = ACTION_SELECT;
    // });
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor('#211d20');
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));

    this.cssInstance = new CSS3DRenderer();
    this.cssInstance.setSize(this.sizes.width, this.sizes.height);
    this.cssInstance.domElement.style.position = 'absolute';
    this.cssInstance.domElement.style.top = '0px';
    document.getElementById('css')?.appendChild(this.cssInstance.domElement);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    this.cssInstance.setSize(this.sizes.width, this.sizes.height);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
    this.cssInstance.render(this.cssScene, this.camera.instance);
  }
}
