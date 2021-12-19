import * as RE from 'rogue-engine';
import RemoteFire from './RemoteFire.re';
import { getComponent, Prop, Runtime } from 'rogue-engine';
import LightsaberBlade from './LightsaberBlade.re';

export default class RemotesController extends RE.Component {
  @Prop('Boolean')
  public alwaysFire: boolean;

  private nextFire = 2 + Math.random();
  private remotes: RemoteFire[] = [];

  private i = 0;

  start() {
    // this.remotes.push(getComponent(RemoteFire, this.object3d.children[0].children[1]) as RemoteFire);
    this.object3d.traverse(child => {
      const component = getComponent(RemoteFire, child);
      if (component) {
        this.remotes.push(component);
      }
    });
  }

  update() {
    this.nextFire-=Runtime.deltaTime;
    if (this.nextFire > 0) {
      return;
    }

    if (!this.alwaysFire && !LightsaberBlade.active ) {
      this.nextFire = 2 + Math.random() * 3;
      return;
    }

    // const id = Math.floor(Math.random() * this.remotes.length);
    const id = this.i;
    const remote = this.remotes[id];
    console.log(id, remote.object3d.parent?.uuid);
    this.nextFire = remote.startFiring();
    // this.nextFire = .5;

    this.i++;
    if (this.i >= this.remotes.length) {
      this.i = 0;
    }
  }
}

RE.registerComponent(RemotesController);
