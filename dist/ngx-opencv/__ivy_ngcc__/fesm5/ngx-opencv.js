import { InjectionToken, Injectable, Inject, NgZone, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-open-cv.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
import * as ɵngcc0 from '@angular/core';
var OpenCvConfigToken = new InjectionToken('OpenCV config object token');
var NgxOpenCVService = /** @class */ (function () {
    function NgxOpenCVService(options, _ngZone) {
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
     */
    /**
     * load the OpenCV script
     * @return {?}
     */
    NgxOpenCVService.prototype.loadOpenCv = /**
     * load the OpenCV script
     * @return {?}
     */
    function () {
        var _this = this;
        this.cvState.next(this.newState('loading'));
        // create global module variable
        window['Module'] = this.configModule;
        // create script element and set attributes
        /** @type {?} */
        var script = (/** @type {?} */ (document.createElement('script')));
        script.setAttribute('async', '');
        script.setAttribute('type', 'text/javascript');
        // listen for errors
        script.addEventListener('error', (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var err = new Error('Failed to load ' + _this.configModule.scriptUrl);
            _this.cvState.next(_this.newState('error'));
            _this.cvState.error(err);
        }), { passive: true });
        // set script url
        script.src = this.configModule.scriptUrl;
        // insert script as first script tag
        /** @type {?} */
        var node = document.getElementsByTagName('script')[0];
        if (node) {
            node.parentNode.insertBefore(script, node);
        }
        else {
            document.head.appendChild(script);
        }
    };
    /**
     * generates a new state object
     * @param change - the new state of the module
     */
    /**
     * generates a new state object
     * @private
     * @param {?} change - the new state of the module
     * @return {?}
     */
    NgxOpenCVService.prototype.newState = /**
     * generates a new state object
     * @private
     * @param {?} change - the new state of the module
     * @return {?}
     */
    function (change) {
        /** @type {?} */
        var newStateObj = {
            ready: false,
            loading: false,
            error: false,
            state: ''
        };
        Object.keys(newStateObj).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (key !== 'state') {
                if (key === change) {
                    newStateObj[key] = true;
                    newStateObj.state = key;
                }
                else {
                    newStateObj[key] = false;
                }
            }
        }));
        return newStateObj;
    };
    /**
     * generates a config module for the global Module object
     * @param options - configuration options
     */
    /**
     * generates a config module for the global Module object
     * @private
     * @param {?} options - configuration options
     * @return {?}
     */
    NgxOpenCVService.prototype.generateConfigModule = /**
     * generates a config module for the global Module object
     * @private
     * @param {?} options - configuration options
     * @return {?}
     */
    function (options) {
        var _this = this;
        return {
            scriptUrl: options.openCVDirPath ? options.openCVDirPath + "/opencv.js" : "/assets/opencv/opencv.js",
            wasmBinaryFile: 'opencv_js.wasm',
            usingWasm: true,
            onRuntimeInitialized: (/**
             * @return {?}
             */
            function () {
                _this._ngZone.run((/**
                 * @return {?}
                 */
                function () {
                    console.log('openCV Ready');
                    _this.cvState.next(_this.newState('ready'));
                    if (options.runOnOpenCVInit) {
                        options.runOnOpenCVInit();
                    }
                }));
            })
        };
    };
    /** @nocollapse */
    NgxOpenCVService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [OpenCvConfigToken,] }] },
        { type: NgZone }
    ]; };
    /** @nocollapse */ NgxOpenCVService.ɵprov = ɵɵdefineInjectable({ factory: function NgxOpenCVService_Factory() { return new NgxOpenCVService(ɵɵinject(OpenCvConfigToken), ɵɵinject(NgZone)); }, token: NgxOpenCVService, providedIn: "root" });
NgxOpenCVService.ɵfac = function NgxOpenCVService_Factory(t) { return new (t || NgxOpenCVService)(ɵngcc0.ɵɵinject(OpenCvConfigToken), ɵngcc0.ɵɵinject(ɵngcc0.NgZone)); };
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxOpenCVService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [OpenCvConfigToken]
            }] }, { type: ɵngcc0.NgZone }]; }, null); })();
    return NgxOpenCVService;
}());
if (false) {
    /** @type {?} */
    NgxOpenCVService.prototype.cvState;
    /** @type {?} */
    NgxOpenCVService.prototype.configModule;
    /**
     * @type {?}
     * @private
     */
    NgxOpenCVService.prototype._ngZone;
}
/**
 * describes the global Module object that is used to initiate OpenCV.js
 * @record
 */
function OpenCvConfigModule() { }
if (false) {
    /** @type {?} */
    OpenCvConfigModule.prototype.scriptUrl;
    /** @type {?} */
    OpenCvConfigModule.prototype.wasmBinaryFile;
    /** @type {?} */
    OpenCvConfigModule.prototype.usingWasm;
    /** @type {?} */
    OpenCvConfigModule.prototype.onRuntimeInitialized;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-opencv.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxOpenCVModule = /** @class */ (function () {
    function NgxOpenCVModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    NgxOpenCVModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: NgxOpenCVModule,
            providers: [{ provide: OpenCvConfigToken, useValue: config }]
        };
    };
NgxOpenCVModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: NgxOpenCVModule });
NgxOpenCVModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function NgxOpenCVModule_Factory(t) { return new (t || NgxOpenCVModule)(); }, providers: [NgxOpenCVService] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxOpenCVModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                exports: [],
                providers: [NgxOpenCVService]
            }]
    }], function () { return []; }, null); })();
    return NgxOpenCVModule;
}());
/** @type {?} */
var a = 0;

/**
 * @fileoverview added by tsickle
 * Generated from: lib/models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * describes a configuration object for the OpenCV service
 * @record
 */
function OpenCVConfig() { }
if (false) {
    /**
     * path to the directory containing the OpenCV files, in the form of '/path/to/<opencv directory>'
     * directory must contain the the following files:
     * --<OpenCvDir>
     * ----opencv.js
     * ----opencv_js.wasm
     * @type {?|undefined}
     */
    OpenCVConfig.prototype.openCVDirPath;
    /**
     * additional callback that will run when OpenCv has finished loading and parsing
     * @type {?|undefined}
     */
    OpenCVConfig.prototype.runOnOpenCVInit;
}
/**
 * @record
 */
function OpenCVState() { }
if (false) {
    /** @type {?} */
    OpenCVState.prototype.ready;
    /** @type {?} */
    OpenCVState.prototype.loading;
    /** @type {?} */
    OpenCVState.prototype.error;
    /** @type {?} */
    OpenCVState.prototype.state;
}

/**
 * @fileoverview added by tsickle
 * Generated from: public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-opencv.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxOpenCVModule, NgxOpenCVService, OpenCvConfigToken };

//# sourceMappingURL=ngx-opencv.js.map