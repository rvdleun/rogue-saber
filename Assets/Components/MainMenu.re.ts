import * as RE from 'rogue-engine';
import { getComponent, Prop, Runtime } from 'rogue-engine';
import { Color, Mesh, MeshStandardMaterial, Object3D, PointLight } from 'three';
import LightsaberGlow from './LightsaberGlow.re';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import RemotesController from './RemotesController.re';

const LOCAL_STORAGE_KEY_BLADE_COLOR = 'rogue-saber.blade-color';
const LOCAL_STORAGE_KEY_NUMBER_OF_DRONES = 'rogue-saber.number-of-drones';
const LOCAL_STORAGE_KEY_SESSION_DURATION = 'rogue-saber.session-duration';

/**
 * Note: Do NOT create a Main Menu like this. Rather, follow the instructions from this video: https://www.youtube.com/watch?v=jAo1yGRBJiM
 */
export default class MainMenu extends RE.Component {
  @Prop("Object3D")
  private bladeGlow: Object3D;

  @Prop("Color")
  private bladeDefaultColor: Color;

  @Prop("Object3D")
  private bladeLight: PointLight;

  @Prop("Number")
  private defaultNumberOfDrones = 1;

  @Prop("Number")
  private defaultSessionDuration = 2.5;

  @Prop("Object3D")
  private instructions: Object3D;

  @Prop("Object3D")
  private remotesController: Object3D;

  private showInstructions = true;

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
    logo.style.paddingTop = '10px';
    logo.style.paddingBottom = '5px';
    ui.appendChild(logo);

    ui.appendChild(this.createColorSelect());
    ui.appendChild(this.createNumberOfDronesSelect());
    ui.appendChild(this.createSessionDuration());
    ui.appendChild(this.createStartGameButton());

    const githubLink = document.createElement('div');
    githubLink.innerHTML = '<a href="https://github.com/rvdleun/rogue-saber" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>';
    ui.appendChild(githubLink);

