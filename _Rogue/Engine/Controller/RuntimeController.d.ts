import Component from '../Model/Component';
import SceneController from '../Model/SceneController';
import { WebGLRenderer, Scene } from 'three';
export declare class RuntimeController extends SceneController {
    uiContainer: HTMLDivElement;
    private onPlayCbsFlaggedForRemoval;
    private onStopCbsFlaggedForRemoval;
    play(scene: Scene, renderer?: WebGLRenderer, componentsToLoad?: any): void;
    onPlay(callback: () => any): {
        stop: () => void;
    };
    onStop(callback: () => any): {
        stop: () => void;
    };
    stop(): void;
    private createUIContainer;
    private removeUIContainer;
    protected afterUpdate(): void;
    protected traverseSceneComponents(callback: (component: Component) => void): void;
    protected beginUpdateCycle(): void;
}
export declare const Runtime: RuntimeController;
