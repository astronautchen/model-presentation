import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Ray {
  constructor() {
    this.experience = new Experience();
    this.instance = new THREE.Raycaster();
  }
}
