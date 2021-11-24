import { Object3D, Material, Texture } from 'three';
import { AudioAsset } from '../Model/AudioAsset';
declare type AssetConfig = {
    preload?: boolean;
    keepLoaded?: boolean;
    override?: boolean;
};
declare class AssetManagerClass {
    private _assets;
    private _assetConfigs;
    private _assetPaths;
    private _loadingAssets;
    get assets(): {
        [uuid: string]: Object3D<import("three").Event> | Texture | Material | AudioAsset;
    };
    get assetConfigs(): {
        [uuid: string]: AssetConfig;
    };
    get assetPaths(): {
        [uuid: string]: string;
    };
    onRegisterAsset(callback: (asset: Object3D | AudioAsset | Material | Texture) => void): {
        stop: () => void;
    };
    onRemoveAsset(callback: (asset: Object3D | AudioAsset | Material | Texture) => void): {
        stop: () => void;
    };
    onClearAssets(callback: (asset: Object3D | AudioAsset | Material | Texture) => void): {
        stop: () => void;
    };
    onSetAssetConfig(callback: (uuid: string, config: AssetConfig) => void): {
        stop: () => void;
    };
    onRemoveAssetConfig(callback: (uuid: string, config: AssetConfig) => void): {
        stop: () => void;
    };
    onLoadAssetConfigs(callback: (uuid: string, config: AssetConfig) => void): {
        stop: () => void;
    };
    onSetAssetPath(callback: (uuid: string, assetPath: string) => void): {
        stop: () => void;
    };
    onSetAssetPaths(callback: (paths: {
        [uuid: string]: string;
    }) => void): {
        stop: () => void;
    };
    onRemoveAssetPath(callback: (uuid: string, assetPath: string) => void): {
        stop: () => void;
    };
    setAssetConfig(uuid: string, config: {
        preload?: boolean;
        keepLoaded?: boolean;
        override?: boolean;
    }): void;
    getAssetConfig(uuid: string): AssetConfig;
    removeAssetConfig(uuid: string): void;
    setAssetPath(uuid: string, assetPath: string): void;
    removeAssetPath(uuid: string): void;
    setAssetPaths(paths: {
        [uuid: string]: string;
    }): void;
    getAssetPath(uuid: string): string | undefined;
    registerAsset(asset: Object3D | AudioAsset | Material | Texture): void;
    loadAsset(uuid: string): Promise<Object3D<import("three").Event> | Texture | Material | AudioAsset | undefined>;
    private getExtension;
    getAsset(uuid: string): Object3D<import("three").Event> | Texture | Material | AudioAsset;
    private loadObject;
    private loadObjectFunction;
    private loadNestedPrefabs;
    private loadAudio;
    private loadAudioFunction;
    private loadMaterial;
    private loadMaterialFunction;
    private loadTexture;
    private loadTextureFunction;
    private loadTextureFile;
    removeAsset(uuid: string): void;
    clear(): void;
    assetIsOrphan(uuid: string): boolean;
    loadAssetConfigs(configs?: {
        [uuid: string]: AssetConfig;
    }): void;
    /**
    * Load all assets set to preload if not loaded already
    */
    preloadAssets(): Promise<void>;
}
export declare let AssetManager: AssetManagerClass;
export {};
