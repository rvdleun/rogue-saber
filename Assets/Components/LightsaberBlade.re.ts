import * as RE from 'rogue-engine';
import { Prop, Runtime } from 'rogue-engine';
import { PointLight } from 'three';
import Session from './Session.re';

export default class LightsaberBlade extends RE.Component {
  public static active: boolean = false;

  @Prop("Object3D")
  public light: PointLight;

  private length: number;
  private maxLength: number;
  private maxPosition: number;

  awake() {
    this.length = 0;
    this.maxLength = this.object3d.scale.y;
    this.maxPosition = this.object3d.position.y;

    this.object3d.scale.y = 0;
    this.object3d.position.y = 0;
  }

  start() {
    Runtime.renderer.xr.addEventListener( 'sessionend', () => {
      if (!LightsaberBlade.active) {
        return;
      }

      this.toggle();
    });
  }

  update() {
    const { active } = LightsaberBlade;
    const { length, maxLength, maxPosition } = this;

    if (
        (active && length === 1) ||
        (!active && length === 0)) {
      return;
    }

    this.length = Math.min(1, Math.max(0, length + Runtime.deltaTime * (active ? 2 : -.7)));
    this.light.intensity = this.length * .25;
    this.object3d.position.y = maxPosition * this.length;
    this.object3d.scale.y = maxLength * this.length;
  }

  toggle() {
    LightsaberBlade.active = !LightsaberBlade.active;

    if (LightsaberBlade.active) {
      Session.global.startSession();
    } else {
      Session.global.endSession();
    }
  }
}

RE.registerComponent(LightsaberBlade);
