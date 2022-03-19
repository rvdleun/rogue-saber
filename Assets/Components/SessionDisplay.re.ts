import * as RE from 'rogue-engine';
import { getComponent } from 'rogue-engine';
import Text from './Text.re';
import Session from './Session.re';

export default class SessionDisplay extends RE.Component {
  @RE.props.object3d()
  public scoreObject;

  @RE.props.object3d()
  public timeLeftObject;

  private currentScore;
  private currentTimeLeft;

  private scoreText: Text;
  private timeLeftText: Text;

  start() {
    this.timeLeftText = getComponent(Text, this.timeLeftObject)!;
    this.scoreText = getComponent(Text, this.scoreObject)!;
  }

  update() {
    if (this.currentScore !== Session.global.score) {
      this.currentScore = Session.global.score;
      this.scoreText.text = this.currentScore.toString().padStart(6, '0');
      this.scoreText.needsUpdate = true;
    }

    const timeLeft = Math.floor(Session.global.timeLeft);
    if (timeLeft !== this.currentTimeLeft) {
      this.currentTimeLeft = timeLeft;

      const minutes = Math.floor(timeLeft / 60).toString();
      const seconds = (timeLeft - (minutes * 60)).toString();
      this.timeLeftText.text = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
      this.timeLeftText.needsUpdate = true;
    }
  }
}


RE.registerComponent(SessionDisplay);
