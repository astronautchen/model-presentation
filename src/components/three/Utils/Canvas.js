import EventEmitter from './EventEmitter.js';
import Experience from '../Experience.js';

export default class Canvas extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    // this.setupCanvasDrawing();
  }
  setupCanvasDrawing(target) {
    const drawingContext = target.getContext('2d');
    // document.getElementById
    drawingContext.width = 200; //☜
    drawingContext.height = 50;
    // drawingContext.style.backgroundColor = '#FF0000';

    // draw white background

    drawingContext.fillStyle = '#FFFFFF';
    drawingContext.font = '20px Arial';
    drawingContext.fillText('Hello World', 10, 50);
  }
  getCanvasDrawing() {
    return target.getContext('2d');
  }
}
