import Experience from '../Experience.js';
import Environment from './Environment.js';
// import Floor from './Floor.js';
import Fox from './Fox.js';
// import Cube from './Cube.js';
import MonitorScreen from '../World/Screen';
import EventEmitter from '../Utils/EventEmitter.js';

export default class World extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;

    // this.cube = new Cube();
    // Wait for resources
    this.resources.on('ready', () => {
      // Setup
      // this.floor = new Floor();
      // this.fox = new Fox();
      // this.camera.controls.attach(this.fox.model);
      this.cube = new Fox();
      // this.trigger('modelReady', this.cube);
      // this.cube.setCubeModel();
      // this.cube.setPlaneModel();
      // this.cube.setAddLod();

      this.environment = new Environment();
      this.monitorScreen = new MonitorScreen();
    });
  }

  update() {
    //
    if (this.fox) this.fox.update();
    if (this.cube) {
      // console.log(11);
      this.cube.update();
    }
  }
}
