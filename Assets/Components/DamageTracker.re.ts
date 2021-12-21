import * as RE from 'rogue-engine';
import { Camera, Object3D } from 'three';
import { Runtime } from 'rogue-engine';

export default class DamageTracker extends RE.Component {
  public static collider: Object3D;

  private camera: Camera;

  awake() {
    this.camera = this.object3d.parent as Camera;
    Runtime.scene.add(this.object3d);

    DamageTracker.collider = this.object3d.children[0];
  }

  update() {
    this.camera.getWorldPosition(this.object3d.position);
    this.camera.getWorldQuaternion(this.object3d.quaternion);
  }
}

RE.registerComponent(DamageTracker);
