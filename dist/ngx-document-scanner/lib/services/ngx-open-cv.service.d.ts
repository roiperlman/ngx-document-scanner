import { InjectionToken, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OpenCvConfig, OpenCvState } from '../PublicModels';
export declare const OpenCvConfigToken: InjectionToken<OpenCvConfig>;
export declare class NgxOpenCvService {
    private _ngZone;
    cvState: BehaviorSubject<OpenCvState>;
    configModule: OpenCvConfigModule;
    constructor(options: OpenCvConfig, _ngZone: NgZone);
    /**
     * load the OpenCV script
     */
    loadOpenCv(): void;
    /**
     * generates a new state object
     * @param change - the new state of the module
     */
    private newState;
    /**
     * generates a config module for the global Module object
     * @param options - configuration options
     */
    private generateConfigModule;
}
/**
 * describes the global Module object that is used to initiate OpenCV.js
 */
interface OpenCvConfigModule {
    scriptUrl: string;
    wasmBinaryFile: string;
    usingWasm: boolean;
    onRuntimeInitialized: Function;
}
export {};
