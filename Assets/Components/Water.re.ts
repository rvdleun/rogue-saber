import * as RE from 'rogue-engine';
import { Water as WaterFX } from 'three/examples/jsm/objects/Water2';
import { Mesh, PlaneGeometry, Texture, Vector2 } from 'three';

export default class Water extends RE.Component {
  start() {
    console.log(this.object3d);

    const mesh = this.object3d as Mesh;
    const normalMap0Image = document.createElement('img');
    normalMap0Image.src = '/Static/Textures/Water_1_M_Normal.jpeg';
    const normalMap1Image = document.createElement('img');
    normalMap1Image.src = '/Static/Textures/Water_2_M_Normal.jpeg';

    const waterGeometry = new PlaneGeometry( 20, 20 );
    const water = new WaterFX( waterGeometry, {
      color: '#ffffff',
      scale: 3,
      flowDirection: new Vector2( 1, 1 ),
      normalMap0: new Texture(normalMap0Image),
      normalMap1: new Texture(normalMap1Image),
      textureWidth: 1024,
      textureHeight: 1024
    } );

    water.position.y = 1;
    water.rotation.x = Math.PI * - 0.5;
    this.object3d.add(water);
  }
}

RE.registerComponent(Water);
