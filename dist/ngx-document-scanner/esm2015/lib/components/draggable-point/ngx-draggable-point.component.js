/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        Object.keys(this.pointOptions).forEach(key => {
            this[key] = this.pointOptions[key];
        });
        // subscribe to pane dimensions changes
        this.limitsService.paneDimensions.subscribe(dimensions => {
            if (dimensions.width > 0 && dimensions.width > 0) {
                this._paneDimensions = {
                    width: dimensions.width,
                    height: dimensions.height
                };
                this.position = this.getInitialPosition(dimensions);
                this.limitsService.positionChange(new PositionChangeData(this.position, this.limitRoles));
            }
        });
        // subscribe to external reposition events
        this.limitsService.repositionEvent.subscribe(positions => {
            if (positions.length > 0) {
                this.externalReposition(positions);
            }
        });
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
        Object.keys(this.startPosition).forEach(axis => {
            newPosition[axis] = limitException.resetCoordinates[axis] + limitException.resetCoefficients[axis];
        });
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
        positions.forEach(position => {
            if (this.limitsService.compareArray(this.limitRoles, position.roles)) {
                position = this.enforcePaneLimits(position);
                this.position = {
                    x: position.x,
                    y: position.y
                };
            }
        });
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
                template: "<div #point ngDraggable=\"draggable\"\r\n     (movingOffset)=\"positionChange($event)\"\r\n     [ngStyle]=\"pointStyle()\"\r\n     [position]=\"position\"\r\n     [bounds]=\"container\"\r\n     [inBounds]=\"true\"\r\n     (endOffset)=\"movementEnd($event)\"\r\n      style=\"z-index: 1000\">\r\n</div>\r\n"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyYWdnYWJsZS1wb2ludC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZG9jdW1lbnQtc2Nhbm5lci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RyYWdnYWJsZS1wb2ludC9uZ3gtZHJhZ2dhYmxlLXBvaW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQXVCLGtCQUFrQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFRckcsTUFBTSxPQUFPLDBCQUEwQjs7OztJQWlCckMsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFoQnZDLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUNsQixVQUFLLEdBQXNCLE1BQU0sQ0FBQztRQUNsQyxpQkFBWSxHQUFzQixNQUFNLENBQUM7UUFLbEQsYUFBUSxHQUFlO1lBQ3JCLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDTCxDQUFDO0lBSWlELENBQUM7Ozs7SUFFcEQsZUFBZTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNILHVDQUF1QztRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkQsSUFBSSxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxHQUFH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O0lBQzlDLDhDQUdFOzs7OztJQUNGLHFEQUF5Qzs7SUFDekMsbURBQTBCOzs7OztJQUVkLG1EQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TGltaXRzU2VydmljZSwgUG9pbnRQb3NpdGlvbkNoYW5nZSwgUG9zaXRpb25DaGFuZ2VEYXRhfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9saW1pdHMuc2VydmljZSc7XHJcbmltcG9ydCB7SW1hZ2VEaW1lbnNpb25zfSBmcm9tICcuLi8uLi9QdWJsaWNNb2RlbHMnO1xyXG5pbXBvcnQge0xpbWl0RXhjZXB0aW9uLCBYWVBvc2l0aW9ufSBmcm9tICcuLi8uLi9Qcml2YXRlTW9kZWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWRyYWdnYWJsZS1wb2ludCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1kcmFnZ2FibGUtcG9pbnQuY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4RHJhZ2dhYmxlUG9pbnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuICBASW5wdXQoKSB3aWR0aCA9IDEwO1xyXG4gIEBJbnB1dCgpIGhlaWdodCA9IDEwO1xyXG4gIEBJbnB1dCgpIGNvbG9yID0gJyMzY2FiZTInO1xyXG4gIEBJbnB1dCgpIHNoYXBlOiAncmVjdCcgfCAnY2lyY2xlJyA9ICdyZWN0JztcclxuICBASW5wdXQoKSBwb2ludE9wdGlvbnM6ICdyZWN0JyB8ICdjaXJjbGUnID0gJ3JlY3QnO1xyXG4gIEBJbnB1dCgpIGxpbWl0Um9sZXM6IEFycmF5PCdsZWZ0J3wncmlnaHQnfCd0b3AnfCdib3R0b20nPjtcclxuICBASW5wdXQoKSBzdGFydFBvc2l0aW9uOiBYWVBvc2l0aW9uO1xyXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSBfY3VycmVudFBvc2l0aW9uOiBYWVBvc2l0aW9uO1xyXG4gIHBvc2l0aW9uOiBYWVBvc2l0aW9uID0ge1xyXG4gICAgeDogMCxcclxuICAgIHk6IDBcclxuICB9O1xyXG4gIHByaXZhdGUgX3BhbmVEaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnM7XHJcbiAgcmVzZXRQb3NpdGlvbjogWFlQb3NpdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsaW1pdHNTZXJ2aWNlOiBMaW1pdHNTZXJ2aWNlKSB7fVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLnBvaW50T3B0aW9ucykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICB0aGlzW2tleV0gPSB0aGlzLnBvaW50T3B0aW9uc1trZXldO1xyXG4gICAgfSk7XHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gcGFuZSBkaW1lbnNpb25zIGNoYW5nZXNcclxuICAgIHRoaXMubGltaXRzU2VydmljZS5wYW5lRGltZW5zaW9ucy5zdWJzY3JpYmUoZGltZW5zaW9ucyA9PiB7XHJcbiAgICAgIGlmIChkaW1lbnNpb25zLndpZHRoID4gMCAmJiBkaW1lbnNpb25zLndpZHRoID4gMCkge1xyXG4gICAgICAgIHRoaXMuX3BhbmVEaW1lbnNpb25zID0ge1xyXG4gICAgICAgICAgd2lkdGg6IGRpbWVuc2lvbnMud2lkdGgsXHJcbiAgICAgICAgICBoZWlnaHQ6IGRpbWVuc2lvbnMuaGVpZ2h0XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5nZXRJbml0aWFsUG9zaXRpb24oZGltZW5zaW9ucyk7XHJcbiAgICAgICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBvc2l0aW9uQ2hhbmdlKG5ldyBQb3NpdGlvbkNoYW5nZURhdGEodGhpcy5wb3NpdGlvbiwgdGhpcy5saW1pdFJvbGVzKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gc3Vic2NyaWJlIHRvIGV4dGVybmFsIHJlcG9zaXRpb24gZXZlbnRzXHJcbiAgICB0aGlzLmxpbWl0c1NlcnZpY2UucmVwb3NpdGlvbkV2ZW50LnN1YnNjcmliZShwb3NpdGlvbnMgPT4ge1xyXG4gICAgICBpZiAocG9zaXRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLmV4dGVybmFsUmVwb3NpdGlvbihwb3NpdGlvbnMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybnMgYSBjc3Mgc3R5bGUgb2JqZWN0IGZvciB0aGUgcG9pbnRcclxuICAgKi9cclxuICBwb2ludFN0eWxlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgd2lkdGg6IHRoaXMud2lkdGggKyAncHgnLFxyXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB0aGlzLmNvbG9yLFxyXG4gICAgICAnYm9yZGVyLXJhZGl1cyc6IHRoaXMuc2hhcGUgPT09ICdjaXJjbGUnID8gJzEwMCUnIDogMCxcclxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZWdpc3RlcnMgYSBwb3NpdGlvbiBjaGFuZ2Ugb24gdGhlIGxpbWl0cyBzZXJ2aWNlLCBhbmQgYWRqdXN0cyBwb3NpdGlvbiBpZiBuZWNlc3NhcnlcclxuICAgKiBAcGFyYW0gcG9zaXRpb24gLSB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgcG9pbnRcclxuICAgKi9cclxuICBwb3NpdGlvbkNoYW5nZShwb3NpdGlvbjogWFlQb3NpdGlvbikge1xyXG4gICAgY29uc3QgcG9zaXRpb25DaGFuZ2VEYXRhID0gbmV3IFBvc2l0aW9uQ2hhbmdlRGF0YShwb3NpdGlvbiwgdGhpcy5saW1pdFJvbGVzKTtcclxuICAgIGNvbnN0IGxpbWl0RXhjZXB0aW9uID0gdGhpcy5saW1pdHNTZXJ2aWNlLmV4Y2VlZHNMaW1pdChwb3NpdGlvbkNoYW5nZURhdGEpO1xyXG4gICAgaWYgKGxpbWl0RXhjZXB0aW9uLmV4Y2VlZHMpIHtcclxuICAgICAgLy8gaWYgZXhjZWVkcyBsaW1pdHMsIHJlcG9zaXRpb25cclxuICAgICAgdGhpcy5yZXNldFBvc2l0aW9uID0gbGltaXRFeGNlcHRpb24ucmVzZXRDb29yZGluYXRlcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubGltaXRzU2VydmljZS5wb3NpdGlvbkNoYW5nZShwb3NpdGlvbkNoYW5nZURhdGEpO1xyXG4gICAgICB0aGlzLl9jdXJyZW50UG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGFkanVzdHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwb2ludCBhZnRlciBhIGxpbWl0IGV4Y2VwdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRqdXN0UG9zaXRpb24obGltaXRFeGNlcHRpb246IExpbWl0RXhjZXB0aW9uKSB7XHJcbiAgICBjb25zdCBuZXdQb3NpdGlvbiA9IHtcclxuICAgICAgeDogMCxcclxuICAgICAgeTogMFxyXG4gICAgfTtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuc3RhcnRQb3NpdGlvbikuZm9yRWFjaChheGlzID0+IHtcclxuICAgICAgbmV3UG9zaXRpb25bYXhpc10gPSBsaW1pdEV4Y2VwdGlvbi5yZXNldENvb3JkaW5hdGVzW2F4aXNdICsgbGltaXRFeGNlcHRpb24ucmVzZXRDb2VmZmljaWVudHNbYXhpc107XHJcbiAgICB9KTtcclxuICAgIHRoaXMucG9zaXRpb24gPSBuZXdQb3NpdGlvbjtcclxuICAgIHRoaXMubGltaXRzU2VydmljZS5wb3NpdGlvbkNoYW5nZShuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHRoaXMucG9zaXRpb24sIHRoaXMubGltaXRSb2xlcykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2FsbGVkIG9uIG1vdmVtZW50IGVuZCwgY2hlY2tzIGlmIGxhc3QgcG9zaXRpb24gZXhjZWVkZWQgdGhlIGxpbWl0cyBhZCBhZGp1c3RzXHJcbiAgICovXHJcbiAgbW92ZW1lbnRFbmQocG9zaXRpb246IFhZUG9zaXRpb24pIHtcclxuICAgIGxldCBwb3NpdGlvbkNoYW5nZURhdGEgPSBuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHBvc2l0aW9uLCB0aGlzLmxpbWl0Um9sZXMpO1xyXG4gICAgY29uc3QgbGltaXRFeGNlcHRpb24gPSB0aGlzLmxpbWl0c1NlcnZpY2UuZXhjZWVkc0xpbWl0KHBvc2l0aW9uQ2hhbmdlRGF0YSk7XHJcbiAgICBpZiAobGltaXRFeGNlcHRpb24uZXhjZWVkcykge1xyXG4gICAgICB0aGlzLnJlc2V0UG9zaXRpb24gPSBsaW1pdEV4Y2VwdGlvbi5yZXNldENvb3JkaW5hdGVzO1xyXG4gICAgICBpZiAobGltaXRFeGNlcHRpb24uZXhjZWVkcykge1xyXG4gICAgICAgIHRoaXMuYWRqdXN0UG9zaXRpb24obGltaXRFeGNlcHRpb24pO1xyXG4gICAgICAgIHBvc2l0aW9uQ2hhbmdlRGF0YSA9IG5ldyBQb3NpdGlvbkNoYW5nZURhdGEodGhpcy5wb3NpdGlvbiwgdGhpcy5saW1pdFJvbGVzKTtcclxuICAgICAgICB0aGlzLmxpbWl0c1NlcnZpY2UudXBkYXRlUG9zaXRpb24ocG9zaXRpb25DaGFuZ2VEYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2FsY3VsYXRlcyB0aGUgaW5pdGlhbCBwb3NpdGlvbnMgb2YgdGhlIHBvaW50IGJ5IGl0J3Mgcm9sZXNcclxuICAgKiBAcGFyYW0gZGltZW5zaW9ucyAtIGRpbWVuc2lvbnMgb2YgdGhlIHBhbmUgaW4gd2hpY2ggdGhlIHBvaW50IGlzIGxvY2F0ZWRcclxuICAgKi9cclxuICBwcml2YXRlIGdldEluaXRpYWxQb3NpdGlvbihkaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnMpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IHRoaXMubGltaXRSb2xlcy5pbmNsdWRlcygnbGVmdCcpID8gMCA6IGRpbWVuc2lvbnMud2lkdGggLSB0aGlzLndpZHRoIC8gMixcclxuICAgICAgeTogdGhpcy5saW1pdFJvbGVzLmluY2x1ZGVzKCd0b3AnKSA/IDAgOiBkaW1lbnNpb25zLmhlaWdodCAtIHRoaXMuaGVpZ2h0IC8gMlxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlcG9zaXRpb25zIHRoZSBwb2ludCBhZnRlciBhbiBleHRlcm5hbCByZXBvc2l0aW9uIGV2ZW50XHJcbiAgICogQHBhcmFtIHBvc2l0aW9ucyAtIGFuIGFycmF5IG9mIGFsbCBwb2ludHMgb24gdGhlIHBhbmVcclxuICAgKi9cclxuICBwcml2YXRlIGV4dGVybmFsUmVwb3NpdGlvbihwb3NpdGlvbnM6IEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+KSB7XHJcbiAgICBwb3NpdGlvbnMuZm9yRWFjaChwb3NpdGlvbiA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmxpbWl0c1NlcnZpY2UuY29tcGFyZUFycmF5KHRoaXMubGltaXRSb2xlcywgcG9zaXRpb24ucm9sZXMpKSB7XHJcbiAgICAgICAgcG9zaXRpb24gPSB0aGlzLmVuZm9yY2VQYW5lTGltaXRzKHBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgeDogcG9zaXRpb24ueCxcclxuICAgICAgICAgIHk6IHBvc2l0aW9uLnlcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybnMgYSBuZXcgcG9pbnQgcG9zaXRpb24gaWYgdGhlIG1vdmVtZW50IGV4Y2VlZGVkIHRoZSBwYW5lIGxpbWl0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBlbmZvcmNlUGFuZUxpbWl0cyhwb3NpdGlvbjogUG9pbnRQb3NpdGlvbkNoYW5nZSk6IFBvaW50UG9zaXRpb25DaGFuZ2Uge1xyXG4gICAgaWYgKHRoaXMuX3BhbmVEaW1lbnNpb25zLndpZHRoID09PSAwIHx8IHRoaXMuX3BhbmVEaW1lbnNpb25zLmhlaWdodCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gcG9zaXRpb247XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAocG9zaXRpb24ueCA+IHRoaXMuX3BhbmVEaW1lbnNpb25zLndpZHRoKSB7IHBvc2l0aW9uLnggPSB0aGlzLl9wYW5lRGltZW5zaW9ucy53aWR0aDsgfVxyXG4gICAgICBpZiAocG9zaXRpb24ueCA8IDApIHsgcG9zaXRpb24ueCA9IDE7IH1cclxuICAgICAgaWYgKHBvc2l0aW9uLnkgPiB0aGlzLl9wYW5lRGltZW5zaW9ucy5oZWlnaHQpIHsgcG9zaXRpb24ueSA9IHRoaXMuX3BhbmVEaW1lbnNpb25zLmhlaWdodDsgfVxyXG4gICAgICBpZiAocG9zaXRpb24ueSA8IDApIHsgcG9zaXRpb24ueSA9IDE7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBwb3NpdGlvbjtcclxuICB9XHJcbn1cclxuXHJcbiJdfQ==