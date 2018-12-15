/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
/** @nocollapse */ NgxOpenCVService.ngInjectableDef = i0.defineInjectable({ factory: function NgxOpenCVService_Factory() { return new NgxOpenCVService(i0.inject(OpenCvConfigToken), i0.inject(i0.NgZone)); }, token: NgxOpenCVService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW9wZW5jdi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbmd4LW9wZW5jdi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7OztBQUdyQyxNQUFNLE9BQU8saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQWUsNEJBQTRCLENBQUM7QUFLL0YsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7SUFVM0IsWUFBdUMsT0FBcUIsRUFBVSxPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQVJyRixZQUFPLEdBQUcsSUFBSSxlQUFlLENBQWM7WUFDekMsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLFNBQVM7U0FDakIsQ0FBQyxDQUFDO1FBSUQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7OztJQUtELFVBQVU7UUFDUixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsZ0NBQWdDO1FBQ2hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOzs7Y0FHL0IsTUFBTSxHQUFHLG1CQUFvQixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFBO1FBQ25FLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFL0Msb0JBQW9CO1FBQ3BCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFOztrQkFDOUIsR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUVwQixpQkFBaUI7UUFDakIsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQzs7O2NBRW5DLElBQUksR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7Ozs7Ozs7SUFNTyxRQUFRLENBQUMsTUFBaUM7O2NBQzFDLFdBQVcsR0FBZ0I7WUFDL0IsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JDLElBQUksR0FBRyxLQUFLLE9BQU8sRUFBRTtnQkFDbkIsSUFBSSxHQUFHLEtBQUssTUFBTSxFQUFFO29CQUNsQixXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUN4QixXQUFXLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztpQkFDekI7cUJBQU07b0JBQ0wsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDMUI7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQzs7Ozs7OztJQU1PLG9CQUFvQixDQUFDLE9BQXFCO1FBQ2hELE9BQU87WUFDTCxTQUFTLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsYUFBYSxZQUFZLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjtZQUNwRyxjQUFjLEVBQUUsZ0JBQWdCO1lBQ2hDLFNBQVMsRUFBRSxJQUFJO1lBQ2Ysb0JBQW9CLEVBQUUsR0FBRyxFQUFFO2dCQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7b0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxPQUFPLENBQUMsZUFBZSxFQUFFO3dCQUMzQixPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7cUJBQzNCO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztTQUNGLENBQUM7SUFDSixDQUFDOzs7WUEvRkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7OzRDQVdjLE1BQU0sU0FBQyxpQkFBaUI7WUFuQkssTUFBTTs7Ozs7SUFXaEQsbUNBS0c7O0lBQ0gsd0NBQWlDOzs7OztJQUU2QixtQ0FBdUI7Ozs7OztBQXdGdkYsaUNBS0M7OztJQUpDLHVDQUFrQjs7SUFDbEIsNENBQXVCOztJQUN2Qix1Q0FBbUI7O0lBQ25CLGtEQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge09wZW5DVkNvbmZpZywgT3BlbkNWU3RhdGV9IGZyb20gJy4uL1B1YmxpY01vZGVscyc7XHJcblxyXG5leHBvcnQgY29uc3QgT3BlbkN2Q29uZmlnVG9rZW4gPSBuZXcgSW5qZWN0aW9uVG9rZW48T3BlbkNWQ29uZmlnPignT3BlbkNWIGNvbmZpZyBvYmplY3QgdG9rZW4nKTtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE9wZW5DVlNlcnZpY2Uge1xyXG5cclxuICBjdlN0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxPcGVuQ1ZTdGF0ZT4oe1xyXG4gICAgcmVhZHk6IGZhbHNlLFxyXG4gICAgZXJyb3I6IGZhbHNlLFxyXG4gICAgbG9hZGluZzogdHJ1ZSxcclxuICAgIHN0YXRlOiAnbG9hZGluZydcclxuICB9KTtcclxuICBjb25maWdNb2R1bGU6IE9wZW5DVkNvbmZpZ01vZHVsZTtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChPcGVuQ3ZDb25maWdUb2tlbikgb3B0aW9uczogT3BlbkNWQ29uZmlnLCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xyXG4gICAgaWYgKCFvcHRpb25zKSB7XHJcbiAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgIH1cclxuICAgIHRoaXMuY29uZmlnTW9kdWxlID0gdGhpcy5nZW5lcmF0ZUNvbmZpZ01vZHVsZShvcHRpb25zKTtcclxuICAgIHRoaXMubG9hZE9wZW5DdigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbG9hZCB0aGUgT3BlbkNWIHNjcmlwdFxyXG4gICAqL1xyXG4gIGxvYWRPcGVuQ3YoKSB7XHJcbiAgICB0aGlzLmN2U3RhdGUubmV4dCggdGhpcy5uZXdTdGF0ZSgnbG9hZGluZycpKTtcclxuICAgIC8vIGNyZWF0ZSBnbG9iYWwgbW9kdWxlIHZhcmlhYmxlXHJcbiAgICB3aW5kb3dbJ01vZHVsZSddID0gdGhpcy5jb25maWdNb2R1bGU7XHJcblxyXG4gICAgLy8gY3JlYXRlIHNjcmlwdCBlbGVtZW50IGFuZCBzZXQgYXR0cmlidXRlc1xyXG4gICAgY29uc3Qgc2NyaXB0ID0gPEhUTUxTY3JpcHRFbGVtZW50PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2FzeW5jJywgJycpO1xyXG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2phdmFzY3JpcHQnKTtcclxuXHJcbiAgICAvLyBsaXN0ZW4gZm9yIGVycm9yc1xyXG4gICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkICcgKyB0aGlzLmNvbmZpZ01vZHVsZS5zY3JpcHRVcmwpO1xyXG4gICAgICB0aGlzLmN2U3RhdGUubmV4dCh0aGlzLm5ld1N0YXRlKCdlcnJvcicpKTtcclxuICAgICAgdGhpcy5jdlN0YXRlLmVycm9yKGVycik7XHJcbiAgICB9LCB7cGFzc2l2ZTogdHJ1ZX0pO1xyXG5cclxuICAgIC8vIHNldCBzY3JpcHQgdXJsXHJcbiAgICBzY3JpcHQuc3JjID0gdGhpcy5jb25maWdNb2R1bGUuc2NyaXB0VXJsO1xyXG4gICAgLy8gaW5zZXJ0IHNjcmlwdCBhcyBmaXJzdCBzY3JpcHQgdGFnXHJcbiAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xyXG4gICAgaWYgKG5vZGUpIHtcclxuICAgICAgbm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzY3JpcHQsIG5vZGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2VuZXJhdGVzIGEgbmV3IHN0YXRlIG9iamVjdFxyXG4gICAqIEBwYXJhbSBjaGFuZ2UgLSB0aGUgbmV3IHN0YXRlIG9mIHRoZSBtb2R1bGVcclxuICAgKi9cclxuICBwcml2YXRlIG5ld1N0YXRlKGNoYW5nZTogJ2xvYWRpbmcnfCdyZWFkeSd8J2Vycm9yJyk6IE9wZW5DVlN0YXRlIHtcclxuICAgIGNvbnN0IG5ld1N0YXRlT2JqOiBPcGVuQ1ZTdGF0ZSA9IHtcclxuICAgICAgcmVhZHk6IGZhbHNlLFxyXG4gICAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgZXJyb3I6IGZhbHNlLFxyXG4gICAgICBzdGF0ZTogJydcclxuICAgIH07XHJcbiAgICBPYmplY3Qua2V5cyhuZXdTdGF0ZU9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBpZiAoa2V5ICE9PSAnc3RhdGUnKSB7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gY2hhbmdlKSB7XHJcbiAgICAgICAgICBuZXdTdGF0ZU9ialtrZXldID0gdHJ1ZTtcclxuICAgICAgICAgIG5ld1N0YXRlT2JqLnN0YXRlID0ga2V5O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuZXdTdGF0ZU9ialtrZXldID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBuZXdTdGF0ZU9iajtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdlbmVyYXRlcyBhIGNvbmZpZyBtb2R1bGUgZm9yIHRoZSBnbG9iYWwgTW9kdWxlIG9iamVjdFxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gY29uZmlndXJhdGlvbiBvcHRpb25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZUNvbmZpZ01vZHVsZShvcHRpb25zOiBPcGVuQ1ZDb25maWcpOiBPcGVuQ1ZDb25maWdNb2R1bGUge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2NyaXB0VXJsOiBvcHRpb25zLm9wZW5DVkRpclBhdGggPyBgJHtvcHRpb25zLm9wZW5DVkRpclBhdGh9L29wZW5jdi5qc2AgOiBgL2Fzc2V0cy9vcGVuY3Yvb3BlbmN2LmpzYCxcclxuICAgICAgd2FzbUJpbmFyeUZpbGU6ICdvcGVuY3ZfanMud2FzbScsXHJcbiAgICAgIHVzaW5nV2FzbTogdHJ1ZSxcclxuICAgICAgb25SdW50aW1lSW5pdGlhbGl6ZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdvcGVuQ1YgUmVhZHknKTtcclxuICAgICAgICAgIHRoaXMuY3ZTdGF0ZS5uZXh0KHRoaXMubmV3U3RhdGUoJ3JlYWR5JykpO1xyXG4gICAgICAgICAgaWYgKG9wdGlvbnMucnVuT25PcGVuQ1ZJbml0KSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucnVuT25PcGVuQ1ZJbml0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogZGVzY3JpYmVzIHRoZSBnbG9iYWwgTW9kdWxlIG9iamVjdCB0aGF0IGlzIHVzZWQgdG8gaW5pdGlhdGUgT3BlbkNWLmpzXHJcbiAqL1xyXG5pbnRlcmZhY2UgT3BlbkNWQ29uZmlnTW9kdWxlIHtcclxuICBzY3JpcHRVcmw6IHN0cmluZztcclxuICB3YXNtQmluYXJ5RmlsZTogc3RyaW5nO1xyXG4gIHVzaW5nV2FzbTogYm9vbGVhbjtcclxuICBvblJ1bnRpbWVJbml0aWFsaXplZDogRnVuY3Rpb247XHJcbn1cclxuXHJcblxyXG4iXX0=