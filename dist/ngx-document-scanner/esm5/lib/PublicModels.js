/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVibGljTW9kZWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvUHVibGljTW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFLQSxpQ0FLQzs7O0lBSkMsNEJBQWU7O0lBQ2YsOEJBQWlCOztJQUNqQiw0QkFBZTs7SUFDZiw0QkFBYzs7Ozs7O0FBTWhCLHFDQUdDOzs7SUFGQyxnQ0FBYzs7SUFDZCxpQ0FBZTs7Ozs7O0FBTWpCLHNDQTZDQzs7Ozs7O0lBekNDLDhDQUFxQzs7Ozs7SUFJckMsaURBQStCOzs7OztJQUkvQiw0Q0FBc0Q7Ozs7O0lBSXRELG9DQUE4Qzs7Ozs7SUFJOUMsNENBQWlEOzs7OztJQUlqRCwyQ0FBeUI7Ozs7O0lBSXpCLHlDQUF1Qjs7Ozs7SUFJdkIseUNBQTJCOzs7OztJQUkzQiw4Q0FBcUM7Ozs7O0lBSXJDLDhDQUE0Qjs7Ozs7SUFJNUIsMkNBQXlCOzs7Ozs7QUFNM0Isa0NBYUM7Ozs7Ozs7Ozs7SUFMQyxxQ0FBdUI7Ozs7O0lBSXZCLHVDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBkZXNjcmliZXMgYSBzdGF0ZSBvYmplY3QgZm9yIHRoZSBPcGVuQ1YgbW9kdWxlXHJcbiAqL1xyXG5pbXBvcnQge1BvaW50U2hhcGV9IGZyb20gJy4vUHJpdmF0ZU1vZGVscyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5DVlN0YXRlIHtcclxuICByZWFkeTogYm9vbGVhbjtcclxuICBsb2FkaW5nOiBib29sZWFuO1xyXG4gIGVycm9yOiBib29sZWFuO1xyXG4gIHN0YXRlOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBkZXNjcmliZXMgYW4gb2JqZWN0IHdpdGggd2lkdGggYW5kIGhlaWdodCBwcm9wZXJ0aWVzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlRGltZW5zaW9ucyB7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGRlc2NyaWJlcyBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZvciB0aGUgZWRpdG9yXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIERvY1NjYW5uZXJDb25maWcge1xyXG4gIC8qKlxyXG4gICAqIG1heCBkaW1lbnNpb25zIG9mIG91dHB1dCBpbWFnZS4gaWYgc2V0IHRvIHplcm8gd2lsbCBub3QgcmVzaXplIHRoZSBpbWFnZVxyXG4gICAqL1xyXG4gIG1heEltYWdlRGltZW5zaW9ucz86IEltYWdlRGltZW5zaW9ucztcclxuICAvKipcclxuICAgKiBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBtYWluIGVkaXRvciBkaXZcclxuICAgKi9cclxuICBlZGl0b3JCYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogY3NzIHByb3BlcnRpZXMgZm9yIHRoZSBtYWluIGVkaXRvciBkaXZcclxuICAgKi9cclxuICBlZGl0b3JEaW1lbnNpb25zPzogeyB3aWR0aDogc3RyaW5nOyBoZWlnaHQ6IHN0cmluZzsgfTtcclxuICAvKipcclxuICAgKiBjc3MgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBtYWluIGRpdiBvZiB0aGUgZWRpdG9yIGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIGV4dHJhQ3NzPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfTtcclxuICAvKipcclxuICAgKiBtYXRlcmlhbCBkZXNpZ24gdGhlbWUgY29sb3IgbmFtZVxyXG4gICAqL1xyXG4gIGJ1dHRvblRoZW1lQ29sb3I/OiAncHJpbWFyeScgfCAnd2FybicgfCAnYWNjZW50JztcclxuICAvKipcclxuICAgKiBpY29uIGZvciB0aGUgYnV0dG9uIHRoYXQgY29tcGxldGVzIHRoZSBlZGl0aW5nIGFuZCBlbWl0cyB0aGUgZWRpdGVkIGltYWdlXHJcbiAgICovXHJcbiAgZXhwb3J0SW1hZ2VJY29uPzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIGNvbG9yIG9mIHRoZSBjcm9wIHRvb2wgKHBvaW50cyBhbmQgY29ubmVjdGluZyBsaW5lcylcclxuICAgKi9cclxuICBjcm9wVG9vbENvbG9yPzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIHNoYXBlIG9mIHRoZSBjcm9wIHRvb2wgcG9pbnRzXHJcbiAgICovXHJcbiAgY3JvcFRvb2xTaGFwZT86IFBvaW50U2hhcGU7XHJcbiAgLyoqXHJcbiAgICogd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgY3JvcCB0b29sIHBvaW50c1xyXG4gICAqL1xyXG4gIGNyb3BUb29sRGltZW5zaW9ucz86IEltYWdlRGltZW5zaW9ucztcclxuICAvKipcclxuICAgKiB3ZWlnaHQgb2YgdGhlIGNyb3AgdG9vbCdzIGNvbm5lY3RpbmcgbGluZXNcclxuICAgKi9cclxuICBjcm9wVG9vbExpbmVXZWlnaHQ/OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogbWF4IHdpZHRoIG9mIHRoZSBwcmV2aWV3IHBhbmVcclxuICAgKi9cclxuICBtYXhQcmV2aWV3V2lkdGg/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBkZXNjcmliZXMgYSBjb25maWd1cmF0aW9uIG9iamVjdCBmb3IgdGhlIE9wZW5DViBzZXJ2aWNlXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5DVkNvbmZpZyB7XHJcbiAgLyoqXHJcbiAgICogcGF0aCB0byB0aGUgZGlyZWN0b3J5IGNvbnRhaW5pbmcgdGhlIE9wZW5DViBmaWxlcywgaW4gdGhlIGZvcm0gb2YgJy9wYXRoL3RvLzxvcGVuY3YgZGlyZWN0b3J5PidcclxuICAgKiBkaXJlY3RvcnkgbXVzdCBjb250YWluIHRoZSB0aGUgZm9sbG93aW5nIGZpbGVzOlxyXG4gICAqIC0tPE9wZW5DdkRpcj5cclxuICAgKiAtLS0tb3BlbmN2LmpzXHJcbiAgICogLS0tLW9wZW5jdl9qcy53YXNtXHJcbiAgICovXHJcbiAgb3BlbkNWRGlyUGF0aD86IHN0cmluZztcclxuICAvKipcclxuICAgKiBhZGRpdGlvbmFsIGNhbGxiYWNrIHRoYXQgd2lsbCBydW4gd2hlbiBPcGVuQ3YgaGFzIGZpbmlzaGVkIGxvYWRpbmcgYW5kIHBhcnNpbmdcclxuICAgKi9cclxuICBydW5Pbk9wZW5DVkluaXQ/OiBGdW5jdGlvbjtcclxufVxyXG4iXX0=