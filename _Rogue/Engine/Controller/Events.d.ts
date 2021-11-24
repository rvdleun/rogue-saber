import { Object3D } from 'three';
import Component from '../Model/Component';
import SceneController from '../Model/SceneController';
export declare function onObjectAdded(callback: (object: Object3D, target: Object3D) => void): {
    stop: () => void;
};
export declare function onObjectRemoved(callback: (object: Object3D, target: Object3D) => void): {
    stop: () => void;
};
export declare function objectAdded(object: Object3D, target: Object3D): void;
export declare function objectRemoved(object: Object3D, target: Object3D): void;
export declare function onComponentAdded(callback: (component: Component, target: Object3D) => void): {
    stop: () => void;
};
export declare function onComponentLoaded(callback: (component: Component, target: Object3D) => void): {
    stop: () => void;
};
export declare function onComponentRemoved(callback: (component: Component, target: Object3D) => void): {
    stop: () => void;
};
export declare function componentAdded(component: Component, target: Object3D): void;
export declare function componentLoaded(component: Component, target: Object3D): void;
export declare function componentRemoved(component: Component, target: Object3D): void;
export declare function onBeforeUpdate(callback: (sceneController: SceneController) => void): {
    stop: () => void;
};
export declare function onUpdate(callback: (sceneController: SceneController) => void): {
    stop: () => void;
};
export declare function onAfterUpdate(callback: (sceneController: SceneController) => void): {
    stop: () => void;
};
export declare function onNextFrame(callback: (sceneController: SceneController) => void): void;
export declare function runBeforeUpdate(sceneController: SceneController): void;
export declare function runUpdate(sceneController: SceneController): void;
export declare function runAfterUpdate(sceneController: SceneController): void;
export declare function runNextFrame(sceneController: SceneController): void;
