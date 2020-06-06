/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-open-cv.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    /** @nocollapse */ NgxOpenCVService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxOpenCVService_Factory() { return new NgxOpenCVService(i0.ɵɵinject(OpenCvConfigToken), i0.ɵɵinject(i0.NgZone)); }, token: NgxOpenCVService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW9wZW4tY3Yuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVuY3YvIiwic291cmNlcyI6WyJsaWIvbmd4LW9wZW4tY3Yuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7O0FBR3JDLE1BQU0sS0FBTyxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBZSw0QkFBNEIsQ0FBQztBQUUvRjtJQWFFLDBCQUF1QyxPQUFxQixFQUFVLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBUnJGLFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBYztZQUN6QyxLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLElBQUk7WUFDYixLQUFLLEVBQUUsU0FBUztTQUNqQixDQUFDLENBQUM7UUFJRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxxQ0FBVTs7OztJQUFWO1FBQUEsaUJBMEJDO1FBekJDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM3QyxnQ0FBZ0M7UUFDaEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7OztZQUcvQixNQUFNLEdBQUcsbUJBQW9CLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFD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LElBZ0dDO1NBN0ZZLGdCQUFnQjs7O0lBRTNCLG1DQUtHOztJQUNILHdDQUFpQzs7Ozs7SUFFNkIsbUNBQXVCOzs7Ozs7QUF3RnZGLGlDQUtDOzs7SUFKQyx1Q0FBa0I7O0lBQ2xCLDRDQUF1Qjs7SUFDdkIsdUNBQW1COztJQUNuQixrREFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge09wZW5DVkNvbmZpZywgT3BlbkNWU3RhdGV9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGNvbnN0IE9wZW5DdkNvbmZpZ1Rva2VuID0gbmV3IEluamVjdGlvblRva2VuPE9wZW5DVkNvbmZpZz4oJ09wZW5DViBjb25maWcgb2JqZWN0IHRva2VuJyk7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neE9wZW5DVlNlcnZpY2Uge1xuXG4gIGN2U3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9wZW5DVlN0YXRlPih7XG4gICAgcmVhZHk6IGZhbHNlLFxuICAgIGVycm9yOiBmYWxzZSxcbiAgICBsb2FkaW5nOiB0cnVlLFxuICAgIHN0YXRlOiAnbG9hZGluZydcbiAgfSk7XG4gIGNvbmZpZ01vZHVsZTogT3BlbkN2Q29uZmlnTW9kdWxlO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoT3BlbkN2Q29uZmlnVG9rZW4pIG9wdGlvbnM6IE9wZW5DVkNvbmZpZywgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5jb25maWdNb2R1bGUgPSB0aGlzLmdlbmVyYXRlQ29uZmlnTW9kdWxlKG9wdGlvbnMpO1xuICAgIHRoaXMubG9hZE9wZW5DdigpO1xuICB9XG5cbiAgLyoqXG4gICAqIGxvYWQgdGhlIE9wZW5DViBzY3JpcHRcbiAgICovXG4gIGxvYWRPcGVuQ3YoKSB7XG4gICAgdGhpcy5jdlN0YXRlLm5leHQoIHRoaXMubmV3U3RhdGUoJ2xvYWRpbmcnKSk7XG4gICAgLy8gY3JlYXRlIGdsb2JhbCBtb2R1bGUgdmFyaWFibGVcbiAgICB3aW5kb3dbJ01vZHVsZSddID0gdGhpcy5jb25maWdNb2R1bGU7XG5cbiAgICAvLyBjcmVhdGUgc2NyaXB0IGVsZW1lbnQgYW5kIHNldCBhdHRyaWJ1dGVzXG4gICAgY29uc3Qgc2NyaXB0ID0gPEhUTUxTY3JpcHRFbGVtZW50PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdhc3luYycsICcnKTtcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xuXG4gICAgLy8gbGlzdGVuIGZvciBlcnJvcnNcbiAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XG4gICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkICcgKyB0aGlzLmNvbmZpZ01vZHVsZS5zY3JpcHRVcmwpO1xuICAgICAgdGhpcy5jdlN0YXRlLm5leHQodGhpcy5uZXdTdGF0ZSgnZXJyb3InKSk7XG4gICAgICB0aGlzLmN2U3RhdGUuZXJyb3IoZXJyKTtcbiAgICB9LCB7cGFzc2l2ZTogdHJ1ZX0pO1xuXG4gICAgLy8gc2V0IHNjcmlwdCB1cmxcbiAgICBzY3JpcHQuc3JjID0gdGhpcy5jb25maWdNb2R1bGUuc2NyaXB0VXJsO1xuICAgIC8vIGluc2VydCBzY3JpcHQgYXMgZmlyc3Qgc2NyaXB0IHRhZ1xuICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIG5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LCBub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBnZW5lcmF0ZXMgYSBuZXcgc3RhdGUgb2JqZWN0XG4gICAqIEBwYXJhbSBjaGFuZ2UgLSB0aGUgbmV3IHN0YXRlIG9mIHRoZSBtb2R1bGVcbiAgICovXG4gIHByaXZhdGUgbmV3U3RhdGUoY2hhbmdlOiAnbG9hZGluZyd8J3JlYWR5J3wnZXJyb3InKTogT3BlbkNWU3RhdGUge1xuICAgIGNvbnN0IG5ld1N0YXRlT2JqOiBPcGVuQ1ZTdGF0ZSA9IHtcbiAgICAgIHJlYWR5OiBmYWxzZSxcbiAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgZXJyb3I6IGZhbHNlLFxuICAgICAgc3RhdGU6ICcnXG4gICAgfTtcbiAgICBPYmplY3Qua2V5cyhuZXdTdGF0ZU9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKGtleSAhPT0gJ3N0YXRlJykge1xuICAgICAgICBpZiAoa2V5ID09PSBjaGFuZ2UpIHtcbiAgICAgICAgICBuZXdTdGF0ZU9ialtrZXldID0gdHJ1ZTtcbiAgICAgICAgICBuZXdTdGF0ZU9iai5zdGF0ZSA9IGtleTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdTdGF0ZU9ialtrZXldID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbmV3U3RhdGVPYmo7XG4gIH1cblxuICAvKipcbiAgICogZ2VuZXJhdGVzIGEgY29uZmlnIG1vZHVsZSBmb3IgdGhlIGdsb2JhbCBNb2R1bGUgb2JqZWN0XG4gICAqIEBwYXJhbSBvcHRpb25zIC0gY29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAqL1xuICBwcml2YXRlIGdlbmVyYXRlQ29uZmlnTW9kdWxlKG9wdGlvbnM6IE9wZW5DVkNvbmZpZyk6IE9wZW5DdkNvbmZpZ01vZHVsZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNjcmlwdFVybDogb3B0aW9ucy5vcGVuQ1ZEaXJQYXRoID8gYCR7b3B0aW9ucy5vcGVuQ1ZEaXJQYXRofS9vcGVuY3YuanNgIDogYC9hc3NldHMvb3BlbmN2L29wZW5jdi5qc2AsXG4gICAgICB3YXNtQmluYXJ5RmlsZTogJ29wZW5jdl9qcy53YXNtJyxcbiAgICAgIHVzaW5nV2FzbTogdHJ1ZSxcbiAgICAgIG9uUnVudGltZUluaXRpYWxpemVkOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdvcGVuQ1YgUmVhZHknKTtcbiAgICAgICAgICB0aGlzLmN2U3RhdGUubmV4dCh0aGlzLm5ld1N0YXRlKCdyZWFkeScpKTtcbiAgICAgICAgICBpZiAob3B0aW9ucy5ydW5Pbk9wZW5DVkluaXQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucnVuT25PcGVuQ1ZJbml0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogZGVzY3JpYmVzIHRoZSBnbG9iYWwgTW9kdWxlIG9iamVjdCB0aGF0IGlzIHVzZWQgdG8gaW5pdGlhdGUgT3BlbkNWLmpzXG4gKi9cbmludGVyZmFjZSBPcGVuQ3ZDb25maWdNb2R1bGUge1xuICBzY3JpcHRVcmw6IHN0cmluZztcbiAgd2FzbUJpbmFyeUZpbGU6IHN0cmluZztcbiAgdXNpbmdXYXNtOiBib29sZWFuO1xuICBvblJ1bnRpbWVJbml0aWFsaXplZDogRnVuY3Rpb247XG59XG5cbiJdfQ==