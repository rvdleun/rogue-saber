declare type propType = 'String' | 'Number' | 'Boolean' | 'Select' | 'Vector2' | 'Vector3' | 'Object3D' | 'Prefab' | 'Texture' | 'Material' | 'Component' | 'Audio' | 'PositionalAudio' | 'Color';
export declare function Prop(type: propType): (target: Object, propertyKey: string) => void;
export declare function PropList(type: propType): (target: Object, propertyKey: string) => void;
export {};
