import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Repo {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // this.setLine();
  }
  setLine() {
    const curveHandles = [];
    const initialPoints = [
      { x: 1, y: 0, z: -1 },
      { x: 1, y: 0, z: 1 }
    ];

    const boxGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const boxMaterial = new THREE.MeshBasicMaterial();

    for (const handlePos of initialPoints) {
      const handle = new THREE.Mesh(boxGeometry, boxMaterial);
      handle.position.copy(handlePos);
      curveHandles.push(handle);
      this.scene.add(handle);
    }

    const curve = new THREE.CatmullRomCurve3(curveHandles.map((handle) => handle.position));
    curve.curveType = 'centripetal';
    // curve.closed = true;

    const points = curve.getPoints(50);
    const line = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: 0x00ff00 })
    );

    this.scene.add(line);
  }
}
