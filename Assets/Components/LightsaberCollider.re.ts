import * as RE from 'rogue-engine';
import Laser from './Laser.re';

export default class LightsaberCollider extends RE.Component {
  start() {
    Laser.setBladeCollider(this.object3d);
  }
}

RE.registerComponent(LightsaberCollider);
