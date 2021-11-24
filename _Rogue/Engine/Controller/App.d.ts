import { Scene, Object3D } from 'three';
import SceneController from '../Model/SceneController';
export declare class App {
    private static _title;
    private static _settings;
    private static _currentScene;
    private static _activeCamera;
    private static _scenes;
    private static _sceneController;
    private static _lanIP;
    private constructor();
    static get activeCamera(): string;
    static set activeCamera(cameraId: string);
    static get settings(): any;
    static get title(): string;
    static set title(title: string);
    static get currentScene(): Scene;
    static set currentScene(scene: Scene);
    static get scenes(): {
        name: string;
        uuid: string;
    }[];
    static get sceneController(): SceneController;
    static set sceneController(value: SceneController);
    static get lanIP(): string;
    static toJSON(assetPaths: {
        [uuid: string]: string;
    }): {
        title: string;
        scenes: {
            name: string;
            uuid: string;
        }[];
        lanIP: string;
        assetPaths: {
            [uuid: string]: string;
        };
    };
    static fromJSON(json: {
        title: string;
        scenes: {
            name: string;
            uuid: string;
        }[];
        assetPaths: {
            [uuid: string]: string;
        };
        lanIP?: string;
    }): void;
    static play(config: {
        title: string;
        scenes: {
            name: string;
            uuid: string;
        }[];
        assetPaths: {
            [uuid: string]: string;
        };
    }): void;
    static loadScene(name: string | number): Promise<void>;
    private static loadSceneFunc;
    static clone(object: Object3D, parent?: Object3D): Object3D<import("three").Event>;
    private static loadComponentsRecursive;
    private static loadAudioListeners;
}
