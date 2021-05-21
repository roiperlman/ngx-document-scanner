/**
 * @fileoverview added by tsickle
 * Generated from: lib/components/draggable-point/ngx-draggable-point.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { LimitsService, PositionChangeData } from '../../services/limits.service';
export class NgxDraggablePointComponent {
    /**
     * @param {?} limitsService
     */
    constructor(limitsService) {
        this.limitsService = limitsService;
        this.width = 10;
        this.height = 10;
        this.color = '#3cabe2';
        this.shape = 'rect';
        this.pointOptions = 'rect';
        this.position = {
            x: 0,
            y: 0
        };
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        Object.keys(this.pointOptions).forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            this[key] = this.pointOptions[key];
        }));
        // subscribe to pane dimensions changes
        this.limitsService.paneDimensions.subscribe((/**
         * @param {?} dimensions
         * @return {?}
         */
        dimensions => {
            if (dimensions.width > 0 && dimensions.width > 0) {
                this._paneDimensions = {
                    width: dimensions.width,
                    height: dimensions.height
                };
                this.position = this.getInitialPosition(dimensions);
                this.limitsService.positionChange(new PositionChangeData(this.position, this.limitRoles));
            }
        }));
        // subscribe to external reposition events
        this.limitsService.repositionEvent.subscribe((/**
         * @param {?} positions
         * @return {?}
         */
        positions => {
            if (positions.length > 0) {
                this.externalReposition(positions);
            }
        }));
    }
    /**
     * returns a css style object for the point
     * @return {?}
     */
    pointStyle() {
        return {
            width: this.width + 'px',
            height: this.height + 'px',
            'background-color': this.color,
            'border-radius': this.shape === 'circle' ? '100%' : 0,
            position: 'absolute'
        };
    }
    /**
     * registers a position change on the limits service, and adjusts position if necessary
     * @param {?} position - the current position of the point
     * @return {?}
     */
    positionChange(position) {
        /** @type {?} */
        const positionChangeData = new PositionChangeData(position, this.limitRoles);
        /** @type {?} */
        const limitException = this.limitsService.exceedsLimit(positionChangeData);
        if (limitException.exceeds) {
            // if exceeds limits, reposition
            this.resetPosition = limitException.resetCoordinates;
        }
        else {
            this.limitsService.positionChange(positionChangeData);
            this._currentPosition = position;
        }
    }
    /**
     * adjusts the position of the point after a limit exception
     * @private
     * @param {?} limitException
     * @return {?}
     */
    adjustPosition(limitException) {
        /** @type {?} */
        const newPosition = {
            x: 0,
            y: 0
        };
        Object.keys(this.startPosition).forEach((/**
         * @param {?} axis
         * @return {?}
         */
        axis => {
            newPosition[axis] = limitException.resetCoordinates[axis] + limitException.resetCoefficients[axis];
        }));
        this.position = newPosition;
        this.limitsService.positionChange(new PositionChangeData(this.position, this.limitRoles));
    }
    /**
     * called on movement end, checks if last position exceeded the limits ad adjusts
     * @param {?} position
     * @return {?}
     */
    movementEnd(position) {
        /** @type {?} */
        let positionChangeData = new PositionChangeData(position, this.limitRoles);
        /** @type {?} */
        const limitException = this.limitsService.exceedsLimit(positionChangeData);
        if (limitException.exceeds) {
            this.resetPosition = limitException.resetCoordinates;
            if (limitException.exceeds) {
                this.adjustPosition(limitException);
                positionChangeData = new PositionChangeData(this.position, this.limitRoles);
                this.limitsService.updatePosition(positionChangeData);
            }
        }
    }
    /**
     * calculates the initial positions of the point by it's roles
     * @private
     * @param {?} dimensions - dimensions of the pane in which the point is located
     * @return {?}
     */
    getInitialPosition(dimensions) {
        return {
            x: this.limitRoles.includes('left') ? 0 : dimensions.width - this.width / 2,
            y: this.limitRoles.includes('top') ? 0 : dimensions.height - this.height / 2
        };
    }
    /**
     * repositions the point after an external reposition event
     * @private
     * @param {?} positions - an array of all points on the pane
     * @return {?}
     */
    externalReposition(positions) {
        positions.forEach((/**
         * @param {?} position
         * @return {?}
         */
        position => {
            if (this.limitsService.compareArray(this.limitRoles, position.roles)) {
                position = this.enforcePaneLimits(position);
                this.position = {
                    x: position.x,
                    y: position.y
                };
            }
        }));
    }
    /**
     * returns a new point position if the movement exceeded the pane limit
     * @private
     * @param {?} position
     * @return {?}
     */
    enforcePaneLimits(position) {
        if (this._paneDimensions.width === 0 || this._paneDimensions.height === 0) {
            return position;
        }
        else {
            if (position.x > this._paneDimensions.width) {
                position.x = this._paneDimensions.width;
            }
            if (position.x < 0) {
                position.x = 1;
            }
            if (position.y > this._paneDimensions.height) {
                position.y = this._paneDimensions.height;
            }
            if (position.y < 0) {
                position.y = 1;
            }
        }
        return position;
    }
}
NgxDraggablePointComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-draggable-point',
                template: "<div #point ngDraggable=\"draggable\"\n     (movingOffset)=\"positionChange($event)\"\n     [ngStyle]=\"pointStyle()\"\n     [position]=\"position\"\n     [bounds]=\"container\"\n     [inBounds]=\"true\"\n     (endOffset)=\"movementEnd($event)\"\n      style=\"z-index: 1000\">\n</div>\n"
            }] }
];
/** @nocollapse */
NgxDraggablePointComponent.ctorParameters = () => [
    { type: LimitsService }
];
NgxDraggablePointComponent.propDecorators = {
    width: [{ type: Input }],
    height: [{ type: Input }],
    color: [{ type: Input }],
    shape: [{ type: Input }],
    pointOptions: [{ type: Input }],
    limitRoles: [{ type: Input }],
    startPosition: [{ type: Input }],
    container: [{ type: Input }],
    _currentPosition: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgxDraggablePointComponent.prototype.width;
    /** @type {?} */
    NgxDraggablePointComponent.prototype.height;
    /** @type {?} */
    NgxDraggablePointComponent.prototype.color;
    /** @type {?} */
    NgxDraggablePointComponent.prototype.shape;
    /** @type {?} */
    NgxDraggablePointComponent.prototype.pointOptions;
    /** @type {?} */
    NgxDraggablePointComponent.prototype.limitRoles;
    /** @type {?} */
    NgxDraggablePointComponent.prototype.startPosition;
    /** @type {?} */
    NgxDraggablePointComponent.prototype.container;
    /**
     * @type {?}
     * @private
     */
    NgxDraggablePointComponent.prototype._currentPosition;
    /** @type {?} */
    NgxDraggablePointComponent.prototype.position;
    /**
     * @type {?}
     * @private
     */
    NgxDraggablePointComponent.prototype._paneDimensions;
    /** @type {?} */
    NgxDraggablePointComponent.prototype.resetPosition;
    /**
     * @type {?}
     * @private
     */
    NgxDraggablePointComponent.prototype.limitsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyYWdnYWJsZS1wb2ludC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZG9jdW1lbnQtc2Nhbm5lci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RyYWdnYWJsZS1wb2ludC9uZ3gtZHJhZ2dhYmxlLXBvaW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUMsYUFBYSxFQUF1QixrQkFBa0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBUXJHLE1BQU0sT0FBTywwQkFBMEI7Ozs7SUFpQnJDLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBaEJ2QyxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLFVBQUssR0FBRyxTQUFTLENBQUM7UUFDbEIsVUFBSyxHQUFzQixNQUFNLENBQUM7UUFDbEMsaUJBQVksR0FBc0IsTUFBTSxDQUFDO1FBS2xELGFBQVEsR0FBZTtZQUNyQixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1NBQ0wsQ0FBQztJQUlpRCxDQUFDOzs7O0lBRXBELGVBQWU7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsQ0FBQyxFQUFDLENBQUM7UUFDSCx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsU0FBUzs7OztRQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZELElBQUksVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksVUFBVSxDQUFDLEtB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Ozs7SUFDaEMsc0RBQThDOztJQUM5Qyw4Q0FHRTs7Ozs7SUFDRixxREFBeUM7O0lBQ3pDLG1EQUEwQjs7Ozs7SUFFZCxtREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIENvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMaW1pdHNTZXJ2aWNlLCBQb2ludFBvc2l0aW9uQ2hhbmdlLCBQb3NpdGlvbkNoYW5nZURhdGF9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xpbWl0cy5zZXJ2aWNlJztcbmltcG9ydCB7SW1hZ2VEaW1lbnNpb25zfSBmcm9tICcuLi8uLi9QdWJsaWNNb2RlbHMnO1xuaW1wb3J0IHtMaW1pdEV4Y2VwdGlvbiwgWFlQb3NpdGlvbn0gZnJvbSAnLi4vLi4vUHJpdmF0ZU1vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1kcmFnZ2FibGUtcG9pbnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWRyYWdnYWJsZS1wb2ludC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE5neERyYWdnYWJsZVBvaW50Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHdpZHRoID0gMTA7XG4gIEBJbnB1dCgpIGhlaWdodCA9IDEwO1xuICBASW5wdXQoKSBjb2xvciA9ICcjM2NhYmUyJztcbiAgQElucHV0KCkgc2hhcGU6ICdyZWN0JyB8ICdjaXJjbGUnID0gJ3JlY3QnO1xuICBASW5wdXQoKSBwb2ludE9wdGlvbnM6ICdyZWN0JyB8ICdjaXJjbGUnID0gJ3JlY3QnO1xuICBASW5wdXQoKSBsaW1pdFJvbGVzOiBBcnJheTwnbGVmdCd8J3JpZ2h0J3wndG9wJ3wnYm90dG9tJz47XG4gIEBJbnB1dCgpIHN0YXJ0UG9zaXRpb246IFhZUG9zaXRpb247XG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIEBJbnB1dCgpIHByaXZhdGUgX2N1cnJlbnRQb3NpdGlvbjogWFlQb3NpdGlvbjtcbiAgcG9zaXRpb246IFhZUG9zaXRpb24gPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG4gIHByaXZhdGUgX3BhbmVEaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnM7XG4gIHJlc2V0UG9zaXRpb246IFhZUG9zaXRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsaW1pdHNTZXJ2aWNlOiBMaW1pdHNTZXJ2aWNlKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLnBvaW50T3B0aW9ucykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpc1trZXldID0gdGhpcy5wb2ludE9wdGlvbnNba2V5XTtcbiAgICB9KTtcbiAgICAvLyBzdWJzY3JpYmUgdG8gcGFuZSBkaW1lbnNpb25zIGNoYW5nZXNcbiAgICB0aGlzLmxpbWl0c1NlcnZpY2UucGFuZURpbWVuc2lvbnMuc3Vic2NyaWJlKGRpbWVuc2lvbnMgPT4ge1xuICAgICAgaWYgKGRpbWVuc2lvbnMud2lkdGggPiAwICYmIGRpbWVuc2lvbnMud2lkdGggPiAwKSB7XG4gICAgICAgIHRoaXMuX3BhbmVEaW1lbnNpb25zID0ge1xuICAgICAgICAgIHdpZHRoOiBkaW1lbnNpb25zLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogZGltZW5zaW9ucy5oZWlnaHRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuZ2V0SW5pdGlhbFBvc2l0aW9uKGRpbWVuc2lvbnMpO1xuICAgICAgICB0aGlzLmxpbWl0c1NlcnZpY2UucG9zaXRpb25DaGFuZ2UobmV3IFBvc2l0aW9uQ2hhbmdlRGF0YSh0aGlzLnBvc2l0aW9uLCB0aGlzLmxpbWl0Um9sZXMpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBzdWJzY3JpYmUgdG8gZXh0ZXJuYWwgcmVwb3NpdGlvbiBldmVudHNcbiAgICB0aGlzLmxpbWl0c1NlcnZpY2UucmVwb3NpdGlvbkV2ZW50LnN1YnNjcmliZShwb3NpdGlvbnMgPT4ge1xuICAgICAgaWYgKHBvc2l0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxSZXBvc2l0aW9uKHBvc2l0aW9ucyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhIGNzcyBzdHlsZSBvYmplY3QgZm9yIHRoZSBwb2ludFxuICAgKi9cbiAgcG9pbnRTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHRoaXMud2lkdGggKyAncHgnLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCArICdweCcsXG4gICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHRoaXMuY29sb3IsXG4gICAgICAnYm9yZGVyLXJhZGl1cyc6IHRoaXMuc2hhcGUgPT09ICdjaXJjbGUnID8gJzEwMCUnIDogMCxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZWdpc3RlcnMgYSBwb3NpdGlvbiBjaGFuZ2Ugb24gdGhlIGxpbWl0cyBzZXJ2aWNlLCBhbmQgYWRqdXN0cyBwb3NpdGlvbiBpZiBuZWNlc3NhcnlcbiAgICogQHBhcmFtIHBvc2l0aW9uIC0gdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHBvaW50XG4gICAqL1xuICBwb3NpdGlvbkNoYW5nZShwb3NpdGlvbjogWFlQb3NpdGlvbikge1xuICAgIGNvbnN0IHBvc2l0aW9uQ2hhbmdlRGF0YSA9IG5ldyBQb3NpdGlvbkNoYW5nZURhdGEocG9zaXRpb24sIHRoaXMubGltaXRSb2xlcyk7XG4gICAgY29uc3QgbGltaXRFeGNlcHRpb24gPSB0aGlzLmxpbWl0c1NlcnZpY2UuZXhjZWVkc0xpbWl0KHBvc2l0aW9uQ2hhbmdlRGF0YSk7XG4gICAgaWYgKGxpbWl0RXhjZXB0aW9uLmV4Y2VlZHMpIHtcbiAgICAgIC8vIGlmIGV4Y2VlZHMgbGltaXRzLCByZXBvc2l0aW9uXG4gICAgICB0aGlzLnJlc2V0UG9zaXRpb24gPSBsaW1pdEV4Y2VwdGlvbi5yZXNldENvb3JkaW5hdGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpbWl0c1NlcnZpY2UucG9zaXRpb25DaGFuZ2UocG9zaXRpb25DaGFuZ2VEYXRhKTtcbiAgICAgIHRoaXMuX2N1cnJlbnRQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhZGp1c3RzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnQgYWZ0ZXIgYSBsaW1pdCBleGNlcHRpb25cbiAgICovXG4gIHByaXZhdGUgYWRqdXN0UG9zaXRpb24obGltaXRFeGNlcHRpb246IExpbWl0RXhjZXB0aW9uKSB7XG4gICAgY29uc3QgbmV3UG9zaXRpb24gPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gICAgT2JqZWN0LmtleXModGhpcy5zdGFydFBvc2l0aW9uKS5mb3JFYWNoKGF4aXMgPT4ge1xuICAgICAgbmV3UG9zaXRpb25bYXhpc10gPSBsaW1pdEV4Y2VwdGlvbi5yZXNldENvb3JkaW5hdGVzW2F4aXNdICsgbGltaXRFeGNlcHRpb24ucmVzZXRDb2VmZmljaWVudHNbYXhpc107XG4gICAgfSk7XG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ld1Bvc2l0aW9uO1xuICAgIHRoaXMubGltaXRzU2VydmljZS5wb3NpdGlvbkNoYW5nZShuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHRoaXMucG9zaXRpb24sIHRoaXMubGltaXRSb2xlcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGxlZCBvbiBtb3ZlbWVudCBlbmQsIGNoZWNrcyBpZiBsYXN0IHBvc2l0aW9uIGV4Y2VlZGVkIHRoZSBsaW1pdHMgYWQgYWRqdXN0c1xuICAgKi9cbiAgbW92ZW1lbnRFbmQocG9zaXRpb246IFhZUG9zaXRpb24pIHtcbiAgICBsZXQgcG9zaXRpb25DaGFuZ2VEYXRhID0gbmV3IFBvc2l0aW9uQ2hhbmdlRGF0YShwb3NpdGlvbiwgdGhpcy5saW1pdFJvbGVzKTtcbiAgICBjb25zdCBsaW1pdEV4Y2VwdGlvbiA9IHRoaXMubGltaXRzU2VydmljZS5leGNlZWRzTGltaXQocG9zaXRpb25DaGFuZ2VEYXRhKTtcbiAgICBpZiAobGltaXRFeGNlcHRpb24uZXhjZWVkcykge1xuICAgICAgdGhpcy5yZXNldFBvc2l0aW9uID0gbGltaXRFeGNlcHRpb24ucmVzZXRDb29yZGluYXRlcztcbiAgICAgIGlmIChsaW1pdEV4Y2VwdGlvbi5leGNlZWRzKSB7XG4gICAgICAgIHRoaXMuYWRqdXN0UG9zaXRpb24obGltaXRFeGNlcHRpb24pO1xuICAgICAgICBwb3NpdGlvbkNoYW5nZURhdGEgPSBuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHRoaXMucG9zaXRpb24sIHRoaXMubGltaXRSb2xlcyk7XG4gICAgICAgIHRoaXMubGltaXRzU2VydmljZS51cGRhdGVQb3NpdGlvbihwb3NpdGlvbkNoYW5nZURhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxjdWxhdGVzIHRoZSBpbml0aWFsIHBvc2l0aW9ucyBvZiB0aGUgcG9pbnQgYnkgaXQncyByb2xlc1xuICAgKiBAcGFyYW0gZGltZW5zaW9ucyAtIGRpbWVuc2lvbnMgb2YgdGhlIHBhbmUgaW4gd2hpY2ggdGhlIHBvaW50IGlzIGxvY2F0ZWRcbiAgICovXG4gIHByaXZhdGUgZ2V0SW5pdGlhbFBvc2l0aW9uKGRpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucykge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLmxpbWl0Um9sZXMuaW5jbHVkZXMoJ2xlZnQnKSA/IDAgOiBkaW1lbnNpb25zLndpZHRoIC0gdGhpcy53aWR0aCAvIDIsXG4gICAgICB5OiB0aGlzLmxpbWl0Um9sZXMuaW5jbHVkZXMoJ3RvcCcpID8gMCA6IGRpbWVuc2lvbnMuaGVpZ2h0IC0gdGhpcy5oZWlnaHQgLyAyXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXBvc2l0aW9ucyB0aGUgcG9pbnQgYWZ0ZXIgYW4gZXh0ZXJuYWwgcmVwb3NpdGlvbiBldmVudFxuICAgKiBAcGFyYW0gcG9zaXRpb25zIC0gYW4gYXJyYXkgb2YgYWxsIHBvaW50cyBvbiB0aGUgcGFuZVxuICAgKi9cbiAgcHJpdmF0ZSBleHRlcm5hbFJlcG9zaXRpb24ocG9zaXRpb25zOiBBcnJheTxQb2ludFBvc2l0aW9uQ2hhbmdlPikge1xuICAgIHBvc2l0aW9ucy5mb3JFYWNoKHBvc2l0aW9uID0+IHtcbiAgICAgIGlmICh0aGlzLmxpbWl0c1NlcnZpY2UuY29tcGFyZUFycmF5KHRoaXMubGltaXRSb2xlcywgcG9zaXRpb24ucm9sZXMpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gdGhpcy5lbmZvcmNlUGFuZUxpbWl0cyhwb3NpdGlvbik7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgeDogcG9zaXRpb24ueCxcbiAgICAgICAgICB5OiBwb3NpdGlvbi55XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhIG5ldyBwb2ludCBwb3NpdGlvbiBpZiB0aGUgbW92ZW1lbnQgZXhjZWVkZWQgdGhlIHBhbmUgbGltaXRcbiAgICovXG4gIHByaXZhdGUgZW5mb3JjZVBhbmVMaW1pdHMocG9zaXRpb246IFBvaW50UG9zaXRpb25DaGFuZ2UpOiBQb2ludFBvc2l0aW9uQ2hhbmdlIHtcbiAgICBpZiAodGhpcy5fcGFuZURpbWVuc2lvbnMud2lkdGggPT09IDAgfHwgdGhpcy5fcGFuZURpbWVuc2lvbnMuaGVpZ2h0ID09PSAwKSB7XG4gICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwb3NpdGlvbi54ID4gdGhpcy5fcGFuZURpbWVuc2lvbnMud2lkdGgpIHsgcG9zaXRpb24ueCA9IHRoaXMuX3BhbmVEaW1lbnNpb25zLndpZHRoOyB9XG4gICAgICBpZiAocG9zaXRpb24ueCA8IDApIHsgcG9zaXRpb24ueCA9IDE7IH1cbiAgICAgIGlmIChwb3NpdGlvbi55ID4gdGhpcy5fcGFuZURpbWVuc2lvbnMuaGVpZ2h0KSB7IHBvc2l0aW9uLnkgPSB0aGlzLl9wYW5lRGltZW5zaW9ucy5oZWlnaHQ7IH1cbiAgICAgIGlmIChwb3NpdGlvbi55IDwgMCkgeyBwb3NpdGlvbi55ID0gMTsgfVxuICAgIH1cbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cbn1cblxuIl19