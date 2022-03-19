import * as RE from 'rogue-engine';
import { getComponent, Prop, Runtime } from 'rogue-engine';
import LightsaberBlade from './LightsaberBlade.re';
import { Object3D, Vector3 } from 'three';
import LightsaberAudio from './LightsaberAudio.re';
import XRInputSource from './XRInputSource.re';

const currentPosition: Vector3 = new Vector3();
const lastScorePosition: Vector3 = new Vector3();;
export default class Lightsaber extends RE.Component {
  @Prop("Object3D")
  private blade: Object3D;

  @Prop("Object3D")
  public handLeft: Object3D;

  @Prop("Object3D")
  public handRight: Object3D;

  @Prop("Object3D")
  private instructions: Object3D;

  public static activeHand: Object3D;
  public static global: Lightsaber;
  private hands: Object3D[];
  private lastScoreCalculation: number = 10;

  awake() {
    Lightsaber.global = this;
  }

  start() {
    this.hands = [this.handLeft, this.handRight];

    this.hands.forEach(hand => {
      const inputSource = getComponent(XRInputSource, hand);
      inputSource?.addEventListener("selectstart", () => this.onSelectStart(hand));
    });

    this.setActiveHand(this.handRight);
  }

  update() {
    this.lastScoreCalculation+=Runtime.deltaTime;
  }

  onSelectStart(hand) {
    if (Lightsaber.activeHand === hand) {
      this.toggleLightsaber();
    } else if (!LightsaberBlade.active) {
      this.setActiveHand(hand);
    }
  }

  calculateDeflectScore() {
    let points = 100;
    Lightsaber.activeHand.getWorldPosition(currentPosition);
    if (this.lastScoreCalculation < 1) {
      const diff = Math.min(currentPosition.distanceTo(lastScorePosition), 1);
      points*=diff;
    }

    lastScorePosition.copy(currentPosition);
    this.lastScoreCalculation = 0;

    return Math.ceil(points);
  }

  setActiveHand(activeHand) {
    Lightsaber.activeHand = activeHand;
    this.hands.forEach(hand => hand.children[0].visible = activeHand !== hand);
    Lightsaber.activeHand.add(this.object3d.parent as Object3D);
    this.lastScoreCalculation = 10;
  }

  toggleLightsaber() {
    getComponent(LightsaberBlade, this.blade)?.toggle();
    getComponent(LightsaberAudio, this.object3d)?.playToggleSound();

    this.instructions.visible = false;
  }
}

RE.registerComponent(Lightsaber);
