import * as RE from 'rogue-engine';
import RemoteFire from './RemoteFire.re';
import { getComponent, Prop, PropList, Runtime } from 'rogue-engine';
import LightsaberBlade from './LightsaberBlade.re';
import { Object3D } from 'three';
import EnemyIndicator from './EnemyIndicator.re';

export default class RemotesController extends RE.Component {
  @Prop('Boolean')
  public alwaysFire: boolean;

  private nextFire = 2 + Math.random();
  private numberOfDrones = 0;
  private remoteFires: RemoteFire[] = [];
  private remotes: Object3D[];

  private i = 0;

  start() {
    this.remotes = this.object3d.children;
    this.remotes.forEach(remote => {
      remote.traverse(child => {
        const component = getComponent(RemoteFire, child);
        if (component) {
          this.remoteFires.push(component);
        }
      });
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

    const id = Math.floor(Math.random() * this.numberOfDrones);
    this.nextFire = this.remoteFires[id].startFiring() + .5 + (Math.random() * (3.5 - this.numberOfDrones));
    EnemyIndicator.global.setTarget(this.remoteFires[id]?.object3d?.parent?.parent?.children[0])

    this.i++;
    if (this.i >= this.remotes.length) {
      this.i = 0;
    }
  }

  setNumberOfDrones(numberOfDrones: number) {
    this.numberOfDrones = numberOfDrones;
    for(let i = 0; i < this.remotes.length; i++) {
      this.remotes[i].visible = i < numberOfDrones;
    }
  }
}

RE.registerComponent(RemotesController);
