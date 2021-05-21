/**
 * @fileoverview added by tsickle
 * Generated from: lib/PrivateModels.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpdmF0ZU1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kb2N1bWVudC1zY2FubmVyLyIsInNvdXJjZXMiOlsibGliL1ByaXZhdGVNb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFLQSx3Q0FPQzs7O0lBTkMsa0NBQWE7O0lBQ2Isa0NBQXdCOztJQUN4QixrQ0FBYTs7SUFDYixvQ0FBaUI7O0lBQ2pCLGtDQUFjOztJQUNkLGtDQUF3Qjs7Ozs7QUFRMUIsMENBT0M7OztJQU5DLHFDQUFlOztJQUNmLHNDQUFnQjs7SUFDaEIscUNBQWU7O0lBQ2YscUNBQTBCOztJQUMxQiwwQ0FBd0I7O0lBQ3hCLDZDQUEyQjs7Ozs7O0FBTTdCLGdDQUdDOzs7SUFGQyx1QkFBVTs7SUFDVix1QkFBVTs7Ozs7O0FBTVosa0NBS0M7OztJQUpDLDZCQUFjOztJQUNkLDhCQUFlOztJQUNmLDZCQUFjOztJQUNkLDZCQUFrQjs7Ozs7QUFHcEIsb0NBVUM7OztJQVRDLGlDQUFpQjs7SUFDakIsMkNBR0U7O0lBQ0YsMENBR0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRlc2NyaWJlcyBhbiBlZGl0b3IgYnV0dG9uXG4gKi9cbmltcG9ydCB7Um9sZXNBcnJheX0gZnJvbSAnLi9zZXJ2aWNlcy9saW1pdHMuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRWRpdG9yQWN0aW9uQnV0dG9uIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlPzogJ2J1dHRvbicgfCAnZmFiJztcbiAgaWNvbjogc3RyaW5nO1xuICBhY3Rpb246IEZ1bmN0aW9uO1xuICB0ZXh0Pzogc3RyaW5nO1xuICBtb2RlPzogJ2Nyb3AnIHwgJ2NvbG9yJztcbn1cblxuLyoqXG4gKiBhIHN0cmluZyBkZXNjcmliaW5nIHRoZSBzaGFwZSBvZiBhIGRyYWdnYWJsZSBwb2ludFxuICovXG5leHBvcnQgdHlwZSBQb2ludFNoYXBlID0gJ3JlY3QnIHwgJ2NpcmNsZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJhZ2dhYmxlUG9pbnRDb25maWcge1xuICB3aWR0aD86IG51bWJlcjtcbiAgaGVpZ2h0PzogbnVtYmVyO1xuICBjb2xvcj86IHN0cmluZztcbiAgc2hhcGU/OiAncmVjdCcgfCAnY2lyY2xlJztcbiAgbGltaXRSb2xlcz86IFJvbGVzQXJyYXk7XG4gIHN0YXJ0UG9zaXRpb24/OiBYWVBvc2l0aW9uO1xufVxuXG4vKipcbiAqIGRlc2NyaWJlcyBhIHBvc2l0aW9uIG9uIGEgMmQgcGFuZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFhZUG9zaXRpb24ge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBkZXNjcmliZXMgbyBkcmFnZ2FibGUgcG9pbnQgY29uZmlnIG9wdGlvbnNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQb2ludE9wdGlvbnMge1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgY29sb3I6IHN0cmluZztcbiAgc2hhcGU6IFBvaW50U2hhcGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGltaXRFeGNlcHRpb24ge1xuICBleGNlZWRzOiBib29sZWFuO1xuICByZXNldENvZWZmaWNpZW50czoge1xuICAgIHg6IDEgfCAwIHwgLTFcbiAgICB5OiAxIHwgMCB8IC0xXG4gIH07XG4gIHJlc2V0Q29vcmRpbmF0ZXM6IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICB9O1xufVxuIl19