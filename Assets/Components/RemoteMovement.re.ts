import * as RE from 'rogue-engine';
import { degToRad } from 'three/src/math/MathUtils';
import { Prop, Runtime } from 'rogue-engine';
import { Vector3 } from 'three';

const vector = new Vector3();
export default class RemoteMovement extends RE.Component {
  @Prop("Object3D")
  private model: THREE.Object3D;

  nextPosition: number = 0;
  nextRotation: number = 0;

  speed: number = 30;

  positionDirection: number;
  positionTime: number;

  rotationDirection: number;
  rotationTime: number;

  start() {
    this.setupPosition();
  }

  update() {
    if (this.positionTime > 0) {
      this.updatePosition();
    }

    this.nextPosition -= Runtime.deltaTime;
    if (this.nextPosition < 0) {
      this.setupPosition();
      this.nextPosition = 1 + Math.random() * 3;
    }

    if (this.rotationTime > 0) {
      this.updateRotation();
    }

    this.nextRotation -= Runtime.deltaTime;
    if (this.nextRotation < 0) {
      this.setupRotation();
      this.nextRotation = 1 + Math.random() * 2;
    }

    Runtime.renderer.xr.getCamera(Runtime.camera).getWorldPosition(vector);
    this.model.lookAt(vector);
  }

  updatePosition() {
    const { positionDirection, speed } = this;
    const change = Runtime.deltaTime;
    this.object3d.position.y = Math.max(-1.4, Math.min(.5, this.object3d.position.y + (positionDirection * change)));
    this.positionTime -= change;
  }

  updateRotation() {
    const { rotationDirection, speed } = this;
    const change = Runtime.deltaTime * speed;
    this.object3d.rotateY(degToRad(change * rotationDirection));
    this.rotationTime -= change;
  }

  setupPosition() {
    const { y } = this.object3d.position;
    this.positionDirection =
        Math.random() < .5 ? -1 : 1;

    if (y < -1.3) {
      this.positionDirection = 1;
    } else if (y > .4) {
      this.positionDirection = -1;
    }

    this.positionTime = Math.random() * 1;
  }

  setupRotation() {
    this.rotationDirection = Math.random() < .5 ? -1 : 1;
    this.rotationTime = Math.random() * 45;
  }
}

RE.registerComponent(RemoteMovement);
