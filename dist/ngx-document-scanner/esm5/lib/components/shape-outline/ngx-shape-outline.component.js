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
                    template: "<canvas #outline\n        style=\"position: fixed; z-index: 1000\"\n        [ngStyle]=\"{width: dimensions.width + 'px', height: dimensions.height + 'px'}\"\n        *ngIf=\"dimensions\">\n</canvas>\n"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFwZS1vdXRsaW5lL25neC1zaGFwZS1vdXRsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUMsYUFBYSxFQUFzQixNQUFNLCtCQUErQixDQUFDO0FBR2pGO0lBYUUsa0NBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBUHZDLFVBQUssR0FBRyxTQUFTLENBQUM7SUFPd0IsQ0FBQzs7OztJQUVwRCxrREFBZTs7O0lBQWY7UUFBQSxpQkE0QkM7UUEzQkMsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQUEsU0FBUztZQUM5QyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUMxQixLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FB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QUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUI7WUFDRCxJQUFJLEtBQUssS0FBSyxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O29CQUNyQyxTQUFTLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNqQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2YsQ0FBQzs7Z0JBakdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixvTkFBaUQ7aUJBQ2xEOzs7O2dCQU5PLGFBQWE7Ozt3QkFTbEIsS0FBSzt5QkFDTCxLQUFLOzZCQUNMLEtBQUs7eUJBQ0wsU0FBUyxTQUFDLFNBQVM7O0lBeUZ0QiwrQkFBQztDQUFBLEFBbEdELElBa0dDO1NBOUZZLHdCQUF3Qjs7O0lBRW5DLHlDQUEyQjs7SUFDM0IsMENBQXdCOztJQUN4Qiw4Q0FBcUM7O0lBQ3JDLDBDQUE2Qjs7Ozs7SUFFN0IsMkNBQTRDOzs7OztJQUM1QyxpREFBa0Q7Ozs7O0lBQ3RDLGlEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TGltaXRzU2VydmljZSwgUG9pbnRQb3NpdGlvbkNoYW5nZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvbGltaXRzLnNlcnZpY2UnO1xuaW1wb3J0IHtJbWFnZURpbWVuc2lvbnN9IGZyb20gJy4uLy4uL1B1YmxpY01vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1zaGFwZS1vdXRpbmUnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hTaGFwZU91dGxpbmVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKSBjb2xvciA9ICcjM2NhYmUyJztcbiAgQElucHV0KCkgd2VpZ2h0OiBudW1iZXI7XG4gIEBJbnB1dCgpIGRpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucztcbiAgQFZpZXdDaGlsZCgnb3V0bGluZScpIGNhbnZhcztcblxuICBwcml2YXRlIF9wb2ludHM6IEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+O1xuICBwcml2YXRlIF9zb3J0ZWRQb2ludHM6IEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxpbWl0c1NlcnZpY2U6IExpbWl0c1NlcnZpY2UpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIGluaXQgZHJhd2luZyBjYW52YXMgZGltZW5zaW9uc1xuICAgIHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQud2lkdGggPSB0aGlzLmRpbWVuc2lvbnMud2lkdGg7XG4gICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC5oZWlnaHQgPSB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgIHRoaXMubGltaXRzU2VydmljZS5wb3NpdGlvbnMuc3Vic2NyaWJlKHBvc2l0aW9ucyA9PiB7XG4gICAgICBpZiAocG9zaXRpb25zLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSBwb3NpdGlvbnM7XG4gICAgICAgIHRoaXMuc29ydFBvaW50cygpO1xuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKCk7XG4gICAgICAgIHRoaXMuZHJhd1NoYXBlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gc3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gdGhlIHBhbmUncyBkaW1lbnNpb25zXG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBhbmVEaW1lbnNpb25zLnN1YnNjcmliZShkaW1lbnNpb25zID0+IHtcbiAgICAgIHRoaXMuY2xlYXJDYW52YXMoKTtcbiAgICAgIHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQud2lkdGggPSBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC5oZWlnaHQgPSBkaW1lbnNpb25zLmhlaWdodDtcbiAgICB9KTtcbiAgICAvLyBzdWJzY3JpYmUgdG8gcmVwb3NpdGlvbiBldmVudHNcbiAgICB0aGlzLmxpbWl0c1NlcnZpY2UucmVwb3NpdGlvbkV2ZW50LnN1YnNjcmliZSggcG9zaXRpb25zID0+IHtcbiAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKCk7XG4gICAgICAgICAgdGhpcy5zb3J0UG9pbnRzKCk7XG4gICAgICAgICAgdGhpcy5kcmF3U2hhcGUoKTtcbiAgICAgICAgfSwgMTApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNsZWFycyB0aGUgc2hhcGUgY2FudmFzXG4gICAqL1xuICBwcml2YXRlIGNsZWFyQ2FudmFzKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmRpbWVuc2lvbnMud2lkdGgsIHRoaXMuZGltZW5zaW9ucy5oZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNvcnRzIHRoZSBhcnJheSBvZiBwb2ludHMgYWNjb3JkaW5nIHRvIHRoZWlyIGNsb2Nrd2lzZSBhbGlnbm1lbnRcbiAgICovXG4gIHByaXZhdGUgc29ydFBvaW50cygpIHtcbiAgICBjb25zdCBfcG9pbnRzID0gQXJyYXkuZnJvbSh0aGlzLl9wb2ludHMpO1xuICAgIGNvbnN0IHNvcnRlZFBvaW50cyA9IFtdO1xuXG4gICAgY29uc3Qgc29ydE9yZGVyID0ge1xuICAgICAgdmVydGljYWw6IFsndG9wJywgJ3RvcCcsICdib3R0b20nLCAnYm90dG9tJ10sXG4gICAgICBob3Jpem9udGFsOiBbJ2xlZnQnLCAncmlnaHQnLCAncmlnaHQnLCAnbGVmdCddXG4gICAgfTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICBjb25zdCByb2xlcyA9IEFycmF5LmZyb20oW3NvcnRPcmRlci52ZXJ0aWNhbFtpXSwgc29ydE9yZGVyLmhvcml6b250YWxbaV1dKTtcbiAgICAgIHNvcnRlZFBvaW50cy5wdXNoKF9wb2ludHMuZmlsdGVyKChwb2ludCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5saW1pdHNTZXJ2aWNlLmNvbXBhcmVBcnJheShwb2ludC5yb2xlcywgcm9sZXMpO1xuICAgICAgfSlbMF0pO1xuXG4gICAgfVxuICAgIHRoaXMuX3NvcnRlZFBvaW50cyA9IHNvcnRlZFBvaW50cztcbiAgfVxuXG4gIC8qKlxuICAgKiBkcmF3cyBhIGxpbmUgYmV0d2VlbiB0aGUgcG9pbnRzIGFjY29yZGluZyB0byB0aGVpciBvcmRlclxuICAgKi9cbiAgcHJpdmF0ZSBkcmF3U2hhcGUoKSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHgubGluZVdpZHRoID0gdGhpcy53ZWlnaHQ7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5fc29ydGVkUG9pbnRzLmZvckVhY2goKHBvaW50LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIGN0eC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSk7XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXggIT09IHRoaXMuX3NvcnRlZFBvaW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgIGNvbnN0IG5leHRQb2ludCA9IHRoaXMuX3NvcnRlZFBvaW50c1tpbmRleCArIDFdO1xuICAgICAgICBjdHgubGluZVRvKG5leHRQb2ludC54LCBuZXh0UG9pbnQueSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG59XG5cblxuIl19