import { Audio, PositionalAudio } from "three";
export declare class AudioAsset {
    private _uuid;
    private _buffer;
    userData: {
        __ASSET__: string;
    };
    constructor(params: {
        uuid: string;
        buffer?: AudioBuffer;
    });
    get uuid(): string;
    get path(): string;
    get name(): string;
    getAudio(): Audio<GainNode>;
    getPositionalAudio(): PositionalAudio;
    static fromFile(filePath: string, onProgress?: () => void, onError?: () => void): Promise<AudioAsset>;
}
