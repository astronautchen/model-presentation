import * as THREE from 'three';

import Debug from './Utils/Debug.js';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import Resources from './Utils/Resources.js';
import Label from './World/Lable.js';
import Ray from './World/Ray.js';
import Mouse from './Utils/Mouse.js';
import Canvas from './Utils/Canvas.js';
import Repo from './World/Repo.js';
// import Cube from './World/Cube.js';
// import Renderer3D from './CSS3DRender';

import sources from './sources.js';

let instance = null;

export default class Experience {
  constructor(_canvas) {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.experience = this;

    // Options
    this.canvas = _canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.cssScene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.ray = new Ray();
    this.label = new Label();
    // this.cube = new Cube();
    this.mouse = new Mouse();
    this.canvas = new Canvas();
    this.repo = new Repo();
    // this.Renderer3D = new Renderer3D();
    // this.mouseRay = new Ray();

    // Resize event
    this.sizes.on('resize', () => {
      this.resize();
    });

    // Time tick event
    this.time.on('tick', () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    // this.Renderer3D.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
    // this.Renderer3D.update();
    if (this.label.points.length) {
      this.label.updateLabel();
    }
    this.mouse.update();
  }

  destroy() {
    this.sizes.off('resize');
    this.time.off('tick');

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        }
      }
    });

    // this.camera.controls.dispose();
    this.camera.orbit.dispose();
    this.renderer.instance.dispose();
    // this.Renderer3D.instance.dispose();
    this.scene = null;
    instance = null;

    if (this.debug.active) this.debug.ui.destroy();
  }
}
