import * as RE from 'rogue-engine';
import { Prefab, Prop, Runtime } from 'rogue-engine';
import { PositionalAudio, Vector3 } from 'three';
import LightsaberBlade from './LightsaberBlade.re';

const warmUpTime = 2;
const vector = new Vector3();
export default class RemoteFire extends RE.Component {
  @Prop("Boolean")
  alwaysFire: boolean = false;

  @Prop("PositionalAudio")
  fireSound: PositionalAudio;

  @Prop("Prefab")
  laserPrefab: Prefab;

  private currentAudio = 0;
  private nextFire = 1;
  private fireSounds: PositionalAudio[] = [];

  start() {
    for(let i = 0; i < 10; i++) {
      const audio = new PositionalAudio(this.fireSound.listener);
      audio.setBuffer(this.fireSound.buffer as AudioBuffer);

      this.fireSounds.push(audio);
      this.object3d.add(audio);
    }
  }

  update() {
    this.nextFire-=Runtime.deltaTime;

    if (this.nextFire > 0) {
      return;
    }

    this.nextFire = .5 + Math.random() * 2;

    if ((this.alwaysFire || LightsaberBlade.active )) {
      this.fire();
      this.playAudio();
    }
  }

  playAudio() {
    console.log(this.nextFire);

    this.currentAudio++;
    if (this.currentAudio >= this.fireSounds.length) {
      this.currentAudio = 0;
    }

    const fireSound = this.fireSounds[this.currentAudio];
    
    if (this.nextFire > warmUpTime) {
      fireSound.offset = 0;
      fireSound.play(this.nextFire - warmUpTime);
    } else {
      fireSound.offset = warmUpTime - this.nextFire;
      fireSound.play(0);
    }
  }

  fire() {
    const laser = this.laserPrefab.instantiate();
    this.object3d.getWorldPosition(laser.position);

    Runtime.renderer.xr.getCamera(Runtime.camera).getWorldPosition(vector);

    vector.x += -.25 + (Math.random() * .5);
    vector.y += -.3 + (Math.random() * .3);
    vector.z += -.25 + (Math.random() * .5);
    laser.lookAt(vector);
  }
}

RE.registerComponent(RemoteFire);
