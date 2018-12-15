import { Inject, Injectable, InjectionToken, NgZone, NgModule, defineInjectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var OpenCvConfigToken = new InjectionToken('OpenCV config object token');
var NgxOpenCvService = /** @class */ (function () {
    function NgxOpenCvService(options, _ngZone) {
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
    NgxOpenCvService.prototype.loadOpenCv = /**
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
        script.addEventListener('error', function () {
            /** @type {?} */
            var err = new Error('Failed to load ' + _this.configModule.scriptUrl);
            _this.cvState.next(_this.newState('error'));
            _this.cvState.error(err);
        }, { passive: true });
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
    NgxOpenCvService.prototype.newState = /**
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
        Object.keys(newStateObj).forEach(function (key) {
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
    NgxOpenCvService.prototype.generateConfigModule = /**
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
            onRuntimeInitialized: function () {
                _this._ngZone.run(function () {
                    console.log('openCV Ready');
                    _this.cvState.next(_this.newState('ready'));
                    if (options.runOnOpenCVInit) {
                        options.runOnOpenCVInit();
                    }
                });
            }
        };
    };
    NgxOpenCvService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgxOpenCvService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [OpenCvConfigToken,] }] },
        { type: NgZone }
    ]; };
    /** @nocollapse */ NgxOpenCvService.ngInjectableDef = defineInjectable({ factory: function NgxOpenCvService_Factory() { return new NgxOpenCvService(inject(OpenCvConfigToken), inject(NgZone)); }, token: NgxOpenCvService, providedIn: "root" });
    return NgxOpenCvService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxOpencvModule = /** @class */ (function () {
    function NgxOpencvModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    NgxOpencvModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: NgxOpencvModule,
            providers: [{ provide: OpenCvConfigToken, useValue: config }]
        };
    };
    NgxOpencvModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [],
                    exports: [],
                    providers: [NgxOpenCvService]
                },] }
    ];
    return NgxOpencvModule;
}());

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

export { NgxOpencvModule, NgxOpenCvService as ɵb, OpenCvConfigToken as ɵa };

//# sourceMappingURL=ngx-opencv.js.map