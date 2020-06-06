import { InjectionToken, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OpenCVConfig, OpenCVState } from './models';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgxOpenCVService, never>;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW9wZW4tY3Yuc2VydmljZS5kLnRzIiwic291cmNlcyI6WyJuZ3gtb3Blbi1jdi5zZXJ2aWNlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT3BlbkNWQ29uZmlnLCBPcGVuQ1ZTdGF0ZSB9IGZyb20gJy4vbW9kZWxzJztcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IE9wZW5DdkNvbmZpZ1Rva2VuOiBJbmplY3Rpb25Ub2tlbjxPcGVuQ1ZDb25maWc+O1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTmd4T3BlbkNWU2VydmljZSB7XG4gICAgcHJpdmF0ZSBfbmdab25lO1xuICAgIGN2U3RhdGU6IEJlaGF2aW9yU3ViamVjdDxPcGVuQ1ZTdGF0ZT47XG4gICAgY29uZmlnTW9kdWxlOiBPcGVuQ3ZDb25maWdNb2R1bGU7XG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogT3BlbkNWQ29uZmlnLCBfbmdab25lOiBOZ1pvbmUpO1xuICAgIC8qKlxuICAgICAqIGxvYWQgdGhlIE9wZW5DViBzY3JpcHRcbiAgICAgKi9cbiAgICBsb2FkT3BlbkN2KCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogZ2VuZXJhdGVzIGEgbmV3IHN0YXRlIG9iamVjdFxuICAgICAqIEBwYXJhbSBjaGFuZ2UgLSB0aGUgbmV3IHN0YXRlIG9mIHRoZSBtb2R1bGVcbiAgICAgKi9cbiAgICBwcml2YXRlIG5ld1N0YXRlO1xuICAgIC8qKlxuICAgICAqIGdlbmVyYXRlcyBhIGNvbmZpZyBtb2R1bGUgZm9yIHRoZSBnbG9iYWwgTW9kdWxlIG9iamVjdFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gY29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUNvbmZpZ01vZHVsZTtcbn1cbi8qKlxuICogZGVzY3JpYmVzIHRoZSBnbG9iYWwgTW9kdWxlIG9iamVjdCB0aGF0IGlzIHVzZWQgdG8gaW5pdGlhdGUgT3BlbkNWLmpzXG4gKi9cbmludGVyZmFjZSBPcGVuQ3ZDb25maWdNb2R1bGUge1xuICAgIHNjcmlwdFVybDogc3RyaW5nO1xuICAgIHdhc21CaW5hcnlGaWxlOiBzdHJpbmc7XG4gICAgdXNpbmdXYXNtOiBib29sZWFuO1xuICAgIG9uUnVudGltZUluaXRpYWxpemVkOiBGdW5jdGlvbjtcbn1cbmV4cG9ydCB7fTtcbiJdfQ==