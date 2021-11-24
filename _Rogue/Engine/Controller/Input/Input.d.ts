import { Mouse } from './Mouse';
import { Keyboard } from './Keyboard';
import { TouchController } from './Touch';
export declare abstract class Input {
    private static _mouse;
    private static _keyboard;
    private static _touch;
    static get mouse(): Mouse;
    static get keyboard(): Keyboard;
    static get touch(): TouchController;
}
