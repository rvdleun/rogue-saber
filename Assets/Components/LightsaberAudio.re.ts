import * as RE from 'rogue-engine';
import { Prop } from 'rogue-engine';
import { Audio } from 'three';
import LightsaberBlade from './LightsaberBlade.re';

export default class LightsaberAudio extends RE.Component {
  @Prop("PositionalAudio")
  sfxTurnOff: Audio;

  @Prop("PositionalAudio")
  sfxTurnOn: Audio;

  playToggleSound() {
    if (LightsaberBlade.active) {
      this.sfxTurnOn.play();
    } else {
      this.sfxTurnOff.play();
    }
  }
}

RE.registerComponent(LightsaberAudio);
