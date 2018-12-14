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
                template: "<canvas #outline\n        style=\"position: fixed; z-index: 1000\"\n        [ngStyle]=\"{width: dimensions.width + 'px', height: dimensions.height + 'px'}\"\n        *ngIf=\"dimensions\">\n</canvas>\n"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFwZS1vdXRsaW5lL25neC1zaGFwZS1vdXRsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUMsYUFBYSxFQUFzQixNQUFNLCtCQUErQixDQUFDO0FBT2pGLE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFTbkMsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFQdkMsVUFBSyxHQUFHLFNBQVMsQ0FBQztJQU93QixDQUFDOzs7O0lBRXBELGVBQWU7UUFDYixpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUMxRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDakQsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxTQUFT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QUFJLEtBQUssS0FBSyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O3NCQUNyQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNqQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2YsQ0FBQzs7O1lBakdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixvTkFBaUQ7YUFDbEQ7Ozs7WUFOTyxhQUFhOzs7b0JBU2xCLEtBQUs7cUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3FCQUNMLFNBQVMsU0FBQyxTQUFTOzs7O0lBSHBCLHlDQUEyQjs7SUFDM0IsMENBQXdCOztJQUN4Qiw4Q0FBcUM7O0lBQ3JDLDBDQUE2Qjs7Ozs7SUFFN0IsMkNBQTRDOzs7OztJQUM1QyxpREFBa0Q7Ozs7O0lBQ3RDLGlEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TGltaXRzU2VydmljZSwgUG9pbnRQb3NpdGlvbkNoYW5nZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvbGltaXRzLnNlcnZpY2UnO1xuaW1wb3J0IHtJbWFnZURpbWVuc2lvbnN9IGZyb20gJy4uLy4uL1B1YmxpY01vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1zaGFwZS1vdXRpbmUnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hTaGFwZU91dGxpbmVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKSBjb2xvciA9ICcjM2NhYmUyJztcbiAgQElucHV0KCkgd2VpZ2h0OiBudW1iZXI7XG4gIEBJbnB1dCgpIGRpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucztcbiAgQFZpZXdDaGlsZCgnb3V0bGluZScpIGNhbnZhcztcblxuICBwcml2YXRlIF9wb2ludHM6IEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+O1xuICBwcml2YXRlIF9zb3J0ZWRQb2ludHM6IEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxpbWl0c1NlcnZpY2U6IExpbWl0c1NlcnZpY2UpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIGluaXQgZHJhd2luZyBjYW52YXMgZGltZW5zaW9uc1xuICAgIHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQud2lkdGggPSB0aGlzLmRpbWVuc2lvbnMud2lkdGg7XG4gICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC5oZWlnaHQgPSB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgIHRoaXMubGltaXRzU2VydmljZS5wb3NpdGlvbnMuc3Vic2NyaWJlKHBvc2l0aW9ucyA9PiB7XG4gICAgICBpZiAocG9zaXRpb25zLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSBwb3NpdGlvbnM7XG4gICAgICAgIHRoaXMuc29ydFBvaW50cygpO1xuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKCk7XG4gICAgICAgIHRoaXMuZHJhd1NoYXBlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gc3Vic2NyaWJlIHRvIGNoYW5nZXMgaW4gdGhlIHBhbmUncyBkaW1lbnNpb25zXG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBhbmVEaW1lbnNpb25zLnN1YnNjcmliZShkaW1lbnNpb25zID0+IHtcbiAgICAgIHRoaXMuY2xlYXJDYW52YXMoKTtcbiAgICAgIHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQud2lkdGggPSBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC5oZWlnaHQgPSBkaW1lbnNpb25zLmhlaWdodDtcbiAgICB9KTtcbiAgICAvLyBzdWJzY3JpYmUgdG8gcmVwb3NpdGlvbiBldmVudHNcbiAgICB0aGlzLmxpbWl0c1NlcnZpY2UucmVwb3NpdGlvbkV2ZW50LnN1YnNjcmliZSggcG9zaXRpb25zID0+IHtcbiAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKCk7XG4gICAgICAgICAgdGhpcy5zb3J0UG9pbnRzKCk7XG4gICAgICAgICAgdGhpcy5kcmF3U2hhcGUoKTtcbiAgICAgICAgfSwgMTApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNsZWFycyB0aGUgc2hhcGUgY2FudmFzXG4gICAqL1xuICBwcml2YXRlIGNsZWFyQ2FudmFzKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmRpbWVuc2lvbnMud2lkdGgsIHRoaXMuZGltZW5zaW9ucy5oZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNvcnRzIHRoZSBhcnJheSBvZiBwb2ludHMgYWNjb3JkaW5nIHRvIHRoZWlyIGNsb2Nrd2lzZSBhbGlnbm1lbnRcbiAgICovXG4gIHByaXZhdGUgc29ydFBvaW50cygpIHtcbiAgICBjb25zdCBfcG9pbnRzID0gQXJyYXkuZnJvbSh0aGlzLl9wb2ludHMpO1xuICAgIGNvbnN0IHNvcnRlZFBvaW50cyA9IFtdO1xuXG4gICAgY29uc3Qgc29ydE9yZGVyID0ge1xuICAgICAgdmVydGljYWw6IFsndG9wJywgJ3RvcCcsICdib3R0b20nLCAnYm90dG9tJ10sXG4gICAgICBob3Jpem9udGFsOiBbJ2xlZnQnLCAncmlnaHQnLCAncmlnaHQnLCAnbGVmdCddXG4gICAgfTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICBjb25zdCByb2xlcyA9IEFycmF5LmZyb20oW3NvcnRPcmRlci52ZXJ0aWNhbFtpXSwgc29ydE9yZGVyLmhvcml6b250YWxbaV1dKTtcbiAgICAgIHNvcnRlZFBvaW50cy5wdXNoKF9wb2ludHMuZmlsdGVyKChwb2ludCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5saW1pdHNTZXJ2aWNlLmNvbXBhcmVBcnJheShwb2ludC5yb2xlcywgcm9sZXMpO1xuICAgICAgfSlbMF0pO1xuXG4gICAgfVxuICAgIHRoaXMuX3NvcnRlZFBvaW50cyA9IHNvcnRlZFBvaW50cztcbiAgfVxuXG4gIC8qKlxuICAgKiBkcmF3cyBhIGxpbmUgYmV0d2VlbiB0aGUgcG9pbnRzIGFjY29yZGluZyB0byB0aGVpciBvcmRlclxuICAgKi9cbiAgcHJpdmF0ZSBkcmF3U2hhcGUoKSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHgubGluZVdpZHRoID0gdGhpcy53ZWlnaHQ7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5fc29ydGVkUG9pbnRzLmZvckVhY2goKHBvaW50LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIGN0eC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSk7XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXggIT09IHRoaXMuX3NvcnRlZFBvaW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgIGNvbnN0IG5leHRQb2ludCA9IHRoaXMuX3NvcnRlZFBvaW50c1tpbmRleCArIDFdO1xuICAgICAgICBjdHgubGluZVRvKG5leHRQb2ludC54LCBuZXh0UG9pbnQueSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG59XG5cblxuIl19