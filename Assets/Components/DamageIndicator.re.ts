import * as RE from 'rogue-engine';
import { Runtime } from 'rogue-engine';
import { Mesh, MeshStandardMaterial } from 'three';

export default class DamageIndicator extends RE.Component {
  public static global: DamageIndicator;

  private material: MeshStandardMaterial;
  private opacity = 0;

  start() {
    DamageIndicator.global = this;

    this.material = (this.object3d as Mesh).material as MeshStandardMaterial;
  }

  update() {
    if(this.opacity <= 0) {
      return;
    }

    this.opacity -= Runtime.deltaTime;
    this.material.opacity = Math.min(.5, Math.max(0, this.opacity));
    this.object3d.visible = this.opacity > 0;
  }

  onDamage() {
    this.opacity = 1;
  }
}

RE.registerComponent(DamageIndicator);
