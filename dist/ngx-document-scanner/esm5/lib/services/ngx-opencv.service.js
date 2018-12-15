/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
/** @type {?} */
export var OpenCvConfigToken = new InjectionToken('OpenCV config object token');
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
    NgxOpenCVService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgxOpenCVService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [OpenCvConfigToken,] }] },
        { type: NgZone }
    ]; };
    /** @nocollapse */ NgxOpenCVService.ngInjectableDef = i0.defineInjectable({ factory: function NgxOpenCVService_Factory() { return new NgxOpenCVService(i0.inject(OpenCvConfigToken), i0.inject(i0.NgZone)); }, token: NgxOpenCVService, providedIn: "root" });
    return NgxOpenCVService;
}());
export { NgxOpenCVService };
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
function OpenCVConfigModule() { }
if (false) {
    /** @type {?} */
    OpenCVConfigModule.prototype.scriptUrl;
    /** @type {?} */
    OpenCVConfigModule.prototype.wasmBinaryFile;
    /** @type {?} */
    OpenCVConfigModule.prototype.usingWasm;
    /** @type {?} */
    OpenCVConfigModule.prototype.onRuntimeInitialized;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW9wZW5jdi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbmd4LW9wZW5jdi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7OztBQUdyQyxNQUFNLEtBQU8saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQWUsNEJBQTRCLENBQUM7QUFFL0Y7SUFhRSwwQkFBdUMsT0FBcUIsRUFBVSxPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQVJyRixZQUFPLEdBQUcsSUFBSSxlQUFlLENBQWM7WUFDekMsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLFNBQVM7U0FDakIsQ0FBQyxDQUFDO1FBSUQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gscUNBQVU7Ozs7SUFBVjtRQUFBLGlCQTBCQztRQXpCQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsZ0NBQWdDO1FBQ2hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOzs7WUFHL0IsTUFBTSxHQUFHLG1CQUFvQixRQUFRLENBQUMsYUFB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RCxJQWdHQztTQTdGWSxnQkFBZ0I7OztJQUUzQixtQ0FLRzs7SUFDSCx3Q0FBaUM7Ozs7O0lBRTZCLG1DQUF1Qjs7Ozs7O0FBd0Z2RixpQ0FLQzs7O0lBSkMsdUNBQWtCOztJQUNsQiw0Q0FBdUI7O0lBQ3ZCLHVDQUFtQjs7SUFDbkIsa0RBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7T3BlbkNWQ29uZmlnLCBPcGVuQ1ZTdGF0ZX0gZnJvbSAnLi4vUHVibGljTW9kZWxzJztcclxuXHJcbmV4cG9ydCBjb25zdCBPcGVuQ3ZDb25maWdUb2tlbiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxPcGVuQ1ZDb25maWc+KCdPcGVuQ1YgY29uZmlnIG9iamVjdCB0b2tlbicpO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4T3BlbkNWU2VydmljZSB7XHJcblxyXG4gIGN2U3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9wZW5DVlN0YXRlPih7XHJcbiAgICByZWFkeTogZmFsc2UsXHJcbiAgICBlcnJvcjogZmFsc2UsXHJcbiAgICBsb2FkaW5nOiB0cnVlLFxyXG4gICAgc3RhdGU6ICdsb2FkaW5nJ1xyXG4gIH0pO1xyXG4gIGNvbmZpZ01vZHVsZTogT3BlbkNWQ29uZmlnTW9kdWxlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE9wZW5DdkNvbmZpZ1Rva2VuKSBvcHRpb25zOiBPcGVuQ1ZDb25maWcsIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XHJcbiAgICBpZiAoIW9wdGlvbnMpIHtcclxuICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5jb25maWdNb2R1bGUgPSB0aGlzLmdlbmVyYXRlQ29uZmlnTW9kdWxlKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5sb2FkT3BlbkN2KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBsb2FkIHRoZSBPcGVuQ1Ygc2NyaXB0XHJcbiAgICovXHJcbiAgbG9hZE9wZW5DdigpIHtcclxuICAgIHRoaXMuY3ZTdGF0ZS5uZXh0KCB0aGlzLm5ld1N0YXRlKCdsb2FkaW5nJykpO1xyXG4gICAgLy8gY3JlYXRlIGdsb2JhbCBtb2R1bGUgdmFyaWFibGVcclxuICAgIHdpbmRvd1snTW9kdWxlJ10gPSB0aGlzLmNvbmZpZ01vZHVsZTtcclxuXHJcbiAgICAvLyBjcmVhdGUgc2NyaXB0IGVsZW1lbnQgYW5kIHNldCBhdHRyaWJ1dGVzXHJcbiAgICBjb25zdCBzY3JpcHQgPSA8SFRNTFNjcmlwdEVsZW1lbnQ+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnYXN5bmMnLCAnJyk7XHJcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xyXG5cclxuICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzXHJcbiAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgJyArIHRoaXMuY29uZmlnTW9kdWxlLnNjcmlwdFVybCk7XHJcbiAgICAgIHRoaXMuY3ZTdGF0ZS5uZXh0KHRoaXMubmV3U3RhdGUoJ2Vycm9yJykpO1xyXG4gICAgICB0aGlzLmN2U3RhdGUuZXJyb3IoZXJyKTtcclxuICAgIH0sIHtwYXNzaXZlOiB0cnVlfSk7XHJcblxyXG4gICAgLy8gc2V0IHNjcmlwdCB1cmxcclxuICAgIHNjcmlwdC5zcmMgPSB0aGlzLmNvbmZpZ01vZHVsZS5zY3JpcHRVcmw7XHJcbiAgICAvLyBpbnNlcnQgc2NyaXB0IGFzIGZpcnN0IHNjcmlwdCB0YWdcclxuICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XHJcbiAgICBpZiAobm9kZSkge1xyXG4gICAgICBub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgbm9kZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZW5lcmF0ZXMgYSBuZXcgc3RhdGUgb2JqZWN0XHJcbiAgICogQHBhcmFtIGNoYW5nZSAtIHRoZSBuZXcgc3RhdGUgb2YgdGhlIG1vZHVsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbmV3U3RhdGUoY2hhbmdlOiAnbG9hZGluZyd8J3JlYWR5J3wnZXJyb3InKTogT3BlbkNWU3RhdGUge1xyXG4gICAgY29uc3QgbmV3U3RhdGVPYmo6IE9wZW5DVlN0YXRlID0ge1xyXG4gICAgICByZWFkeTogZmFsc2UsXHJcbiAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICBlcnJvcjogZmFsc2UsXHJcbiAgICAgIHN0YXRlOiAnJ1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5rZXlzKG5ld1N0YXRlT2JqKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIGlmIChrZXkgIT09ICdzdGF0ZScpIHtcclxuICAgICAgICBpZiAoa2V5ID09PSBjaGFuZ2UpIHtcclxuICAgICAgICAgIG5ld1N0YXRlT2JqW2tleV0gPSB0cnVlO1xyXG4gICAgICAgICAgbmV3U3RhdGVPYmouc3RhdGUgPSBrZXk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld1N0YXRlT2JqW2tleV0gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG5ld1N0YXRlT2JqO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2VuZXJhdGVzIGEgY29uZmlnIG1vZHVsZSBmb3IgdGhlIGdsb2JhbCBNb2R1bGUgb2JqZWN0XHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBjb25maWd1cmF0aW9uIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGdlbmVyYXRlQ29uZmlnTW9kdWxlKG9wdGlvbnM6IE9wZW5DVkNvbmZpZyk6IE9wZW5DVkNvbmZpZ01vZHVsZSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzY3JpcHRVcmw6IG9wdGlvbnMub3BlbkNWRGlyUGF0aCA/IGAke29wdGlvbnMub3BlbkNWRGlyUGF0aH0vb3BlbmN2LmpzYCA6IGAvYXNzZXRzL29wZW5jdi9vcGVuY3YuanNgLFxyXG4gICAgICB3YXNtQmluYXJ5RmlsZTogJ29wZW5jdl9qcy53YXNtJyxcclxuICAgICAgdXNpbmdXYXNtOiB0cnVlLFxyXG4gICAgICBvblJ1bnRpbWVJbml0aWFsaXplZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ29wZW5DViBSZWFkeScpO1xyXG4gICAgICAgICAgdGhpcy5jdlN0YXRlLm5leHQodGhpcy5uZXdTdGF0ZSgncmVhZHknKSk7XHJcbiAgICAgICAgICBpZiAob3B0aW9ucy5ydW5Pbk9wZW5DVkluaXQpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5ydW5Pbk9wZW5DVkluaXQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBkZXNjcmliZXMgdGhlIGdsb2JhbCBNb2R1bGUgb2JqZWN0IHRoYXQgaXMgdXNlZCB0byBpbml0aWF0ZSBPcGVuQ1YuanNcclxuICovXHJcbmludGVyZmFjZSBPcGVuQ1ZDb25maWdNb2R1bGUge1xyXG4gIHNjcmlwdFVybDogc3RyaW5nO1xyXG4gIHdhc21CaW5hcnlGaWxlOiBzdHJpbmc7XHJcbiAgdXNpbmdXYXNtOiBib29sZWFuO1xyXG4gIG9uUnVudGltZUluaXRpYWxpemVkOiBGdW5jdGlvbjtcclxufVxyXG5cclxuXHJcbiJdfQ==