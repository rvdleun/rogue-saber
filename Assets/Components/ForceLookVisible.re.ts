import * as RE from 'rogue-engine';
import { Mesh } from 'three';
import ForceLook from './ForceLook.re';

export default class ForceLookVisible extends RE.Component {
  private mesh: Mesh;

  start() {
    this.mesh = this.object3d as Mesh;
  }

  update() {
    this.mesh.visible = ForceLook.active;
  }
}

RE.registerComponent(ForceLookVisible);
