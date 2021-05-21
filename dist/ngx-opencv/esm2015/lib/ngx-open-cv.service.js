/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-open-cv.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
/** @type {?} */
export const OpenCvConfigToken = new InjectionToken('OpenCV config object token');
export class NgxOpenCVService {
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
        script.addEventListener('error', (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const err = new Error('Failed to load ' + this.configModule.scriptUrl);
            this.cvState.next(this.newState('error'));
            this.cvState.error(err);
        }), { passive: true });
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
        Object.keys(newStateObj).forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
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
            onRuntimeInitialized: (/**
             * @return {?}
             */
            () => {
                this._ngZone.run((/**
                 * @return {?}
                 */
                () => {
                    console.log('openCV Ready');
                    this.cvState.next(this.newState('ready'));
                    if (options.runOnOpenCVInit) {
                        options.runOnOpenCVInit();
                    }
                }));
            })
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
/** @nocollapse */ NgxOpenCVService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxOpenCVService_Factory() { return new NgxOpenCVService(i0.ɵɵinject(OpenCvConfigToken), i0.ɵɵinject(i0.NgZone)); }, token: NgxOpenCVService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW9wZW4tY3Yuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVuY3YvIiwic291cmNlcyI6WyJsaWIvbmd4LW9wZW4tY3Yuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7O0FBR3JDLE1BQU0sT0FBTyxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBZSw0QkFBNEIsQ0FBQztBQUsvRixNQUFNLE9BQU8sZ0JBQWdCOzs7OztJQVUzQixZQUF1QyxPQUFxQixFQUFVLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBUnJGLFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBYztZQUN6QyxLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLElBQUk7WUFDYixLQUFLLEVBQUUsU0FBUztTQUNqQixDQUFDLENBQUM7UUFJRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBS0QsVUFBVTtRQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM3QyxnQ0FBZ0M7UUFDaEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7OztjQUcvQixNQUFNLEdBQUcsbUJBQW9CLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUE7UUFDbkUs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d0Z2RixpQ0FLQzs7O0lBSkMsdUNBQWtCOztJQUNsQiw0Q0FBdUI7O0lBQ3ZCLHVDQUFtQjs7SUFDbkIsa0RBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtPcGVuQ1ZDb25maWcsIE9wZW5DVlN0YXRlfSBmcm9tICcuL21vZGVscyc7XG5cbmV4cG9ydCBjb25zdCBPcGVuQ3ZDb25maWdUb2tlbiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxPcGVuQ1ZDb25maWc+KCdPcGVuQ1YgY29uZmlnIG9iamVjdCB0b2tlbicpO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hPcGVuQ1ZTZXJ2aWNlIHtcblxuICBjdlN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxPcGVuQ1ZTdGF0ZT4oe1xuICAgIHJlYWR5OiBmYWxzZSxcbiAgICBlcnJvcjogZmFsc2UsXG4gICAgbG9hZGluZzogdHJ1ZSxcbiAgICBzdGF0ZTogJ2xvYWRpbmcnXG4gIH0pO1xuICBjb25maWdNb2R1bGU6IE9wZW5DdkNvbmZpZ01vZHVsZTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE9wZW5DdkNvbmZpZ1Rva2VuKSBvcHRpb25zOiBPcGVuQ1ZDb25maWcsIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIHRoaXMuY29uZmlnTW9kdWxlID0gdGhpcy5nZW5lcmF0ZUNvbmZpZ01vZHVsZShvcHRpb25zKTtcbiAgICB0aGlzLmxvYWRPcGVuQ3YoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBsb2FkIHRoZSBPcGVuQ1Ygc2NyaXB0XG4gICAqL1xuICBsb2FkT3BlbkN2KCkge1xuICAgIHRoaXMuY3ZTdGF0ZS5uZXh0KCB0aGlzLm5ld1N0YXRlKCdsb2FkaW5nJykpO1xuICAgIC8vIGNyZWF0ZSBnbG9iYWwgbW9kdWxlIHZhcmlhYmxlXG4gICAgd2luZG93WydNb2R1bGUnXSA9IHRoaXMuY29uZmlnTW9kdWxlO1xuXG4gICAgLy8gY3JlYXRlIHNjcmlwdCBlbGVtZW50IGFuZCBzZXQgYXR0cmlidXRlc1xuICAgIGNvbnN0IHNjcmlwdCA9IDxIVE1MU2NyaXB0RWxlbWVudD4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnYXN5bmMnLCAnJyk7XG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2phdmFzY3JpcHQnKTtcblxuICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzXG4gICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKCdGYWlsZWQgdG8gbG9hZCAnICsgdGhpcy5jb25maWdNb2R1bGUuc2NyaXB0VXJsKTtcbiAgICAgIHRoaXMuY3ZTdGF0ZS5uZXh0KHRoaXMubmV3U3RhdGUoJ2Vycm9yJykpO1xuICAgICAgdGhpcy5jdlN0YXRlLmVycm9yKGVycik7XG4gICAgfSwge3Bhc3NpdmU6IHRydWV9KTtcblxuICAgIC8vIHNldCBzY3JpcHQgdXJsXG4gICAgc2NyaXB0LnNyYyA9IHRoaXMuY29uZmlnTW9kdWxlLnNjcmlwdFVybDtcbiAgICAvLyBpbnNlcnQgc2NyaXB0IGFzIGZpcnN0IHNjcmlwdCB0YWdcbiAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgIGlmIChub2RlKSB7XG4gICAgICBub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgbm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZ2VuZXJhdGVzIGEgbmV3IHN0YXRlIG9iamVjdFxuICAgKiBAcGFyYW0gY2hhbmdlIC0gdGhlIG5ldyBzdGF0ZSBvZiB0aGUgbW9kdWxlXG4gICAqL1xuICBwcml2YXRlIG5ld1N0YXRlKGNoYW5nZTogJ2xvYWRpbmcnfCdyZWFkeSd8J2Vycm9yJyk6IE9wZW5DVlN0YXRlIHtcbiAgICBjb25zdCBuZXdTdGF0ZU9iajogT3BlbkNWU3RhdGUgPSB7XG4gICAgICByZWFkeTogZmFsc2UsXG4gICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgIHN0YXRlOiAnJ1xuICAgIH07XG4gICAgT2JqZWN0LmtleXMobmV3U3RhdGVPYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChrZXkgIT09ICdzdGF0ZScpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gY2hhbmdlKSB7XG4gICAgICAgICAgbmV3U3RhdGVPYmpba2V5XSA9IHRydWU7XG4gICAgICAgICAgbmV3U3RhdGVPYmouc3RhdGUgPSBrZXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3U3RhdGVPYmpba2V5XSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ld1N0YXRlT2JqO1xuICB9XG5cbiAgLyoqXG4gICAqIGdlbmVyYXRlcyBhIGNvbmZpZyBtb2R1bGUgZm9yIHRoZSBnbG9iYWwgTW9kdWxlIG9iamVjdFxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBnZW5lcmF0ZUNvbmZpZ01vZHVsZShvcHRpb25zOiBPcGVuQ1ZDb25maWcpOiBPcGVuQ3ZDb25maWdNb2R1bGUge1xuICAgIHJldHVybiB7XG4gICAgICBzY3JpcHRVcmw6IG9wdGlvbnMub3BlbkNWRGlyUGF0aCA/IGAke29wdGlvbnMub3BlbkNWRGlyUGF0aH0vb3BlbmN2LmpzYCA6IGAvYXNzZXRzL29wZW5jdi9vcGVuY3YuanNgLFxuICAgICAgd2FzbUJpbmFyeUZpbGU6ICdvcGVuY3ZfanMud2FzbScsXG4gICAgICB1c2luZ1dhc206IHRydWUsXG4gICAgICBvblJ1bnRpbWVJbml0aWFsaXplZDogKCkgPT4ge1xuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnb3BlbkNWIFJlYWR5Jyk7XG4gICAgICAgICAgdGhpcy5jdlN0YXRlLm5leHQodGhpcy5uZXdTdGF0ZSgncmVhZHknKSk7XG4gICAgICAgICAgaWYgKG9wdGlvbnMucnVuT25PcGVuQ1ZJbml0KSB7XG4gICAgICAgICAgICBvcHRpb25zLnJ1bk9uT3BlbkNWSW5pdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIGRlc2NyaWJlcyB0aGUgZ2xvYmFsIE1vZHVsZSBvYmplY3QgdGhhdCBpcyB1c2VkIHRvIGluaXRpYXRlIE9wZW5DVi5qc1xuICovXG5pbnRlcmZhY2UgT3BlbkN2Q29uZmlnTW9kdWxlIHtcbiAgc2NyaXB0VXJsOiBzdHJpbmc7XG4gIHdhc21CaW5hcnlGaWxlOiBzdHJpbmc7XG4gIHVzaW5nV2FzbTogYm9vbGVhbjtcbiAgb25SdW50aW1lSW5pdGlhbGl6ZWQ6IEZ1bmN0aW9uO1xufVxuXG4iXX0=