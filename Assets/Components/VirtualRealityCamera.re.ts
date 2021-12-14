import * as RE from 'rogue-engine';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { Runtime } from 'rogue-engine';

export default class VirtualRealityCamera extends RE.Component {
  start() {

    const { renderer } = Runtime;

    renderer.xr.enabled = true;
    const button = VRButton.createButton( renderer );
    document.body.appendChild( button );
  }
}

RE.registerComponent(VirtualRealityCamera);
