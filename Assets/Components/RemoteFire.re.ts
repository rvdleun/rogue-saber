import * as RE from 'rogue-engine';
import { Prefab, Prop, Runtime } from 'rogue-engine';
import { PositionalAudio, Vector3 } from 'three';
import LightsaberBlade from './LightsaberBlade.re';

const vector = new Vector3();
export default class RemoteFire extends RE.Component {
  @Prop("Boolean")
  alwaysFire: boolean = false;

  @Prop("PositionalAudio")
  chargeSound: PositionalAudio;

  @Prop("PositionalAudio")
  fireSound: PositionalAudio;

  @Prop("Prefab")
  laserPrefab: Prefab;

  private currentAudio = 0;
  private firing = false;
  private nextFire = 0;
  private nextFires: number[] = [];
  private fireSounds: PositionalAudio[] = [];

  start() {
    this.chargeSound.setPlaybackRate(1.2);

    for(let i = 0; i < 10; i++) {
      const audio = new PositionalAudio(this.fireSound.listener);
      audio.setBuffer(this.fireSound.buffer as AudioBuffer);

      this.fireSounds.push(audio);
      this.object3d.add(audio);
    }
  }

  update() {
    if (!this.firing) {
      return;
    }

    this.nextFire-=Runtime.deltaTime;
    if (this.nextFire > 0) {
      return;
    }

    this.fire();
    this.firing = this.nextFires.length > 0;
    this.nextFire = this.nextFires.shift() as number;
  }

  startFiring(): number {
    const numberOfFires = 2 + (Math.random() * 4);

    for(let i = 0; i < numberOfFires; i++) {
      this.nextFires.push(.25 + (Math.random() * .35));
    }

    this.chargeSound.play();
    this.firing = true;
    this.nextFire = 1.5;

    vector.x += -.25 + (Math.random() * .5);
    vector.y += -.3 + (Math.random() * .3);
    vector.z += -.25 + (Math.random() * .5);

    return this.nextFires.reduce((result, value) => result + value, 1.5);
  }

  playAudio() {
    this.currentAudio++;
    if (this.currentAudio >= this.fireSounds.length) {
      this.currentAudio = 0;
    }

    const fireSound = this.fireSounds[this.currentAudio];
    fireSound.setPlaybackRate(.8 + (Math.random() * .7));
    fireSound.play();
  }

  fire() {
    const laser = this.laserPrefab.instantiate();
    this.object3d.getWorldPosition(laser.position);

    Runtime.renderer.xr.getCamera(Runtime.camera).getWorldPosition(vector);

    vector.x += -.05 + (Math.random() * .1);
    vector.y += -.05 + (Math.random() * .1);
    vector.z += -.05 + (Math.random() * .1);
    laser.lookAt(vector);

    this.playAudio();
  }
}

RE.registerComponent(RemoteFire);
