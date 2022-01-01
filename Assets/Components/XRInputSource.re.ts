import { fetchProfile, MotionController } from '@webxr-input-profiles/motion-controllers';
import * as RE from 'rogue-engine';
import { Prop, Runtime } from 'rogue-engine';
import { Group } from 'three/src/objects/Group';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class XRInputSource extends RE.Component {
  @Prop("String")
  private assetPath: string = 'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles';

  @Prop("Boolean")
  private isRightHand: boolean = true;

  @Prop("Boolean")
  private showControllerModel: boolean = true;

  private controller: Group;
  private grip: Group;
  private handedness: 'left' | 'right';

  awake() {
    this.handedness = this.isRightHand ? 'right' : 'left';
  }

  update() {
    if (!this.controller) {
      this.detectController();
      return;
    }

    const { position, rotation } = this.grip;
    this.object3d.position.copy(position);
    this.object3d.rotation.copy(rotation);
  }

  async detectController() {
    const { renderer } = Runtime;
    const session = renderer.xr.getSession();

    if (!session) {
      return;
    }

    const { inputSources } = session;
    if (!inputSources) {
      return;
    }

    console.log(inputSources);

    let controllerId: number = -1;
    for (let id in inputSources) {
      if (inputSources[id].handedness === this.handedness) {
        controllerId = parseInt(id);
      }
    }

    if (controllerId === -1) {
      return;
    }

    const xrInputSource = inputSources[controllerId];
    this.controller = renderer.xr.getController(controllerId);
    this.grip = renderer.xr.getControllerGrip(controllerId);

    if (!this.showControllerModel) {
      return;
    }

    const { assetPath } = await fetchProfile(xrInputSource, this.assetPath);
    if (!assetPath) {
      return;
    }

    const loader = new GLTFLoader();
    loader.load(
        // resource URL
        assetPath,
        // called when the resource is loaded
        ( gltf ) => {
          this.object3d.add( gltf.scene );
        }
    );
  }

  addEventListener(event, func) {
    this.controller.addEventListener(event, func);
  }
}

RE.registerComponent(XRInputSource);
