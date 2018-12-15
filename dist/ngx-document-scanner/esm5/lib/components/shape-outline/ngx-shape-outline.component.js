/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.limitsService.positions.subscribe(function (positions) {
            if (positions.length === 4) {
                _this._points = positions;
                _this.sortPoints();
                _this.clearCanvas();
                _this.drawShape();
            }
        });
        // subscribe to changes in the pane's dimensions
        this.limitsService.paneDimensions.subscribe(function (dimensions) {
            _this.clearCanvas();
            _this.canvas.nativeElement.width = dimensions.width;
            _this.canvas.nativeElement.height = dimensions.height;
        });
        // subscribe to reposition events
        this.limitsService.repositionEvent.subscribe(function (positions) {
            if (positions.length === 4) {
                setTimeout(function () {
                    _this.clearCanvas();
                    _this.sortPoints();
                    _this.drawShape();
                }, 10);
            }
        });
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
            sortedPoints.push(_points.filter(function (point) {
                return _this.limitsService.compareArray(point.roles, roles);
            })[0]);
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
        this._sortedPoints.forEach(function (point, index) {
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
        });
        ctx.stroke();
    };
    NgxShapeOutlineComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-shape-outine',
                    template: "<canvas #outline\r\n        style=\"position: absolute; z-index: 1000\"\r\n        [ngStyle]=\"{width: dimensions.width + 'px', height: dimensions.height + 'px'}\"\r\n        *ngIf=\"dimensions\">\r\n</canvas>\r\n"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFwZS1vdXRsaW5lL25neC1zaGFwZS1vdXRsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUMsYUFBYSxFQUFzQixNQUFNLCtCQUErQixDQUFDO0FBR2pGO0lBYUUsa0NBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBUHZDLFVBQUssR0FBRyxTQUFTLENBQUM7SUFPd0IsQ0FBQzs7OztJQUVwRCxrREFBZTs7O0lBQWY7UUFBQSxpQkE0QkM7UUEzQkMsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQUEsU0FBUztZQUM5QyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUMxQixLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FB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QUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUI7WUFDRCxJQUFJLEtBQUssS0FBSyxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O29CQUNyQyxTQUFTLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNqQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2YsQ0FBQzs7Z0JBakdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixpT0FBaUQ7aUJBQ2xEOzs7O2dCQU5PLGFBQWE7Ozt3QkFTbEIsS0FBSzt5QkFDTCxLQUFLOzZCQUNMLEtBQUs7eUJBQ0wsU0FBUyxTQUFDLFNBQVM7O0lBeUZ0QiwrQkFBQztDQUFBLEFBbEdELElBa0dDO1NBOUZZLHdCQUF3Qjs7O0lBRW5DLHlDQUEyQjs7SUFDM0IsMENBQXdCOztJQUN4Qiw4Q0FBcUM7O0lBQ3JDLDBDQUE2Qjs7Ozs7SUFFN0IsMkNBQTRDOzs7OztJQUM1QyxpREFBa0Q7Ozs7O0lBQ3RDLGlEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtMaW1pdHNTZXJ2aWNlLCBQb2ludFBvc2l0aW9uQ2hhbmdlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9saW1pdHMuc2VydmljZSc7XHJcbmltcG9ydCB7SW1hZ2VEaW1lbnNpb25zfSBmcm9tICcuLi8uLi9QdWJsaWNNb2RlbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtc2hhcGUtb3V0aW5lJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4U2hhcGVPdXRsaW5lQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIEBJbnB1dCgpIGNvbG9yID0gJyMzY2FiZTInO1xyXG4gIEBJbnB1dCgpIHdlaWdodDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGRpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucztcclxuICBAVmlld0NoaWxkKCdvdXRsaW5lJykgY2FudmFzO1xyXG5cclxuICBwcml2YXRlIF9wb2ludHM6IEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+O1xyXG4gIHByaXZhdGUgX3NvcnRlZFBvaW50czogQXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT47XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsaW1pdHNTZXJ2aWNlOiBMaW1pdHNTZXJ2aWNlKSB7fVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAvLyBpbml0IGRyYXdpbmcgY2FudmFzIGRpbWVuc2lvbnNcclxuICAgIHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQud2lkdGggPSB0aGlzLmRpbWVuc2lvbnMud2lkdGg7XHJcbiAgICB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50LmhlaWdodCA9IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQ7XHJcbiAgICB0aGlzLmxpbWl0c1NlcnZpY2UucG9zaXRpb25zLnN1YnNjcmliZShwb3NpdGlvbnMgPT4ge1xyXG4gICAgICBpZiAocG9zaXRpb25zLmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHBvc2l0aW9ucztcclxuICAgICAgICB0aGlzLnNvcnRQb2ludHMoKTtcclxuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3U2hhcGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgcGFuZSdzIGRpbWVuc2lvbnNcclxuICAgIHRoaXMubGltaXRzU2VydmljZS5wYW5lRGltZW5zaW9ucy5zdWJzY3JpYmUoZGltZW5zaW9ucyA9PiB7XHJcbiAgICAgIHRoaXMuY2xlYXJDYW52YXMoKTtcclxuICAgICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC53aWR0aCA9IGRpbWVuc2lvbnMud2lkdGg7XHJcbiAgICAgIHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0ID0gZGltZW5zaW9ucy5oZWlnaHQ7XHJcbiAgICB9KTtcclxuICAgIC8vIHN1YnNjcmliZSB0byByZXBvc2l0aW9uIGV2ZW50c1xyXG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnJlcG9zaXRpb25FdmVudC5zdWJzY3JpYmUoIHBvc2l0aW9ucyA9PiB7XHJcbiAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgc2V0VGltZW91dCggKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jbGVhckNhbnZhcygpO1xyXG4gICAgICAgICAgdGhpcy5zb3J0UG9pbnRzKCk7XHJcbiAgICAgICAgICB0aGlzLmRyYXdTaGFwZSgpO1xyXG4gICAgICAgIH0sIDEwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjbGVhcnMgdGhlIHNoYXBlIGNhbnZhc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXJDYW52YXMoKSB7XHJcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuZGltZW5zaW9ucy53aWR0aCwgdGhpcy5kaW1lbnNpb25zLmhlaWdodCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzb3J0cyB0aGUgYXJyYXkgb2YgcG9pbnRzIGFjY29yZGluZyB0byB0aGVpciBjbG9ja3dpc2UgYWxpZ25tZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzb3J0UG9pbnRzKCkge1xyXG4gICAgY29uc3QgX3BvaW50cyA9IEFycmF5LmZyb20odGhpcy5fcG9pbnRzKTtcclxuICAgIGNvbnN0IHNvcnRlZFBvaW50cyA9IFtdO1xyXG5cclxuICAgIGNvbnN0IHNvcnRPcmRlciA9IHtcclxuICAgICAgdmVydGljYWw6IFsndG9wJywgJ3RvcCcsICdib3R0b20nLCAnYm90dG9tJ10sXHJcbiAgICAgIGhvcml6b250YWw6IFsnbGVmdCcsICdyaWdodCcsICdyaWdodCcsICdsZWZ0J11cclxuICAgIH07XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgY29uc3Qgcm9sZXMgPSBBcnJheS5mcm9tKFtzb3J0T3JkZXIudmVydGljYWxbaV0sIHNvcnRPcmRlci5ob3Jpem9udGFsW2ldXSk7XHJcbiAgICAgIHNvcnRlZFBvaW50cy5wdXNoKF9wb2ludHMuZmlsdGVyKChwb2ludCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpbWl0c1NlcnZpY2UuY29tcGFyZUFycmF5KHBvaW50LnJvbGVzLCByb2xlcyk7XHJcbiAgICAgIH0pWzBdKTtcclxuXHJcbiAgICB9XHJcbiAgICB0aGlzLl9zb3J0ZWRQb2ludHMgPSBzb3J0ZWRQb2ludHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkcmF3cyBhIGxpbmUgYmV0d2VlbiB0aGUgcG9pbnRzIGFjY29yZGluZyB0byB0aGVpciBvcmRlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgZHJhd1NoYXBlKCkge1xyXG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IHRoaXMud2VpZ2h0O1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIHRoaXMuX3NvcnRlZFBvaW50cy5mb3JFYWNoKChwb2ludCwgaW5kZXgpID0+IHtcclxuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyhwb2ludC54LCBwb2ludC55KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaW5kZXggIT09IHRoaXMuX3NvcnRlZFBvaW50cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgY29uc3QgbmV4dFBvaW50ID0gdGhpcy5fc29ydGVkUG9pbnRzW2luZGV4ICsgMV07XHJcbiAgICAgICAgY3R4LmxpbmVUbyhuZXh0UG9pbnQueCwgbmV4dFBvaW50LnkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuIl19