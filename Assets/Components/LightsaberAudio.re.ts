import * as RE from 'rogue-engine';
import { Prop, PropList } from 'rogue-engine';
import { Audio } from 'three';
import LightsaberBlade from './LightsaberBlade.re';

export default class LightsaberAudio extends RE.Component {
  @Prop("PositionalAudio")
  private sfxTurnOff: Audio;

  @Prop("PositionalAudio")
  private sfxTurnOn: Audio;

  @Prop("PositionalAudio")
  private sfxHum: Audio;

  start() {
    this.sfxHum.setLoop(true);
    this.sfxHum.setVolume(.25);
  }

  playToggleSound() {
    if (LightsaberBlade.active) {
      this.sfxTurnOn.play();
      this.sfxHum.play(.25);
    } else {
      this.sfxTurnOff.play();
      this.sfxHum.stop();
    }
  }
}

RE.registerComponent(LightsaberAudio);
