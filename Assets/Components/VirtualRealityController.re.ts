import * as RE from 'rogue-engine';
import { Prop, Runtime } from 'rogue-engine';
import { Group } from 'three/src/objects/Group';

export default class VirtualRealityController extends RE.Component {
  @Prop("Number")
  controllerId: number;

  private controller: Group;
  private grip: Group;

  start() {
    const { renderer } = Runtime;
    this.controller = renderer.xr.getController(this.controllerId);
    this.grip = renderer.xr.getControllerGrip(this.controllerId);
  }

  update() {
    const { position, rotation } = this.grip;
    this.object3d.position.copy(position);
    this.object3d.rotation.copy(rotation);
  }

  addEventListener(event, func) {
    this.controller.addEventListener(event, func);
  }
}

RE.registerComponent(VirtualRealityController);
