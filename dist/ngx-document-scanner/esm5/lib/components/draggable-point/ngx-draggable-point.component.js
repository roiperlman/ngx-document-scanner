/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { LimitsService, PositionChangeData } from '../../services/limits.service';
var NgxDraggablePointComponent = /** @class */ (function () {
    function NgxDraggablePointComponent(limitsService) {
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
    NgxDraggablePointComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.keys(this.pointOptions).forEach(function (key) {
            _this[key] = _this.pointOptions[key];
        });
        // subscribe to pane dimensions changes
        this.limitsService.paneDimensions.subscribe(function (dimensions) {
            if (dimensions.width > 0 && dimensions.width > 0) {
                _this._paneDimensions = {
                    width: dimensions.width,
                    height: dimensions.height
                };
                _this.position = _this.getInitialPosition(dimensions);
                _this.limitsService.positionChange(new PositionChangeData(_this.position, _this.limitRoles));
            }
        });
        // subscribe to external reposition events
        this.limitsService.repositionEvent.subscribe(function (positions) {
            if (positions.length > 0) {
                _this.externalReposition(positions);
            }
        });
    };
    /**
     * returns a css style object for the point
     */
    /**
     * returns a css style object for the point
     * @return {?}
     */
    NgxDraggablePointComponent.prototype.pointStyle = /**
     * returns a css style object for the point
     * @return {?}
     */
    function () {
        return {
            width: this.width + 'px',
            height: this.height + 'px',
            'background-color': this.color,
            'border-radius': this.shape === 'circle' ? '100%' : 0,
            position: 'absolute'
        };
    };
    /**
     * registers a position change on the limits service, and adjusts position if necessary
     * @param position - the current position of the point
     */
    /**
     * registers a position change on the limits service, and adjusts position if necessary
     * @param {?} position - the current position of the point
     * @return {?}
     */
    NgxDraggablePointComponent.prototype.positionChange = /**
     * registers a position change on the limits service, and adjusts position if necessary
     * @param {?} position - the current position of the point
     * @return {?}
     */
    function (position) {
        /** @type {?} */
        var positionChangeData = new PositionChangeData(position, this.limitRoles);
        /** @type {?} */
        var limitException = this.limitsService.exceedsLimit(positionChangeData);
        if (limitException.exceeds) {
            // if exceeds limits, reposition
            this.resetPosition = limitException.resetCoordinates;
        }
        else {
            this.limitsService.positionChange(positionChangeData);
            this._currentPosition = position;
        }
    };
    /**
     * adjusts the position of the point after a limit exception
     */
    /**
     * adjusts the position of the point after a limit exception
     * @private
     * @param {?} limitException
     * @return {?}
     */
    NgxDraggablePointComponent.prototype.adjustPosition = /**
     * adjusts the position of the point after a limit exception
     * @private
     * @param {?} limitException
     * @return {?}
     */
    function (limitException) {
        /** @type {?} */
        var newPosition = {
            x: 0,
            y: 0
        };
        Object.keys(this.startPosition).forEach(function (axis) {
            newPosition[axis] = limitException.resetCoordinates[axis] + limitException.resetCoefficients[axis];
        });
        this.position = newPosition;
        this.limitsService.positionChange(new PositionChangeData(this.position, this.limitRoles));
    };
    /**
     * called on movement end, checks if last position exceeded the limits ad adjusts
     */
    /**
     * called on movement end, checks if last position exceeded the limits ad adjusts
     * @param {?} position
     * @return {?}
     */
    NgxDraggablePointComponent.prototype.movementEnd = /**
     * called on movement end, checks if last position exceeded the limits ad adjusts
     * @param {?} position
     * @return {?}
     */
    function (position) {
        /** @type {?} */
        var positionChangeData = new PositionChangeData(position, this.limitRoles);
        /** @type {?} */
        var limitException = this.limitsService.exceedsLimit(positionChangeData);
        if (limitException.exceeds) {
            this.resetPosition = limitException.resetCoordinates;
            if (limitException.exceeds) {
                this.adjustPosition(limitException);
                positionChangeData = new PositionChangeData(this.position, this.limitRoles);
                this.limitsService.updatePosition(positionChangeData);
            }
        }
    };
    /**
     * calculates the initial positions of the point by it's roles
     * @param dimensions - dimensions of the pane in which the point is located
     */
    /**
     * calculates the initial positions of the point by it's roles
     * @private
     * @param {?} dimensions - dimensions of the pane in which the point is located
     * @return {?}
     */
    NgxDraggablePointComponent.prototype.getInitialPosition = /**
     * calculates the initial positions of the point by it's roles
     * @private
     * @param {?} dimensions - dimensions of the pane in which the point is located
     * @return {?}
     */
    function (dimensions) {
        return {
            x: this.limitRoles.includes('left') ? 0 : dimensions.width - this.width / 2,
            y: this.limitRoles.includes('top') ? 0 : dimensions.height - this.height / 2
        };
    };
    /**
     * repositions the point after an external reposition event
     * @param positions - an array of all points on the pane
     */
    /**
     * repositions the point after an external reposition event
     * @private
     * @param {?} positions - an array of all points on the pane
     * @return {?}
     */
    NgxDraggablePointComponent.prototype.externalReposition = /**
     * repositions the point after an external reposition event
     * @private
     * @param {?} positions - an array of all points on the pane
     * @return {?}
     */
    function (positions) {
        var _this = this;
        positions.forEach(function (position) {
            if (_this.limitsService.compareArray(_this.limitRoles, position.roles)) {
                position = _this.enforcePaneLimits(position);
                _this.position = {
                    x: position.x,
                    y: position.y
                };
            }
        });
    };
    /**
     * returns a new point position if the movement exceeded the pane limit
     */
    /**
     * returns a new point position if the movement exceeded the pane limit
     * @private
     * @param {?} position
     * @return {?}
     */
    NgxDraggablePointComponent.prototype.enforcePaneLimits = /**
     * returns a new point position if the movement exceeded the pane limit
     * @private
     * @param {?} position
     * @return {?}
     */
    function (position) {
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
    };
    NgxDraggablePointComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-draggable-point',
                    template: "<div #point ngDraggable=\"draggable\"\n     (movingOffset)=\"positionChange($event)\"\n     [ngStyle]=\"pointStyle()\"\n     [position]=\"position\"\n     [bounds]=\"container\"\n     [inBounds]=\"true\"\n     (endOffset)=\"movementEnd($event)\"\n      style=\"z-index: 1000\">\n</div>\n"
                }] }
    ];
    /** @nocollapse */
    NgxDraggablePointComponent.ctorParameters = function () { return [
        { type: LimitsService }
    ]; };
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
    return NgxDraggablePointComponent;
}());
export { NgxDraggablePointComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyYWdnYWJsZS1wb2ludC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZG9jdW1lbnQtc2Nhbm5lci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RyYWdnYWJsZS1wb2ludC9uZ3gtZHJhZ2dhYmxlLXBvaW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQXVCLGtCQUFrQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFJckc7SUFxQkUsb0NBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBaEJ2QyxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLFVBQUssR0FBRyxTQUFTLENBQUM7UUFDbEIsVUFBSyxHQUFzQixNQUFNLENBQUM7UUFDbEMsaUJBQVksR0FBc0IsTUFBTSxDQUFDO1FBS2xELGFBQVEsR0FBZTtZQUNyQixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1NBQ0wsQ0FBQztJQUlpRCxDQUFDOzs7O0lBRXBELG9EQUFlOzs7SUFBZjtRQUFBLGlCQXFCQztRQXBCQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ3hDLEtBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFBLFVBQVU7WUFDcEQsSUFBSSxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsRUFB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LEtBQUs7bUNBQ0wsS0FBSzs7SUFzSVIsaUNBQUM7Q0FBQSxBQW5KRCxJQW1KQztTQS9JWSwwQkFBMEI7OztJQUNyQywyQ0FBb0I7O0lBQ3BCLDRDQUFxQjs7SUFDckIsMkNBQTJCOztJQUMzQiwyQ0FBMkM7O0lBQzNDLGtEQUFrRDs7SUFDbEQsZ0RBQTBEOztJQUMxRCxtREFBbUM7O0lBQ25DLCtDQUFnQzs7Ozs7SUFDaEMsc0RBQThDOztJQUM5Qyw4Q0FHRTs7Ozs7SUFDRixxREFBeUM7O0lBQ3pDLG1EQUEwQjs7Ozs7SUFFZCxtREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIENvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMaW1pdHNTZXJ2aWNlLCBQb2ludFBvc2l0aW9uQ2hhbmdlLCBQb3NpdGlvbkNoYW5nZURhdGF9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xpbWl0cy5zZXJ2aWNlJztcbmltcG9ydCB7SW1hZ2VEaW1lbnNpb25zfSBmcm9tICcuLi8uLi9QdWJsaWNNb2RlbHMnO1xuaW1wb3J0IHtMaW1pdEV4Y2VwdGlvbiwgWFlQb3NpdGlvbn0gZnJvbSAnLi4vLi4vUHJpdmF0ZU1vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1kcmFnZ2FibGUtcG9pbnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWRyYWdnYWJsZS1wb2ludC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE5neERyYWdnYWJsZVBvaW50Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHdpZHRoID0gMTA7XG4gIEBJbnB1dCgpIGhlaWdodCA9IDEwO1xuICBASW5wdXQoKSBjb2xvciA9ICcjM2NhYmUyJztcbiAgQElucHV0KCkgc2hhcGU6ICdyZWN0JyB8ICdjaXJjbGUnID0gJ3JlY3QnO1xuICBASW5wdXQoKSBwb2ludE9wdGlvbnM6ICdyZWN0JyB8ICdjaXJjbGUnID0gJ3JlY3QnO1xuICBASW5wdXQoKSBsaW1pdFJvbGVzOiBBcnJheTwnbGVmdCd8J3JpZ2h0J3wndG9wJ3wnYm90dG9tJz47XG4gIEBJbnB1dCgpIHN0YXJ0UG9zaXRpb246IFhZUG9zaXRpb247XG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIEBJbnB1dCgpIHByaXZhdGUgX2N1cnJlbnRQb3NpdGlvbjogWFlQb3NpdGlvbjtcbiAgcG9zaXRpb246IFhZUG9zaXRpb24gPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG4gIHByaXZhdGUgX3BhbmVEaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnM7XG4gIHJlc2V0UG9zaXRpb246IFhZUG9zaXRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsaW1pdHNTZXJ2aWNlOiBMaW1pdHNTZXJ2aWNlKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLnBvaW50T3B0aW9ucykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpc1trZXldID0gdGhpcy5wb2ludE9wdGlvbnNba2V5XTtcbiAgICB9KTtcbiAgICAvLyBzdWJzY3JpYmUgdG8gcGFuZSBkaW1lbnNpb25zIGNoYW5nZXNcbiAgICB0aGlzLmxpbWl0c1NlcnZpY2UucGFuZURpbWVuc2lvbnMuc3Vic2NyaWJlKGRpbWVuc2lvbnMgPT4ge1xuICAgICAgaWYgKGRpbWVuc2lvbnMud2lkdGggPiAwICYmIGRpbWVuc2lvbnMud2lkdGggPiAwKSB7XG4gICAgICAgIHRoaXMuX3BhbmVEaW1lbnNpb25zID0ge1xuICAgICAgICAgIHdpZHRoOiBkaW1lbnNpb25zLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogZGltZW5zaW9ucy5oZWlnaHRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuZ2V0SW5pdGlhbFBvc2l0aW9uKGRpbWVuc2lvbnMpO1xuICAgICAgICB0aGlzLmxpbWl0c1NlcnZpY2UucG9zaXRpb25DaGFuZ2UobmV3IFBvc2l0aW9uQ2hhbmdlRGF0YSh0aGlzLnBvc2l0aW9uLCB0aGlzLmxpbWl0Um9sZXMpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBzdWJzY3JpYmUgdG8gZXh0ZXJuYWwgcmVwb3NpdGlvbiBldmVudHNcbiAgICB0aGlzLmxpbWl0c1NlcnZpY2UucmVwb3NpdGlvbkV2ZW50LnN1YnNjcmliZShwb3NpdGlvbnMgPT4ge1xuICAgICAgaWYgKHBvc2l0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxSZXBvc2l0aW9uKHBvc2l0aW9ucyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhIGNzcyBzdHlsZSBvYmplY3QgZm9yIHRoZSBwb2ludFxuICAgKi9cbiAgcG9pbnRTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHRoaXMud2lkdGggKyAncHgnLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCArICdweCcsXG4gICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHRoaXMuY29sb3IsXG4gICAgICAnYm9yZGVyLXJhZGl1cyc6IHRoaXMuc2hhcGUgPT09ICdjaXJjbGUnID8gJzEwMCUnIDogMCxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZWdpc3RlcnMgYSBwb3NpdGlvbiBjaGFuZ2Ugb24gdGhlIGxpbWl0cyBzZXJ2aWNlLCBhbmQgYWRqdXN0cyBwb3NpdGlvbiBpZiBuZWNlc3NhcnlcbiAgICogQHBhcmFtIHBvc2l0aW9uIC0gdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHBvaW50XG4gICAqL1xuICBwb3NpdGlvbkNoYW5nZShwb3NpdGlvbjogWFlQb3NpdGlvbikge1xuICAgIGNvbnN0IHBvc2l0aW9uQ2hhbmdlRGF0YSA9IG5ldyBQb3NpdGlvbkNoYW5nZURhdGEocG9zaXRpb24sIHRoaXMubGltaXRSb2xlcyk7XG4gICAgY29uc3QgbGltaXRFeGNlcHRpb24gPSB0aGlzLmxpbWl0c1NlcnZpY2UuZXhjZWVkc0xpbWl0KHBvc2l0aW9uQ2hhbmdlRGF0YSk7XG4gICAgaWYgKGxpbWl0RXhjZXB0aW9uLmV4Y2VlZHMpIHtcbiAgICAgIC8vIGlmIGV4Y2VlZHMgbGltaXRzLCByZXBvc2l0aW9uXG4gICAgICB0aGlzLnJlc2V0UG9zaXRpb24gPSBsaW1pdEV4Y2VwdGlvbi5yZXNldENvb3JkaW5hdGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpbWl0c1NlcnZpY2UucG9zaXRpb25DaGFuZ2UocG9zaXRpb25DaGFuZ2VEYXRhKTtcbiAgICAgIHRoaXMuX2N1cnJlbnRQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhZGp1c3RzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnQgYWZ0ZXIgYSBsaW1pdCBleGNlcHRpb25cbiAgICovXG4gIHByaXZhdGUgYWRqdXN0UG9zaXRpb24obGltaXRFeGNlcHRpb246IExpbWl0RXhjZXB0aW9uKSB7XG4gICAgY29uc3QgbmV3UG9zaXRpb24gPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gICAgT2JqZWN0LmtleXModGhpcy5zdGFydFBvc2l0aW9uKS5mb3JFYWNoKGF4aXMgPT4ge1xuICAgICAgbmV3UG9zaXRpb25bYXhpc10gPSBsaW1pdEV4Y2VwdGlvbi5yZXNldENvb3JkaW5hdGVzW2F4aXNdICsgbGltaXRFeGNlcHRpb24ucmVzZXRDb2VmZmljaWVudHNbYXhpc107XG4gICAgfSk7XG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ld1Bvc2l0aW9uO1xuICAgIHRoaXMubGltaXRzU2VydmljZS5wb3NpdGlvbkNoYW5nZShuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHRoaXMucG9zaXRpb24sIHRoaXMubGltaXRSb2xlcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGxlZCBvbiBtb3ZlbWVudCBlbmQsIGNoZWNrcyBpZiBsYXN0IHBvc2l0aW9uIGV4Y2VlZGVkIHRoZSBsaW1pdHMgYWQgYWRqdXN0c1xuICAgKi9cbiAgbW92ZW1lbnRFbmQocG9zaXRpb246IFhZUG9zaXRpb24pIHtcbiAgICBsZXQgcG9zaXRpb25DaGFuZ2VEYXRhID0gbmV3IFBvc2l0aW9uQ2hhbmdlRGF0YShwb3NpdGlvbiwgdGhpcy5saW1pdFJvbGVzKTtcbiAgICBjb25zdCBsaW1pdEV4Y2VwdGlvbiA9IHRoaXMubGltaXRzU2VydmljZS5leGNlZWRzTGltaXQocG9zaXRpb25DaGFuZ2VEYXRhKTtcbiAgICBpZiAobGltaXRFeGNlcHRpb24uZXhjZWVkcykge1xuICAgICAgdGhpcy5yZXNldFBvc2l0aW9uID0gbGltaXRFeGNlcHRpb24ucmVzZXRDb29yZGluYXRlcztcbiAgICAgIGlmIChsaW1pdEV4Y2VwdGlvbi5leGNlZWRzKSB7XG4gICAgICAgIHRoaXMuYWRqdXN0UG9zaXRpb24obGltaXRFeGNlcHRpb24pO1xuICAgICAgICBwb3NpdGlvbkNoYW5nZURhdGEgPSBuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHRoaXMucG9zaXRpb24sIHRoaXMubGltaXRSb2xlcyk7XG4gICAgICAgIHRoaXMubGltaXRzU2VydmljZS51cGRhdGVQb3NpdGlvbihwb3NpdGlvbkNoYW5nZURhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxjdWxhdGVzIHRoZSBpbml0aWFsIHBvc2l0aW9ucyBvZiB0aGUgcG9pbnQgYnkgaXQncyByb2xlc1xuICAgKiBAcGFyYW0gZGltZW5zaW9ucyAtIGRpbWVuc2lvbnMgb2YgdGhlIHBhbmUgaW4gd2hpY2ggdGhlIHBvaW50IGlzIGxvY2F0ZWRcbiAgICovXG4gIHByaXZhdGUgZ2V0SW5pdGlhbFBvc2l0aW9uKGRpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucykge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLmxpbWl0Um9sZXMuaW5jbHVkZXMoJ2xlZnQnKSA/IDAgOiBkaW1lbnNpb25zLndpZHRoIC0gdGhpcy53aWR0aCAvIDIsXG4gICAgICB5OiB0aGlzLmxpbWl0Um9sZXMuaW5jbHVkZXMoJ3RvcCcpID8gMCA6IGRpbWVuc2lvbnMuaGVpZ2h0IC0gdGhpcy5oZWlnaHQgLyAyXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXBvc2l0aW9ucyB0aGUgcG9pbnQgYWZ0ZXIgYW4gZXh0ZXJuYWwgcmVwb3NpdGlvbiBldmVudFxuICAgKiBAcGFyYW0gcG9zaXRpb25zIC0gYW4gYXJyYXkgb2YgYWxsIHBvaW50cyBvbiB0aGUgcGFuZVxuICAgKi9cbiAgcHJpdmF0ZSBleHRlcm5hbFJlcG9zaXRpb24ocG9zaXRpb25zOiBBcnJheTxQb2ludFBvc2l0aW9uQ2hhbmdlPikge1xuICAgIHBvc2l0aW9ucy5mb3JFYWNoKHBvc2l0aW9uID0+IHtcbiAgICAgIGlmICh0aGlzLmxpbWl0c1NlcnZpY2UuY29tcGFyZUFycmF5KHRoaXMubGltaXRSb2xlcywgcG9zaXRpb24ucm9sZXMpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gdGhpcy5lbmZvcmNlUGFuZUxpbWl0cyhwb3NpdGlvbik7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB7XG4gICAgICAgICAgeDogcG9zaXRpb24ueCxcbiAgICAgICAgICB5OiBwb3NpdGlvbi55XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhIG5ldyBwb2ludCBwb3NpdGlvbiBpZiB0aGUgbW92ZW1lbnQgZXhjZWVkZWQgdGhlIHBhbmUgbGltaXRcbiAgICovXG4gIHByaXZhdGUgZW5mb3JjZVBhbmVMaW1pdHMocG9zaXRpb246IFBvaW50UG9zaXRpb25DaGFuZ2UpOiBQb2ludFBvc2l0aW9uQ2hhbmdlIHtcbiAgICBpZiAodGhpcy5fcGFuZURpbWVuc2lvbnMud2lkdGggPT09IDAgfHwgdGhpcy5fcGFuZURpbWVuc2lvbnMuaGVpZ2h0ID09PSAwKSB7XG4gICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwb3NpdGlvbi54ID4gdGhpcy5fcGFuZURpbWVuc2lvbnMud2lkdGgpIHsgcG9zaXRpb24ueCA9IHRoaXMuX3BhbmVEaW1lbnNpb25zLndpZHRoOyB9XG4gICAgICBpZiAocG9zaXRpb24ueCA8IDApIHsgcG9zaXRpb24ueCA9IDE7IH1cbiAgICAgIGlmIChwb3NpdGlvbi55ID4gdGhpcy5fcGFuZURpbWVuc2lvbnMuaGVpZ2h0KSB7IHBvc2l0aW9uLnkgPSB0aGlzLl9wYW5lRGltZW5zaW9ucy5oZWlnaHQ7IH1cbiAgICAgIGlmIChwb3NpdGlvbi55IDwgMCkgeyBwb3NpdGlvbi55ID0gMTsgfVxuICAgIH1cbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cbn1cblxuIl19