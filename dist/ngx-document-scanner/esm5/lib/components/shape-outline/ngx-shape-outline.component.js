/**
 * @fileoverview added by tsickle
 * Generated from: lib/components/shape-outline/ngx-shape-outline.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { LimitsService } from '../../services/limits.service';
var NgxShapeOutlineComponent = /** @class */ (function () {
    function NgxShapeOutlineComponent(limitsService) {
        this.limitsService = limitsService;
        this.color = '#3cabe2';
    }
    /**
     * @return {?}
     */
    NgxShapeOutlineComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // init drawing canvas dimensions
        this.canvas.nativeElement.width = this.dimensions.width;
        this.canvas.nativeElement.height = this.dimensions.height;
        this.limitsService.positions.subscribe((/**
         * @param {?} positions
         * @return {?}
         */
        function (positions) {
            if (positions.length === 4) {
                _this._points = positions;
                _this.sortPoints();
                _this.clearCanvas();
                _this.drawShape();
            }
        }));
        // subscribe to changes in the pane's dimensions
        this.limitsService.paneDimensions.subscribe((/**
         * @param {?} dimensions
         * @return {?}
         */
        function (dimensions) {
            _this.clearCanvas();
            _this.canvas.nativeElement.width = dimensions.width;
            _this.canvas.nativeElement.height = dimensions.height;
        }));
        // subscribe to reposition events
        this.limitsService.repositionEvent.subscribe((/**
         * @param {?} positions
         * @return {?}
         */
        function (positions) {
            if (positions.length === 4) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.clearCanvas();
                    _this.sortPoints();
                    _this.drawShape();
                }), 10);
            }
        }));
    };
    /**
     * clears the shape canvas
     */
    /**
     * clears the shape canvas
     * @private
     * @return {?}
     */
    NgxShapeOutlineComponent.prototype.clearCanvas = /**
     * clears the shape canvas
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var canvas = this.canvas.nativeElement;
        /** @type {?} */
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    };
    /**
     * sorts the array of points according to their clockwise alignment
     */
    /**
     * sorts the array of points according to their clockwise alignment
     * @private
     * @return {?}
     */
    NgxShapeOutlineComponent.prototype.sortPoints = /**
     * sorts the array of points according to their clockwise alignment
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var _points = Array.from(this._points);
        /** @type {?} */
        var sortedPoints = [];
        /** @type {?} */
        var sortOrder = {
            vertical: ['top', 'top', 'bottom', 'bottom'],
            horizontal: ['left', 'right', 'right', 'left']
        };
        var _loop_1 = function (i) {
            /** @type {?} */
            var roles = Array.from([sortOrder.vertical[i], sortOrder.horizontal[i]]);
            sortedPoints.push(_points.filter((/**
             * @param {?} point
             * @return {?}
             */
            function (point) {
                return _this.limitsService.compareArray(point.roles, roles);
            }))[0]);
        };
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
        this._sortedPoints = sortedPoints;
    };
    /**
     * draws a line between the points according to their order
     */
    /**
     * draws a line between the points according to their order
     * @private
     * @return {?}
     */
    NgxShapeOutlineComponent.prototype.drawShape = /**
     * draws a line between the points according to their order
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var canvas = this.canvas.nativeElement;
        /** @type {?} */
        var ctx = canvas.getContext('2d');
        ctx.lineWidth = this.weight;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        this._sortedPoints.forEach((/**
         * @param {?} point
         * @param {?} index
         * @return {?}
         */
        function (point, index) {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            }
            if (index !== _this._sortedPoints.length - 1) {
                /** @type {?} */
                var nextPoint = _this._sortedPoints[index + 1];
                ctx.lineTo(nextPoint.x, nextPoint.y);
            }
            else {
                ctx.closePath();
            }
        }));
        ctx.stroke();
    };
    NgxShapeOutlineComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-shape-outine',
                    template: "<canvas #outline\n        style=\"position: absolute; z-index: 1000\"\n        [ngStyle]=\"{width: dimensions.width + 'px', height: dimensions.height + 'px'}\"\n        *ngIf=\"dimensions\">\n</canvas>\n"
                }] }
    ];
    /** @nocollapse */
    NgxShapeOutlineComponent.ctorParameters = function () { return [
        { type: LimitsService }
    ]; };
    NgxShapeOutlineComponent.propDecorators = {
        color: [{ type: Input }],
        weight: [{ type: Input }],
        dimensions: [{ type: Input }],
        canvas: [{ type: ViewChild, args: ['outline',] }]
    };
    return NgxShapeOutlineComponent;
}());
export { NgxShapeOutlineComponent };
if (false) {
    /** @type {?} */
    NgxShapeOutlineComponent.prototype.color;
    /** @type {?} */
    NgxShapeOutlineComponent.prototype.weight;
    /** @type {?} */
    NgxShapeOutlineComponent.prototype.dimensions;
    /** @type {?} */
    NgxShapeOutlineComponent.prototype.canvas;
    /**
     * @type {?}
     * @private
     */
    NgxShapeOutlineComponent.prototype._points;
    /**
     * @type {?}
     * @private
     */
    NgxShapeOutlineComponent.prototype._sortedPoints;
    /**
     * @type {?}
     * @private
     */
    NgxShapeOutlineComponent.prototype.limitsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFwZS1vdXRsaW5lL25neC1zaGFwZS1vdXRsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGFBQWEsRUFBc0IsTUFBTSwrQkFBK0IsQ0FBQztBQUdqRjtJQWFFLGtDQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQVB2QyxVQUFLLEdBQUcsU0FBUyxDQUFDO0lBT3dCLENBQUM7Ozs7SUFFcEQsa0RBQWU7OztJQUFmO1FBQUEsaUJBNEJDO1FBM0JDLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzFELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLFNBQVM7WUFDOUMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDMUIsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxTQUFT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QUU7Z0JBQ2YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtZQUNELElBQUksS0FBSyxLQUFLLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7b0JBQ3JDLFNBQVMsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQy9DLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEM7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2pCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDOztnQkFqR0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLHVOQUFpRDtpQkFDbEQ7Ozs7Z0JBTk8sYUFBYTs7O3dCQVNsQixLQUFLO3lCQUNMLEtBQUs7NkJBQ0wsS0FBSzt5QkFDTCxTQUFTLFNBQUMsU0FBUzs7SUF5RnRCLCtCQUFDO0NBQUEsQUFsR0QsSUFrR0M7U0E5Rlksd0JBQXdCOzs7SUFFbkMseUNBQTJCOztJQUMzQiwwQ0FBd0I7O0lBQ3hCLDhDQUFxQzs7SUFDckMsMENBQTZCOzs7OztJQUU3QiwyQ0FBNEM7Ozs7O0lBQzVDLGlEQUFrRDs7Ozs7SUFDdEMsaURBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMaW1pdHNTZXJ2aWNlLCBQb2ludFBvc2l0aW9uQ2hhbmdlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9saW1pdHMuc2VydmljZSc7XG5pbXBvcnQge0ltYWdlRGltZW5zaW9uc30gZnJvbSAnLi4vLi4vUHVibGljTW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXNoYXBlLW91dGluZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtc2hhcGUtb3V0bGluZS5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE5neFNoYXBlT3V0bGluZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIGNvbG9yID0gJyMzY2FiZTInO1xuICBASW5wdXQoKSB3ZWlnaHQ6IG51bWJlcjtcbiAgQElucHV0KCkgZGltZW5zaW9uczogSW1hZ2VEaW1lbnNpb25zO1xuICBAVmlld0NoaWxkKCdvdXRsaW5lJykgY2FudmFzO1xuXG4gIHByaXZhdGUgX3BvaW50czogQXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT47XG4gIHByaXZhdGUgX3NvcnRlZFBvaW50czogQXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT47XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGltaXRzU2VydmljZTogTGltaXRzU2VydmljZSkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gaW5pdCBkcmF3aW5nIGNhbnZhcyBkaW1lbnNpb25zXG4gICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC53aWR0aCA9IHRoaXMuZGltZW5zaW9ucy53aWR0aDtcbiAgICB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50LmhlaWdodCA9IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBvc2l0aW9ucy5zdWJzY3JpYmUocG9zaXRpb25zID0+IHtcbiAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHBvc2l0aW9ucztcbiAgICAgICAgdGhpcy5zb3J0UG9pbnRzKCk7XG4gICAgICAgIHRoaXMuY2xlYXJDYW52YXMoKTtcbiAgICAgICAgdGhpcy5kcmF3U2hhcGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBzdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgcGFuZSdzIGRpbWVuc2lvbnNcbiAgICB0aGlzLmxpbWl0c1NlcnZpY2UucGFuZURpbWVuc2lvbnMuc3Vic2NyaWJlKGRpbWVuc2lvbnMgPT4ge1xuICAgICAgdGhpcy5jbGVhckNhbnZhcygpO1xuICAgICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC53aWR0aCA9IGRpbWVuc2lvbnMud2lkdGg7XG4gICAgICB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50LmhlaWdodCA9IGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgIH0pO1xuICAgIC8vIHN1YnNjcmliZSB0byByZXBvc2l0aW9uIGV2ZW50c1xuICAgIHRoaXMubGltaXRzU2VydmljZS5yZXBvc2l0aW9uRXZlbnQuc3Vic2NyaWJlKCBwb3NpdGlvbnMgPT4ge1xuICAgICAgaWYgKHBvc2l0aW9ucy5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgc2V0VGltZW91dCggKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXMoKTtcbiAgICAgICAgICB0aGlzLnNvcnRQb2ludHMoKTtcbiAgICAgICAgICB0aGlzLmRyYXdTaGFwZSgpO1xuICAgICAgICB9LCAxMCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogY2xlYXJzIHRoZSBzaGFwZSBjYW52YXNcbiAgICovXG4gIHByaXZhdGUgY2xlYXJDYW52YXMoKSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuZGltZW5zaW9ucy53aWR0aCwgdGhpcy5kaW1lbnNpb25zLmhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogc29ydHMgdGhlIGFycmF5IG9mIHBvaW50cyBhY2NvcmRpbmcgdG8gdGhlaXIgY2xvY2t3aXNlIGFsaWdubWVudFxuICAgKi9cbiAgcHJpdmF0ZSBzb3J0UG9pbnRzKCkge1xuICAgIGNvbnN0IF9wb2ludHMgPSBBcnJheS5mcm9tKHRoaXMuX3BvaW50cyk7XG4gICAgY29uc3Qgc29ydGVkUG9pbnRzID0gW107XG5cbiAgICBjb25zdCBzb3J0T3JkZXIgPSB7XG4gICAgICB2ZXJ0aWNhbDogWyd0b3AnLCAndG9wJywgJ2JvdHRvbScsICdib3R0b20nXSxcbiAgICAgIGhvcml6b250YWw6IFsnbGVmdCcsICdyaWdodCcsICdyaWdodCcsICdsZWZ0J11cbiAgICB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIGNvbnN0IHJvbGVzID0gQXJyYXkuZnJvbShbc29ydE9yZGVyLnZlcnRpY2FsW2ldLCBzb3J0T3JkZXIuaG9yaXpvbnRhbFtpXV0pO1xuICAgICAgc29ydGVkUG9pbnRzLnB1c2goX3BvaW50cy5maWx0ZXIoKHBvaW50KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpbWl0c1NlcnZpY2UuY29tcGFyZUFycmF5KHBvaW50LnJvbGVzLCByb2xlcyk7XG4gICAgICB9KVswXSk7XG5cbiAgICB9XG4gICAgdGhpcy5fc29ydGVkUG9pbnRzID0gc29ydGVkUG9pbnRzO1xuICB9XG5cbiAgLyoqXG4gICAqIGRyYXdzIGEgbGluZSBiZXR3ZWVuIHRoZSBwb2ludHMgYWNjb3JkaW5nIHRvIHRoZWlyIG9yZGVyXG4gICAqL1xuICBwcml2YXRlIGRyYXdTaGFwZSgpIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLndlaWdodDtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLl9zb3J0ZWRQb2ludHMuZm9yRWFjaCgocG9pbnQsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgY3R4Lm1vdmVUbyhwb2ludC54LCBwb2ludC55KTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCAhPT0gdGhpcy5fc29ydGVkUG9pbnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgY29uc3QgbmV4dFBvaW50ID0gdGhpcy5fc29ydGVkUG9pbnRzW2luZGV4ICsgMV07XG4gICAgICAgIGN0eC5saW5lVG8obmV4dFBvaW50LngsIG5leHRQb2ludC55KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cbn1cblxuXG4iXX0=