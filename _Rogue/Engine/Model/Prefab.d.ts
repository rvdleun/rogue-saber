import { Object3D } from 'three';
export declare class Prefab {
    private _uuid;
    constructor(uuid: any);
    get uuid(): string;
    get path(): string;
    get name(): string;
    instantiate(parent?: Object3D): Object3D<import("three").Event>;
}
