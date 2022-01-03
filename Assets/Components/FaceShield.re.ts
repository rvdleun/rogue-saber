import * as RE from 'rogue-engine';
import { Prop, PropList, Runtime } from 'rogue-engine';
import { Object3D, Vector3 } from 'three';
import Lightsaber from './Lightsaber.re';
import ForceLook from './ForceLook.re';

const from: Vector3 = new Vector3();
const to: Vector3 = new Vector3();
export default class FaceShield extends RE.Component {
  @Prop("Object3D")
  public handLeft: Object3D;

  @Prop("Object3D")
  public handRight: Object3D;

  private active: boolean = false;
  private toggled: boolean = false;
  private hands: Object3D[] = [];
  private interacting: number = 2;

  start() {
    this.hands = [this.handLeft, this.handRight];
  }

  update() {
    this.object3d.position.y =Math.min(1, Math.max(0, this.object3d.position.y + (Runtime.deltaTime * (this.active ? -1 : 1))));
    ForceLook.active = this.object3d.position.y === 0;
    console.log(this.object3d.position.y);

    this.hands.forEach(hand => {
      if (hand === Lightsaber.activeHand || !Runtime.renderer.xr.getSession()) {
        return;
      }

      hand.getWorldPosition(from);
      Runtime.renderer.xr.getCamera(Runtime.camera).getWorldPosition(to);
      const distance = from.distanceTo(to);

      if (this.toggled) {
        this.toggled = distance < 0.4;
        return;
      }

      this.interacting = distance < 0.4 ? this.interacting - Runtime.deltaTime : 1;
      if (this.interacting < 0) {
        this.active = !this.active;
        this.toggled = true;
        console.log('Click');
      }
    });
  }
}

RE.registerComponent(FaceShield);
