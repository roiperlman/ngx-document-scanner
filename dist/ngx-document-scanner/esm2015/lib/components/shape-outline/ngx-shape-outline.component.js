/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { LimitsService } from '../../services/limits.service';
export class NgxShapeOutlineComponent {
    /**
     * @param {?} limitsService
     */
    constructor(limitsService) {
        this.limitsService = limitsService;
        this.color = '#3cabe2';
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // init drawing canvas dimensions
        this.canvas.nativeElement.width = this.dimensions.width;
        this.canvas.nativeElement.height = this.dimensions.height;
        this.limitsService.positions.subscribe(positions => {
            if (positions.length === 4) {
                this._points = positions;
                this.sortPoints();
                this.clearCanvas();
                this.drawShape();
            }
        });
        // subscribe to changes in the pane's dimensions
        this.limitsService.paneDimensions.subscribe(dimensions => {
            this.clearCanvas();
            this.canvas.nativeElement.width = dimensions.width;
            this.canvas.nativeElement.height = dimensions.height;
        });
        // subscribe to reposition events
        this.limitsService.repositionEvent.subscribe(positions => {
            if (positions.length === 4) {
                setTimeout(() => {
                    this.clearCanvas();
                    this.sortPoints();
                    this.drawShape();
                }, 10);
            }
        });
    }
    /**
     * clears the shape canvas
     * @private
     * @return {?}
     */
    clearCanvas() {
        /** @type {?} */
        const canvas = this.canvas.nativeElement;
        /** @type {?} */
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    }
    /**
     * sorts the array of points according to their clockwise alignment
     * @private
     * @return {?}
     */
    sortPoints() {
        /** @type {?} */
        const _points = Array.from(this._points);
        /** @type {?} */
        const sortedPoints = [];
        /** @type {?} */
        const sortOrder = {
            vertical: ['top', 'top', 'bottom', 'bottom'],
            horizontal: ['left', 'right', 'right', 'left']
        };
        for (let i = 0; i < 4; i++) {
            /** @type {?} */
            const roles = Array.from([sortOrder.vertical[i], sortOrder.horizontal[i]]);
            sortedPoints.push(_points.filter((point) => {
                return this.limitsService.compareArray(point.roles, roles);
            })[0]);
        }
        this._sortedPoints = sortedPoints;
    }
    /**
     * draws a line between the points according to their order
     * @private
     * @return {?}
     */
    drawShape() {
        /** @type {?} */
        const canvas = this.canvas.nativeElement;
        /** @type {?} */
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = this.weight;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        this._sortedPoints.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            }
            if (index !== this._sortedPoints.length - 1) {
                /** @type {?} */
                const nextPoint = this._sortedPoints[index + 1];
                ctx.lineTo(nextPoint.x, nextPoint.y);
            }
            else {
                ctx.closePath();
            }
        });
        ctx.stroke();
    }
}
NgxShapeOutlineComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-shape-outine',
                template: "<canvas #outline\r\n        style=\"position: absolute; z-index: 1000\"\r\n        [ngStyle]=\"{width: dimensions.width + 'px', height: dimensions.height + 'px'}\"\r\n        *ngIf=\"dimensions\">\r\n</canvas>\r\n"
            }] }
];
/** @nocollapse */
NgxShapeOutlineComponent.ctorParameters = () => [
    { type: LimitsService }
];
NgxShapeOutlineComponent.propDecorators = {
    color: [{ type: Input }],
    weight: [{ type: Input }],
    dimensions: [{ type: Input }],
    canvas: [{ type: ViewChild, args: ['outline',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFwZS1vdXRsaW5lL25neC1zaGFwZS1vdXRsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUMsYUFBYSxFQUFzQixNQUFNLCtCQUErQixDQUFDO0FBT2pGLE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFTbkMsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFQdkMsVUFBSyxHQUFHLFNBQVMsQ0FBQztJQU93QixDQUFDOzs7O0lBRXBELGVBQWU7UUFDYixpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUMxRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDakQsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxTQUFT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QUFJLEtBQUssS0FBSyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O3NCQUNyQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNqQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2YsQ0FBQzs7O1lBakdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixpT0FBaUQ7YUFDbEQ7Ozs7WUFOTyxhQUFhOzs7b0JBU2xCLEtBQUs7cUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3FCQUNMLFNBQVMsU0FBQyxTQUFTOzs7O0lBSHBCLHlDQUEyQjs7SUFDM0IsMENBQXdCOztJQUN4Qiw4Q0FBcUM7O0lBQ3JDLDBDQUE2Qjs7Ozs7SUFFN0IsMkNBQTRDOzs7OztJQUM1QyxpREFBa0Q7Ozs7O0lBQ3RDLGlEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtMaW1pdHNTZXJ2aWNlLCBQb2ludFBvc2l0aW9uQ2hhbmdlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9saW1pdHMuc2VydmljZSc7XHJcbmltcG9ydCB7SW1hZ2VEaW1lbnNpb25zfSBmcm9tICcuLi8uLi9QdWJsaWNNb2RlbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtc2hhcGUtb3V0aW5lJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4U2hhcGVPdXRsaW5lQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIEBJbnB1dCgpIGNvbG9yID0gJyMzY2FiZTInO1xyXG4gIEBJbnB1dCgpIHdlaWdodDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGRpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucztcclxuICBAVmlld0NoaWxkKCdvdXRsaW5lJykgY2FudmFzO1xyXG5cclxuICBwcml2YXRlIF9wb2ludHM6IEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+O1xyXG4gIHByaXZhdGUgX3NvcnRlZFBvaW50czogQXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT47XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsaW1pdHNTZXJ2aWNlOiBMaW1pdHNTZXJ2aWNlKSB7fVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAvLyBpbml0IGRyYXdpbmcgY2FudmFzIGRpbWVuc2lvbnNcclxuICAgIHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQud2lkdGggPSB0aGlzLmRpbWVuc2lvbnMud2lkdGg7XHJcbiAgICB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50LmhlaWdodCA9IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQ7XHJcbiAgICB0aGlzLmxpbWl0c1NlcnZpY2UucG9zaXRpb25zLnN1YnNjcmliZShwb3NpdGlvbnMgPT4ge1xyXG4gICAgICBpZiAocG9zaXRpb25zLmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHBvc2l0aW9ucztcclxuICAgICAgICB0aGlzLnNvcnRQb2ludHMoKTtcclxuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3U2hhcGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgcGFuZSdzIGRpbWVuc2lvbnNcclxuICAgIHRoaXMubGltaXRzU2VydmljZS5wYW5lRGltZW5zaW9ucy5zdWJzY3JpYmUoZGltZW5zaW9ucyA9PiB7XHJcbiAgICAgIHRoaXMuY2xlYXJDYW52YXMoKTtcclxuICAgICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC53aWR0aCA9IGRpbWVuc2lvbnMud2lkdGg7XHJcbiAgICAgIHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0ID0gZGltZW5zaW9ucy5oZWlnaHQ7XHJcbiAgICB9KTtcclxuICAgIC8vIHN1YnNjcmliZSB0byByZXBvc2l0aW9uIGV2ZW50c1xyXG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnJlcG9zaXRpb25FdmVudC5zdWJzY3JpYmUoIHBvc2l0aW9ucyA9PiB7XHJcbiAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgc2V0VGltZW91dCggKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jbGVhckNhbnZhcygpO1xyXG4gICAgICAgICAgdGhpcy5zb3J0UG9pbnRzKCk7XHJcbiAgICAgICAgICB0aGlzLmRyYXdTaGFwZSgpO1xyXG4gICAgICAgIH0sIDEwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjbGVhcnMgdGhlIHNoYXBlIGNhbnZhc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXJDYW52YXMoKSB7XHJcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuZGltZW5zaW9ucy53aWR0aCwgdGhpcy5kaW1lbnNpb25zLmhlaWdodCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzb3J0cyB0aGUgYXJyYXkgb2YgcG9pbnRzIGFjY29yZGluZyB0byB0aGVpciBjbG9ja3dpc2UgYWxpZ25tZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzb3J0UG9pbnRzKCkge1xyXG4gICAgY29uc3QgX3BvaW50cyA9IEFycmF5LmZyb20odGhpcy5fcG9pbnRzKTtcclxuICAgIGNvbnN0IHNvcnRlZFBvaW50cyA9IFtdO1xyXG5cclxuICAgIGNvbnN0IHNvcnRPcmRlciA9IHtcclxuICAgICAgdmVydGljYWw6IFsndG9wJywgJ3RvcCcsICdib3R0b20nLCAnYm90dG9tJ10sXHJcbiAgICAgIGhvcml6b250YWw6IFsnbGVmdCcsICdyaWdodCcsICdyaWdodCcsICdsZWZ0J11cclxuICAgIH07XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgY29uc3Qgcm9sZXMgPSBBcnJheS5mcm9tKFtzb3J0T3JkZXIudmVydGljYWxbaV0sIHNvcnRPcmRlci5ob3Jpem9udGFsW2ldXSk7XHJcbiAgICAgIHNvcnRlZFBvaW50cy5wdXNoKF9wb2ludHMuZmlsdGVyKChwb2ludCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpbWl0c1NlcnZpY2UuY29tcGFyZUFycmF5KHBvaW50LnJvbGVzLCByb2xlcyk7XHJcbiAgICAgIH0pWzBdKTtcclxuXHJcbiAgICB9XHJcbiAgICB0aGlzLl9zb3J0ZWRQb2ludHMgPSBzb3J0ZWRQb2ludHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkcmF3cyBhIGxpbmUgYmV0d2VlbiB0aGUgcG9pbnRzIGFjY29yZGluZyB0byB0aGVpciBvcmRlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgZHJhd1NoYXBlKCkge1xyXG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IHRoaXMud2VpZ2h0O1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIHRoaXMuX3NvcnRlZFBvaW50cy5mb3JFYWNoKChwb2ludCwgaW5kZXgpID0+IHtcclxuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyhwb2ludC54LCBwb2ludC55KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaW5kZXggIT09IHRoaXMuX3NvcnRlZFBvaW50cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgY29uc3QgbmV4dFBvaW50ID0gdGhpcy5fc29ydGVkUG9pbnRzW2luZGV4ICsgMV07XHJcbiAgICAgICAgY3R4LmxpbmVUbyhuZXh0UG9pbnQueCwgbmV4dFBvaW50LnkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuIl19