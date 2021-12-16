import * as RE from 'rogue-engine';
import { getComponent, Prop, Runtime } from 'rogue-engine';
import { Color, Object3D } from 'three';
import LightsaberGlow from './LightsaberGlow.re';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';

const LOCAL_STORAGE_KEY_BLADE_COLOR = 'rogue-saber.blade-color';
const LOCAL_STORAGE_KEY_NUMBER_OF_DRONES = 'rogue-saber.number-of-drones';

export default class MainMenu extends RE.Component {
  @Prop("Object3D")
  private bladeGlow: Object3D;

  @Prop("Color")
  private bladeDefaultColor: Color;

  @Prop("Number")
  private defaultNumberOfDrones = 1;

  private inputColor: HTMLInputElement;

  awake() {
    const ui = document.createElement('div');
    ui.style.backgroundColor = 'rgba(0,0,0,.7)';
    ui.style.color = 'white';
    ui.style.fontFamily = 'fantasy';
    ui.style.fontSize = '36px';
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

    const colorDiv = document.createElement('div');
    colorDiv.style.display = 'block';
    colorDiv.style.marginLeft = 'auto';
    colorDiv.style.marginRight = 'auto';
    colorDiv.style.padding = '15px 15px 5px 15px';
    colorDiv.style.height = '50px';
    colorDiv.style.width = '80vw';
    colorDiv.style.border = 'solid 3px white';
    colorDiv.style.borderRadius = '30px';
    ui.appendChild(colorDiv);

    const currentColor = window.localStorage.getItem(LOCAL_STORAGE_KEY_BLADE_COLOR) || `#${this.bladeDefaultColor.getHexString()}`;
    const colorLabel = document.createElement('label');
    colorLabel.innerHTML = 'Blade color:';
    colorLabel.style.float = 'left';
    colorLabel.style.marginLeft = '50px';
    colorLabel.setAttribute('for', 'main-menu-color');
    colorDiv.appendChild(colorLabel);

    const colorSelect = document.createElement('select');
    colorSelect.setAttribute('id', 'main-menu-color');
    colorSelect.style.background = 'none';
    colorSelect.style.border = 'none';
    colorSelect.style.color = 'white';
    colorSelect.style.fontFamily = 'sans-serif';
    colorSelect.style.fontSize = '32px';
    colorSelect.style.marginRight = '50px';
    colorSelect.style.float = 'right';
    colorSelect.style.height = '40px';
    colorSelect.style.width = '150px';
    colorSelect.addEventListener('change', () => this.setBladeColor(colorSelect));
    colorSelect.addEventListener('focus', () => colorSelect.style.outline = 'none');
    colorDiv.appendChild(colorSelect);

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

    const numberOfDronesDiv = document.createElement('div');
    numberOfDronesDiv.style.display = 'block';
    numberOfDronesDiv.style.marginLeft = 'auto';
    numberOfDronesDiv.style.marginRight = 'auto';
    numberOfDronesDiv.style.marginTop = '25px';
    numberOfDronesDiv.style.padding = '15px 15px 5px 15px';
    numberOfDronesDiv.style.height = '50px';
    numberOfDronesDiv.style.width = '80vw';
    numberOfDronesDiv.style.border = 'solid 3px white';
    numberOfDronesDiv.style.borderRadius = '30px';
    ui.appendChild(numberOfDronesDiv);

    const currentNumberOfDrones = parseInt(window.localStorage.getItem(LOCAL_STORAGE_KEY_NUMBER_OF_DRONES) as string) || this.defaultNumberOfDrones;
    const numberOfDronesLabel = document.createElement('label');
    numberOfDronesLabel.innerHTML = 'Number of drones:';
    numberOfDronesLabel.style.float = 'left';
    numberOfDronesLabel.style.marginLeft = '50px';
    numberOfDronesLabel.setAttribute('for', 'main-menu-number-drones');
    numberOfDronesDiv.appendChild(numberOfDronesLabel);

    const numberOfDronesSelect = document.createElement('select');
    numberOfDronesSelect.setAttribute('id', 'main-menu-number-drones');
    numberOfDronesSelect.style.background = 'none';
    numberOfDronesSelect.style.border = 'none';
    numberOfDronesSelect.style.color = 'white';
    numberOfDronesSelect.style.fontFamily = 'sans-serif';
    numberOfDronesSelect.style.fontSize = '32px';
    numberOfDronesSelect.style.marginRight = '50px';
    numberOfDronesSelect.style.float = 'right';
    numberOfDronesSelect.style.height = '40px';
    numberOfDronesSelect.style.width = '150px';
    numberOfDronesSelect.addEventListener('change', () => this.setNumberOfDrones(numberOfDronesSelect));
    numberOfDronesSelect.addEventListener('focus', () => numberOfDronesSelect.style.outline = 'none');
    numberOfDronesDiv.appendChild(numberOfDronesSelect);

    [1,2,3].forEach(numberOfDrones => {
      const option = document.createElement('option');
      option.setAttribute('value', numberOfDrones.toString(10));
      option.innerHTML = numberOfDrones.toString(10);
      if (currentNumberOfDrones === numberOfDrones) {
        option.setAttribute('selected', 'selected');
      }
      numberOfDronesSelect.appendChild(option);
    });

    const { renderer } = Runtime;

    renderer.xr.enabled = true;
    const button = VRButton.createButton( renderer );
    setInterval(() => {
      button.style.border = 'solid 3px white';
      button.style.color = 'white';
      button.style.marginTop = '30px';
      button.style.opacity = '1';
      button.style.position = '';
      button.style.fontFamily = 'fantasy';
      button.style.fontSize = '32px';
      button.innerHTML = 'Start Game';
      button.style.height = '70px';
      button.style.width = '80vw';
    });
    ui.appendChild( button );

    document.body.appendChild(ui);

    this.setBladeColor(colorSelect);
    this.setNumberOfDrones(numberOfDronesSelect);
  }

  setBladeColor(colorSelect: HTMLSelectElement): void {
    const color = colorSelect.value;
    colorSelect.style.color = color;

    const bladeGlow = getComponent(LightsaberGlow, this.bladeGlow) as LightsaberGlow;
    bladeGlow.color = new Color(color);

    window.localStorage.setItem(LOCAL_STORAGE_KEY_BLADE_COLOR, color);
  }

  setNumberOfDrones(numberOfDronesSelect: HTMLSelectElement): void {
    // const numberOfDrones = parseInt(numberOfDronesSelect.value);
    window.localStorage.setItem(LOCAL_STORAGE_KEY_NUMBER_OF_DRONES, numberOfDronesSelect.value);
  }
}

RE.registerComponent(MainMenu);
