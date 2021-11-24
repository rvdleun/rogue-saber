import * as RE from 'rogue-engine';
import { Prop, Runtime } from 'rogue-engine';
import { Box3, MathUtils, Mesh, Object3D } from 'three';

function generateBox3(mesh: Mesh) {
  const box = new Box3();

  mesh.geometry.computeBoundingBox();

  box.copy( mesh.geometry.boundingBox as Box3).applyMatrix4( mesh.matrixWorld );

  return box;
}

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
  private reflected = false;

  update() {
    const { firstUpdate, reflected } = this;

    if (firstUpdate) {
      this.firstUpdate = false;
      return;
    }

    this.object3d.translateZ(Runtime.deltaTime * this.speed);

    if (reflected || !Laser.bladeCollider) {
      return;
    }

    const bladeBox = generateBox3(Laser.bladeCollider as Mesh);
    const laserBox = generateBox3(this.collider as Mesh);

    if(bladeBox.intersectsBox(laserBox)) {
      console.log('BOOM');
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
