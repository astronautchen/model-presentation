// import EventEmitter from './EventEmitter.js';
import * as THREE from 'three';
import GSAP from 'gsap';
// import Ray from '../World/Ray.js';
import Experience from '../Experience.js';

export default class Mouse {
  move = false;
  currentIntersect;
  tween;
  constructor() {
    this.experience = new Experience();
    this.mouse = new THREE.Vector2(1, 1);
    this.camera = this.experience.camera;
    this.scene = this.experience.scene;
    this.size = this.experience.sizes;
    this.canvas = this.experience.canvas;
    this.ray = this.experience.ray;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    window.addEventListener('mousemove', (event) => {
      event.preventDefault();
      this.mouse.x = ((event.clientX - 280) / this.size.width) * 2 - 1;
      this.mouse.y = -((event.clientY - 94) / this.size.height) * 2 + 1;
    });
    window.addEventListener('click', () => {
      if (this.currentIntersect) {
        // console.log(this.currentIntersect);
        // if (!this.camera.controls) {
        //   this.camera.setControls();
        //   this.camera.controls.attach(this.currentIntersect.object);
        // }
        console.log(this.currentIntersect);
        if (this.currentIntersect.object.name == '电源001') {
          let screen = this.scene.getObjectByName('屏幕');
          // this.setupCanvasDrawing();
          const target = document.getElementById('drawing-canvas');
          screen.material.color.set(0x00ff00);
          let texture = new THREE.CanvasTexture(target, THREE.CubeReflectionMapping);
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping; // uv两个方向纹理重复数量
          texture.rotation = Math.PI / 2;
          texture.repeat.set(4, 4);
          texture.flipY = false;
          texture.offset = new THREE.Vector2(0, 0.5);
          screen.material.map = texture;
          const drawingContext = target.getContext('2d');
          // let backingStore =
          //   drawingContext.backingStorePixelRatio ||
          //   drawingContext.webkitBackingStorePixelRatio ||
          //   drawingContext.mozBackingStorePixelRatio ||
          //   drawingContext.msBackingStorePixelRatio ||
          //   drawingContext.oBackingStorePixelRatio ||
          //   drawingContext.backingStorePixelRatio ||
          //   1;
          console.log(window.devicePixelRatio, 1);
          drawingContext.fillStyle = '#ffffff';
          drawingContext.scale(3, 3);
          drawingContext.font = '10px sans-serif';
          drawingContext.fillText('等待TDM 入网 ...', 10, 24);
          drawingContext.fillText('频点设置 12250MHz', 10, 36);
          screen.material.needsUpdate = true;

          let light = this.scene.getObjectByName('透明灯');
          if (!this.tween) {
            this.tween = this.tweenColorTo(light, new THREE.Color(0xff0000));
          } else {
            this.tween.pause();
            this.tween = null;
            this.colorTo(light, 0xd4d4d4);
          }
        }
      }
    });
  }
  setupCanvasDrawing() {
    const target = document.getElementById('drawing-canvas');
    const drawingContext = target.getContext('2d');
    drawingContext.moveTo(0, 0);
    drawingContext.strokeStyle = '#ffffff';
    drawingContext.lineTo(200, 50);
    drawingContext.stroke();
    return target;
  }
  colorTo(target, value) {
    target.material.color = value;
  }
  tweenColorTo(target, value, repeat = -1) {
    var initial = new THREE.Color(target.material.color.getHex());
    return GSAP.to(initial, 0.3, {
      r: value.r,
      g: value.g,
      b: value.b,
      // ease: Cubic.easeInOut,
      repeat: repeat,
      onUpdate: function () {
        target.material.color = initial;
      }
    });
  }

  update() {
    // console.log(123);
    if (!this.ray) return;
    this.ray.instance.setFromCamera(this.mouse, this.camera.instance);
    const intersects = this.ray.instance.intersectObjects(this.scene.children, true);
    // console.log(intersects);
    if (intersects.length) {
      if (!this.currentIntersect) {
        console.log('mouse enter');
      }
      this.currentIntersect = intersects[0];

      // console.log('this.camera.controls', this.camera.controls);
      // console.log(this.currentIntersect);
    } else {
      if (this.currentIntersect) {
        console.log('mouse leave');
      }
      this.currentIntersect = null;
    }
  }
}
