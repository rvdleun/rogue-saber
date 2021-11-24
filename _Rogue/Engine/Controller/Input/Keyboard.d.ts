export declare class Keyboard {
    private _upKeys;
    private _downKeys;
    private _pressedKeys;
    init(): void;
    getKeyDown(keyCode: string): boolean;
    getKeyPressed(keyCode: string): boolean;
    getKeyUp(keyCode: string): boolean;
}
