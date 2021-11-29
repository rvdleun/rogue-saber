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
    this.nextFire = .5 + Math.random() * 2;
  }

  fire() {
    const laser = this.laserPrefab.instantiate();
    this.object3d.getWorldPosition(laser.position);

    const vector = new Vector3();
    Runtime.renderer.xr.getCamera(Runtime.camera).getWorldPosition(vector);

    vector.x += -.25 + (Math.random() * .5);
    vector.y += -.3 + (Math.random() * .3);
    vector.z += -.25 + (Math.random() * .5);
    laser.lookAt(vector);
  }
}

RE.registerComponent(RemoteFire);
