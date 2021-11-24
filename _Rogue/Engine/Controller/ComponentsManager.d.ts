import { Object3D, Scene } from 'three';
import Component from '../Model/Component';
export declare let components: {
    [objectId: string]: Component[];
};
export declare let editorComponents: {
    [objectId: string]: Component[];
};
export declare function getComponentPrototypes(): {
    [className: string]: typeof Component;
};
export declare function clearComponents(): void;
export declare function registerComponent<T extends Component>(ComponentClass: new (...args: any[]) => T): void;
export declare const initComponents: (scene: Scene, componentsToLoad?: Object | undefined) => void;
export declare const initEditorComponents: (scene: Scene) => void;
export declare function traverseComponents(fn: (component: Component, objectUUID: string, index: number) => void): void;
export declare const loadComponents: (object: Object3D, objectComponents: Component[]) => void;
export declare const setSerializedComponents: (componentsJSON: any) => void;
export declare const serializeComponents: () => {};
export declare const addComponent: (component: Component) => void;
export declare function copyObjectComponents(object: Object3D, target: Object3D): void;
export declare const removeComponent: (component: Component) => boolean | undefined;
export declare const removeComponents: (object3d: Object3D, recursive?: boolean | undefined) => void;
export declare function getComponentByName(name: string, object3d?: Object3D): Component | undefined;
export declare const getComponent: <T extends Component>(ComponentClass: new (...args: any[]) => T, object3d?: Object3D<import("three").Event> | undefined) => T | undefined;
export declare const getComponents: <T extends Component>(ComponentClass: new (...args: any[]) => T) => T[];
export declare const getObjectComponents: (object3d: Object3D) => Component[];
