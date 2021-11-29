import * as RE from 'rogue-engine';
import { Prop, Runtime } from 'rogue-engine';
import { MathUtils, Object3D, Raycaster, Vector3 } from 'three';

const direction = new Vector3();
const origin = new Vector3();

export default class Laser extends RE.Component {
  public static setBladeCollider(collider: Object3D) {
    this.bladeCollider = collider;
  }
  public static bladeCollider: Object3D;

  @Prop("Object3D")
  public collider: Object3D;

  @Prop("Number")
  public speed: number = 1;

  private firstUpdate = true;
  private timeToLive = 20;
  private raycaster: Raycaster;
  private reflected = false;

  start() {
    this.raycaster = new Raycaster();
    this.raycaster.far = 0.2;
  }

  update() {
    const { firstUpdate, reflected } = this;

    this.timeToLive-=Runtime.deltaTime;
    if (this.timeToLive < 0) {
      Runtime.scene.remove(this.object3d);
      return;
    }

    if (firstUpdate) {
      this.firstUpdate = false;
      return;
    }

    this.object3d.translateZ(Runtime.deltaTime * this.speed);

    if (reflected || !Laser.bladeCollider) {
      return;
    }

    this.object3d.getWorldDirection(direction);
    origin.copy(this.object3d.position);
    this.raycaster.set(origin, direction);

    const collides = this.raycaster.intersectObject(Laser.bladeCollider, true).length > 0;

    if(collides) {
      this.reflected = true;

      const x = MathUtils.degToRad((Math.random() * 80) + 140);
      const y = MathUtils.degToRad((Math.random() * 40) - 20);
      const z = MathUtils.degToRad((Math.random() * 40) - 20);
      this.object3d.rotateX(x);
      this.object3d.rotateY(y);
      this.object3d.rotateZ(z);
    }
  }
}

RE.registerComponent(Laser);
