import * as RE from 'rogue-engine';
import { PositionalAudio } from 'three';
import { AudioAsset, Prop, Runtime } from 'rogue-engine';

const assets = ['lasrhit1.wav', 'lasrhit2.WAV', 'lasrhit3.WAV', 'lasrhit4.WAV'].map(async audio => {
  return AudioAsset.fromFile(RE.getStaticPath(`Audio/${audio}`))
});

export default class LaserDeflect extends RE.Component {
  @Prop("PositionalAudio")
  fireSound: PositionalAudio;

  remove: number = 5;

  async start() {
    const asset = await assets[Math.floor(Math.random() * assets.length)];
    const audio = asset.getPositionalAudio();

    this.object3d.add(audio);
    audio.play();
  }

  update() {
    this.remove-=Runtime.deltaTime;

    if (this.remove > 0) {
      return;
    }

    Runtime.scene.remove(this.object3d);
  }
}

RE.registerComponent(LaserDeflect);
