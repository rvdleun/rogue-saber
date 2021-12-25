import * as RE from 'rogue-engine';
import { Prop, Runtime } from 'rogue-engine';
import { Camera, Euler, MathUtils, Object3D, Quaternion, Vector3 } from 'three';

let direction = 0;
const position = new Vector3();
export default class EnemyIndicator extends RE.Component {
  public static global: EnemyIndicator;

  @Prop("Object3D")
  public leftIndicator: Object3D;

  @Prop("Object3D")
  public rightIndicator: Object3D;

  @Prop("Object3D")
  public target: Object3D | null | undefined;

  private camera: Camera;
  private spotted = false;

  awake() {
    this.camera = this.object3d.parent as Camera;
    EnemyIndicator.global = this;

    this.setTarget(this.target);
  }

  update() {
    if (!this.target) {
      return;
    }

    const vector = this.target.getWorldPosition(position).project(this.camera);
    const threshold = this.spotted ? 0.5 : 0.25;
    console.log(threshold);
    if ((vector.z < 1 && vector.x < -threshold) || (vector.z > 1 && vector.x > 0)) {
      direction = -1;
    } else if ((vector.z < 1 && vector.x > threshold) || (vector.z > 1 && vector.x <= 0)) {
      direction = 1;
    } else {
      direction = 0;
    }

    this.spotted = this.spotted || direction !== 0;

    this.leftIndicator.visible = direction === -1;
    this.rightIndicator.visible = direction === 1;
  }

  public setTarget(target: Object3D | null | undefined) {
    this.target = target;
    this.leftIndicator.visible = !!target;
    this.rightIndicator.visible = !!target;
    this.spotted = false;
  }
}

RE.registerComponent(EnemyIndicator);
