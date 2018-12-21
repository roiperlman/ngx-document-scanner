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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW9wZW4tY3Yuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVuY3YvIiwic291cmNlcyI6WyJsaWIvbmd4LW9wZW4tY3Yuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFHckMsTUFBTSxLQUFPLGlCQUFpQixHQUFHLElBQUksY0FBYyxDQUFlLDRCQUE0QixDQUFDO0FBRS9GO0lBYUUsMEJBQXVDLE9BQXFCLEVBQVUsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFSckYsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFjO1lBQ3pDLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsSUFBSTtZQUNiLEtBQUssRUFBRSxTQUFTO1NBQ2pCLENBQUMsQ0FBQztRQUlELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILHFDQUFVOzs7O0lBQVY7UUFBQSxpQkEwQkM7UUF6QkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzdDLGdDQUFnQztRQUNoQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7O1lBRy9CLE1BQU0sR0FBRyxtQkFBb0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMs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QWdCOzs7SUFFM0IsbUNBS0c7O0lBQ0gsd0NBQWlDOzs7OztJQUU2QixtQ0FBdUI7Ozs7OztBQXdGdkYsaUNBS0M7OztJQUpDLHVDQUFrQjs7SUFDbEIsNENBQXVCOztJQUN2Qix1Q0FBbUI7O0lBQ25CLGtEQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge09wZW5DVkNvbmZpZywgT3BlbkNWU3RhdGV9IGZyb20gJy4vbW9kZWxzJztcclxuXHJcbmV4cG9ydCBjb25zdCBPcGVuQ3ZDb25maWdUb2tlbiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxPcGVuQ1ZDb25maWc+KCdPcGVuQ1YgY29uZmlnIG9iamVjdCB0b2tlbicpO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4T3BlbkNWU2VydmljZSB7XHJcblxyXG4gIGN2U3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9wZW5DVlN0YXRlPih7XHJcbiAgICByZWFkeTogZmFsc2UsXHJcbiAgICBlcnJvcjogZmFsc2UsXHJcbiAgICBsb2FkaW5nOiB0cnVlLFxyXG4gICAgc3RhdGU6ICdsb2FkaW5nJ1xyXG4gIH0pO1xyXG4gIGNvbmZpZ01vZHVsZTogT3BlbkN2Q29uZmlnTW9kdWxlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE9wZW5DdkNvbmZpZ1Rva2VuKSBvcHRpb25zOiBPcGVuQ1ZDb25maWcsIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XHJcbiAgICBpZiAoIW9wdGlvbnMpIHtcclxuICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5jb25maWdNb2R1bGUgPSB0aGlzLmdlbmVyYXRlQ29uZmlnTW9kdWxlKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5sb2FkT3BlbkN2KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBsb2FkIHRoZSBPcGVuQ1Ygc2NyaXB0XHJcbiAgICovXHJcbiAgbG9hZE9wZW5DdigpIHtcclxuICAgIHRoaXMuY3ZTdGF0ZS5uZXh0KCB0aGlzLm5ld1N0YXRlKCdsb2FkaW5nJykpO1xyXG4gICAgLy8gY3JlYXRlIGdsb2JhbCBtb2R1bGUgdmFyaWFibGVcclxuICAgIHdpbmRvd1snTW9kdWxlJ10gPSB0aGlzLmNvbmZpZ01vZHVsZTtcclxuXHJcbiAgICAvLyBjcmVhdGUgc2NyaXB0IGVsZW1lbnQgYW5kIHNldCBhdHRyaWJ1dGVzXHJcbiAgICBjb25zdCBzY3JpcHQgPSA8SFRNTFNjcmlwdEVsZW1lbnQ+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnYXN5bmMnLCAnJyk7XHJcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xyXG5cclxuICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzXHJcbiAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgJyArIHRoaXMuY29uZmlnTW9kdWxlLnNjcmlwdFVybCk7XHJcbiAgICAgIHRoaXMuY3ZTdGF0ZS5uZXh0KHRoaXMubmV3U3RhdGUoJ2Vycm9yJykpO1xyXG4gICAgICB0aGlzLmN2U3RhdGUuZXJyb3IoZXJyKTtcclxuICAgIH0sIHtwYXNzaXZlOiB0cnVlfSk7XHJcblxyXG4gICAgLy8gc2V0IHNjcmlwdCB1cmxcclxuICAgIHNjcmlwdC5zcmMgPSB0aGlzLmNvbmZpZ01vZHVsZS5zY3JpcHRVcmw7XHJcbiAgICAvLyBpbnNlcnQgc2NyaXB0IGFzIGZpcnN0IHNjcmlwdCB0YWdcclxuICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XHJcbiAgICBpZiAobm9kZSkge1xyXG4gICAgICBub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgbm9kZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZW5lcmF0ZXMgYSBuZXcgc3RhdGUgb2JqZWN0XHJcbiAgICogQHBhcmFtIGNoYW5nZSAtIHRoZSBuZXcgc3RhdGUgb2YgdGhlIG1vZHVsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbmV3U3RhdGUoY2hhbmdlOiAnbG9hZGluZyd8J3JlYWR5J3wnZXJyb3InKTogT3BlbkNWU3RhdGUge1xyXG4gICAgY29uc3QgbmV3U3RhdGVPYmo6IE9wZW5DVlN0YXRlID0ge1xyXG4gICAgICByZWFkeTogZmFsc2UsXHJcbiAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICBlcnJvcjogZmFsc2UsXHJcbiAgICAgIHN0YXRlOiAnJ1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5rZXlzKG5ld1N0YXRlT2JqKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIGlmIChrZXkgIT09ICdzdGF0ZScpIHtcclxuICAgICAgICBpZiAoa2V5ID09PSBjaGFuZ2UpIHtcclxuICAgICAgICAgIG5ld1N0YXRlT2JqW2tleV0gPSB0cnVlO1xyXG4gICAgICAgICAgbmV3U3RhdGVPYmouc3RhdGUgPSBrZXk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld1N0YXRlT2JqW2tleV0gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG5ld1N0YXRlT2JqO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2VuZXJhdGVzIGEgY29uZmlnIG1vZHVsZSBmb3IgdGhlIGdsb2JhbCBNb2R1bGUgb2JqZWN0XHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBjb25maWd1cmF0aW9uIG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGdlbmVyYXRlQ29uZmlnTW9kdWxlKG9wdGlvbnM6IE9wZW5DVkNvbmZpZyk6IE9wZW5DdkNvbmZpZ01vZHVsZSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzY3JpcHRVcmw6IG9wdGlvbnMub3BlbkNWRGlyUGF0aCA/IGAke29wdGlvbnMub3BlbkNWRGlyUGF0aH0vb3BlbmN2LmpzYCA6IGAvYXNzZXRzL29wZW5jdi9vcGVuY3YuanNgLFxyXG4gICAgICB3YXNtQmluYXJ5RmlsZTogJ29wZW5jdl9qcy53YXNtJyxcclxuICAgICAgdXNpbmdXYXNtOiB0cnVlLFxyXG4gICAgICBvblJ1bnRpbWVJbml0aWFsaXplZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ29wZW5DViBSZWFkeScpO1xyXG4gICAgICAgICAgdGhpcy5jdlN0YXRlLm5leHQodGhpcy5uZXdTdGF0ZSgncmVhZHknKSk7XHJcbiAgICAgICAgICBpZiAob3B0aW9ucy5ydW5Pbk9wZW5DVkluaXQpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5ydW5Pbk9wZW5DVkluaXQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBkZXNjcmliZXMgdGhlIGdsb2JhbCBNb2R1bGUgb2JqZWN0IHRoYXQgaXMgdXNlZCB0byBpbml0aWF0ZSBPcGVuQ1YuanNcclxuICovXHJcbmludGVyZmFjZSBPcGVuQ3ZDb25maWdNb2R1bGUge1xyXG4gIHNjcmlwdFVybDogc3RyaW5nO1xyXG4gIHdhc21CaW5hcnlGaWxlOiBzdHJpbmc7XHJcbiAgdXNpbmdXYXNtOiBib29sZWFuO1xyXG4gIG9uUnVudGltZUluaXRpYWxpemVkOiBGdW5jdGlvbjtcclxufVxyXG5cclxuIl19