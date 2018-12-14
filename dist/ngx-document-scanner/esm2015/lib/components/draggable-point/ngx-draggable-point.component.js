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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyYWdnYWJsZS1wb2ludC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZG9jdW1lbnQtc2Nhbm5lci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RyYWdnYWJsZS1wb2ludC9uZ3gtZHJhZ2dhYmxlLXBvaW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQXVCLGtCQUFrQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFRckcsTUFBTSxPQUFPLDBCQUEwQjs7OztJQWlCckMsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFoQnZDLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUNsQixVQUFLLEdBQXNCLE1BQU0sQ0FBQztRQUNsQyxpQkFBWSxHQUFzQixNQUFNLENBQUM7UUFLbEQsYUFBUSxHQUFlO1lBQ3JCLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDTCxDQUFDO0lBSWlELENBQUM7Ozs7SUFFcEQsZUFBZTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNILHVDQUF1QztRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkQsSUFBSSxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLGVBQWUsR0FBRztvQkFDckIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO29CQUN2QixNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU07aUJBQzFCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUMzRjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN2RCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QixJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBS0QsVUFBVTtRQUNSLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJO1lBQ3hCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUk7WUFDMUIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDOUIsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsUUFBUSxFQUFFLFVBQVU7U0FDckIsQ0FBQztJQUNKLENBQUM7Ozs7OztJQU1ELGNBQWMsQ0FBQyxRQUFvQjs7Y0FDM0Isa0JBQWtCLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Y0FDdEUsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1FBQzFFLElBQUksY0FBYyxDQUFDLE9BQU8sRUFBRTtZQUMxQixnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLENBQUM7U0FDdEQ7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztTQUNsQztJQUNILENBQUM7Ozs7Ozs7SUFLTyxjQUFjLENBQUMsY0FBOEI7O2NBQzdDLFdBQVcsR0FBRztZQUNsQixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1NBQ0w7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0MsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckcsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDNUYsQ0FBQzs7Ozs7O0lBS0QsV0FBVyxDQUFDLFFBQW9COztZQUMxQixrQkFBa0IsR0FBRyxJQUFJLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDOztjQUNwRSxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUM7UUFDMUUsSUFBSSxjQUFjLENBQUMsT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDO1lBQ3JELElBQUksY0FBYyxDQUFDLE9BQU8sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDcEMsa0JBQWtCLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUN2RDtTQUNGO0lBQ0gsQ0FBQzs7Ozs7OztJQU1PLGtCQUFrQixDQUFDLFVBQTJCO1FBQ3BELE9BQU87WUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUM7WUFDM0UsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO1NBQzdFLENBQUM7SUFDSixDQUFDOzs7Ozs7O0lBTU8sa0JBQWtCLENBQUMsU0FBcUM7UUFDOUQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMzQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNwRSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHO29CQUNkLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ2QsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBS08saUJBQWlCLENBQUMsUUFBNkI7UUFDckQsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3pFLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO2FBQU07WUFDTCxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUU7Z0JBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQzthQUFFO1lBQ3pGLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBRTtZQUN2QyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7Z0JBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQzthQUFFO1lBQzNGLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBRTtTQUN4QztRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7OztZQWxKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsMlNBQW1EO2FBQ3BEOzs7O1lBUE8sYUFBYTs7O29CQVNsQixLQUFLO3FCQUNMLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLOzJCQUNMLEtBQUs7eUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3dCQUNMLEtBQUs7K0JBQ0wsS0FBSzs7OztJQVJOLDJDQUFvQjs7SUFDcEIsNENBQXFCOztJQUNyQiwyQ0FBMkI7O0lBQzNCLDJDQUEyQzs7SUFDM0Msa0RBQWtEOztJQUNsRCxnREFBMEQ7O0lBQzFELG1EQUFtQzs7SUFDbkMsK0NBQWdDOzs7OztJQUNoQyxzREFBOEM7O0lBQzlDLDhDQUdFOzs7OztJQUNGLHFEQUF5Qzs7SUFDekMsbURBQTBCOzs7OztJQUVkLG1EQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xpbWl0c1NlcnZpY2UsIFBvaW50UG9zaXRpb25DaGFuZ2UsIFBvc2l0aW9uQ2hhbmdlRGF0YX0gZnJvbSAnLi4vLi4vc2VydmljZXMvbGltaXRzLnNlcnZpY2UnO1xuaW1wb3J0IHtJbWFnZURpbWVuc2lvbnN9IGZyb20gJy4uLy4uL1B1YmxpY01vZGVscyc7XG5pbXBvcnQge0xpbWl0RXhjZXB0aW9uLCBYWVBvc2l0aW9ufSBmcm9tICcuLi8uLi9Qcml2YXRlTW9kZWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWRyYWdnYWJsZS1wb2ludCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZHJhZ2dhYmxlLXBvaW50LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgTmd4RHJhZ2dhYmxlUG9pbnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgd2lkdGggPSAxMDtcbiAgQElucHV0KCkgaGVpZ2h0ID0gMTA7XG4gIEBJbnB1dCgpIGNvbG9yID0gJyMzY2FiZTInO1xuICBASW5wdXQoKSBzaGFwZTogJ3JlY3QnIHwgJ2NpcmNsZScgPSAncmVjdCc7XG4gIEBJbnB1dCgpIHBvaW50T3B0aW9uczogJ3JlY3QnIHwgJ2NpcmNsZScgPSAncmVjdCc7XG4gIEBJbnB1dCgpIGxpbWl0Um9sZXM6IEFycmF5PCdsZWZ0J3wncmlnaHQnfCd0b3AnfCdib3R0b20nPjtcbiAgQElucHV0KCkgc3RhcnRQb3NpdGlvbjogWFlQb3NpdGlvbjtcbiAgQElucHV0KCkgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgQElucHV0KCkgcHJpdmF0ZSBfY3VycmVudFBvc2l0aW9uOiBYWVBvc2l0aW9uO1xuICBwb3NpdGlvbjogWFlQb3NpdGlvbiA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcbiAgcHJpdmF0ZSBfcGFuZURpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucztcbiAgcmVzZXRQb3NpdGlvbjogWFlQb3NpdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxpbWl0c1NlcnZpY2U6IExpbWl0c1NlcnZpY2UpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIE9iamVjdC5rZXlzKHRoaXMucG9pbnRPcHRpb25zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzW2tleV0gPSB0aGlzLnBvaW50T3B0aW9uc1trZXldO1xuICAgIH0pO1xuICAgIC8vIHN1YnNjcmliZSB0byBwYW5lIGRpbWVuc2lvbnMgY2hhbmdlc1xuICAgIHRoaXMubGltaXRzU2VydmljZS5wYW5lRGltZW5zaW9ucy5zdWJzY3JpYmUoZGltZW5zaW9ucyA9PiB7XG4gICAgICBpZiAoZGltZW5zaW9ucy53aWR0aCA+IDAgJiYgZGltZW5zaW9ucy53aWR0aCA+IDApIHtcbiAgICAgICAgdGhpcy5fcGFuZURpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgd2lkdGg6IGRpbWVuc2lvbnMud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBkaW1lbnNpb25zLmhlaWdodFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5nZXRJbml0aWFsUG9zaXRpb24oZGltZW5zaW9ucyk7XG4gICAgICAgIHRoaXMubGltaXRzU2VydmljZS5wb3NpdGlvbkNoYW5nZShuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHRoaXMucG9zaXRpb24sIHRoaXMubGltaXRSb2xlcykpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHN1YnNjcmliZSB0byBleHRlcm5hbCByZXBvc2l0aW9uIGV2ZW50c1xuICAgIHRoaXMubGltaXRzU2VydmljZS5yZXBvc2l0aW9uRXZlbnQuc3Vic2NyaWJlKHBvc2l0aW9ucyA9PiB7XG4gICAgICBpZiAocG9zaXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5leHRlcm5hbFJlcG9zaXRpb24ocG9zaXRpb25zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGEgY3NzIHN0eWxlIG9iamVjdCBmb3IgdGhlIHBvaW50XG4gICAqL1xuICBwb2ludFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogdGhpcy53aWR0aCArICdweCcsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0ICsgJ3B4JyxcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdGhpcy5jb2xvcixcbiAgICAgICdib3JkZXItcmFkaXVzJzogdGhpcy5zaGFwZSA9PT0gJ2NpcmNsZScgPyAnMTAwJScgOiAwLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIHJlZ2lzdGVycyBhIHBvc2l0aW9uIGNoYW5nZSBvbiB0aGUgbGltaXRzIHNlcnZpY2UsIGFuZCBhZGp1c3RzIHBvc2l0aW9uIGlmIG5lY2Vzc2FyeVxuICAgKiBAcGFyYW0gcG9zaXRpb24gLSB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgcG9pbnRcbiAgICovXG4gIHBvc2l0aW9uQ2hhbmdlKHBvc2l0aW9uOiBYWVBvc2l0aW9uKSB7XG4gICAgY29uc3QgcG9zaXRpb25DaGFuZ2VEYXRhID0gbmV3IFBvc2l0aW9uQ2hhbmdlRGF0YShwb3NpdGlvbiwgdGhpcy5saW1pdFJvbGVzKTtcbiAgICBjb25zdCBsaW1pdEV4Y2VwdGlvbiA9IHRoaXMubGltaXRzU2VydmljZS5leGNlZWRzTGltaXQocG9zaXRpb25DaGFuZ2VEYXRhKTtcbiAgICBpZiAobGltaXRFeGNlcHRpb24uZXhjZWVkcykge1xuICAgICAgLy8gaWYgZXhjZWVkcyBsaW1pdHMsIHJlcG9zaXRpb25cbiAgICAgIHRoaXMucmVzZXRQb3NpdGlvbiA9IGxpbWl0RXhjZXB0aW9uLnJlc2V0Q29vcmRpbmF0ZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGltaXRzU2VydmljZS5wb3NpdGlvbkNoYW5nZShwb3NpdGlvbkNoYW5nZURhdGEpO1xuICAgICAgdGhpcy5fY3VycmVudFBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGFkanVzdHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwb2ludCBhZnRlciBhIGxpbWl0IGV4Y2VwdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBhZGp1c3RQb3NpdGlvbihsaW1pdEV4Y2VwdGlvbjogTGltaXRFeGNlcHRpb24pIHtcbiAgICBjb25zdCBuZXdQb3NpdGlvbiA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLnN0YXJ0UG9zaXRpb24pLmZvckVhY2goYXhpcyA9PiB7XG4gICAgICBuZXdQb3NpdGlvbltheGlzXSA9IGxpbWl0RXhjZXB0aW9uLnJlc2V0Q29vcmRpbmF0ZXNbYXhpc10gKyBsaW1pdEV4Y2VwdGlvbi5yZXNldENvZWZmaWNpZW50c1theGlzXTtcbiAgICB9KTtcbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3UG9zaXRpb247XG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBvc2l0aW9uQ2hhbmdlKG5ldyBQb3NpdGlvbkNoYW5nZURhdGEodGhpcy5wb3NpdGlvbiwgdGhpcy5saW1pdFJvbGVzKSk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbGVkIG9uIG1vdmVtZW50IGVuZCwgY2hlY2tzIGlmIGxhc3QgcG9zaXRpb24gZXhjZWVkZWQgdGhlIGxpbWl0cyBhZCBhZGp1c3RzXG4gICAqL1xuICBtb3ZlbWVudEVuZChwb3NpdGlvbjogWFlQb3NpdGlvbikge1xuICAgIGxldCBwb3NpdGlvbkNoYW5nZURhdGEgPSBuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHBvc2l0aW9uLCB0aGlzLmxpbWl0Um9sZXMpO1xuICAgIGNvbnN0IGxpbWl0RXhjZXB0aW9uID0gdGhpcy5saW1pdHNTZXJ2aWNlLmV4Y2VlZHNMaW1pdChwb3NpdGlvbkNoYW5nZURhdGEpO1xuICAgIGlmIChsaW1pdEV4Y2VwdGlvbi5leGNlZWRzKSB7XG4gICAgICB0aGlzLnJlc2V0UG9zaXRpb24gPSBsaW1pdEV4Y2VwdGlvbi5yZXNldENvb3JkaW5hdGVzO1xuICAgICAgaWYgKGxpbWl0RXhjZXB0aW9uLmV4Y2VlZHMpIHtcbiAgICAgICAgdGhpcy5hZGp1c3RQb3NpdGlvbihsaW1pdEV4Y2VwdGlvbik7XG4gICAgICAgIHBvc2l0aW9uQ2hhbmdlRGF0YSA9IG5ldyBQb3NpdGlvbkNoYW5nZURhdGEodGhpcy5wb3NpdGlvbiwgdGhpcy5saW1pdFJvbGVzKTtcbiAgICAgICAgdGhpcy5saW1pdHNTZXJ2aWNlLnVwZGF0ZVBvc2l0aW9uKHBvc2l0aW9uQ2hhbmdlRGF0YSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNhbGN1bGF0ZXMgdGhlIGluaXRpYWwgcG9zaXRpb25zIG9mIHRoZSBwb2ludCBieSBpdCdzIHJvbGVzXG4gICAqIEBwYXJhbSBkaW1lbnNpb25zIC0gZGltZW5zaW9ucyBvZiB0aGUgcGFuZSBpbiB3aGljaCB0aGUgcG9pbnQgaXMgbG9jYXRlZFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbml0aWFsUG9zaXRpb24oZGltZW5zaW9uczogSW1hZ2VEaW1lbnNpb25zKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHRoaXMubGltaXRSb2xlcy5pbmNsdWRlcygnbGVmdCcpID8gMCA6IGRpbWVuc2lvbnMud2lkdGggLSB0aGlzLndpZHRoIC8gMixcbiAgICAgIHk6IHRoaXMubGltaXRSb2xlcy5pbmNsdWRlcygndG9wJykgPyAwIDogZGltZW5zaW9ucy5oZWlnaHQgLSB0aGlzLmhlaWdodCAvIDJcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIHJlcG9zaXRpb25zIHRoZSBwb2ludCBhZnRlciBhbiBleHRlcm5hbCByZXBvc2l0aW9uIGV2ZW50XG4gICAqIEBwYXJhbSBwb3NpdGlvbnMgLSBhbiBhcnJheSBvZiBhbGwgcG9pbnRzIG9uIHRoZSBwYW5lXG4gICAqL1xuICBwcml2YXRlIGV4dGVybmFsUmVwb3NpdGlvbihwb3NpdGlvbnM6IEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+KSB7XG4gICAgcG9zaXRpb25zLmZvckVhY2gocG9zaXRpb24gPT4ge1xuICAgICAgaWYgKHRoaXMubGltaXRzU2VydmljZS5jb21wYXJlQXJyYXkodGhpcy5saW1pdFJvbGVzLCBwb3NpdGlvbi5yb2xlcykpIHtcbiAgICAgICAgcG9zaXRpb24gPSB0aGlzLmVuZm9yY2VQYW5lTGltaXRzKHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICAgICAgICB4OiBwb3NpdGlvbi54LFxuICAgICAgICAgIHk6IHBvc2l0aW9uLnlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGEgbmV3IHBvaW50IHBvc2l0aW9uIGlmIHRoZSBtb3ZlbWVudCBleGNlZWRlZCB0aGUgcGFuZSBsaW1pdFxuICAgKi9cbiAgcHJpdmF0ZSBlbmZvcmNlUGFuZUxpbWl0cyhwb3NpdGlvbjogUG9pbnRQb3NpdGlvbkNoYW5nZSk6IFBvaW50UG9zaXRpb25DaGFuZ2Uge1xuICAgIGlmICh0aGlzLl9wYW5lRGltZW5zaW9ucy53aWR0aCA9PT0gMCB8fCB0aGlzLl9wYW5lRGltZW5zaW9ucy5oZWlnaHQgPT09IDApIHtcbiAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBvc2l0aW9uLnggPiB0aGlzLl9wYW5lRGltZW5zaW9ucy53aWR0aCkgeyBwb3NpdGlvbi54ID0gdGhpcy5fcGFuZURpbWVuc2lvbnMud2lkdGg7IH1cbiAgICAgIGlmIChwb3NpdGlvbi54IDwgMCkgeyBwb3NpdGlvbi54ID0gMTsgfVxuICAgICAgaWYgKHBvc2l0aW9uLnkgPiB0aGlzLl9wYW5lRGltZW5zaW9ucy5oZWlnaHQpIHsgcG9zaXRpb24ueSA9IHRoaXMuX3BhbmVEaW1lbnNpb25zLmhlaWdodDsgfVxuICAgICAgaWYgKHBvc2l0aW9uLnkgPCAwKSB7IHBvc2l0aW9uLnkgPSAxOyB9XG4gICAgfVxuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxufVxuXG4iXX0=