import * as RE from 'rogue-engine';
import { Prop } from 'rogue-engine';
import { Object3D } from 'three';

export default class LightsaberBlade extends RE.Component {
  active: boolean = true;

  toggle() {
    this.active = !this.active;

    this.object3d.visible = this.active;
  }
}

RE.registerComponent(LightsaberBlade);
