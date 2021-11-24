import * as RE from 'rogue-engine';
import { Prefab, Prop, Runtime } from 'rogue-engine';
import { Vector3 } from 'three';
import LightsaberBlade from './LightsaberBlade.re';

export default class RemoteFire extends RE.Component {
  @Prop("Prefab")
  laserPrefab: Prefab;

  private nextFire = 1;

  update() {
    this.nextFire-=Runtime.deltaTime;

    if (this.nextFire > 0 || !LightsaberBlade.active) {
      return;
    }

    this.fire();
    this.nextFire = Math.random() * 5;
  }

  fire() {
    const laser = this.laserPrefab.instantiate();
    this.object3d.getWorldPosition(laser.position);

    const vector = new Vector3();
    Runtime.renderer.xr.getCamera(Runtime.camera).getWorldPosition(vector);
    console.log(vector);

    vector.x += -.4 + (Math.random() + .8);
    vector.y += -.3 + (Math.random() + .6);
    vector.z += -.4 + (Math.random() + .8);
    laser.lookAt(vector);
  }
}

RE.registerComponent(RemoteFire);
