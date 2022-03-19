export declare type propType = 'String' | 'Number' | 'Boolean' | 'Select' | 'Vector2' | 'Vector3' | 'Object3D' | 'Prefab' | 'Texture' | 'Material' | 'Audio' | 'PositionalAudio' | 'Color' | 'AnimationClip' | 'Button';
export declare function Prop(type: propType): (target: Object, propertyKey: string) => void;
export declare function PropList(type: propType): (target: Object, propertyKey: string) => void;
declare function decoratorFunc(target: Object, propertyKey: string): void;
declare class Decorators {
    num(min?: number, max?: number): typeof decoratorFunc;
    checkbox(): typeof decoratorFunc;
    text(isTextArea?: boolean): typeof decoratorFunc;
    code(lang: 'json' | 'html' | 'glsl'): typeof decoratorFunc;
    select(): typeof decoratorFunc;
    vector2(): typeof decoratorFunc;
    vector3(): typeof decoratorFunc;
    prefab(): typeof decoratorFunc;
    material(): typeof decoratorFunc;
    texture(): typeof decoratorFunc;
    object3d(): typeof decoratorFunc;
    audio(isPositional?: boolean): typeof decoratorFunc;
    color(): typeof decoratorFunc;
    animation(): typeof decoratorFunc;
    button(): typeof decoratorFunc;
}
declare class ListProp extends Decorators {
}
declare class Props extends Decorators {
    private _list;
    get list(): ListProp;
    data(): typeof decoratorFunc;
}
export declare const props: Props;
export {};
