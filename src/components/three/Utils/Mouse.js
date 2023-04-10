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
        // this.setupCanvasDrawing();
        if (this.currentIntersect.object.name == '电源001') {
          // console.log(111, this.canvas.getCanvasDrawing());
          let screen = this.scene.getObjectByName('屏幕');
          // this.setupCanvasDrawing();
          console.log(screen);
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
          let backingStore =
            drawingContext.backingStorePixelRatio ||
            drawingContext.webkitBackingStorePixelRatio ||
            drawingContext.mozBackingStorePixelRatio ||
            drawingContext.msBackingStorePixelRatio ||
            drawingContext.oBackingStorePixelRatio ||
            drawingContext.backingStorePixelRatio ||
            1;
          console.log(window.devicePixelRatio, backingStore);
          drawingContext.fillStyle = '#ffffff';
          // 放大倍数
          // drawingContext.width = 400; //☜
          // drawingContext.height = 100;
          drawingContext.scale(3, 3);

          drawingContext.font = '10px sans-serif';
          drawingContext.fillText('等待TDM 入网', 0, 12);
          drawingContext.fillText('频点设置 12250MHz7', 0, 24);
          screen.material.needsUpdate = true;
          let light = this.scene.getObjectByName('透明灯');
          if (!this.tween) {
            this.tween = this.tweenColorTo(light, new THREE.Color(0xff0000));
          } else {
            this.tween.pause();
            this.tween = null;
            this.colorTo(light, new THREE.Color(0xd4d4d4));
          }
        }
      }
    });
  }
  setupCanvasDrawing() {
    const target = document.getElementById('drawing-canvas');
    // const drawingContext = target.getContext('2d');
    const drawingContext = target.getContext('2d');
    // drawingContext.fillStyle = '#FFFFFF';
    drawingContext.moveTo(0, 0);
    drawingContext.strokeStyle = '#ffffff';
    drawingContext.lineTo(200, 50);
    drawingContext.stroke();
    // // document.getElementById
    // drawingContext.width = 200; //☜
    // drawingContext.height = 50;
    // // drawingContext.style.backgroundColor = '#FF0000';

    // // draw white background
    // // drawingContext.fillRect(0, 0, 200, 50);
    // drawingContext.fillStyle = '#FFFFFF';
    // drawingContext.fillRect(0, 0, 200, 50);
    // drawingContext.font = '20px Arial';
    // drawingContext.fillText('!!!', 10, 50);
    return target;
  }
  colorTo(target, value) {
    target.material.color = value;
  }
  tweenColorTo(target, value, repeat = -1) {
    // var target = this.scene.getObjectByName(target);
    var initial = new THREE.Color(target.material.color.getHex());
    // var value = new THREE.Color(value.color.getHex());

    return GSAP.to(initial, 0.3, {
      //This syntax is relevant to GSAP's TweenLite, I'll provide a link to the docs
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
    if (!this.ray) return;
    this.ray.instance.setFromCamera(this.mouse, this.camera.instance);
    const intersects = this.ray.instance.intersectObjects(this.scene.children);
    if (intersects.length) {
      if (!this.currentIntersect) {
        console.log('mouse enter');
      }
      this.currentIntersect = intersects[0];
    } else {
      if (this.currentIntersect) {
        console.log('mouse leave');
      }
      this.currentIntersect = null;
    }
    // if (intersection && intersection[0] && intersection[0].object.name == '屏幕' && !this.move) {
    //   GSAP.to(this.camera.instance.position, {
    //     x: 3,
    //     y: 0.2,
    //     z: 0,
    //     duration: 2,
    //     onStart: () => {
    //       console.log('动画开始');
    //       this.move = true;
    //     },
    //     onComplete: () => {
    //       console.log('动画完成', this.camera.instance.position, intersection[0]);
    //       this.move = false;
    //     }
    //   });
    //   // intersection[0].object.material.color.set(0x00ff00);
    // }
  }
}
