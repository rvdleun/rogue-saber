import * as RE from 'rogue-engine';
import { getComponent, Prop } from 'rogue-engine';
import LightsaberBlade from './LightsaberBlade.re';
import VirtualRealityController from './VirtualRealityController.re';
import { Object3D } from 'three';
import LightsaberAudio from './LightsaberAudio.re';

export default class Lightsaber extends RE.Component {
  @Prop("Object3D")
  private blade: Object3D;

  @Prop("Object3D")
  private controller: Object3D;

  @Prop("Object3D")
  private instructions: Object3D;

  start() {
    const vrController = getComponent(VirtualRealityController, this.controller)
    vrController?.addEventListener("selectstart", () => this.onSelectStart());
  }

  onSelectStart() {
    getComponent(LightsaberBlade, this.blade)?.toggle();
    getComponent(LightsaberAudio, this.object3d)?.playToggleSound();

    this.instructions.visible = false;
  }
}

RE.registerComponent(Lightsaber);
