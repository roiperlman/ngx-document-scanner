/**
 * @fileoverview added by tsickle
 * Generated from: lib/components/shape-outline/ngx-shape-outline.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.limitsService.positions.subscribe((/**
         * @param {?} positions
         * @return {?}
         */
        positions => {
            if (positions.length === 4) {
                this._points = positions;
                this.sortPoints();
                this.clearCanvas();
                this.drawShape();
            }
        }));
        // subscribe to changes in the pane's dimensions
        this.limitsService.paneDimensions.subscribe((/**
         * @param {?} dimensions
         * @return {?}
         */
        dimensions => {
            this.clearCanvas();
            this.canvas.nativeElement.width = dimensions.width;
            this.canvas.nativeElement.height = dimensions.height;
        }));
        // subscribe to reposition events
        this.limitsService.repositionEvent.subscribe((/**
         * @param {?} positions
         * @return {?}
         */
        positions => {
            if (positions.length === 4) {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.clearCanvas();
                    this.sortPoints();
                    this.drawShape();
                }), 10);
            }
        }));
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
            sortedPoints.push(_points.filter((/**
             * @param {?} point
             * @return {?}
             */
            (point) => {
                return this.limitsService.compareArray(point.roles, roles);
            }))[0]);
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
        this._sortedPoints.forEach((/**
         * @param {?} point
         * @param {?} index
         * @return {?}
         */
        (point, index) => {
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
        }));
        ctx.stroke();
    }
}
NgxShapeOutlineComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-shape-outine',
                template: "<canvas #outline\n        style=\"position: absolute; z-index: 1000\"\n        [ngStyle]=\"{width: dimensions.width + 'px', height: dimensions.height + 'px'}\"\n        *ngIf=\"dimensions\">\n</canvas>\n"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNoYXBlLW91dGxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRvY3VtZW50LXNjYW5uZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zaGFwZS1vdXRsaW5lL25neC1zaGFwZS1vdXRsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGFBQWEsRUFBc0IsTUFBTSwrQkFBK0IsQ0FBQztBQU9qRixNQUFNLE9BQU8sd0JBQXdCOzs7O0lBU25DLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBUHZDLFVBQUssR0FBRyxTQUFTLENBQUM7SUFPd0IsQ0FBQzs7OztJQUVwRCxlQUFlO1FBQ2IsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUzs7OztRQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2pELElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO2dCQUN6QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMs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QUMsQ0FBQzthQUM5QjtZQUNELElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7c0JBQ3JDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQy9DLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEM7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2pCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDOzs7WUFqR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHVOQUFpRDthQUNsRDs7OztZQU5PLGFBQWE7OztvQkFTbEIsS0FBSztxQkFDTCxLQUFLO3lCQUNMLEtBQUs7cUJBQ0wsU0FBUyxTQUFDLFNBQVM7Ozs7SUFIcEIseUNBQTJCOztJQUMzQiwwQ0FBd0I7O0lBQ3hCLDhDQUFxQzs7SUFDckMsMENBQTZCOzs7OztJQUU3QiwyQ0FBNEM7Ozs7O0lBQzVDLGlEQUFrRDs7Ozs7SUFDdEMsaURBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMaW1pdHNTZXJ2aWNlLCBQb2ludFBvc2l0aW9uQ2hhbmdlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9saW1pdHMuc2VydmljZSc7XG5pbXBvcnQge0ltYWdlRGltZW5zaW9uc30gZnJvbSAnLi4vLi4vUHVibGljTW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXNoYXBlLW91dGluZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtc2hhcGUtb3V0bGluZS5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE5neFNoYXBlT3V0bGluZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIGNvbG9yID0gJyMzY2FiZTInO1xuICBASW5wdXQoKSB3ZWlnaHQ6IG51bWJlcjtcbiAgQElucHV0KCkgZGltZW5zaW9uczogSW1hZ2VEaW1lbnNpb25zO1xuICBAVmlld0NoaWxkKCdvdXRsaW5lJykgY2FudmFzO1xuXG4gIHByaXZhdGUgX3BvaW50czogQXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT47XG4gIHByaXZhdGUgX3NvcnRlZFBvaW50czogQXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT47XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGltaXRzU2VydmljZTogTGltaXRzU2VydmljZSkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gaW5pdCBkcmF3aW5nIGNhbnZhcyBkaW1lbnNpb25zXG4gICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC53aWR0aCA9IHRoaXMuZGltZW5zaW9ucy53aWR0aDtcbiAgICB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50LmhlaWdodCA9IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBvc2l0aW9ucy5zdWJzY3JpYmUocG9zaXRpb25zID0+IHtcbiAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHBvc2l0aW9ucztcbiAgICAgICAgdGhpcy5zb3J0UG9pbnRzKCk7XG4gICAgICAgIHRoaXMuY2xlYXJDYW52YXMoKTtcbiAgICAgICAgdGhpcy5kcmF3U2hhcGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBzdWJzY3JpYmUgdG8gY2hhbmdlcyBpbiB0aGUgcGFuZSdzIGRpbWVuc2lvbnNcbiAgICB0aGlzLmxpbWl0c1NlcnZpY2UucGFuZURpbWVuc2lvbnMuc3Vic2NyaWJlKGRpbWVuc2lvbnMgPT4ge1xuICAgICAgdGhpcy5jbGVhckNhbnZhcygpO1xuICAgICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudC53aWR0aCA9IGRpbWVuc2lvbnMud2lkdGg7XG4gICAgICB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50LmhlaWdodCA9IGRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgIH0pO1xuICAgIC8vIHN1YnNjcmliZSB0byByZXBvc2l0aW9uIGV2ZW50c1xuICAgIHRoaXMubGltaXRzU2VydmljZS5yZXBvc2l0aW9uRXZlbnQuc3Vic2NyaWJlKCBwb3NpdGlvbnMgPT4ge1xuICAgICAgaWYgKHBvc2l0aW9ucy5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgc2V0VGltZW91dCggKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXMoKTtcbiAgICAgICAgICB0aGlzLnNvcnRQb2ludHMoKTtcbiAgICAgICAgICB0aGlzLmRyYXdTaGFwZSgpO1xuICAgICAgICB9LCAxMCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogY2xlYXJzIHRoZSBzaGFwZSBjYW52YXNcbiAgICovXG4gIHByaXZhdGUgY2xlYXJDYW52YXMoKSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuZGltZW5zaW9ucy53aWR0aCwgdGhpcy5kaW1lbnNpb25zLmhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogc29ydHMgdGhlIGFycmF5IG9mIHBvaW50cyBhY2NvcmRpbmcgdG8gdGhlaXIgY2xvY2t3aXNlIGFsaWdubWVudFxuICAgKi9cbiAgcHJpdmF0ZSBzb3J0UG9pbnRzKCkge1xuICAgIGNvbnN0IF9wb2ludHMgPSBBcnJheS5mcm9tKHRoaXMuX3BvaW50cyk7XG4gICAgY29uc3Qgc29ydGVkUG9pbnRzID0gW107XG5cbiAgICBjb25zdCBzb3J0T3JkZXIgPSB7XG4gICAgICB2ZXJ0aWNhbDogWyd0b3AnLCAndG9wJywgJ2JvdHRvbScsICdib3R0b20nXSxcbiAgICAgIGhvcml6b250YWw6IFsnbGVmdCcsICdyaWdodCcsICdyaWdodCcsICdsZWZ0J11cbiAgICB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIGNvbnN0IHJvbGVzID0gQXJyYXkuZnJvbShbc29ydE9yZGVyLnZlcnRpY2FsW2ldLCBzb3J0T3JkZXIuaG9yaXpvbnRhbFtpXV0pO1xuICAgICAgc29ydGVkUG9pbnRzLnB1c2goX3BvaW50cy5maWx0ZXIoKHBvaW50KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpbWl0c1NlcnZpY2UuY29tcGFyZUFycmF5KHBvaW50LnJvbGVzLCByb2xlcyk7XG4gICAgICB9KVswXSk7XG5cbiAgICB9XG4gICAgdGhpcy5fc29ydGVkUG9pbnRzID0gc29ydGVkUG9pbnRzO1xuICB9XG5cbiAgLyoqXG4gICAqIGRyYXdzIGEgbGluZSBiZXR3ZWVuIHRoZSBwb2ludHMgYWNjb3JkaW5nIHRvIHRoZWlyIG9yZGVyXG4gICAqL1xuICBwcml2YXRlIGRyYXdTaGFwZSgpIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLndlaWdodDtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLl9zb3J0ZWRQb2ludHMuZm9yRWFjaCgocG9pbnQsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgY3R4Lm1vdmVUbyhwb2ludC54LCBwb2ludC55KTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCAhPT0gdGhpcy5fc29ydGVkUG9pbnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgY29uc3QgbmV4dFBvaW50ID0gdGhpcy5fc29ydGVkUG9pbnRzW2luZGV4ICsgMV07XG4gICAgICAgIGN0eC5saW5lVG8obmV4dFBvaW50LngsIG5leHRQb2ludC55KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cbn1cblxuXG4iXX0=