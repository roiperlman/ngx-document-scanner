/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/limits.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
var LimitsService = /** @class */ (function () {
    function LimitsService() {
        this.limitDirections = ['left', 'right', 'top', 'bottom'];
        /**
         * stores the crop limits limits
         */
        this._limits = {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        };
        /**
         * stores the array of the draggable points displayed on the crop area
         */
        this._points = [];
        // *********** //
        // Observables //
        // *********** //
        this.positions = new BehaviorSubject(Array.from(this._points));
        this.repositionEvent = new BehaviorSubject([]);
        this.limits = new BehaviorSubject(this._limits);
        this.paneDimensions = new BehaviorSubject({ width: 0, height: 0 });
    }
    /**
     * set privew pane dimensions
     */
    /**
     * set privew pane dimensions
     * @param {?} dimensions
     * @return {?}
     */
    LimitsService.prototype.setPaneDimensions = /**
     * set privew pane dimensions
     * @param {?} dimensions
     * @return {?}
     */
    function (dimensions) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this._paneDimensions = dimensions;
            _this.paneDimensions.next(dimensions);
            resolve();
        }));
    };
    /**
     * repositions points externally
     */
    /**
     * repositions points externally
     * @param {?} positions
     * @return {?}
     */
    LimitsService.prototype.repositionPoints = /**
     * repositions points externally
     * @param {?} positions
     * @return {?}
     */
    function (positions) {
        var _this = this;
        this._points = positions;
        positions.forEach((/**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            _this.positionChange(position);
        }));
        this.repositionEvent.next(positions);
    };
    /**
     * updates limits and point positions and calls next on the observables
     * @param positionChangeData - position change event data
     */
    /**
     * updates limits and point positions and calls next on the observables
     * @param {?} positionChangeData - position change event data
     * @return {?}
     */
    LimitsService.prototype.positionChange = /**
     * updates limits and point positions and calls next on the observables
     * @param {?} positionChangeData - position change event data
     * @return {?}
     */
    function (positionChangeData) {
        var _this = this;
        // update positions according to current position change
        this.updatePosition(positionChangeData);
        // for each direction:
        // 1. filter the _points that have a role as the direction's limit
        // 2. for top and left find max x | y values, and min for right and bottom
        this.limitDirections.forEach((/**
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            /** @type {?} */
            var relevantPoints = _this._points.filter((/**
             * @param {?} point
             * @return {?}
             */
            function (point) {
                return point.roles.includes(direction);
            }))
                .map((/**
             * @param {?} point
             * @return {?}
             */
            function (point) {
                return point[_this.getDirectionAxis(direction)];
            }));
            /** @type {?} */
            var limit;
            if (direction === 'top' || direction === 'left') {
                limit = Math.max.apply(Math, __spread(relevantPoints));
            }
            if (direction === 'right' || direction === 'bottom') {
                limit = Math.min.apply(Math, __spread(relevantPoints));
            }
            _this._limits[direction] = limit;
        }));
        this.limits.next(this._limits);
        this.positions.next(Array.from(this._points));
    };
    /**
     * updates the position of the point
     * @param positionChange - position change event data
     */
    /**
     * updates the position of the point
     * @param {?} positionChange - position change event data
     * @return {?}
     */
    LimitsService.prototype.updatePosition = /**
     * updates the position of the point
     * @param {?} positionChange - position change event data
     * @return {?}
     */
    function (positionChange) {
        var _this = this;
        // finds the current position of the point by it's roles, than splices it for the new position or pushes it if it's not yet in the array
        /** @type {?} */
        var index = this._points.findIndex((/**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            return _this.compareArray(positionChange.roles, point.roles);
        }));
        if (index === -1) {
            this._points.push(positionChange);
        }
        else {
            this._points.splice(index, 1, positionChange);
        }
    };
    /**
     * check if a position change event exceeds the limits
     * @param positionChange - position change event data
     * @returns LimitException0
     */
    /**
     * check if a position change event exceeds the limits
     * @param {?} positionChange - position change event data
     * @return {?} LimitException0
     */
    LimitsService.prototype.exceedsLimit = /**
     * check if a position change event exceeds the limits
     * @param {?} positionChange - position change event data
     * @return {?} LimitException0
     */
    function (positionChange) {
        var _this = this;
        /** @type {?} */
        var pointLimits = this.limitDirections.filter((/**
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            return !positionChange.roles.includes(direction);
        }));
        /** @type {?} */
        var limitException = {
            exceeds: false,
            resetCoefficients: {
                x: 0,
                y: 0
            },
            resetCoordinates: {
                x: positionChange.x,
                y: positionChange.y
            }
        };
        // limit directions are the opposite sides of the point's roles
        pointLimits.forEach((/**
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            /** @type {?} */
            var directionAxis = _this.getDirectionAxis(direction);
            if (direction === 'top' || direction === 'left') {
                if (positionChange[directionAxis] < _this._limits[direction]) {
                    limitException.resetCoefficients[directionAxis] = 1;
                    limitException.resetCoordinates[directionAxis] = _this._limits[direction];
                }
            }
            else if (direction === 'right' || direction === 'bottom') {
                if (positionChange[directionAxis] > _this._limits[direction]) {
                    limitException.resetCoefficients[directionAxis] = -1;
                    limitException.resetCoordinates[directionAxis] = _this._limits[direction];
                }
            }
        }));
        if (limitException.resetCoefficients.x !== 0 || limitException.resetCoefficients.y !== 0) {
            limitException.exceeds = true;
        }
        return limitException;
    };
    /**
     * rotate crop tool points clockwise
     * @param resizeRatios - ratio between the new dimensions and the previous
     * @param initialPreviewDimensions - preview pane dimensions before rotation
     * @param initialPositions - current positions before rotation
     */
    /**
     * rotate crop tool points clockwise
     * @param {?} resizeRatios - ratio between the new dimensions and the previous
     * @param {?} initialPreviewDimensions - preview pane dimensions before rotation
     * @param {?} initialPositions - current positions before rotation
     * @return {?}
     */
    LimitsService.prototype.rotateClockwise = /**
     * rotate crop tool points clockwise
     * @param {?} resizeRatios - ratio between the new dimensions and the previous
     * @param {?} initialPreviewDimensions - preview pane dimensions before rotation
     * @param {?} initialPositions - current positions before rotation
     * @return {?}
     */
    function (resizeRatios, initialPreviewDimensions, initialPositions) {
        var _this = this;
        // convert positions to ratio between position to initial pane dimension
        initialPositions = initialPositions.map((/**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            return new PositionChangeData({
                x: point.x / initialPreviewDimensions.width,
                y: point.y / initialPreviewDimensions.height,
            }, point.roles);
        }));
        this.repositionPoints(initialPositions.map((/**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            return _this.rotateCornerClockwise(point);
        })));
    };
    /**
     * returns the corner positions after a 90 degrees clockwise rotation
     */
    /**
     * returns the corner positions after a 90 degrees clockwise rotation
     * @private
     * @param {?} corner
     * @return {?}
     */
    LimitsService.prototype.rotateCornerClockwise = /**
     * returns the corner positions after a 90 degrees clockwise rotation
     * @private
     * @param {?} corner
     * @return {?}
     */
    function (corner) {
        var _this = this;
        /** @type {?} */
        var rotated = {
            x: this._paneDimensions.width * (1 - corner.y),
            y: this._paneDimensions.height * corner.x,
            roles: []
        };
        // rotates corner according to order
        /** @type {?} */
        var order = [
            ['bottom', 'left'],
            ['top', 'left'],
            ['top', 'right'],
            ['bottom', 'right'],
            ['bottom', 'left']
        ];
        rotated.roles = order[order.findIndex((/**
         * @param {?} roles
         * @return {?}
         */
        function (roles) {
            return _this.compareArray(roles, corner.roles);
        })) + 1];
        return rotated;
    };
    /**
     * checks if two array contain the same values
     * @param array1 - array 1
     * @param array2 - array 2
     * @returns boolean
     */
    /**
     * checks if two array contain the same values
     * @param {?} array1 - array 1
     * @param {?} array2 - array 2
     * @return {?} boolean
     */
    LimitsService.prototype.compareArray = /**
     * checks if two array contain the same values
     * @param {?} array1 - array 1
     * @param {?} array2 - array 2
     * @return {?} boolean
     */
    function (array1, array2) {
        return array1.every((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            return array2.includes(element);
        })) && array1.length === array2.length;
    };
    /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    LimitsService.prototype.getDirectionAxis = /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    function (direction) {
        return {
            left: 'x',
            right: 'x',
            top: 'y',
            bottom: 'y'
        }[direction];
    };
    LimitsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    LimitsService.ctorParameters = function () { return []; };
    /** @nocollapse */ LimitsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LimitsService_Factory() { return new LimitsService(); }, token: LimitsService, providedIn: "root" });
    return LimitsService;
}());
export { LimitsService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LimitsService.prototype.limitDirections;
    /**
     * stores the crop limits limits
     * @type {?}
     * @private
     */
    LimitsService.prototype._limits;
    /**
     * stores the array of the draggable points displayed on the crop area
     * @type {?}
     * @private
     */
    LimitsService.prototype._points;
    /**
     * stores the pane dimensions
     * @type {?}
     * @private
     */
    LimitsService.prototype._paneDimensions;
    /** @type {?} */
    LimitsService.prototype.positions;
    /** @type {?} */
    LimitsService.prototype.repositionEvent;
    /** @type {?} */
    LimitsService.prototype.limits;
    /** @type {?} */
    LimitsService.prototype.paneDimensions;
}
/**
 * @record
 */
export function PointPositionChange() { }
if (false) {
    /** @type {?} */
    PointPositionChange.prototype.x;
    /** @type {?} */
    PointPositionChange.prototype.y;
    /** @type {?} */
    PointPositionChange.prototype.roles;
}
/**
 * @record
 */
export function AreaLimits() { }
if (false) {
    /** @type {?} */
    AreaLimits.prototype.top;
    /** @type {?} */
    AreaLimits.prototype.bottom;
    /** @type {?} */
    AreaLimits.prototype.right;
    /** @type {?} */
    AreaLimits.prototype.left;
}
var PositionChangeData = /** @class */ (function () {
    function PositionChangeData(position, roles) {
        this.x = position.x;
        this.y = position.y;
        this.roles = roles;
    }
    return PositionChangeData;
}());
export { PositionChangeData };
if (false) {
    /** @type {?} */
    PositionChangeData.prototype.x;
    /** @type {?} */
    PositionChangeData.prototype.y;
    /** @type {?} */
    PositionChangeData.prototype.roles;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGltaXRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZG9jdW1lbnQtc2Nhbm5lci8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9saW1pdHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7O0FBSXJDO0lBaUNFO1FBM0JRLG9CQUFlLEdBQWUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7OztRQUlqRSxZQUFPLEdBQUc7WUFDaEIsR0FBRyxFQUFFLENBQUM7WUFDTixNQUFNLEVBQUUsQ0FBQztZQUNULEtBQUssRUFBRSxDQUFDO1lBQ1IsSUFBSSxFQUFFLENBQUM7U0FDUixDQUFDOzs7O1FBSU0sWUFBTyxHQUErQixFQUFFLENBQUM7Ozs7UUFTMUMsY0FBUyxHQUFnRCxJQUFJLGVBQWUsQ0FBNkIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNuSSxvQkFBZSxHQUFnRCxJQUFJLGVBQWUsQ0FBNkIsRUFBRSxDQUFDLENBQUM7UUFDbkgsV0FBTSxHQUFnQyxJQUFJLGVBQWUsQ0FBYSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEYsbUJBQWMsR0FBcUMsSUFBSSxlQUFlLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBR3JHLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0kseUNBQWlCOzs7OztJQUF4QixVQUF5QixVQUEyQjtRQUFwRCxpQkFNQztRQUxDLE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsS0FBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7WUFDbEMs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YUFBYTs7Ozs7O0lBR3hCLHdDQUF5RTs7Ozs7O0lBSXpFLGdDQUtFOzs7Ozs7SUFJRixnQ0FBaUQ7Ozs7OztJQUlqRCx3Q0FBeUM7O0lBS3pDLGtDQUEwSTs7SUFDMUksd0NBQTBIOztJQUMxSCwrQkFBMkY7O0lBQzNGLHVDQUFxRzs7Ozs7QUF5THZHLHlDQUlDOzs7SUFIQyxnQ0FBVTs7SUFDVixnQ0FBVTs7SUFDVixvQ0FBa0I7Ozs7O0FBR3BCLGdDQUtDOzs7SUFKQyx5QkFBWTs7SUFDWiw0QkFBZTs7SUFDZiwyQkFBYzs7SUFDZCwwQkFBYTs7QUFLZjtJQUtFLDRCQUFZLFFBQW9CLEVBQUUsS0FBaUI7UUFDakQsSUFBSSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQzs7OztJQVRDLCtCQUFVOztJQUNWLCtCQUFVOztJQUNWLG1DQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0ltYWdlRGltZW5zaW9uc30gZnJvbSAnLi4vUHVibGljTW9kZWxzJztcbmltcG9ydCB7TGltaXRFeGNlcHRpb24sIFhZUG9zaXRpb259IGZyb20gJy4uL1ByaXZhdGVNb2RlbHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMaW1pdHNTZXJ2aWNlIHtcblxuXG4gIHByaXZhdGUgbGltaXREaXJlY3Rpb25zOiBSb2xlc0FycmF5ID0gWydsZWZ0JywgJ3JpZ2h0JywgJ3RvcCcsICdib3R0b20nXTtcbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgY3JvcCBsaW1pdHMgbGltaXRzXG4gICAqL1xuICBwcml2YXRlIF9saW1pdHMgPSB7XG4gICAgdG9wOiAwLFxuICAgIGJvdHRvbTogMCxcbiAgICByaWdodDogMCxcbiAgICBsZWZ0OiAwXG4gIH07XG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIGFycmF5IG9mIHRoZSBkcmFnZ2FibGUgcG9pbnRzIGRpc3BsYXllZCBvbiB0aGUgY3JvcCBhcmVhXG4gICAqL1xuICBwcml2YXRlIF9wb2ludHM6IEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+ID0gW107XG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIHBhbmUgZGltZW5zaW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBfcGFuZURpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucztcblxuICAvLyAqKioqKioqKioqKiAvL1xuICAvLyBPYnNlcnZhYmxlcyAvL1xuICAvLyAqKioqKioqKioqKiAvL1xuICBwdWJsaWMgcG9zaXRpb25zOiBCZWhhdmlvclN1YmplY3Q8QXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcnJheTxQb2ludFBvc2l0aW9uQ2hhbmdlPj4oQXJyYXkuZnJvbSh0aGlzLl9wb2ludHMpKTtcbiAgcHVibGljIHJlcG9zaXRpb25FdmVudDogQmVoYXZpb3JTdWJqZWN0PEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT4+KFtdKTtcbiAgcHVibGljIGxpbWl0czogQmVoYXZpb3JTdWJqZWN0PEFyZWFMaW1pdHM+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcmVhTGltaXRzPih0aGlzLl9saW1pdHMpO1xuICBwdWJsaWMgcGFuZURpbWVuc2lvbnM6IEJlaGF2aW9yU3ViamVjdDxJbWFnZURpbWVuc2lvbnM+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7d2lkdGg6IDAsIGhlaWdodDogMH0pO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgLyoqXG4gICAqIHNldCBwcml2ZXcgcGFuZSBkaW1lbnNpb25zXG4gICAqL1xuICBwdWJsaWMgc2V0UGFuZURpbWVuc2lvbnMoZGltZW5zaW9uczogSW1hZ2VEaW1lbnNpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuX3BhbmVEaW1lbnNpb25zID0gZGltZW5zaW9ucztcbiAgICAgIHRoaXMucGFuZURpbWVuc2lvbnMubmV4dChkaW1lbnNpb25zKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXBvc2l0aW9ucyBwb2ludHMgZXh0ZXJuYWxseVxuICAgKi9cbiAgcHVibGljIHJlcG9zaXRpb25Qb2ludHMocG9zaXRpb25zKSB7XG4gICAgdGhpcy5fcG9pbnRzID0gcG9zaXRpb25zO1xuICAgIHBvc2l0aW9ucy5mb3JFYWNoKHBvc2l0aW9uID0+IHtcbiAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2UocG9zaXRpb24pO1xuICAgIH0pO1xuICAgIHRoaXMucmVwb3NpdGlvbkV2ZW50Lm5leHQocG9zaXRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGVzIGxpbWl0cyBhbmQgcG9pbnQgcG9zaXRpb25zIGFuZCBjYWxscyBuZXh0IG9uIHRoZSBvYnNlcnZhYmxlc1xuICAgKiBAcGFyYW0gcG9zaXRpb25DaGFuZ2VEYXRhIC0gcG9zaXRpb24gY2hhbmdlIGV2ZW50IGRhdGFcbiAgICovXG4gIHB1YmxpYyBwb3NpdGlvbkNoYW5nZShwb3NpdGlvbkNoYW5nZURhdGE6IFBvaW50UG9zaXRpb25DaGFuZ2UpIHtcbiAgICAvLyB1cGRhdGUgcG9zaXRpb25zIGFjY29yZGluZyB0byBjdXJyZW50IHBvc2l0aW9uIGNoYW5nZVxuICAgIHRoaXMudXBkYXRlUG9zaXRpb24ocG9zaXRpb25DaGFuZ2VEYXRhKTtcblxuICAgIC8vIGZvciBlYWNoIGRpcmVjdGlvbjpcbiAgICAvLyAxLiBmaWx0ZXIgdGhlIF9wb2ludHMgdGhhdCBoYXZlIGEgcm9sZSBhcyB0aGUgZGlyZWN0aW9uJ3MgbGltaXRcbiAgICAvLyAyLiBmb3IgdG9wIGFuZCBsZWZ0IGZpbmQgbWF4IHggfCB5IHZhbHVlcywgYW5kIG1pbiBmb3IgcmlnaHQgYW5kIGJvdHRvbVxuICAgIHRoaXMubGltaXREaXJlY3Rpb25zLmZvckVhY2goZGlyZWN0aW9uID0+IHtcbiAgICAgIGNvbnN0IHJlbGV2YW50UG9pbnRzID0gdGhpcy5fcG9pbnRzLmZpbHRlcihwb2ludCA9PiB7XG4gICAgICAgIHJldHVybiBwb2ludC5yb2xlcy5pbmNsdWRlcyhkaXJlY3Rpb24pO1xuICAgICAgfSlcbiAgICAgICAgLm1hcCgocG9pbnQ6IFBvaW50UG9zaXRpb25DaGFuZ2UpID0+IHtcbiAgICAgICAgICByZXR1cm4gcG9pbnRbdGhpcy5nZXREaXJlY3Rpb25BeGlzKGRpcmVjdGlvbildO1xuICAgICAgICB9KTtcbiAgICAgIGxldCBsaW1pdDtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd0b3AnIHx8IGRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIGxpbWl0ID0gTWF0aC5tYXgoLi4ucmVsZXZhbnRQb2ludHMpO1xuICAgICAgfVxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3JpZ2h0JyB8fCBkaXJlY3Rpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgIGxpbWl0ID0gTWF0aC5taW4oLi4ucmVsZXZhbnRQb2ludHMpO1xuICAgICAgfVxuICAgICAgdGhpcy5fbGltaXRzW2RpcmVjdGlvbl0gPSBsaW1pdDtcbiAgICB9KTtcblxuICAgIHRoaXMubGltaXRzLm5leHQodGhpcy5fbGltaXRzKTtcbiAgICB0aGlzLnBvc2l0aW9ucy5uZXh0KEFycmF5LmZyb20odGhpcy5fcG9pbnRzKSk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIHBvaW50XG4gICAqIEBwYXJhbSBwb3NpdGlvbkNoYW5nZSAtIHBvc2l0aW9uIGNoYW5nZSBldmVudCBkYXRhXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlUG9zaXRpb24ocG9zaXRpb25DaGFuZ2U6IFBvaW50UG9zaXRpb25DaGFuZ2UpIHtcbiAgICAvLyBmaW5kcyB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgcG9pbnQgYnkgaXQncyByb2xlcywgdGhhbiBzcGxpY2VzIGl0IGZvciB0aGUgbmV3IHBvc2l0aW9uIG9yIHB1c2hlcyBpdCBpZiBpdCdzIG5vdCB5ZXQgaW4gdGhlIGFycmF5XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9wb2ludHMuZmluZEluZGV4KHBvaW50ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVBcnJheShwb3NpdGlvbkNoYW5nZS5yb2xlcywgcG9pbnQucm9sZXMpO1xuICAgIH0pO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIHRoaXMuX3BvaW50cy5wdXNoKHBvc2l0aW9uQ2hhbmdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcG9pbnRzLnNwbGljZShpbmRleCwgMSwgcG9zaXRpb25DaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBpZiBhIHBvc2l0aW9uIGNoYW5nZSBldmVudCBleGNlZWRzIHRoZSBsaW1pdHNcbiAgICogQHBhcmFtIHBvc2l0aW9uQ2hhbmdlIC0gcG9zaXRpb24gY2hhbmdlIGV2ZW50IGRhdGFcbiAgICogQHJldHVybnMgTGltaXRFeGNlcHRpb24wXG4gICAqL1xuICBwdWJsaWMgZXhjZWVkc0xpbWl0KHBvc2l0aW9uQ2hhbmdlOiBQb2ludFBvc2l0aW9uQ2hhbmdlKTogTGltaXRFeGNlcHRpb24ge1xuICAgIGNvbnN0IHBvaW50TGltaXRzID0gdGhpcy5saW1pdERpcmVjdGlvbnMuZmlsdGVyKGRpcmVjdGlvbiA9PiB7XG4gICAgICByZXR1cm4gIXBvc2l0aW9uQ2hhbmdlLnJvbGVzLmluY2x1ZGVzKGRpcmVjdGlvbik7XG4gICAgfSk7XG5cbiAgICBjb25zdCBsaW1pdEV4Y2VwdGlvbjogTGltaXRFeGNlcHRpb24gPSB7XG4gICAgICBleGNlZWRzOiBmYWxzZSxcbiAgICAgIHJlc2V0Q29lZmZpY2llbnRzOiB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH0sXG4gICAgICByZXNldENvb3JkaW5hdGVzOiB7XG4gICAgICAgIHg6IHBvc2l0aW9uQ2hhbmdlLngsXG4gICAgICAgIHk6IHBvc2l0aW9uQ2hhbmdlLnlcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gbGltaXQgZGlyZWN0aW9ucyBhcmUgdGhlIG9wcG9zaXRlIHNpZGVzIG9mIHRoZSBwb2ludCdzIHJvbGVzXG4gICAgcG9pbnRMaW1pdHMuZm9yRWFjaChkaXJlY3Rpb24gPT4ge1xuICAgICAgY29uc3QgZGlyZWN0aW9uQXhpcyA9IHRoaXMuZ2V0RGlyZWN0aW9uQXhpcyhkaXJlY3Rpb24pO1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3RvcCcgfHwgZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgaWYgKHBvc2l0aW9uQ2hhbmdlW2RpcmVjdGlvbkF4aXNdIDwgdGhpcy5fbGltaXRzW2RpcmVjdGlvbl0pIHtcbiAgICAgICAgICBsaW1pdEV4Y2VwdGlvbi5yZXNldENvZWZmaWNpZW50c1tkaXJlY3Rpb25BeGlzXSA9IDE7XG4gICAgICAgICAgbGltaXRFeGNlcHRpb24ucmVzZXRDb29yZGluYXRlc1tkaXJlY3Rpb25BeGlzXSA9IHRoaXMuX2xpbWl0c1tkaXJlY3Rpb25dO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3JpZ2h0JyB8fCBkaXJlY3Rpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgIGlmIChwb3NpdGlvbkNoYW5nZVtkaXJlY3Rpb25BeGlzXSA+IHRoaXMuX2xpbWl0c1tkaXJlY3Rpb25dKSB7XG4gICAgICAgICAgbGltaXRFeGNlcHRpb24ucmVzZXRDb2VmZmljaWVudHNbZGlyZWN0aW9uQXhpc10gPSAtMTtcbiAgICAgICAgICBsaW1pdEV4Y2VwdGlvbi5yZXNldENvb3JkaW5hdGVzW2RpcmVjdGlvbkF4aXNdID0gdGhpcy5fbGltaXRzW2RpcmVjdGlvbl07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChsaW1pdEV4Y2VwdGlvbi5yZXNldENvZWZmaWNpZW50cy54ICE9PSAwIHx8IGxpbWl0RXhjZXB0aW9uLnJlc2V0Q29lZmZpY2llbnRzLnkgIT09IDApIHtcbiAgICAgIGxpbWl0RXhjZXB0aW9uLmV4Y2VlZHMgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBsaW1pdEV4Y2VwdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiByb3RhdGUgY3JvcCB0b29sIHBvaW50cyBjbG9ja3dpc2VcbiAgICogQHBhcmFtIHJlc2l6ZVJhdGlvcyAtIHJhdGlvIGJldHdlZW4gdGhlIG5ldyBkaW1lbnNpb25zIGFuZCB0aGUgcHJldmlvdXNcbiAgICogQHBhcmFtIGluaXRpYWxQcmV2aWV3RGltZW5zaW9ucyAtIHByZXZpZXcgcGFuZSBkaW1lbnNpb25zIGJlZm9yZSByb3RhdGlvblxuICAgKiBAcGFyYW0gaW5pdGlhbFBvc2l0aW9ucyAtIGN1cnJlbnQgcG9zaXRpb25zIGJlZm9yZSByb3RhdGlvblxuICAgKi9cbiAgcHVibGljIHJvdGF0ZUNsb2Nrd2lzZShyZXNpemVSYXRpb3MsIGluaXRpYWxQcmV2aWV3RGltZW5zaW9ucywgaW5pdGlhbFBvc2l0aW9uczogQXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT4pIHtcbiAgICAvLyBjb252ZXJ0IHBvc2l0aW9ucyB0byByYXRpbyBiZXR3ZWVuIHBvc2l0aW9uIHRvIGluaXRpYWwgcGFuZSBkaW1lbnNpb25cbiAgICBpbml0aWFsUG9zaXRpb25zID0gaW5pdGlhbFBvc2l0aW9ucy5tYXAocG9pbnQgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQb3NpdGlvbkNoYW5nZURhdGEoe1xuICAgICAgICB4OiBwb2ludC54IC8gaW5pdGlhbFByZXZpZXdEaW1lbnNpb25zLndpZHRoLFxuICAgICAgICB5OiBwb2ludC55IC8gaW5pdGlhbFByZXZpZXdEaW1lbnNpb25zLmhlaWdodCxcbiAgICAgIH0sIHBvaW50LnJvbGVzKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlcG9zaXRpb25Qb2ludHMoaW5pdGlhbFBvc2l0aW9ucy5tYXAocG9pbnQgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMucm90YXRlQ29ybmVyQ2xvY2t3aXNlKHBvaW50KTtcbiAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyB0aGUgY29ybmVyIHBvc2l0aW9ucyBhZnRlciBhIDkwIGRlZ3JlZXMgY2xvY2t3aXNlIHJvdGF0aW9uXG4gICAqL1xuICBwcml2YXRlIHJvdGF0ZUNvcm5lckNsb2Nrd2lzZShjb3JuZXI6IFBvaW50UG9zaXRpb25DaGFuZ2UpOiBQb2ludFBvc2l0aW9uQ2hhbmdlIHtcbiAgICBjb25zdCByb3RhdGVkOiBQb2ludFBvc2l0aW9uQ2hhbmdlID0ge1xuICAgICAgeDogdGhpcy5fcGFuZURpbWVuc2lvbnMud2lkdGggKiAoMSAtIGNvcm5lci55KSxcbiAgICAgIHk6IHRoaXMuX3BhbmVEaW1lbnNpb25zLmhlaWdodCAqIGNvcm5lci54LFxuICAgICAgcm9sZXM6IFtdXG4gICAgfTtcbiAgICAvLyByb3RhdGVzIGNvcm5lciBhY2NvcmRpbmcgdG8gb3JkZXJcbiAgICBjb25zdCBvcmRlcjogQXJyYXk8Um9sZXNBcnJheT4gPSBbXG4gICAgICBbJ2JvdHRvbScsICdsZWZ0J10sXG4gICAgICBbJ3RvcCcsICdsZWZ0J10sXG4gICAgICBbJ3RvcCcsICdyaWdodCddLFxuICAgICAgWydib3R0b20nLCAncmlnaHQnXSxcbiAgICAgIFsnYm90dG9tJywgJ2xlZnQnXVxuICAgIF07XG4gICAgcm90YXRlZC5yb2xlcyA9IG9yZGVyW29yZGVyLmZpbmRJbmRleChyb2xlcyA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5jb21wYXJlQXJyYXkocm9sZXMsIGNvcm5lci5yb2xlcyk7XG4gICAgfSkgKyAxXTtcbiAgICByZXR1cm4gcm90YXRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVja3MgaWYgdHdvIGFycmF5IGNvbnRhaW4gdGhlIHNhbWUgdmFsdWVzXG4gICAqIEBwYXJhbSBhcnJheTEgLSBhcnJheSAxXG4gICAqIEBwYXJhbSBhcnJheTIgLSBhcnJheSAyXG4gICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICovXG4gIHB1YmxpYyBjb21wYXJlQXJyYXkoYXJyYXkxOiBBcnJheTxzdHJpbmc+LCBhcnJheTI6IEFycmF5PHN0cmluZz4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gYXJyYXkxLmV2ZXJ5KChlbGVtZW50KSA9PiB7XG4gICAgICByZXR1cm4gYXJyYXkyLmluY2x1ZGVzKGVsZW1lbnQpO1xuICAgIH0pICYmIGFycmF5MS5sZW5ndGggPT09IGFycmF5Mi5sZW5ndGg7XG4gIH1cblxuICBwcml2YXRlIGdldERpcmVjdGlvbkF4aXMoZGlyZWN0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZnQ6ICd4JyxcbiAgICAgIHJpZ2h0OiAneCcsXG4gICAgICB0b3A6ICd5JyxcbiAgICAgIGJvdHRvbTogJ3knXG4gICAgfVtkaXJlY3Rpb25dO1xuICB9XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBQb2ludFBvc2l0aW9uQ2hhbmdlIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHJvbGVzOiBSb2xlc0FycmF5O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFyZWFMaW1pdHMge1xuICB0b3A6IG51bWJlcjtcbiAgYm90dG9tOiBudW1iZXI7XG4gIHJpZ2h0OiBudW1iZXI7XG4gIGxlZnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgUm9sZXNBcnJheSA9IEFycmF5PERpcmVjdGlvbj47XG5cbmV4cG9ydCBjbGFzcyBQb3NpdGlvbkNoYW5nZURhdGEgaW1wbGVtZW50cyBQb2ludFBvc2l0aW9uQ2hhbmdlIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHJvbGVzOiBSb2xlc0FycmF5O1xuXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBYWVBvc2l0aW9uLCByb2xlczogUm9sZXNBcnJheSkge1xuICAgIHRoaXMueCA9IHBvc2l0aW9uLng7XG4gICAgdGhpcy55ID0gcG9zaXRpb24ueTtcbiAgICB0aGlzLnJvbGVzID0gcm9sZXM7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgRGlyZWN0aW9uID0gJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3AnIHwgJ2JvdHRvbSc7XG4iXX0=