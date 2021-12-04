import * as RE from 'rogue-engine';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { Runtime } from 'rogue-engine';

export default class VirtualRealityCamera extends RE.Component {
  start() {

    const { camera, renderer, scene } = Runtime;

    renderer.xr.enabled = true;
    document.body.appendChild( VRButton.createButton( renderer ) );

    // renderer.setAnimationLoop( function () {
    //   renderer.render( scene, camera );
    // } );
  }
}

RE.registerComponent(VirtualRealityCamera);
