/**
 * @fileoverview added by tsickle
 * Generated from: lib/PublicModels.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function OpenCVState() { }
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
 * describes an object with width and height properties
 * @record
 */
export function ImageDimensions() { }
if (false) {
    /** @type {?} */
    ImageDimensions.prototype.width;
    /** @type {?} */
    ImageDimensions.prototype.height;
}
/**
 * describes a configuration object for the editor
 * @record
 */
export function DocScannerConfig() { }
if (false) {
    /**
     * max dimensions of output image. if set to zero will not resize the image
     * @type {?|undefined}
     */
    DocScannerConfig.prototype.maxImageDimensions;
    /**
     * background color of the main editor div
     * @type {?|undefined}
     */
    DocScannerConfig.prototype.editorBackgroundColor;
    /**
     * css properties for the main editor div
     * @type {?|undefined}
     */
    DocScannerConfig.prototype.editorDimensions;
    /**
     * css that will be added to the main div of the editor component
     * @type {?|undefined}
     */
    DocScannerConfig.prototype.extraCss;
    /**
     * material design theme color name
     * @type {?|undefined}
     */
    DocScannerConfig.prototype.buttonThemeColor;
    /**
     * icon for the button that completes the editing and emits the edited image
     * @type {?|undefined}
     */
    DocScannerConfig.prototype.exportImageIcon;
    /**
     * color of the crop tool (points and connecting lines)
     * @type {?|undefined}
     */
    DocScannerConfig.prototype.cropToolColor;
    /**
     * shape of the crop tool points
     * @type {?|undefined}
     */
    DocScannerConfig.prototype.cropToolShape;
    /**
     * width and height of the crop tool points
     * @type {?|undefined}
     */
    DocScannerConfig.prototype.cropToolDimensions;
    /**
     * weight of the crop tool's connecting lines
     * @type {?|undefined}
     */
    DocScannerConfig.prototype.cropToolLineWeight;
    /**
     * max width of the preview pane
     * @type {?|undefined}
     */
    DocScannerConfig.prototype.maxPreviewWidth;
}
/**
 * describes a configuration object for the OpenCV service
 * @record
 */
