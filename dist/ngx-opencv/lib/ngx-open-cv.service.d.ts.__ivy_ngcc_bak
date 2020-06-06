import { InjectionToken, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OpenCVConfig, OpenCVState } from './models';
export declare const OpenCvConfigToken: InjectionToken<OpenCVConfig>;
export declare class NgxOpenCVService {
    private _ngZone;
    cvState: BehaviorSubject<OpenCVState>;
    configModule: OpenCvConfigModule;
    constructor(options: OpenCVConfig, _ngZone: NgZone);
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
