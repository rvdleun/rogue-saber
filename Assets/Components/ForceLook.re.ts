import * as RE from 'rogue-engine';
import { BufferAttribute, BufferGeometry, Color, LineBasicMaterial, LineSegments, Mesh, ShaderMaterial } from 'three';
import { Prop, Runtime } from 'rogue-engine';

const vertexShader = `
varying vec3 vUv;

void main() {
  vUv = position;

  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}
`;

const fragmentShader = `
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1);
      }
`;

export default class ForceLook extends RE.Component {
  public static active: Boolean = false;

  colors: Color[] = [
    new Color(Math.random(), Math.random(), Math.random()),
    new Color(Math.random(), Math.random(), Math.random())
  ];

  start() {
    let uniforms = {
      colorB: { value: this.colors[0]},
      colorA: { value: this.colors[1]}
    }

    const material =  new ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });
    material.depthTest = false;

    const mesh = this.object3d as Mesh;
    mesh.material = material;
    mesh.renderOrder = 9;
  }

  update() {
    if (!ForceLook.active) {
      return;
    }

    this.colors.forEach(color => {
      color.setRGB(
        this.getNewColor(color.r),
        this.getNewColor(color.g),
        this.getNewColor(color.b)
      );
    });
  }

  getNewColor(color: number) {
    let change = Math.random() * Runtime.deltaTime;
    if (Math.random() < .5) {
      change*=-1;
    }

    return Math.min(1, Math.max(0, color + change));
  }
}

RE.registerComponent(ForceLook);
