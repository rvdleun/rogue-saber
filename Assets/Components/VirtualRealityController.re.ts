import * as RE from 'rogue-engine';
import { Prop, Runtime } from 'rogue-engine';
import { Group } from 'three/src/objects/Group';

export default class VirtualRealityController extends RE.Component {
  @Prop("Number")
  controllerId: number;

  awake() {
    const { renderer } = Runtime;
    renderer.xr.getController(this.controllerId);
    renderer.xr.getControllerGrip(this.controllerId);
    console.log('!!!!');
  }
}

RE.registerComponent(VirtualRealityController);
