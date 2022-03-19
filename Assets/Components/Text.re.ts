import * as RE from 'rogue-engine';
import {Text as TroikaText} from 'troika-three-text'
import { Color, Object3D } from 'three';

export const textUiSelects = ['anchorX', 'anchorY'];
export default class Text extends RE.Component {
  @RE.props.select()
  public anchorX: 'center' | 'left' | 'right' = 'center';
  public anchorXOptions = ['center', 'left', 'right'];

  @RE.props.select()
  public anchorY: 'top' | 'top-baseline' | 'middle' | 'bottom-baseline' | 'bottom' = 'middle';
  public anchorYOptions = ['top', 'top-baseline', 'middle', 'bottom-baseline', 'bottom'];

  @RE.props.color()
  public color: Color;

  @RE.props.num()
  public fontSize: number = 0.05;

  @RE.props.text(true)
  public text: string = 'Hello World';

  public needsUpdate: boolean = true;
  public textObject: Object3D;

  awake() {
    this.textObject = new TroikaText();
    this.textObject.font = 'https://fonts.cdnfonts.com/s/15739/ShareTechMono-Regular.woff';
    this.object3d.add(this.textObject);
  }

  update() {
    if (!this.needsUpdate) {
      return;
    }

    textUiSelects.forEach(select => {
      const options = `${select}Options`;
      const value = this[select];
      if (this[options][value]) {
        this[select] = this[options][value];
      }
    });

    for(let key in this.interface) {
      this.textObject[key] = this[key];
    }

    this.needsUpdate = false;
    this.textObject.sync();
  }
}

RE.registerComponent(Text);
