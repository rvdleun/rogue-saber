import * as RE from 'rogue-engine';
import { Prop, Runtime } from 'rogue-engine';
import { Color, Mesh, MeshStandardMaterial } from 'three';

export default class LightsaberGlow extends RE.Component {
  @Prop("Color")
  public color: Color;

  private flicker: number = 0;
  private flickerDirection: number = 1;

  update() {
    this.flicker += this.flickerDirection * Runtime.deltaTime * (3 + (Math.random() * 2));
    if (Math.abs(this.flicker) > 1) {
      this.flicker = Math.max(-1, Math.min(1, this.flicker));
      this.flickerDirection *= -1;
    }

    const flicker = this.flicker * .05;

    const bladeGlow = this.object3d as Mesh;
    const material = bladeGlow.material as MeshStandardMaterial;
    material.color.setRGB(this.color.r + flicker, this.color.g + flicker, this.color.b + flicker);
  }

}

RE.registerComponent(LightsaberGlow);
