import * as RE from 'rogue-engine';
import { getComponent, Prop, Runtime } from 'rogue-engine';
import { Color, Object3D } from 'three';
import LightsaberGlow from './LightsaberGlow.re';

const LOCAL_STORAGE_KEY_BLADE_COLOR = 'rogue-saber.blade-color';

export default class MainMenu extends RE.Component {
  @Prop("Object3D")
  private bladeGlow: Object3D;

  @Prop("Color")
  private bladeDefaultColor: Color;

  private inputColor: HTMLInputElement;

  awake() {
    const ui = document.createElement('div');
    ui.style.backgroundColor = 'rgba(0,0,0,.7)';
    ui.style.color = 'white';
    ui.style.position = 'fixed';
    ui.style.top = '0';
    ui.style.left = '0';
    ui.style.width = '100vw';
    ui.style.height = '100vh';
    ui.style.textAlign = 'center';

    const logo = document.createElement('img');
    logo.setAttribute('src', RE.getStaticPath('logo.png'));
    logo.style.display = 'block';
    logo.style.marginLeft = 'auto';
    logo.style.marginRight = 'auto';
    logo.style.paddingBottom = '50px';
    ui.appendChild(logo);

    const currentColor = window.localStorage.getItem(LOCAL_STORAGE_KEY_BLADE_COLOR) || `#${this.bladeDefaultColor.getHexString()}`;
    const colorLabel = document.createElement('label');
    colorLabel.innerHTML = 'Select your saber\'s color:';
    colorLabel.setAttribute('for', 'main-menu-color');
    ui.appendChild(colorLabel);

    const colorSelect = document.createElement('select');
    colorSelect.setAttribute('id', 'main-menu-color');
    colorSelect.style.marginLeft = '100px';
    colorSelect.addEventListener('change', () => this.setBladeColor(colorSelect.value));
    ui.appendChild(colorSelect);

    [
      { value: '#2ECC71', text: 'Green' },
      { value: '#5DADE2', text: 'Blue' },
      { value: '#AF7AC5', text: 'Purple' },
      { value: '#E74C3C', text: 'Red' },
      { value: '#EB984E', text: 'Orange' },
      { value: '#F7DC6F', text: 'Yellow' },
      { value: '#FDFEFE', text: 'White' },
    ].forEach(({value, text}) => {
      const option = document.createElement('option');
      option.setAttribute('value', value);
      option.innerHTML = text;
      if (currentColor === value) {
        option.setAttribute('selected', 'selected');
      }
      colorSelect.appendChild(option);
    });

    document.body.appendChild(ui);

    this.setBladeColor(currentColor);
  }

  setBladeColor(color: string): void {
    const bladeGlow = getComponent(LightsaberGlow, this.bladeGlow) as LightsaberGlow;
    bladeGlow.color = new Color(color);

    window.localStorage.setItem(LOCAL_STORAGE_KEY_BLADE_COLOR, color);
  }
}

RE.registerComponent(MainMenu);
