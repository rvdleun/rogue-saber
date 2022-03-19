import * as RE from 'rogue-engine';
import { getComponent, Prop, Runtime } from 'rogue-engine';
import LightsaberBlade from './LightsaberBlade.re';
import { Object3D } from 'three';
import LightsaberAudio from './LightsaberAudio.re';
import XRInputSource from './XRInputSource.re';

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
  private hands: Object3D[];

  start() {
    this.hands = [this.handLeft, this.handRight];

    this.hands.forEach(hand => {
      const inputSource = getComponent(XRInputSource, hand);
      inputSource?.addEventListener("selectstart", () => this.onSelectStart(hand));
    });

    this.setActiveHand(this.handRight);

  }

  onSelectStart(hand) {
    if (Lightsaber.activeHand === hand) {
      this.toggleLightsaber();
    } else if (!LightsaberBlade.active) {
      this.setActiveHand(hand);
    }
  }

  setActiveHand(activeHand) {
    Lightsaber.activeHand = activeHand;
    this.hands.forEach(hand => hand.children[0].visible = activeHand !== hand);
    Lightsaber.activeHand.add(this.object3d.parent as Object3D);
  }

  toggleLightsaber() {
    getComponent(LightsaberBlade, this.blade)?.toggle();
    getComponent(LightsaberAudio, this.object3d)?.playToggleSound();

    this.instructions.visible = false;
  }
}

RE.registerComponent(Lightsaber);
