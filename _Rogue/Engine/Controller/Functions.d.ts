import { Object3D } from 'three';
export declare function isDev(): boolean;
export declare function getStaticPath(path: string): string;
export declare function loadComponentsRecursive(object: Object3D): void;
export declare function loadAudioListeners(object: Object3D): void;
export declare function dispose(object: Object3D): void;
