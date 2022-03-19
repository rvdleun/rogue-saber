import * as RE from 'rogue-engine';
import { Runtime } from 'rogue-engine';

export default class Session extends RE.Component {
  public static global: Session;

  @RE.props.checkbox()
  public active: boolean;

  @RE.props.num()
  public timeLeft: number = 30;

  @RE.props.num()
  public score: number = 0;

  awake() {
    Session.global = this;
  }

  update() {
    if (!this.active) {
      return;
    }

    this.timeLeft-=Runtime.deltaTime;

    if (this.timeLeft < 0) {
      this.timeLeft = 0;
    }
  }

  alterScore(change: number) {
    this.score=Math.min(999999, Math.max(0, this.score + change));
  }
}

RE.registerComponent(Session);
