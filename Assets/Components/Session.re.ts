import * as RE from 'rogue-engine';
import { Runtime } from 'rogue-engine';

export default class Session extends RE.Component {
  public static global: Session;

  @RE.props.checkbox()
  public active: boolean;

  @RE.props.num()
  public duration: number = 30;

  @RE.props.num()
  public score: number = 0;

  public gameOver: boolean = false;
  public timeLeft: number = 30;

  awake() {
    Session.global = this;
    this.timeLeft = this.duration;
  }

  update() {
    if (!this.active || this.gameOver) {
      return;
    }

    this.timeLeft-=Runtime.deltaTime;

    if (this.timeLeft < 0) {
      this.endSession();
    }
  }

  alterScore(change: number) {
    if (this.gameOver) {
      return;
    }

    this.score=Math.min(999999, Math.max(0, this.score + change));
  }

  setDuration(duration: number) {
    this.score = 0;
    this.duration = duration;
    this.timeLeft = duration;
  }

  startSession() {
    console.log('Let us go', this.duration);

    if (this.duration === 0) {
      return;
    }

    this.active = true;
    this.gameOver = false;
    this.timeLeft = this.duration;
  }

  endSession() {
    this.gameOver = true;
    this.timeLeft = 0;
  }
}

RE.registerComponent(Session);
