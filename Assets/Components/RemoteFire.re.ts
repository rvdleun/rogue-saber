import * as RE from 'rogue-engine';
import { Prefab, Prop, Runtime } from 'rogue-engine';
import { Mesh, MeshPhysicalMaterial, PositionalAudio, Vector3 } from 'three';
import EnemyIndicator from './EnemyIndicator.re';

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
  private charging = false;
  private firing = false;
  private remoteMaterial: MeshPhysicalMaterial;
  private nextFire = 0;
  private nextFires: number[] = [];
  private fireSounds: PositionalAudio[] = [];

  start() {
    this.chargeSound.setPlaybackRate(1);

    for(let i = 0; i < 10; i++) {
      const audio = new PositionalAudio(this.fireSound.listener);
      audio.setBuffer(this.fireSound.buffer as AudioBuffer);

      this.fireSounds.push(audio);
      this.object3d.add(audio);
    }

    const multiply = new Vector3(1.5, 1.5, 1.5);
    this.object3d.parent?.traverse((child: Mesh) => {
      if (!child.isMesh) {
        return;
      }

      const material = child.material as MeshPhysicalMaterial;
      if (material.color.r > .5 && material.color.g < .5 && material.color.b < .5) {
        if (child.name === 'mesh1273343276_1') {
          child.scale.multiply(multiply);
        }

        if (!this.remoteMaterial) {
          this.remoteMaterial = material.clone();
          this.remoteMaterial.color.setRGB(1, 1, 1);
        }

        child.material = this.remoteMaterial;
      }
    });
  }

  update() {
    if (!this.firing) {
      return;
    }

    this.nextFire-=Runtime.deltaTime;
    if (this.charging) {
      this.remoteMaterial.color.setRGB(1, this.nextFire / 3, this.nextFire / 3);
    }

    if (this.nextFire > 0) {
      return;
    }

    if (this.charging) {
      this.remoteMaterial.color.setRGB(1, 1, 1);
    }

    this.fire();
    this.charging = false;
    this.firing = this.nextFires.length > 0;
    this.nextFire = this.nextFires.shift() as number;

    if (!this.nextFire) {
      EnemyIndicator.global.setTarget(null)
    }
  }

  startFiring(): number {
    const numberOfFires = 2 + (Math.random() * 4);

    for(let i = 0; i < numberOfFires; i++) {
      this.nextFires.push(.25 + (Math.random() * .35));
    }

    this.chargeSound.play();
    this.charging = true;
    this.firing = true;
    this.nextFire = 1.75;

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
