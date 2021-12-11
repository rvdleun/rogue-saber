import * as RE from 'rogue-engine';
import { getComponent, Prop } from 'rogue-engine';
import LightsaberBlade from './LightsaberBlade.re';
import VirtualRealityController from './VirtualRealityController.re';
import { Object3D, PositionalAudio } from 'three';
import LightsaberAudio from './LightsaberAudio.re';

export default class Lightsaber extends RE.Component {
  @Prop("Object3D")
  blade: Object3D;

  @Prop("Object3D")
  controller: Object3D;

  start() {
    const vrController = getComponent(VirtualRealityController, this.controller)
    vrController?.addEventListener("selectstart", this.onSelectStart);
  }

  onSelectStart() {
    getComponent(LightsaberBlade, this.blade)?.toggle();
    getComponent(LightsaberAudio, this.object3d)?.playToggleSound();
  }
}

RE.registerComponent(Lightsaber);
