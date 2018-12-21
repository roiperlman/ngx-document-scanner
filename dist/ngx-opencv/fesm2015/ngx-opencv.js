import { Inject, Injectable, InjectionToken, NgZone, NgModule, defineInjectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const OpenCvConfigToken = new InjectionToken('OpenCV config object token');
class NgxOpenCVService {
    /**
     * @param {?} options
     * @param {?} _ngZone
     */
    constructor(options, _ngZone) {
        this._ngZone = _ngZone;
        this.cvState = new BehaviorSubject({
            ready: false,
            error: false,
            loading: true,
            state: 'loading'
        });
        if (!options) {
            options = {};
        }
        this.configModule = this.generateConfigModule(options);
        this.loadOpenCv();
    }
    /**
     * load the OpenCV script
     * @return {?}
     */
    loadOpenCv() {
        this.cvState.next(this.newState('loading'));
        // create global module variable
        window['Module'] = this.configModule;
        // create script element and set attributes
        /** @type {?} */
        const script = (/** @type {?} */ (document.createElement('script')));
        script.setAttribute('async', '');
        script.setAttribute('type', 'text/javascript');
        // listen for errors
        script.addEventListener('error', () => {
            /** @type {?} */
            const err = new Error('Failed to load ' + this.configModule.scriptUrl);
            this.cvState.next(this.newState('error'));
            this.cvState.error(err);
        }, { passive: true });
        // set script url
        script.src = this.configModule.scriptUrl;
        // insert script as first script tag
        /** @type {?} */
        const node = document.getElementsByTagName('script')[0];
        if (node) {
            node.parentNode.insertBefore(script, node);
        }
        else {
            document.head.appendChild(script);
        }
    }
    /**
     * generates a new state object
     * @private
     * @param {?} change - the new state of the module
     * @return {?}
     */
    newState(change) {
        /** @type {?} */
        const newStateObj = {
            ready: false,
            loading: false,
            error: false,
            state: ''
        };
        Object.keys(newStateObj).forEach(key => {
            if (key !== 'state') {
                if (key === change) {
                    newStateObj[key] = true;
                    newStateObj.state = key;
                }
                else {
                    newStateObj[key] = false;
                }
            }
        });
        return newStateObj;
    }
    /**
     * generates a config module for the global Module object
     * @private
     * @param {?} options - configuration options
     * @return {?}
     */
    generateConfigModule(options) {
        return {
            scriptUrl: options.openCVDirPath ? `${options.openCVDirPath}/opencv.js` : `/assets/opencv/opencv.js`,
            wasmBinaryFile: 'opencv_js.wasm',
            usingWasm: true,
            onRuntimeInitialized: () => {
                this._ngZone.run(() => {
                    console.log('openCV Ready');
                    this.cvState.next(this.newState('ready'));
                    if (options.runOnOpenCVInit) {
                        options.runOnOpenCVInit();
                    }
                });
            }
        };
    }
}
NgxOpenCVService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxOpenCVService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [OpenCvConfigToken,] }] },
    { type: NgZone }
];
/** @nocollapse */ NgxOpenCVService.ngInjectableDef = defineInjectable({ factory: function NgxOpenCVService_Factory() { return new NgxOpenCVService(inject(OpenCvConfigToken), inject(NgZone)); }, token: NgxOpenCVService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxOpenCVModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: NgxOpenCVModule,
            providers: [{ provide: OpenCvConfigToken, useValue: config }]
        };
    }
}
NgxOpenCVModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                exports: [],
                providers: [NgxOpenCVService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxOpenCVModule, OpenCvConfigToken, NgxOpenCVService };

//# sourceMappingURL=ngx-opencv.js.map