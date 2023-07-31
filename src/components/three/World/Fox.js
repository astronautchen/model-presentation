import * as THREE from 'three';
import Experience from '../Experience.js';
import EventEmitter from '../Utils/EventEmitter.js';
export default class Fox extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('fox');
    }

    // Resource
    this.resource = this.resources.items.fdModel;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    // console.log('this.resource')
    this.model = this.resource.scene;
    this.model.name = 'fd';
    // this.model.rotation.y = -Math.PI * 0.5;
    // this.model.scale.set(0.1, 0.1, 0.1);
    // this.model.position.set(3, 0.2, 0);
    // this.model.position.y = 0.8;
    // this.model.position.z = -2;
    this.scene.add(this.model);
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        // child.material.needsUpdate = true;
      }
    });
  }

  setAnimation() {
    this.animation = {};

    // Mixer
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    // Actions
    this.animation.actions = {};

    this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0]);
    this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1]);
    this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2]);

    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();

    // Play the action
    this.animation.play = (name) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1);

      this.animation.actions.current = newAction;
    };

    // Debug
    if (this.debug.active) {
      const debugObject = {
        playIdle: () => {
          this.animation.play('idle');
        },
        playWalking: () => {
          this.animation.play('walking');
        },
        playRunning: () => {
          this.animation.play('running');
        }
      };
      this.debugFolder.add(debugObject, 'playIdle');
      this.debugFolder.add(debugObject, 'playWalking');
      this.debugFolder.add(debugObject, 'playRunning');
    }
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
