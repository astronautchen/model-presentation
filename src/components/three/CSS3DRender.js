// import * as THREE from 'three';
import Experience from './Experience.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export default class Renderer3D {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
    this.setMesh();
  }
  setMesh() {
    const div = document.createElement('div');
    div.style.width = '212px';
    div.style.height = '50px';
    div.style.backgroundColor = '#000';
    div.classList.add('crrr');

    const iframe = document.createElement('iframe');
    iframe.style.width = '212px';
    iframe.style.height = '50px';
    iframe.style.border = '0px';
    iframe.src = 'http://10.64.70.19:5500/index.html';
    div.appendChild(iframe);

    const object = new CSS3DObject(div);
    object.position.set(0, 0, 0);
    object.rotation.y = -Math.PI * 0.5;
    this.scene.add(object);
  }
  setInstance() {
    this.instance = new CSS3DRenderer();
    this.instance.setSize(this.sizes.width, this.sizes.height);
    document.getElementById('father').appendChild(this.instance.domElement);
    // this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
