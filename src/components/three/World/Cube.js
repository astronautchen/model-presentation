import * as THREE from 'three';
import Experience from '../Experience.js';
// import EventEmitter from '../Utils/EventEmitter.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
// import { Flow } from 'three/examples/jsm/modifiers/CurveModifier.js';
export default class Cube {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    // this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;
    this.size = this.experience.sizes;
    this.axis = new THREE.Vector3(0, 1, 0);
    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('fox');
    }
    // this.camera.on('distance', (num) => {
    //   console.log(num);
    //   if (this.scene.getObjectByName('cube') && this.scene.getObjectByName('plane')) {
    //     if (num < 1) {
    //       this.scene.getObjectByName('cube').visible = false;
    //       this.scene.getObjectByName('plane').visible = true;
    //     } else {
    //       this.scene.getObjectByName('cube').visible = true;
    //       this.scene.getObjectByName('plane').visible = false;
    //     }
    //   }
    // });

    // Resource
    // this.resource = this.resources.items.fdModel;

    this.setCubeModel();
    // this.setAnimation();
  }
  setSprite() {
    console.log(this);
    const map = new THREE.TextureLoader().load('plane.png');
    const material = new THREE.SpriteMaterial({ map: map });
    const sprite = new THREE.Sprite(material);
    // console.log(material.map);
    sprite.scale.set(0.75, 0.75, 1);
    // const x1 = (x / this.size.width) * 2 - 1;
    // const y1 = -(y / this.size.height) * 2 + 1;
    // console.log(x, y, x1, y1);
    const stdVector = new THREE.Vector3(10, 10, 0);
    console.log(stdVector, this.camera);
    // const worldVector = stdVector.unproject(this.camera);
    // console.log(worldVector);
    sprite.position.copy(stdVector);
    this.scene.add(sprite);
    this.camera.controls.attach(sprite);
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
    const textureLoader = new THREE.TextureLoader();
    const object1 = new THREE.Mesh(
      new THREE.SphereGeometry(4, 32, 32),
      // new THREE.MeshBasicMaterial({ color: 0xff0000, emissive: 0xffff00 })
      new THREE.MeshPhongMaterial({
        // specular: 0x333333,
        // shininess: 5,
        map: textureLoader.load('earth/earth_atmos_2048.jpg'),
        // emissive: 0xffff00,
        // specularMap: textureLoader.load('textures/planets/earth_specular_2048.jpg'),
        // normalMap: textureLoader.load('textures/planets/earth_normal_2048.jpg'),
        normalScale: new THREE.Vector2(0.85, 0.85),
        wireframe: false
      })
    );

    object1.name = 'cube';
    this.scene.add(object1);
    this.setArea();
    // this.model.traverse((child) => {
    //   if (child instanceof THREE.Mesh) {
    //     child.castShadow = true;
    //   }
    // });
  }
  getGeoFromPoint(arg) {
    const points = arg.map((i) => new THREE.Vector3(...i));
    return new THREE.BufferGeometry().setFromPoints(points);
  }
  setArea() {
    // let group = [];
    let group = new THREE.Group();
    const geometry = this.getGeoFromPoint([
      [0, 0, 0],
      [12, 0, 0]
    ]);
    const dashline = new THREE.Line(
      geometry,
      new THREE.LineDashedMaterial({
        color: 0x08a9ff, //线段的颜色
        dashSize: 1, //短划线的大小
        gapSize: 0.2 //短划线之间的距离
      })
    );
    dashline.computeLineDistances(); //不可或缺的，若无，则线段不能显示为虚线
    group.add(dashline);
    group.add(this.setShape());
    group.add(this.setCircle());
    this.setFont(group);
    group.add(this.setSate(12, 0, 0));
    this.sate = group;
    this.scene.add(group);
    // this.setSate(12, 0, 0);
  }
  setCircle() {
    // 创建材质。
    let material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    // material.wireframe = true;
    // 创建圆形几何体。
    let geometry = new THREE.CircleGeometry(3.4, 32); // 参数：半径、分段数。

    // 创建边框圆并添加到场景中。
    let circle = new THREE.LineLoop(geometry, material);
    circle.position.x = 2.3;
    circle.rotateY(Math.PI / 2);
    return circle;
  }
  setShape() {
    const shape = new THREE.Shape();

    // 定义多边形的点坐标（逆时针方向）
    shape.moveTo(0, 0);
    shape.lineTo(2.3, 3.4);
    shape.lineTo(12, 0);
    shape.lineTo(2.3, -3.4);
    // shape.lineTo(0, 0);

    // 创建 ShapeGeometry 实例
    const geometry = new THREE.ShapeGeometry(shape);

    // 创建 EdgesGeometry 实例
    const edges = new THREE.EdgesGeometry(geometry);

    // 创建 LineSegments 实例并添加到场景中
    const material = new THREE.LineBasicMaterial({
      color: 0xff0000
    });
    return new THREE.LineSegments(edges, material);
  }
  setSate(x, y, z) {
    const map = new THREE.TextureLoader().load('sprite/sate.png');
    const material = new THREE.SpriteMaterial({ map: map });
    const sprite = new THREE.Sprite(material);
    // console.log(material.map);
    // sprite.scale.set(0.75, 0.75, 1);
    // const x1 = (x / this.size.width) * 2 - 1;
    // const y1 = -(y / this.size.height) * 2 + 1;
    // console.log(x, y, x1, y1);
    // const stdVector = new THREE.Vector3(x, y, z);
    // console.log(stdVector, this.camera);
    sprite.position.copy(new THREE.Vector3(x, y, z));
    // this.scene.add(sprite);
    return sprite;
  }
  setFont(group) {
    // 创建 TextGeometry 实例
    const fontLoader = new FontLoader();
    fontLoader.load('font/helvetiker_regular.typeface.json', (font) => {
      console.log(THREE);
      const textGeometry = new TextGeometry('N', {
        font: font,
        size: 1,
        height: 0.1
      });

      // 将文字移动到正确的位置
      // textGeometry.translate(-20, -10, 0);

      // 创建 Mesh 实例
      const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMesh = new THREE.Mesh(textGeometry, material2);
      textMesh.position.y = 5;
      group.add(textMesh);
    });
  }
  setAddLod() {
    this.scene.add(this.lod);
  }

  update() {
    // console.log(this.sate);
    if (this.sate) {
      // this.sate.applyMatrix4(new THREE.Matrix4().makeRotationAxis(this.axis, 0.01));
      // this.sate.rotateY += 10;
      // console.log(this.sate);
      // this.sate.position.x += 0.1;
    }
    // this.sate.
    // this.animation.mixer.update(this.time.delta * 0.001);
  }
}
