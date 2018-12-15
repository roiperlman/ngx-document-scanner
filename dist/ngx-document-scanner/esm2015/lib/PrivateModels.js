/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function EditorActionButton() { }
if (false) {
    /** @type {?} */
    EditorActionButton.prototype.name;
    /** @type {?|undefined} */
    EditorActionButton.prototype.type;
    /** @type {?} */
    EditorActionButton.prototype.icon;
    /** @type {?} */
    EditorActionButton.prototype.action;
    /** @type {?|undefined} */
    EditorActionButton.prototype.text;
    /** @type {?|undefined} */
    EditorActionButton.prototype.mode;
}
/**
 * @record
 */
export function DraggablePointConfig() { }
if (false) {
    /** @type {?|undefined} */
    DraggablePointConfig.prototype.width;
    /** @type {?|undefined} */
    DraggablePointConfig.prototype.height;
    /** @type {?|undefined} */
    DraggablePointConfig.prototype.color;
    /** @type {?|undefined} */
    DraggablePointConfig.prototype.shape;
    /** @type {?|undefined} */
    DraggablePointConfig.prototype.limitRoles;
    /** @type {?|undefined} */
    DraggablePointConfig.prototype.startPosition;
}
/**
 * describes a position on a 2d pane
 * @record
 */
export function XYPosition() { }
if (false) {
    /** @type {?} */
    XYPosition.prototype.x;
    /** @type {?} */
    XYPosition.prototype.y;
}
/**
 * describes o draggable point config options
 * @record
 */
export function PointOptions() { }
if (false) {
    /** @type {?} */
    PointOptions.prototype.width;
    /** @type {?} */
    PointOptions.prototype.height;
    /** @type {?} */
    PointOptions.prototype.color;
    /** @type {?} */
    PointOptions.prototype.shape;
}
/**
 * @record
 */
export function LimitException() { }
if (false) {
    /** @type {?} */
    LimitException.prototype.exceeds;
    /** @type {?} */
    LimitException.prototype.resetCoefficients;
    /** @type {?} */
    LimitException.prototype.resetCoordinates;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpdmF0ZU1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kb2N1bWVudC1zY2FubmVyLyIsInNvdXJjZXMiOlsibGliL1ByaXZhdGVNb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBLHdDQU9DOzs7SUFOQyxrQ0FBYTs7SUFDYixrQ0FBd0I7O0lBQ3hCLGtDQUFhOztJQUNiLG9DQUFpQjs7SUFDakIsa0NBQWM7O0lBQ2Qsa0NBQXdCOzs7OztBQVExQiwwQ0FPQzs7O0lBTkMscUNBQWU7O0lBQ2Ysc0NBQWdCOztJQUNoQixxQ0FBZTs7SUFDZixxQ0FBMEI7O0lBQzFCLDBDQUF3Qjs7SUFDeEIsNkNBQTJCOzs7Ozs7QUFNN0IsZ0NBR0M7OztJQUZDLHVCQUFVOztJQUNWLHVCQUFVOzs7Ozs7QUFNWixrQ0FLQzs7O0lBSkMsNkJBQWM7O0lBQ2QsOEJBQWU7O0lBQ2YsNkJBQWM7O0lBQ2QsNkJBQWtCOzs7OztBQUdwQixvQ0FVQzs7O0lBVEMsaUNBQWlCOztJQUNqQiwyQ0FHRTs7SUFDRiwwQ0FHRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBkZXNjcmliZXMgYW4gZWRpdG9yIGJ1dHRvblxyXG4gKi9cclxuaW1wb3J0IHtSb2xlc0FycmF5fSBmcm9tICcuL3NlcnZpY2VzL2xpbWl0cy5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRWRpdG9yQWN0aW9uQnV0dG9uIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgdHlwZT86ICdidXR0b24nIHwgJ2ZhYic7XHJcbiAgaWNvbjogc3RyaW5nO1xyXG4gIGFjdGlvbjogRnVuY3Rpb247XHJcbiAgdGV4dD86IHN0cmluZztcclxuICBtb2RlPzogJ2Nyb3AnIHwgJ2NvbG9yJztcclxufVxyXG5cclxuLyoqXHJcbiAqIGEgc3RyaW5nIGRlc2NyaWJpbmcgdGhlIHNoYXBlIG9mIGEgZHJhZ2dhYmxlIHBvaW50XHJcbiAqL1xyXG5leHBvcnQgdHlwZSBQb2ludFNoYXBlID0gJ3JlY3QnIHwgJ2NpcmNsZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERyYWdnYWJsZVBvaW50Q29uZmlnIHtcclxuICB3aWR0aD86IG51bWJlcjtcclxuICBoZWlnaHQ/OiBudW1iZXI7XHJcbiAgY29sb3I/OiBzdHJpbmc7XHJcbiAgc2hhcGU/OiAncmVjdCcgfCAnY2lyY2xlJztcclxuICBsaW1pdFJvbGVzPzogUm9sZXNBcnJheTtcclxuICBzdGFydFBvc2l0aW9uPzogWFlQb3NpdGlvbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGRlc2NyaWJlcyBhIHBvc2l0aW9uIG9uIGEgMmQgcGFuZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBYWVBvc2l0aW9uIHtcclxuICB4OiBudW1iZXI7XHJcbiAgeTogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogZGVzY3JpYmVzIG8gZHJhZ2dhYmxlIHBvaW50IGNvbmZpZyBvcHRpb25zXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFBvaW50T3B0aW9ucyB7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICBjb2xvcjogc3RyaW5nO1xyXG4gIHNoYXBlOiBQb2ludFNoYXBlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExpbWl0RXhjZXB0aW9uIHtcclxuICBleGNlZWRzOiBib29sZWFuO1xyXG4gIHJlc2V0Q29lZmZpY2llbnRzOiB7XHJcbiAgICB4OiAxIHwgMCB8IC0xXHJcbiAgICB5OiAxIHwgMCB8IC0xXHJcbiAgfTtcclxuICByZXNldENvb3JkaW5hdGVzOiB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgfTtcclxufVxyXG4iXX0=