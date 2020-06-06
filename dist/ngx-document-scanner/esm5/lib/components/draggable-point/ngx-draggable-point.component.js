/**
 * @fileoverview added by tsickle
 * Generated from: lib/components/draggable-point/ngx-draggable-point.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        Object.keys(this.pointOptions).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            _this[key] = _this.pointOptions[key];
        }));
        // subscribe to pane dimensions changes
        this.limitsService.paneDimensions.subscribe((/**
         * @param {?} dimensions
         * @return {?}
         */
        function (dimensions) {
            if (dimensions.width > 0 && dimensions.width > 0) {
                _this._paneDimensions = {
                    width: dimensions.width,
                    height: dimensions.height
                };
                _this.position = _this.getInitialPosition(dimensions);
                _this.limitsService.positionChange(new PositionChangeData(_this.position, _this.limitRoles));
            }
        }));
        // subscribe to external reposition events
        this.limitsService.repositionEvent.subscribe((/**
         * @param {?} positions
         * @return {?}
         */
        function (positions) {
            if (positions.length > 0) {
                _this.externalReposition(positions);
            }
        }));
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
        Object.keys(this.startPosition).forEach((/**
         * @param {?} axis
         * @return {?}
         */
        function (axis) {
            newPosition[axis] = limitException.resetCoordinates[axis] + limitException.resetCoefficients[axis];
        }));
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
        positions.forEach((/**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            if (_this.limitsService.compareArray(_this.limitRoles, position.roles)) {
                position = _this.enforcePaneLimits(position);
                _this.position = {
                    x: position.x,
                    y: position.y
                };
            }
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRyYWdnYWJsZS1wb2ludC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZG9jdW1lbnQtc2Nhbm5lci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RyYWdnYWJsZS1wb2ludC9uZ3gtZHJhZ2dhYmxlLXBvaW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUMsYUFBYSxFQUF1QixrQkFBa0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBSXJHO0lBcUJFLG9DQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWhCdkMsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixVQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ2xCLFVBQUssR0FBc0IsTUFBTSxDQUFDO1FBQ2xDLGlCQUFZLEdBQXNCLE1BQU0sQ0FBQztRQUtsRCxhQUFRLEdBQWU7WUFDckIsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUM7SUFJaUQsQ0FBQzs7OztJQUVwRCxvREFBZTs7O0lBQWY7UUFBQSxpQkFxQkM7UUFwQkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsR0FBRztZQUN4QyxLQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxDQUFDLEVBQUMsQ0FBQztRQUNILHVDQUF1QztRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxVQUFVO1lBQ3BELElBQUksVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssR0FBRyxD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Z0NBQ0wsS0FBSzs0QkFDTCxLQUFLO21DQUNMLEtBQUs7O0lBc0lSLGlDQUFDO0NBQUEsQUFuSkQsSUFtSkM7U0EvSVksMEJBQTBCOzs7SUFDckMsMkNBQW9COztJQUNwQiw0Q0FBcUI7O0lBQ3JCLDJDQUEyQjs7SUFDM0IsMkNBQTJDOztJQUMzQyxrREFBa0Q7O0lBQ2xELGdEQUEwRDs7SUFDMUQsbURBQW1DOztJQUNuQywrQ0FBZ0M7Ozs7O0lBQ2hDLHNEQUE4Qzs7SUFDOUMsOENBR0U7Ozs7O0lBQ0YscURBQXlDOztJQUN6QyxtREFBMEI7Ozs7O0lBRWQsbURBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TGltaXRzU2VydmljZSwgUG9pbnRQb3NpdGlvbkNoYW5nZSwgUG9zaXRpb25DaGFuZ2VEYXRhfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9saW1pdHMuc2VydmljZSc7XG5pbXBvcnQge0ltYWdlRGltZW5zaW9uc30gZnJvbSAnLi4vLi4vUHVibGljTW9kZWxzJztcbmltcG9ydCB7TGltaXRFeGNlcHRpb24sIFhZUG9zaXRpb259IGZyb20gJy4uLy4uL1ByaXZhdGVNb2RlbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZHJhZ2dhYmxlLXBvaW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1kcmFnZ2FibGUtcG9pbnQuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hEcmFnZ2FibGVQb2ludENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSB3aWR0aCA9IDEwO1xuICBASW5wdXQoKSBoZWlnaHQgPSAxMDtcbiAgQElucHV0KCkgY29sb3IgPSAnIzNjYWJlMic7XG4gIEBJbnB1dCgpIHNoYXBlOiAncmVjdCcgfCAnY2lyY2xlJyA9ICdyZWN0JztcbiAgQElucHV0KCkgcG9pbnRPcHRpb25zOiAncmVjdCcgfCAnY2lyY2xlJyA9ICdyZWN0JztcbiAgQElucHV0KCkgbGltaXRSb2xlczogQXJyYXk8J2xlZnQnfCdyaWdodCd8J3RvcCd8J2JvdHRvbSc+O1xuICBASW5wdXQoKSBzdGFydFBvc2l0aW9uOiBYWVBvc2l0aW9uO1xuICBASW5wdXQoKSBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuICBASW5wdXQoKSBwcml2YXRlIF9jdXJyZW50UG9zaXRpb246IFhZUG9zaXRpb247XG4gIHBvc2l0aW9uOiBYWVBvc2l0aW9uID0ge1xuICAgIHg6IDAsXG4gICAgeTogMFxuICB9O1xuICBwcml2YXRlIF9wYW5lRGltZW5zaW9uczogSW1hZ2VEaW1lbnNpb25zO1xuICByZXNldFBvc2l0aW9uOiBYWVBvc2l0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGltaXRzU2VydmljZTogTGltaXRzU2VydmljZSkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5wb2ludE9wdGlvbnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXNba2V5XSA9IHRoaXMucG9pbnRPcHRpb25zW2tleV07XG4gICAgfSk7XG4gICAgLy8gc3Vic2NyaWJlIHRvIHBhbmUgZGltZW5zaW9ucyBjaGFuZ2VzXG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBhbmVEaW1lbnNpb25zLnN1YnNjcmliZShkaW1lbnNpb25zID0+IHtcbiAgICAgIGlmIChkaW1lbnNpb25zLndpZHRoID4gMCAmJiBkaW1lbnNpb25zLndpZHRoID4gMCkge1xuICAgICAgICB0aGlzLl9wYW5lRGltZW5zaW9ucyA9IHtcbiAgICAgICAgICB3aWR0aDogZGltZW5zaW9ucy53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGRpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLmdldEluaXRpYWxQb3NpdGlvbihkaW1lbnNpb25zKTtcbiAgICAgICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBvc2l0aW9uQ2hhbmdlKG5ldyBQb3NpdGlvbkNoYW5nZURhdGEodGhpcy5wb3NpdGlvbiwgdGhpcy5saW1pdFJvbGVzKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gc3Vic2NyaWJlIHRvIGV4dGVybmFsIHJlcG9zaXRpb24gZXZlbnRzXG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnJlcG9zaXRpb25FdmVudC5zdWJzY3JpYmUocG9zaXRpb25zID0+IHtcbiAgICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmV4dGVybmFsUmVwb3NpdGlvbihwb3NpdGlvbnMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgYSBjc3Mgc3R5bGUgb2JqZWN0IGZvciB0aGUgcG9pbnRcbiAgICovXG4gIHBvaW50U3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoICsgJ3B4JyxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQgKyAncHgnLFxuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB0aGlzLmNvbG9yLFxuICAgICAgJ2JvcmRlci1yYWRpdXMnOiB0aGlzLnNoYXBlID09PSAnY2lyY2xlJyA/ICcxMDAlJyA6IDAsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogcmVnaXN0ZXJzIGEgcG9zaXRpb24gY2hhbmdlIG9uIHRoZSBsaW1pdHMgc2VydmljZSwgYW5kIGFkanVzdHMgcG9zaXRpb24gaWYgbmVjZXNzYXJ5XG4gICAqIEBwYXJhbSBwb3NpdGlvbiAtIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBwb2ludFxuICAgKi9cbiAgcG9zaXRpb25DaGFuZ2UocG9zaXRpb246IFhZUG9zaXRpb24pIHtcbiAgICBjb25zdCBwb3NpdGlvbkNoYW5nZURhdGEgPSBuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHBvc2l0aW9uLCB0aGlzLmxpbWl0Um9sZXMpO1xuICAgIGNvbnN0IGxpbWl0RXhjZXB0aW9uID0gdGhpcy5saW1pdHNTZXJ2aWNlLmV4Y2VlZHNMaW1pdChwb3NpdGlvbkNoYW5nZURhdGEpO1xuICAgIGlmIChsaW1pdEV4Y2VwdGlvbi5leGNlZWRzKSB7XG4gICAgICAvLyBpZiBleGNlZWRzIGxpbWl0cywgcmVwb3NpdGlvblxuICAgICAgdGhpcy5yZXNldFBvc2l0aW9uID0gbGltaXRFeGNlcHRpb24ucmVzZXRDb29yZGluYXRlcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBvc2l0aW9uQ2hhbmdlKHBvc2l0aW9uQ2hhbmdlRGF0YSk7XG4gICAgICB0aGlzLl9jdXJyZW50UG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRqdXN0cyB0aGUgcG9zaXRpb24gb2YgdGhlIHBvaW50IGFmdGVyIGEgbGltaXQgZXhjZXB0aW9uXG4gICAqL1xuICBwcml2YXRlIGFkanVzdFBvc2l0aW9uKGxpbWl0RXhjZXB0aW9uOiBMaW1pdEV4Y2VwdGlvbikge1xuICAgIGNvbnN0IG5ld1Bvc2l0aW9uID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICAgIE9iamVjdC5rZXlzKHRoaXMuc3RhcnRQb3NpdGlvbikuZm9yRWFjaChheGlzID0+IHtcbiAgICAgIG5ld1Bvc2l0aW9uW2F4aXNdID0gbGltaXRFeGNlcHRpb24ucmVzZXRDb29yZGluYXRlc1theGlzXSArIGxpbWl0RXhjZXB0aW9uLnJlc2V0Q29lZmZpY2llbnRzW2F4aXNdO1xuICAgIH0pO1xuICAgIHRoaXMucG9zaXRpb24gPSBuZXdQb3NpdGlvbjtcbiAgICB0aGlzLmxpbWl0c1NlcnZpY2UucG9zaXRpb25DaGFuZ2UobmV3IFBvc2l0aW9uQ2hhbmdlRGF0YSh0aGlzLnBvc2l0aW9uLCB0aGlzLmxpbWl0Um9sZXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsZWQgb24gbW92ZW1lbnQgZW5kLCBjaGVja3MgaWYgbGFzdCBwb3NpdGlvbiBleGNlZWRlZCB0aGUgbGltaXRzIGFkIGFkanVzdHNcbiAgICovXG4gIG1vdmVtZW50RW5kKHBvc2l0aW9uOiBYWVBvc2l0aW9uKSB7XG4gICAgbGV0IHBvc2l0aW9uQ2hhbmdlRGF0YSA9IG5ldyBQb3NpdGlvbkNoYW5nZURhdGEocG9zaXRpb24sIHRoaXMubGltaXRSb2xlcyk7XG4gICAgY29uc3QgbGltaXRFeGNlcHRpb24gPSB0aGlzLmxpbWl0c1NlcnZpY2UuZXhjZWVkc0xpbWl0KHBvc2l0aW9uQ2hhbmdlRGF0YSk7XG4gICAgaWYgKGxpbWl0RXhjZXB0aW9uLmV4Y2VlZHMpIHtcbiAgICAgIHRoaXMucmVzZXRQb3NpdGlvbiA9IGxpbWl0RXhjZXB0aW9uLnJlc2V0Q29vcmRpbmF0ZXM7XG4gICAgICBpZiAobGltaXRFeGNlcHRpb24uZXhjZWVkcykge1xuICAgICAgICB0aGlzLmFkanVzdFBvc2l0aW9uKGxpbWl0RXhjZXB0aW9uKTtcbiAgICAgICAgcG9zaXRpb25DaGFuZ2VEYXRhID0gbmV3IFBvc2l0aW9uQ2hhbmdlRGF0YSh0aGlzLnBvc2l0aW9uLCB0aGlzLmxpbWl0Um9sZXMpO1xuICAgICAgICB0aGlzLmxpbWl0c1NlcnZpY2UudXBkYXRlUG9zaXRpb24ocG9zaXRpb25DaGFuZ2VEYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2FsY3VsYXRlcyB0aGUgaW5pdGlhbCBwb3NpdGlvbnMgb2YgdGhlIHBvaW50IGJ5IGl0J3Mgcm9sZXNcbiAgICogQHBhcmFtIGRpbWVuc2lvbnMgLSBkaW1lbnNpb25zIG9mIHRoZSBwYW5lIGluIHdoaWNoIHRoZSBwb2ludCBpcyBsb2NhdGVkXG4gICAqL1xuICBwcml2YXRlIGdldEluaXRpYWxQb3NpdGlvbihkaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy5saW1pdFJvbGVzLmluY2x1ZGVzKCdsZWZ0JykgPyAwIDogZGltZW5zaW9ucy53aWR0aCAtIHRoaXMud2lkdGggLyAyLFxuICAgICAgeTogdGhpcy5saW1pdFJvbGVzLmluY2x1ZGVzKCd0b3AnKSA/IDAgOiBkaW1lbnNpb25zLmhlaWdodCAtIHRoaXMuaGVpZ2h0IC8gMlxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogcmVwb3NpdGlvbnMgdGhlIHBvaW50IGFmdGVyIGFuIGV4dGVybmFsIHJlcG9zaXRpb24gZXZlbnRcbiAgICogQHBhcmFtIHBvc2l0aW9ucyAtIGFuIGFycmF5IG9mIGFsbCBwb2ludHMgb24gdGhlIHBhbmVcbiAgICovXG4gIHByaXZhdGUgZXh0ZXJuYWxSZXBvc2l0aW9uKHBvc2l0aW9uczogQXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT4pIHtcbiAgICBwb3NpdGlvbnMuZm9yRWFjaChwb3NpdGlvbiA9PiB7XG4gICAgICBpZiAodGhpcy5saW1pdHNTZXJ2aWNlLmNvbXBhcmVBcnJheSh0aGlzLmxpbWl0Um9sZXMsIHBvc2l0aW9uLnJvbGVzKSkge1xuICAgICAgICBwb3NpdGlvbiA9IHRoaXMuZW5mb3JjZVBhbmVMaW1pdHMocG9zaXRpb24pO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICAgIHg6IHBvc2l0aW9uLngsXG4gICAgICAgICAgeTogcG9zaXRpb24ueVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgYSBuZXcgcG9pbnQgcG9zaXRpb24gaWYgdGhlIG1vdmVtZW50IGV4Y2VlZGVkIHRoZSBwYW5lIGxpbWl0XG4gICAqL1xuICBwcml2YXRlIGVuZm9yY2VQYW5lTGltaXRzKHBvc2l0aW9uOiBQb2ludFBvc2l0aW9uQ2hhbmdlKTogUG9pbnRQb3NpdGlvbkNoYW5nZSB7XG4gICAgaWYgKHRoaXMuX3BhbmVEaW1lbnNpb25zLndpZHRoID09PSAwIHx8IHRoaXMuX3BhbmVEaW1lbnNpb25zLmhlaWdodCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHBvc2l0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocG9zaXRpb24ueCA+IHRoaXMuX3BhbmVEaW1lbnNpb25zLndpZHRoKSB7IHBvc2l0aW9uLnggPSB0aGlzLl9wYW5lRGltZW5zaW9ucy53aWR0aDsgfVxuICAgICAgaWYgKHBvc2l0aW9uLnggPCAwKSB7IHBvc2l0aW9uLnggPSAxOyB9XG4gICAgICBpZiAocG9zaXRpb24ueSA+IHRoaXMuX3BhbmVEaW1lbnNpb25zLmhlaWdodCkgeyBwb3NpdGlvbi55ID0gdGhpcy5fcGFuZURpbWVuc2lvbnMuaGVpZ2h0OyB9XG4gICAgICBpZiAocG9zaXRpb24ueSA8IDApIHsgcG9zaXRpb24ueSA9IDE7IH1cbiAgICB9XG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG59XG5cbiJdfQ==