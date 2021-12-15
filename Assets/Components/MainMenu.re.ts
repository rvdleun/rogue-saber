import * as RE from 'rogue-engine';
import { getComponent, Prop } from 'rogue-engine';
import { Color, Light, Mesh, MeshStandardMaterial, Object3D } from 'three';
import LightsaberGlow from './LightsaberGlow.re';

const LOCAL_STORAGE_KEY_BLADE_COLOR = 'rogue-saber.blade-color';

export default class MainMenu extends RE.Component {
  @Prop("Object3D")
  private bladeGlow: Object3D;

  @Prop("Color")
  private bladeDefaultColor: Color;

  private inputColor: HTMLInputElement;

  awake() {
    const ui = document.body as HTMLDivElement;

    const menu = document.createElement('div');
    menu.setAttribute('id', 'rogue-saber-main-menu');
    menu.setAttribute('style', 'position: fixed; top: 0; left: 0')

    const currentColor = window.localStorage.getItem(LOCAL_STORAGE_KEY_BLADE_COLOR) || `#${this.bladeDefaultColor.getHexString()}`;
    const inputColor = document.createElement('input');
    inputColor.setAttribute('type', 'color');
    inputColor.setAttribute('value', currentColor);
    inputColor.addEventListener('change', e => this.setBladeColor(inputColor.value));
    menu.appendChild(inputColor);

    ui.appendChild(menu);

    this.inputColor = inputColor;

    this.setBladeColor(currentColor);
  }

  setBladeColor(color: string): void {
    const bladeGlow = getComponent(LightsaberGlow, this.bladeGlow) as LightsaberGlow;
    bladeGlow.color = new Color(color);

    window.localStorage.setItem(LOCAL_STORAGE_KEY_BLADE_COLOR, color);
  }
}

RE.registerComponent(MainMenu);
