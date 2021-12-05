import * as RE from 'rogue-engine';
import { Prop } from 'rogue-engine';
import { Color, Mesh, MeshStandardMaterial, Object3D } from 'three';

const LOCAL_STORAGE_KEY_BLADE_COLOR = 'rogue-saber.blade-color';

export default class MainMenu extends RE.Component {
  @Prop("Object3D")
  private bladeGlow: Object3D;

  @Prop("Color")
  private bladeDefaultColor: Color;

  private inputColor: HTMLInputElement;

  awake() {
    const ui = document.querySelector('#rogue-ui') as HTMLDivElement;

    const menu = document.createElement('div');
    menu.setAttribute('id', 'rogue-saber-main-menu');

    const inputColor = document.createElement('input');
    inputColor.setAttribute('type', 'color');
    inputColor.setAttribute('value', '#ff7700');
    inputColor.addEventListener('change', e => this.setBladeColor(inputColor.value));
    menu.appendChild(inputColor);

    ui.appendChild(menu);

    this.inputColor = inputColor;

    this.setBladeColor(window.localStorage.getItem(LOCAL_STORAGE_KEY_BLADE_COLOR) || `#${this.bladeDefaultColor.getHexString()}`);
  }

  setBladeColor(color: string): void {
    const bladeGlow = this.bladeGlow as Mesh;
    const material = bladeGlow.material as MeshStandardMaterial;
    material.color = new Color(color);

    window.localStorage.setItem(LOCAL_STORAGE_KEY_BLADE_COLOR, color);
  }
}

RE.registerComponent(MainMenu);
