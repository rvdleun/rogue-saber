import * as RE from 'rogue-engine';
import { getComponent, Runtime } from 'rogue-engine';
import Text from './Text.re';
import Session from './Session.re';

export default class SessionDisplay extends RE.Component {
  @RE.props.object3d()
  public scoreObject;

  @RE.props.object3d()
  public timeLeftObject;

  private currentScore = 0;
  private currentTimeLeft;
  private currentTimeVisible;

  private nextScoreUpdate = 0;
  private scoreText: Text;
  private timeLeftBlink: number = .5;
  private timeLeftText: Text;

  start() {
    this.timeLeftText = getComponent(Text, this.timeLeftObject)!;
    this.scoreText = getComponent(Text, this.scoreObject)!;
  }

  update() {
    this.nextScoreUpdate-=Runtime.deltaTime;

    let updateScore = true;
    while(this.nextScoreUpdate < 0) {
      this.nextScoreUpdate+=.005;

      if (this.currentScore < Session.global.score) {
        this.currentScore++;
        console.log(this.currentScore);
      } else if (this.currentScore > Session.global.score) {
        this.currentScore--;
        console.log(this.currentScore);
      } else {
        updateScore = true;
      }
    }

    if (updateScore) {
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

    this.timeLeftBlink -= Runtime.deltaTime;
    if (this.timeLeftBlink < 0) {
      this.currentTimeVisible = Session.global.gameOver ? !this.currentTimeVisible : true;
      this.timeLeftText.object3d.visible = this.currentTimeVisible;

      this.timeLeftBlink = 0.5;
    }
  }
}


RE.registerComponent(SessionDisplay);
