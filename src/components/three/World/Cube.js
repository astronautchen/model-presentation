import * as THREE from 'three';
import Experience from '../Experience.js';
// import EventEmitter from '../Utils/EventEmitter.js';

export default class Cube {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    // this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('fox');
    }
    this.camera.on('distance', (num) => {
      console.log(num);
      if (this.scene.getObjectByName('cube') && this.scene.getObjectByName('plane')) {
        if (num < 1) {
          this.scene.getObjectByName('cube').visible = false;
          this.scene.getObjectByName('plane').visible = true;
        } else {
          this.scene.getObjectByName('cube').visible = true;
          this.scene.getObjectByName('plane').visible = false;
        }
      }
    });

    // Resource
    // this.resource = this.resources.items.fdModel;

    // this.setModel();
    // this.setAnimation();
  }
  setPlaneModel() {
    const object1 = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      new THREE.MeshBasicMaterial({ color: '#B71C1C', side: THREE.DoubleSide })
    );
    object1.rotation.x = Math.PI / 2;
    object1.name = 'plane';
    object1.visible = false;
    this.scene.add(object1);
  }

  setCubeModel() {
    const object1 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({ color: '#B71C1C' })
    );
    // object1.rotate.Z = Math.PI / 2;
    // object1.layers = 1;
    // object1.scale.set(10, 10, 10);
    object1.name = 'cube';
    object1.position.set(0, 0, 0);

    // this.lod.addLevel(object1, 20);
    // console.log('this.resource')
    // this.model = this.resource.scene;
    // this.model.scale.set(0.1, 0.1, 0.1);
    // this.model.position.y = 0.8;
    // this.model.position.z = -2;
    this.scene.add(object1);

    // this.model.traverse((child) => {
    //   if (child instanceof THREE.Mesh) {
    //     child.castShadow = true;
    //   }
    // });
  }
  setAddLod() {
    this.scene.add(this.lod);
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
