import * as RE from 'rogue-engine';
import { Prop } from 'rogue-engine';
import { Camera, Euler, MathUtils, Object3D, Quaternion, Vector3 } from 'three';

let direction = 0;
const quaternionCamera = new Quaternion();
const quaternionTarget = new Quaternion();
export default class EnemyIndicator extends RE.Component {
  public static global: EnemyIndicator;

  @Prop("Object3D")
  public leftIndicator: Object3D;

  @Prop("Object3D")
  public rightIndicator: Object3D;

  @Prop("Object3D")
  public target: Object3D;

  private camera: Camera;

  awake() {
    this.camera = this.object3d.parent as Camera;
    EnemyIndicator.global = this;
  }

  beforeUpdate() {
    if (!this.target) {
      return;
    }

    const camera = this.camera.getWorldQuaternion(quaternionCamera);
    const target = this.target.getWorldQuaternion(quaternionTarget);

    const diff = camera.y - camera.slerp(target, .1).y;
    if (diff > 0.0275) {
      direction = 1;
    } else if (diff < -0.0275) {
      direction = -1;
    } else {
      direction = 0;
    }

    this.leftIndicator.visible = direction === -1;
    this.rightIndicator.visible = direction === 1;
  }
}

RE.registerComponent(EnemyIndicator);