    document.body.appendChild(ui);
  }

  setBladeColor(colorSelect: HTMLSelectElement): void {
    const { value } = colorSelect;
    colorSelect.style.color = value;

    const color = new Color(value);
    const bladeGlow = getComponent(LightsaberGlow, this.bladeGlow) as LightsaberGlow;
    bladeGlow.color = color;
    this.bladeLight.color = color;

    window.localStorage.setItem(LOCAL_STORAGE_KEY_BLADE_COLOR, value);
  }

  setNumberOfDrones(numberOfDronesSelect: HTMLSelectElement): void {
    const numberOfDrones = numberOfDronesSelect.value;

    const remotesController = getComponent(RemotesController, this.remotesController) as RemotesController;
    remotesController.setNumberOfDrones(parseInt(numberOfDrones));

    window.localStorage.setItem(LOCAL_STORAGE_KEY_NUMBER_OF_DRONES, numberOfDrones);
  }

  setSessionDuration(sessionDurationSelect: HTMLSelectElement): void {
    const sessionDuration = sessionDurationSelect.value;
    window.localStorage.setItem(LOCAL_STORAGE_KEY_SESSION_DURATION, sessionDuration);
  }

  private createColorSelect() {
    const colorDiv = document.createElement('div');
    colorDiv.style.display = 'block';
    colorDiv.style.marginLeft = 'auto';
    colorDiv.style.marginRight = 'auto';
    colorDiv.style.padding = '15px 15px 5px 15px';
    colorDiv.style.height = '50px';
    colorDiv.style.width = '750px';
    colorDiv.style.border = 'solid 3px white';
    colorDiv.style.borderRadius = '30px';

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
    colorSelect.style.marginRight = '20px';
    colorSelect.style.float = 'right';
    colorSelect.style.height = '40px';
    colorSelect.style.width = '150px';
    colorSelect.addEventListener('change', () => this.setBladeColor(colorSelect));
    colorSelect.addEventListener('focus', () => colorSelect.style.outline = 'none');
    colorDiv.appendChild(colorSelect);

    [
      { value: '#00FF00', text: 'Green' },
      { value: '#00FFFF', text: 'Blue' },
      { value: '#FF00FF', text: 'Purple' },
      { value: '#FF0000', text: 'Red' },
      { value: '#FFFF00', text: 'Yellow' },
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

    setTimeout(() => {
      this.setBladeColor(colorSelect);
    });

    return colorDiv;
  }

  private createNumberOfDronesSelect() {
    const numberOfDronesDiv = document.createElement('div');
    numberOfDronesDiv.style.display = 'block';
    numberOfDronesDiv.style.marginLeft = 'auto';
    numberOfDronesDiv.style.marginRight = 'auto';
    numberOfDronesDiv.style.marginTop = '25px';
    numberOfDronesDiv.style.padding = '15px 15px 5px 15px';
    numberOfDronesDiv.style.height = '50px';
    numberOfDronesDiv.style.width = '750px';
    numberOfDronesDiv.style.border = 'solid 3px white';
    numberOfDronesDiv.style.borderRadius = '30px';

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
    numberOfDronesSelect.style.marginRight = '20px';
    numberOfDronesSelect.style.float = 'right';
    numberOfDronesSelect.style.height = '40px';
    numberOfDronesSelect.style.width = '150px';
    numberOfDronesSelect.addEventListener('change', () => this.setNumberOfDrones(numberOfDronesSelect));
    numberOfDronesSelect.addEventListener('focus', () => numberOfDronesSelect.style.outline = 'none');
    numberOfDronesDiv.appendChild(numberOfDronesSelect);

    [1,2,3,4].forEach(numberOfDrones => {
      const option = document.createElement('option');
      option.setAttribute('value', numberOfDrones.toString(10));
      option.innerHTML = numberOfDrones.toString(10);
      if (currentNumberOfDrones === numberOfDrones) {
        option.setAttribute('selected', 'selected');
      }
      numberOfDronesSelect.appendChild(option);
    });

    setTimeout(() => {
      this.setNumberOfDrones(numberOfDronesSelect);
    });

    return numberOfDronesDiv;
  }

  private createSessionDuration() {
    const sessionDurationDiv = document.createElement('div');
    sessionDurationDiv.style.display = 'block';
    sessionDurationDiv.style.marginLeft = 'auto';
    sessionDurationDiv.style.marginRight = 'auto';
    sessionDurationDiv.style.marginTop = '25px';
    sessionDurationDiv.style.padding = '15px 15px 5px 15px';
    sessionDurationDiv.style.height = '50px';
    sessionDurationDiv.style.width = '750px';
    sessionDurationDiv.style.border = 'solid 3px white';
    sessionDurationDiv.style.borderRadius = '30px';

    const currentSessionDuration = parseFloat(window.localStorage.getItem(LOCAL_STORAGE_KEY_SESSION_DURATION) as string) || this.defaultSessionDuration;
    const sessionDurationLabel = document.createElement('label');
    sessionDurationLabel.innerHTML = 'Session duration:';
    sessionDurationLabel.style.float = 'left';
    sessionDurationLabel.style.marginLeft = '50px';
    sessionDurationLabel.setAttribute('for', 'main-menu-session-duration');
    sessionDurationDiv.appendChild(sessionDurationLabel);

    const sessionDurationSelect = document.createElement('select');
    sessionDurationSelect.setAttribute('id', 'main-menu-session-duration');
    sessionDurationSelect.style.background = 'none';
    sessionDurationSelect.style.border = 'none';
    sessionDurationSelect.style.color = 'white';
    sessionDurationSelect.style.fontFamily = 'sans-serif';
    sessionDurationSelect.style.fontSize = '32px';
    sessionDurationSelect.style.marginRight = '20px';
    sessionDurationSelect.style.float = 'right';
    sessionDurationSelect.style.height = '40px';
    sessionDurationSelect.style.width = '150px';
    sessionDurationSelect.addEventListener('change', () => this.setSessionDuration(sessionDurationSelect));
    sessionDurationSelect.addEventListener('focus', () => sessionDurationSelect.style.outline = 'none');
    sessionDurationDiv.appendChild(sessionDurationSelect);

    [0,1,2.5,5].forEach(sessionDuration => {
      const option = document.createElement('option');
      option.setAttribute('value', sessionDuration.toString(10));
      option.innerHTML = 0 ? 'Endless' : `${sessionDuration.toString(10)}min`;
      if (currentSessionDuration === sessionDuration) {
        option.setAttribute('selected', 'selected');
      }
      sessionDurationSelect.appendChild(option);
    });

    setTimeout(() => {
      this.setSessionDuration(sessionDurationSelect);
    });

    return sessionDurationDiv;
  }

  private createStartGameButton() {
    const { renderer } = Runtime;

    renderer.xr.enabled = true;

    const button = VRButton.createButton( renderer );

    setTimeout(() => {
      let hovering = false;
      button.style.backgroundColor = 'rgba(50, 255, 50, .1)';
      button.style.border = 'solid 3px white';
      button.style.borderRadius = '30px';
      button.style.color = 'white';
      button.style.marginTop = '50px';
      button.style.opacity = '1';
      button.style.position = '';
      button.style.fontFamily = 'fantasy';
      button.style.fontSize = '32px';
      button.innerHTML = 'Start Game';
      button.style.height = '70px';
      button.style.width = '750px';
      button.style.transition = '2s background-color';
      button.onmouseenter = function () { hovering = true };
      button.onmouseleave = function () { hovering = false };

      button.addEventListener('click', () => {
        if (!this.showInstructions) {
          return;
        }

        this.instructions.visible = true;
        this.showInstructions = false;
      });

      let alpha = true;
      setInterval(() => {
        button.style.backgroundColor = `rgba(128, 255, 128, ${alpha || hovering ? .2 : .1})`;
        alpha = !alpha;
      }, 2000);
    });

    return button;
  }
}

RE.registerComponent(MainMenu);
