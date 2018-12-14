/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
/** @type {?} */
export const OpenCvConfigToken = new InjectionToken('OpenCV config object token');
export class NgxOpenCvService {
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
            scriptUrl: options.openCvDirPath ? `${options.openCvDirPath}/opencv.js` : `/assets/opencv/opencv.js`,
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
NgxOpenCvService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxOpenCvService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [OpenCvConfigToken,] }] },
    { type: NgZone }
];
/** @nocollapse */ NgxOpenCvService.ngInjectableDef = i0.defineInjectable({ factory: function NgxOpenCvService_Factory() { return new NgxOpenCvService(i0.inject(OpenCvConfigToken), i0.inject(i0.NgZone)); }, token: NgxOpenCvService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW9wZW4tY3Yuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kb2N1bWVudC1zY2FubmVyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25neC1vcGVuLWN2LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7O0FBR3JDLE1BQU0sT0FBTyxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBZSw0QkFBNEIsQ0FBQztBQUsvRixNQUFNLE9BQU8sZ0JBQWdCOzs7OztJQVUzQixZQUF1QyxPQUFxQixFQUFVLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBUnJGLFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBYztZQUN6QyxLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLElBQUk7WUFDYixLQUFLLEVBQUUsU0FBUztTQUNqQixDQUFDLENBQUM7UUFJRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBS0QsVUFBVTtRQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM3QyxnQ0FBZ0M7UUFDaEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7OztjQUcvQixNQUFNLEdBQUcsbUJBQW9CLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFB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O0FBd0Z2RixpQ0FLQzs7O0lBSkMsdUNBQWtCOztJQUNsQiw0Q0FBdUI7O0lBQ3ZCLHVDQUFtQjs7SUFDbkIsa0RBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtPcGVuQ3ZDb25maWcsIE9wZW5DdlN0YXRlfSBmcm9tICcuLi9QdWJsaWNNb2RlbHMnO1xuXG5leHBvcnQgY29uc3QgT3BlbkN2Q29uZmlnVG9rZW4gPSBuZXcgSW5qZWN0aW9uVG9rZW48T3BlbkN2Q29uZmlnPignT3BlbkNWIGNvbmZpZyBvYmplY3QgdG9rZW4nKTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4T3BlbkN2U2VydmljZSB7XG5cbiAgY3ZTdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8T3BlbkN2U3RhdGU+KHtcbiAgICByZWFkeTogZmFsc2UsXG4gICAgZXJyb3I6IGZhbHNlLFxuICAgIGxvYWRpbmc6IHRydWUsXG4gICAgc3RhdGU6ICdsb2FkaW5nJ1xuICB9KTtcbiAgY29uZmlnTW9kdWxlOiBPcGVuQ3ZDb25maWdNb2R1bGU7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChPcGVuQ3ZDb25maWdUb2tlbikgb3B0aW9uczogT3BlbkN2Q29uZmlnLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICB0aGlzLmNvbmZpZ01vZHVsZSA9IHRoaXMuZ2VuZXJhdGVDb25maWdNb2R1bGUob3B0aW9ucyk7XG4gICAgdGhpcy5sb2FkT3BlbkN2KCk7XG4gIH1cblxuICAvKipcbiAgICogbG9hZCB0aGUgT3BlbkNWIHNjcmlwdFxuICAgKi9cbiAgbG9hZE9wZW5DdigpIHtcbiAgICB0aGlzLmN2U3RhdGUubmV4dCggdGhpcy5uZXdTdGF0ZSgnbG9hZGluZycpKTtcbiAgICAvLyBjcmVhdGUgZ2xvYmFsIG1vZHVsZSB2YXJpYWJsZVxuICAgIHdpbmRvd1snTW9kdWxlJ10gPSB0aGlzLmNvbmZpZ01vZHVsZTtcblxuICAgIC8vIGNyZWF0ZSBzY3JpcHQgZWxlbWVudCBhbmQgc2V0IGF0dHJpYnV0ZXNcbiAgICBjb25zdCBzY3JpcHQgPSA8SFRNTFNjcmlwdEVsZW1lbnQ+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2FzeW5jJywgJycpO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9qYXZhc2NyaXB0Jyk7XG5cbiAgICAvLyBsaXN0ZW4gZm9yIGVycm9yc1xuICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcbiAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgJyArIHRoaXMuY29uZmlnTW9kdWxlLnNjcmlwdFVybCk7XG4gICAgICB0aGlzLmN2U3RhdGUubmV4dCh0aGlzLm5ld1N0YXRlKCdlcnJvcicpKTtcbiAgICAgIHRoaXMuY3ZTdGF0ZS5lcnJvcihlcnIpO1xuICAgIH0sIHtwYXNzaXZlOiB0cnVlfSk7XG5cbiAgICAvLyBzZXQgc2NyaXB0IHVybFxuICAgIHNjcmlwdC5zcmMgPSB0aGlzLmNvbmZpZ01vZHVsZS5zY3JpcHRVcmw7XG4gICAgLy8gaW5zZXJ0IHNjcmlwdCBhcyBmaXJzdCBzY3JpcHQgdGFnXG4gICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgICBpZiAobm9kZSkge1xuICAgICAgbm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzY3JpcHQsIG5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGdlbmVyYXRlcyBhIG5ldyBzdGF0ZSBvYmplY3RcbiAgICogQHBhcmFtIGNoYW5nZSAtIHRoZSBuZXcgc3RhdGUgb2YgdGhlIG1vZHVsZVxuICAgKi9cbiAgcHJpdmF0ZSBuZXdTdGF0ZShjaGFuZ2U6ICdsb2FkaW5nJ3wncmVhZHknfCdlcnJvcicpOiBPcGVuQ3ZTdGF0ZSB7XG4gICAgY29uc3QgbmV3U3RhdGVPYmo6IE9wZW5DdlN0YXRlID0ge1xuICAgICAgcmVhZHk6IGZhbHNlLFxuICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICBlcnJvcjogZmFsc2UsXG4gICAgICBzdGF0ZTogJydcbiAgICB9O1xuICAgIE9iamVjdC5rZXlzKG5ld1N0YXRlT2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoa2V5ICE9PSAnc3RhdGUnKSB7XG4gICAgICAgIGlmIChrZXkgPT09IGNoYW5nZSkge1xuICAgICAgICAgIG5ld1N0YXRlT2JqW2tleV0gPSB0cnVlO1xuICAgICAgICAgIG5ld1N0YXRlT2JqLnN0YXRlID0ga2V5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld1N0YXRlT2JqW2tleV0gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBuZXdTdGF0ZU9iajtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZW5lcmF0ZXMgYSBjb25maWcgbW9kdWxlIGZvciB0aGUgZ2xvYmFsIE1vZHVsZSBvYmplY3RcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBjb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgICovXG4gIHByaXZhdGUgZ2VuZXJhdGVDb25maWdNb2R1bGUob3B0aW9uczogT3BlbkN2Q29uZmlnKTogT3BlbkN2Q29uZmlnTW9kdWxlIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2NyaXB0VXJsOiBvcHRpb25zLm9wZW5DdkRpclBhdGggPyBgJHtvcHRpb25zLm9wZW5DdkRpclBhdGh9L29wZW5jdi5qc2AgOiBgL2Fzc2V0cy9vcGVuY3Yvb3BlbmN2LmpzYCxcbiAgICAgIHdhc21CaW5hcnlGaWxlOiAnb3BlbmN2X2pzLndhc20nLFxuICAgICAgdXNpbmdXYXNtOiB0cnVlLFxuICAgICAgb25SdW50aW1lSW5pdGlhbGl6ZWQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ29wZW5DViBSZWFkeScpO1xuICAgICAgICAgIHRoaXMuY3ZTdGF0ZS5uZXh0KHRoaXMubmV3U3RhdGUoJ3JlYWR5JykpO1xuICAgICAgICAgIGlmIChvcHRpb25zLnJ1bk9uT3BlbkNWSW5pdCkge1xuICAgICAgICAgICAgb3B0aW9ucy5ydW5Pbk9wZW5DVkluaXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBkZXNjcmliZXMgdGhlIGdsb2JhbCBNb2R1bGUgb2JqZWN0IHRoYXQgaXMgdXNlZCB0byBpbml0aWF0ZSBPcGVuQ1YuanNcbiAqL1xuaW50ZXJmYWNlIE9wZW5DdkNvbmZpZ01vZHVsZSB7XG4gIHNjcmlwdFVybDogc3RyaW5nO1xuICB3YXNtQmluYXJ5RmlsZTogc3RyaW5nO1xuICB1c2luZ1dhc206IGJvb2xlYW47XG4gIG9uUnVudGltZUluaXRpYWxpemVkOiBGdW5jdGlvbjtcbn1cblxuIl19