export function OpenCVConfig() { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVibGljTW9kZWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvUHVibGljTW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBS0EsaUNBS0M7OztJQUpDLDRCQUFlOztJQUNmLDhCQUFpQjs7SUFDakIsNEJBQWU7O0lBQ2YsNEJBQWM7Ozs7OztBQU1oQixxQ0FHQzs7O0lBRkMsZ0NBQWM7O0lBQ2QsaUNBQWU7Ozs7OztBQU1qQixzQ0E2Q0M7Ozs7OztJQXpDQyw4Q0FBcUM7Ozs7O0lBSXJDLGlEQUErQjs7Ozs7SUFJL0IsNENBQXNEOzs7OztJQUl0RCxvQ0FBOEM7Ozs7O0lBSTlDLDRDQUFpRDs7Ozs7SUFJakQsMkNBQXlCOzs7OztJQUl6Qix5Q0FBdUI7Ozs7O0lBSXZCLHlDQUEyQjs7Ozs7SUFJM0IsOENBQXFDOzs7OztJQUlyQyw4Q0FBNEI7Ozs7O0lBSTVCLDJDQUF5Qjs7Ozs7O0FBTTNCLGtDQWFDOzs7Ozs7Ozs7O0lBTEMscUNBQXVCOzs7OztJQUl2Qix1Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRlc2NyaWJlcyBhIHN0YXRlIG9iamVjdCBmb3IgdGhlIE9wZW5DViBtb2R1bGVcbiAqL1xuaW1wb3J0IHtQb2ludFNoYXBlfSBmcm9tICcuL1ByaXZhdGVNb2RlbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5DVlN0YXRlIHtcbiAgcmVhZHk6IGJvb2xlYW47XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIGVycm9yOiBib29sZWFuO1xuICBzdGF0ZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIGRlc2NyaWJlcyBhbiBvYmplY3Qgd2l0aCB3aWR0aCBhbmQgaGVpZ2h0IHByb3BlcnRpZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbWFnZURpbWVuc2lvbnMge1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBkZXNjcmliZXMgYSBjb25maWd1cmF0aW9uIG9iamVjdCBmb3IgdGhlIGVkaXRvclxuICovXG5leHBvcnQgaW50ZXJmYWNlIERvY1NjYW5uZXJDb25maWcge1xuICAvKipcbiAgICogbWF4IGRpbWVuc2lvbnMgb2Ygb3V0cHV0IGltYWdlLiBpZiBzZXQgdG8gemVybyB3aWxsIG5vdCByZXNpemUgdGhlIGltYWdlXG4gICAqL1xuICBtYXhJbWFnZURpbWVuc2lvbnM/OiBJbWFnZURpbWVuc2lvbnM7XG4gIC8qKlxuICAgKiBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBtYWluIGVkaXRvciBkaXZcbiAgICovXG4gIGVkaXRvckJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgLyoqXG4gICAqIGNzcyBwcm9wZXJ0aWVzIGZvciB0aGUgbWFpbiBlZGl0b3IgZGl2XG4gICAqL1xuICBlZGl0b3JEaW1lbnNpb25zPzogeyB3aWR0aDogc3RyaW5nOyBoZWlnaHQ6IHN0cmluZzsgfTtcbiAgLyoqXG4gICAqIGNzcyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIG1haW4gZGl2IG9mIHRoZSBlZGl0b3IgY29tcG9uZW50XG4gICAqL1xuICBleHRyYUNzcz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIH07XG4gIC8qKlxuICAgKiBtYXRlcmlhbCBkZXNpZ24gdGhlbWUgY29sb3IgbmFtZVxuICAgKi9cbiAgYnV0dG9uVGhlbWVDb2xvcj86ICdwcmltYXJ5JyB8ICd3YXJuJyB8ICdhY2NlbnQnO1xuICAvKipcbiAgICogaWNvbiBmb3IgdGhlIGJ1dHRvbiB0aGF0IGNvbXBsZXRlcyB0aGUgZWRpdGluZyBhbmQgZW1pdHMgdGhlIGVkaXRlZCBpbWFnZVxuICAgKi9cbiAgZXhwb3J0SW1hZ2VJY29uPzogc3RyaW5nO1xuICAvKipcbiAgICogY29sb3Igb2YgdGhlIGNyb3AgdG9vbCAocG9pbnRzIGFuZCBjb25uZWN0aW5nIGxpbmVzKVxuICAgKi9cbiAgY3JvcFRvb2xDb2xvcj86IHN0cmluZztcbiAgLyoqXG4gICAqIHNoYXBlIG9mIHRoZSBjcm9wIHRvb2wgcG9pbnRzXG4gICAqL1xuICBjcm9wVG9vbFNoYXBlPzogUG9pbnRTaGFwZTtcbiAgLyoqXG4gICAqIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGNyb3AgdG9vbCBwb2ludHNcbiAgICovXG4gIGNyb3BUb29sRGltZW5zaW9ucz86IEltYWdlRGltZW5zaW9ucztcbiAgLyoqXG4gICAqIHdlaWdodCBvZiB0aGUgY3JvcCB0b29sJ3MgY29ubmVjdGluZyBsaW5lc1xuICAgKi9cbiAgY3JvcFRvb2xMaW5lV2VpZ2h0PzogbnVtYmVyO1xuICAvKipcbiAgICogbWF4IHdpZHRoIG9mIHRoZSBwcmV2aWV3IHBhbmVcbiAgICovXG4gIG1heFByZXZpZXdXaWR0aD86IG51bWJlcjtcbn1cblxuLyoqXG4gKiBkZXNjcmliZXMgYSBjb25maWd1cmF0aW9uIG9iamVjdCBmb3IgdGhlIE9wZW5DViBzZXJ2aWNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT3BlbkNWQ29uZmlnIHtcbiAgLyoqXG4gICAqIHBhdGggdG8gdGhlIGRpcmVjdG9yeSBjb250YWluaW5nIHRoZSBPcGVuQ1YgZmlsZXMsIGluIHRoZSBmb3JtIG9mICcvcGF0aC90by88b3BlbmN2IGRpcmVjdG9yeT4nXG4gICAqIGRpcmVjdG9yeSBtdXN0IGNvbnRhaW4gdGhlIHRoZSBmb2xsb3dpbmcgZmlsZXM6XG4gICAqIC0tPE9wZW5DdkRpcj5cbiAgICogLS0tLW9wZW5jdi5qc1xuICAgKiAtLS0tb3BlbmN2X2pzLndhc21cbiAgICovXG4gIG9wZW5DVkRpclBhdGg/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBhZGRpdGlvbmFsIGNhbGxiYWNrIHRoYXQgd2lsbCBydW4gd2hlbiBPcGVuQ3YgaGFzIGZpbmlzaGVkIGxvYWRpbmcgYW5kIHBhcnNpbmdcbiAgICovXG4gIHJ1bk9uT3BlbkNWSW5pdD86IEZ1bmN0aW9uO1xufVxuIl19