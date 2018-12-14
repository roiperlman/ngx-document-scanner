/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
/** @type {?} */
export var OpenCvConfigToken = new InjectionToken('OpenCV config object token');
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
            scriptUrl: options.openCvDirPath ? options.openCvDirPath + "/opencv.js" : "/assets/opencv/opencv.js",
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
    /** @nocollapse */ NgxOpenCvService.ngInjectableDef = i0.defineInjectable({ factory: function NgxOpenCvService_Factory() { return new NgxOpenCvService(i0.inject(OpenCvConfigToken), i0.inject(i0.NgZone)); }, token: NgxOpenCvService, providedIn: "root" });
    return NgxOpenCvService;
}());
export { NgxOpenCvService };
if (false) {
    /** @type {?} */
    NgxOpenCvService.prototype.cvState;
    /** @type {?} */
    NgxOpenCvService.prototype.configModule;
    /**
     * @type {?}
     * @private
     */
    NgxOpenCvService.prototype._ngZone;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW9wZW4tY3Yuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kb2N1bWVudC1zY2FubmVyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25neC1vcGVuLWN2LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7O0FBR3JDLE1BQU0sS0FBTyxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBZSw0QkFBNEIsQ0FBQztBQUUvRjtJQWFFLDBCQUF1QyxPQUFxQixFQUFVLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBUnJGLFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBYztZQUN6QyxLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLElBQUk7WUFDYixLQUFLLEVBQUUsU0FBUztTQUNqQixDQUFDLENBQUM7UUFJRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxxQ0FBVTs7OztJQUFWO1FBQUEsaUJBMEJDO1FBekJDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM3QyxnQ0FBZ0M7UUFDaEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7OztZQUcvQixNQUFNLEdBQUcsbUJBQW9CLFFBQVEsQ0FBQyxh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aEdELElBZ0dDO1NBN0ZZLGdCQUFnQjs7O0lBRTNCLG1DQUtHOztJQUNILHdDQUFpQzs7Ozs7SUFFNkIsbUNBQXVCOzs7Ozs7QUF3RnZGLGlDQUtDOzs7SUFKQyx1Q0FBa0I7O0lBQ2xCLDRDQUF1Qjs7SUFDdkIsdUNBQW1COztJQUNuQixrREFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge09wZW5DdkNvbmZpZywgT3BlbkN2U3RhdGV9IGZyb20gJy4uL1B1YmxpY01vZGVscyc7XG5cbmV4cG9ydCBjb25zdCBPcGVuQ3ZDb25maWdUb2tlbiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxPcGVuQ3ZDb25maWc+KCdPcGVuQ1YgY29uZmlnIG9iamVjdCB0b2tlbicpO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hPcGVuQ3ZTZXJ2aWNlIHtcblxuICBjdlN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxPcGVuQ3ZTdGF0ZT4oe1xuICAgIHJlYWR5OiBmYWxzZSxcbiAgICBlcnJvcjogZmFsc2UsXG4gICAgbG9hZGluZzogdHJ1ZSxcbiAgICBzdGF0ZTogJ2xvYWRpbmcnXG4gIH0pO1xuICBjb25maWdNb2R1bGU6IE9wZW5DdkNvbmZpZ01vZHVsZTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE9wZW5DdkNvbmZpZ1Rva2VuKSBvcHRpb25zOiBPcGVuQ3ZDb25maWcsIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHRoaXMuY29uZmlnTW9kdWxlID0gdGhpcy5nZW5lcmF0ZUNvbmZpZ01vZHVsZShvcHRpb25zKTtcbiAgICB0aGlzLmxvYWRPcGVuQ3YoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBsb2FkIHRoZSBPcGVuQ1Ygc2NyaXB0XG4gICAqL1xuICBsb2FkT3BlbkN2KCkge1xuICAgIHRoaXMuY3ZTdGF0ZS5uZXh0KCB0aGlzLm5ld1N0YXRlKCdsb2FkaW5nJykpO1xuICAgIC8vIGNyZWF0ZSBnbG9iYWwgbW9kdWxlIHZhcmlhYmxlXG4gICAgd2luZG93WydNb2R1bGUnXSA9IHRoaXMuY29uZmlnTW9kdWxlO1xuXG4gICAgLy8gY3JlYXRlIHNjcmlwdCBlbGVtZW50IGFuZCBzZXQgYXR0cmlidXRlc1xuICAgIGNvbnN0IHNjcmlwdCA9IDxIVE1MU2NyaXB0RWxlbWVudD4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnYXN5bmMnLCAnJyk7XG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2phdmFzY3JpcHQnKTtcblxuICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzXG4gICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKCdGYWlsZWQgdG8gbG9hZCAnICsgdGhpcy5jb25maWdNb2R1bGUuc2NyaXB0VXJsKTtcbiAgICAgIHRoaXMuY3ZTdGF0ZS5uZXh0KHRoaXMubmV3U3RhdGUoJ2Vycm9yJykpO1xuICAgICAgdGhpcy5jdlN0YXRlLmVycm9yKGVycik7XG4gICAgfSwge3Bhc3NpdmU6IHRydWV9KTtcblxuICAgIC8vIHNldCBzY3JpcHQgdXJsXG4gICAgc2NyaXB0LnNyYyA9IHRoaXMuY29uZmlnTW9kdWxlLnNjcmlwdFVybDtcbiAgICAvLyBpbnNlcnQgc2NyaXB0IGFzIGZpcnN0IHNjcmlwdCB0YWdcbiAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgIGlmIChub2RlKSB7XG4gICAgICBub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgbm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZ2VuZXJhdGVzIGEgbmV3IHN0YXRlIG9iamVjdFxuICAgKiBAcGFyYW0gY2hhbmdlIC0gdGhlIG5ldyBzdGF0ZSBvZiB0aGUgbW9kdWxlXG4gICAqL1xuICBwcml2YXRlIG5ld1N0YXRlKGNoYW5nZTogJ2xvYWRpbmcnfCdyZWFkeSd8J2Vycm9yJyk6IE9wZW5DdlN0YXRlIHtcbiAgICBjb25zdCBuZXdTdGF0ZU9iajogT3BlbkN2U3RhdGUgPSB7XG4gICAgICByZWFkeTogZmFsc2UsXG4gICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgIHN0YXRlOiAnJ1xuICAgIH07XG4gICAgT2JqZWN0LmtleXMobmV3U3RhdGVPYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChrZXkgIT09ICdzdGF0ZScpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gY2hhbmdlKSB7XG4gICAgICAgICAgbmV3U3RhdGVPYmpba2V5XSA9IHRydWU7XG4gICAgICAgICAgbmV3U3RhdGVPYmouc3RhdGUgPSBrZXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3U3RhdGVPYmpba2V5XSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ld1N0YXRlT2JqO1xuICB9XG5cbiAgLyoqXG4gICAqIGdlbmVyYXRlcyBhIGNvbmZpZyBtb2R1bGUgZm9yIHRoZSBnbG9iYWwgTW9kdWxlIG9iamVjdFxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBnZW5lcmF0ZUNvbmZpZ01vZHVsZShvcHRpb25zOiBPcGVuQ3ZDb25maWcpOiBPcGVuQ3ZDb25maWdNb2R1bGUge1xuICAgIHJldHVybiB7XG4gICAgICBzY3JpcHRVcmw6IG9wdGlvbnMub3BlbkN2RGlyUGF0aCA/IGAke29wdGlvbnMub3BlbkN2RGlyUGF0aH0vb3BlbmN2LmpzYCA6IGAvYXNzZXRzL29wZW5jdi9vcGVuY3YuanNgLFxuICAgICAgd2FzbUJpbmFyeUZpbGU6ICdvcGVuY3ZfanMud2FzbScsXG4gICAgICB1c2luZ1dhc206IHRydWUsXG4gICAgICBvblJ1bnRpbWVJbml0aWFsaXplZDogKCkgPT4ge1xuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnb3BlbkNWIFJlYWR5Jyk7XG4gICAgICAgICAgdGhpcy5jdlN0YXRlLm5leHQodGhpcy5uZXdTdGF0ZSgncmVhZHknKSk7XG4gICAgICAgICAgaWYgKG9wdGlvbnMucnVuT25PcGVuQ1ZJbml0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnJ1bk9uT3BlbkNWSW5pdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIGRlc2NyaWJlcyB0aGUgZ2xvYmFsIE1vZHVsZSBvYmplY3QgdGhhdCBpcyB1c2VkIHRvIGluaXRpYXRlIE9wZW5DVi5qc1xuICovXG5pbnRlcmZhY2UgT3BlbkN2Q29uZmlnTW9kdWxlIHtcbiAgc2NyaXB0VXJsOiBzdHJpbmc7XG4gIHdhc21CaW5hcnlGaWxlOiBzdHJpbmc7XG4gIHVzaW5nV2FzbTogYm9vbGVhbjtcbiAgb25SdW50aW1lSW5pdGlhbGl6ZWQ6IEZ1bmN0aW9uO1xufVxuXG4iXX0=