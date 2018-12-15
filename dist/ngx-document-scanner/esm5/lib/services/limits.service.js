/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        return new Promise(function (resolve, reject) {
            _this._paneDimensions = dimensions;
            _this.paneDimensions.next(dimensions);
            resolve();
        });
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
        positions.forEach(function (position) {
            _this.positionChange(position);
        });
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
        this.limitDirections.forEach(function (direction) {
            /** @type {?} */
            var relevantPoints = _this._points.filter(function (point) {
                return point.roles.includes(direction);
            })
                .map(function (point) {
                return point[_this.getDirectionAxis(direction)];
            });
            /** @type {?} */
            var limit;
            if (direction === 'top' || direction === 'left') {
                limit = Math.max.apply(Math, tslib_1.__spread(relevantPoints));
            }
            if (direction === 'right' || direction === 'bottom') {
                limit = Math.min.apply(Math, tslib_1.__spread(relevantPoints));
            }
            _this._limits[direction] = limit;
        });
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
        var index = this._points.findIndex(function (point) {
            return _this.compareArray(positionChange.roles, point.roles);
        });
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
        var pointLimits = this.limitDirections.filter(function (direction) {
            return !positionChange.roles.includes(direction);
        });
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
        pointLimits.forEach(function (direction) {
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
        });
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
        initialPositions = initialPositions.map(function (point) {
            return new PositionChangeData({
                x: point.x / initialPreviewDimensions.width,
                y: point.y / initialPreviewDimensions.height,
            }, point.roles);
        });
        this.repositionPoints(initialPositions.map(function (point) {
            return _this.rotateCornerClockwise(point);
        }));
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
        rotated.roles = order[order.findIndex(function (roles) {
            return _this.compareArray(roles, corner.roles);
        }) + 1];
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
        return array1.every(function (element) {
            return array2.includes(element);
        }) && array1.length === array2.length;
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
    /** @nocollapse */ LimitsService.ngInjectableDef = i0.defineInjectable({ factory: function LimitsService_Factory() { return new LimitsService(); }, token: LimitsService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGltaXRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZG9jdW1lbnQtc2Nhbm5lci8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9saW1pdHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7QUFJckM7SUFpQ0U7UUEzQlEsb0JBQWUsR0FBZSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzs7O1FBSWpFLFlBQU8sR0FBRztZQUNoQixHQUFHLEVBQUUsQ0FBQztZQUNOLE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsQ0FBQztTQUNSLENBQUM7Ozs7UUFJTSxZQUFPLEdBQStCLEVBQUUsQ0FBQzs7OztRQVMxQyxjQUFTLEdBQWdELElBQUksZUFBZSxDQUE2QixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ25JLG9CQUFlLEdBQWdELElBQUksZUFBZSxDQUE2QixFQUFFLENBQUMsQ0FBQztRQUNuSCxXQUFNLEdBQWdDLElBQUksZUFBZSxDQUFhLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRixtQkFBYyxHQUFxQyxJQUFJLGVBQWUsQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7SUFHckcsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSSx5Q0FBaUI7Ozs7O0lBQXhCLFVBQXlCLFVBQTJCO1FBQXBELGlCQU1DO1FBTEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLEtBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDO1lBQ2xDLEtBQUks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QUtFOzs7Ozs7SUFJRixnQ0FBaUQ7Ozs7OztJQUlqRCx3Q0FBeUM7O0lBS3pDLGtDQUEwSTs7SUFDMUksd0NBQTBIOztJQUMxSCwrQkFBMkY7O0lBQzNGLHVDQUFxRzs7Ozs7QUF5THZHLHlDQUlDOzs7SUFIQyxnQ0FBVTs7SUFDVixnQ0FBVTs7SUFDVixvQ0FBa0I7Ozs7O0FBR3BCLGdDQUtDOzs7SUFKQyx5QkFBWTs7SUFDWiw0QkFBZTs7SUFDZiwyQkFBYzs7SUFDZCwwQkFBYTs7QUFLZjtJQUtFLDRCQUFZLFFBQW9CLEVBQUUsS0FBaUI7UUFDakQsSUFBSSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQzs7OztJQVRDLCtCQUFVOztJQUNWLCtCQUFVOztJQUNWLG1DQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtJbWFnZURpbWVuc2lvbnN9IGZyb20gJy4uL1B1YmxpY01vZGVscyc7XHJcbmltcG9ydCB7TGltaXRFeGNlcHRpb24sIFhZUG9zaXRpb259IGZyb20gJy4uL1ByaXZhdGVNb2RlbHMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTGltaXRzU2VydmljZSB7XHJcblxyXG5cclxuICBwcml2YXRlIGxpbWl0RGlyZWN0aW9uczogUm9sZXNBcnJheSA9IFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJ107XHJcbiAgLyoqXHJcbiAgICogc3RvcmVzIHRoZSBjcm9wIGxpbWl0cyBsaW1pdHNcclxuICAgKi9cclxuICBwcml2YXRlIF9saW1pdHMgPSB7XHJcbiAgICB0b3A6IDAsXHJcbiAgICBib3R0b206IDAsXHJcbiAgICByaWdodDogMCxcclxuICAgIGxlZnQ6IDBcclxuICB9O1xyXG4gIC8qKlxyXG4gICAqIHN0b3JlcyB0aGUgYXJyYXkgb2YgdGhlIGRyYWdnYWJsZSBwb2ludHMgZGlzcGxheWVkIG9uIHRoZSBjcm9wIGFyZWFcclxuICAgKi9cclxuICBwcml2YXRlIF9wb2ludHM6IEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+ID0gW107XHJcbiAgLyoqXHJcbiAgICogc3RvcmVzIHRoZSBwYW5lIGRpbWVuc2lvbnNcclxuICAgKi9cclxuICBwcml2YXRlIF9wYW5lRGltZW5zaW9uczogSW1hZ2VEaW1lbnNpb25zO1xyXG5cclxuICAvLyAqKioqKioqKioqKiAvL1xyXG4gIC8vIE9ic2VydmFibGVzIC8vXHJcbiAgLy8gKioqKioqKioqKiogLy9cclxuICBwdWJsaWMgcG9zaXRpb25zOiBCZWhhdmlvclN1YmplY3Q8QXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcnJheTxQb2ludFBvc2l0aW9uQ2hhbmdlPj4oQXJyYXkuZnJvbSh0aGlzLl9wb2ludHMpKTtcclxuICBwdWJsaWMgcmVwb3NpdGlvbkV2ZW50OiBCZWhhdmlvclN1YmplY3Q8QXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcnJheTxQb2ludFBvc2l0aW9uQ2hhbmdlPj4oW10pO1xyXG4gIHB1YmxpYyBsaW1pdHM6IEJlaGF2aW9yU3ViamVjdDxBcmVhTGltaXRzPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXJlYUxpbWl0cz4odGhpcy5fbGltaXRzKTtcclxuICBwdWJsaWMgcGFuZURpbWVuc2lvbnM6IEJlaGF2aW9yU3ViamVjdDxJbWFnZURpbWVuc2lvbnM+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7d2lkdGg6IDAsIGhlaWdodDogMH0pO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldCBwcml2ZXcgcGFuZSBkaW1lbnNpb25zXHJcbiAgICovXHJcbiAgcHVibGljIHNldFBhbmVEaW1lbnNpb25zKGRpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5fcGFuZURpbWVuc2lvbnMgPSBkaW1lbnNpb25zO1xyXG4gICAgICB0aGlzLnBhbmVEaW1lbnNpb25zLm5leHQoZGltZW5zaW9ucyk7XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcmVwb3NpdGlvbnMgcG9pbnRzIGV4dGVybmFsbHlcclxuICAgKi9cclxuICBwdWJsaWMgcmVwb3NpdGlvblBvaW50cyhwb3NpdGlvbnMpIHtcclxuICAgIHRoaXMuX3BvaW50cyA9IHBvc2l0aW9ucztcclxuICAgIHBvc2l0aW9ucy5mb3JFYWNoKHBvc2l0aW9uID0+IHtcclxuICAgICAgdGhpcy5wb3NpdGlvbkNoYW5nZShwb3NpdGlvbik7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVwb3NpdGlvbkV2ZW50Lm5leHQocG9zaXRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHVwZGF0ZXMgbGltaXRzIGFuZCBwb2ludCBwb3NpdGlvbnMgYW5kIGNhbGxzIG5leHQgb24gdGhlIG9ic2VydmFibGVzXHJcbiAgICogQHBhcmFtIHBvc2l0aW9uQ2hhbmdlRGF0YSAtIHBvc2l0aW9uIGNoYW5nZSBldmVudCBkYXRhXHJcbiAgICovXHJcbiAgcHVibGljIHBvc2l0aW9uQ2hhbmdlKHBvc2l0aW9uQ2hhbmdlRGF0YTogUG9pbnRQb3NpdGlvbkNoYW5nZSkge1xyXG4gICAgLy8gdXBkYXRlIHBvc2l0aW9ucyBhY2NvcmRpbmcgdG8gY3VycmVudCBwb3NpdGlvbiBjaGFuZ2VcclxuICAgIHRoaXMudXBkYXRlUG9zaXRpb24ocG9zaXRpb25DaGFuZ2VEYXRhKTtcclxuXHJcbiAgICAvLyBmb3IgZWFjaCBkaXJlY3Rpb246XHJcbiAgICAvLyAxLiBmaWx0ZXIgdGhlIF9wb2ludHMgdGhhdCBoYXZlIGEgcm9sZSBhcyB0aGUgZGlyZWN0aW9uJ3MgbGltaXRcclxuICAgIC8vIDIuIGZvciB0b3AgYW5kIGxlZnQgZmluZCBtYXggeCB8IHkgdmFsdWVzLCBhbmQgbWluIGZvciByaWdodCBhbmQgYm90dG9tXHJcbiAgICB0aGlzLmxpbWl0RGlyZWN0aW9ucy5mb3JFYWNoKGRpcmVjdGlvbiA9PiB7XHJcbiAgICAgIGNvbnN0IHJlbGV2YW50UG9pbnRzID0gdGhpcy5fcG9pbnRzLmZpbHRlcihwb2ludCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHBvaW50LnJvbGVzLmluY2x1ZGVzKGRpcmVjdGlvbik7XHJcbiAgICAgIH0pXHJcbiAgICAgICAgLm1hcCgocG9pbnQ6IFBvaW50UG9zaXRpb25DaGFuZ2UpID0+IHtcclxuICAgICAgICAgIHJldHVybiBwb2ludFt0aGlzLmdldERpcmVjdGlvbkF4aXMoZGlyZWN0aW9uKV07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIGxldCBsaW1pdDtcclxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3RvcCcgfHwgZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcclxuICAgICAgICBsaW1pdCA9IE1hdGgubWF4KC4uLnJlbGV2YW50UG9pbnRzKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAncmlnaHQnIHx8IGRpcmVjdGlvbiA9PT0gJ2JvdHRvbScpIHtcclxuICAgICAgICBsaW1pdCA9IE1hdGgubWluKC4uLnJlbGV2YW50UG9pbnRzKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9saW1pdHNbZGlyZWN0aW9uXSA9IGxpbWl0O1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5saW1pdHMubmV4dCh0aGlzLl9saW1pdHMpO1xyXG4gICAgdGhpcy5wb3NpdGlvbnMubmV4dChBcnJheS5mcm9tKHRoaXMuX3BvaW50cykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIHBvaW50XHJcbiAgICogQHBhcmFtIHBvc2l0aW9uQ2hhbmdlIC0gcG9zaXRpb24gY2hhbmdlIGV2ZW50IGRhdGFcclxuICAgKi9cclxuICBwdWJsaWMgdXBkYXRlUG9zaXRpb24ocG9zaXRpb25DaGFuZ2U6IFBvaW50UG9zaXRpb25DaGFuZ2UpIHtcclxuICAgIC8vIGZpbmRzIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBwb2ludCBieSBpdCdzIHJvbGVzLCB0aGFuIHNwbGljZXMgaXQgZm9yIHRoZSBuZXcgcG9zaXRpb24gb3IgcHVzaGVzIGl0IGlmIGl0J3Mgbm90IHlldCBpbiB0aGUgYXJyYXlcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fcG9pbnRzLmZpbmRJbmRleChwb2ludCA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVBcnJheShwb3NpdGlvbkNoYW5nZS5yb2xlcywgcG9pbnQucm9sZXMpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMuX3BvaW50cy5wdXNoKHBvc2l0aW9uQ2hhbmdlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3BvaW50cy5zcGxpY2UoaW5kZXgsIDEsIHBvc2l0aW9uQ2hhbmdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNoZWNrIGlmIGEgcG9zaXRpb24gY2hhbmdlIGV2ZW50IGV4Y2VlZHMgdGhlIGxpbWl0c1xyXG4gICAqIEBwYXJhbSBwb3NpdGlvbkNoYW5nZSAtIHBvc2l0aW9uIGNoYW5nZSBldmVudCBkYXRhXHJcbiAgICogQHJldHVybnMgTGltaXRFeGNlcHRpb24wXHJcbiAgICovXHJcbiAgcHVibGljIGV4Y2VlZHNMaW1pdChwb3NpdGlvbkNoYW5nZTogUG9pbnRQb3NpdGlvbkNoYW5nZSk6IExpbWl0RXhjZXB0aW9uIHtcclxuICAgIGNvbnN0IHBvaW50TGltaXRzID0gdGhpcy5saW1pdERpcmVjdGlvbnMuZmlsdGVyKGRpcmVjdGlvbiA9PiB7XHJcbiAgICAgIHJldHVybiAhcG9zaXRpb25DaGFuZ2Uucm9sZXMuaW5jbHVkZXMoZGlyZWN0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGxpbWl0RXhjZXB0aW9uOiBMaW1pdEV4Y2VwdGlvbiA9IHtcclxuICAgICAgZXhjZWVkczogZmFsc2UsXHJcbiAgICAgIHJlc2V0Q29lZmZpY2llbnRzOiB7XHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICB5OiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlc2V0Q29vcmRpbmF0ZXM6IHtcclxuICAgICAgICB4OiBwb3NpdGlvbkNoYW5nZS54LFxyXG4gICAgICAgIHk6IHBvc2l0aW9uQ2hhbmdlLnlcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBsaW1pdCBkaXJlY3Rpb25zIGFyZSB0aGUgb3Bwb3NpdGUgc2lkZXMgb2YgdGhlIHBvaW50J3Mgcm9sZXNcclxuICAgIHBvaW50TGltaXRzLmZvckVhY2goZGlyZWN0aW9uID0+IHtcclxuICAgICAgY29uc3QgZGlyZWN0aW9uQXhpcyA9IHRoaXMuZ2V0RGlyZWN0aW9uQXhpcyhkaXJlY3Rpb24pO1xyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAndG9wJyB8fCBkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xyXG4gICAgICAgIGlmIChwb3NpdGlvbkNoYW5nZVtkaXJlY3Rpb25BeGlzXSA8IHRoaXMuX2xpbWl0c1tkaXJlY3Rpb25dKSB7XHJcbiAgICAgICAgICBsaW1pdEV4Y2VwdGlvbi5yZXNldENvZWZmaWNpZW50c1tkaXJlY3Rpb25BeGlzXSA9IDE7XHJcbiAgICAgICAgICBsaW1pdEV4Y2VwdGlvbi5yZXNldENvb3JkaW5hdGVzW2RpcmVjdGlvbkF4aXNdID0gdGhpcy5fbGltaXRzW2RpcmVjdGlvbl07XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3JpZ2h0JyB8fCBkaXJlY3Rpb24gPT09ICdib3R0b20nKSB7XHJcbiAgICAgICAgaWYgKHBvc2l0aW9uQ2hhbmdlW2RpcmVjdGlvbkF4aXNdID4gdGhpcy5fbGltaXRzW2RpcmVjdGlvbl0pIHtcclxuICAgICAgICAgIGxpbWl0RXhjZXB0aW9uLnJlc2V0Q29lZmZpY2llbnRzW2RpcmVjdGlvbkF4aXNdID0gLTE7XHJcbiAgICAgICAgICBsaW1pdEV4Y2VwdGlvbi5yZXNldENvb3JkaW5hdGVzW2RpcmVjdGlvbkF4aXNdID0gdGhpcy5fbGltaXRzW2RpcmVjdGlvbl07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAobGltaXRFeGNlcHRpb24ucmVzZXRDb2VmZmljaWVudHMueCAhPT0gMCB8fCBsaW1pdEV4Y2VwdGlvbi5yZXNldENvZWZmaWNpZW50cy55ICE9PSAwKSB7XHJcbiAgICAgIGxpbWl0RXhjZXB0aW9uLmV4Y2VlZHMgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsaW1pdEV4Y2VwdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJvdGF0ZSBjcm9wIHRvb2wgcG9pbnRzIGNsb2Nrd2lzZVxyXG4gICAqIEBwYXJhbSByZXNpemVSYXRpb3MgLSByYXRpbyBiZXR3ZWVuIHRoZSBuZXcgZGltZW5zaW9ucyBhbmQgdGhlIHByZXZpb3VzXHJcbiAgICogQHBhcmFtIGluaXRpYWxQcmV2aWV3RGltZW5zaW9ucyAtIHByZXZpZXcgcGFuZSBkaW1lbnNpb25zIGJlZm9yZSByb3RhdGlvblxyXG4gICAqIEBwYXJhbSBpbml0aWFsUG9zaXRpb25zIC0gY3VycmVudCBwb3NpdGlvbnMgYmVmb3JlIHJvdGF0aW9uXHJcbiAgICovXHJcbiAgcHVibGljIHJvdGF0ZUNsb2Nrd2lzZShyZXNpemVSYXRpb3MsIGluaXRpYWxQcmV2aWV3RGltZW5zaW9ucywgaW5pdGlhbFBvc2l0aW9uczogQXJyYXk8UG9pbnRQb3NpdGlvbkNoYW5nZT4pIHtcclxuICAgIC8vIGNvbnZlcnQgcG9zaXRpb25zIHRvIHJhdGlvIGJldHdlZW4gcG9zaXRpb24gdG8gaW5pdGlhbCBwYW5lIGRpbWVuc2lvblxyXG4gICAgaW5pdGlhbFBvc2l0aW9ucyA9IGluaXRpYWxQb3NpdGlvbnMubWFwKHBvaW50ID0+IHtcclxuICAgICAgcmV0dXJuIG5ldyBQb3NpdGlvbkNoYW5nZURhdGEoe1xyXG4gICAgICAgIHg6IHBvaW50LnggLyBpbml0aWFsUHJldmlld0RpbWVuc2lvbnMud2lkdGgsXHJcbiAgICAgICAgeTogcG9pbnQueSAvIGluaXRpYWxQcmV2aWV3RGltZW5zaW9ucy5oZWlnaHQsXHJcbiAgICAgIH0sIHBvaW50LnJvbGVzKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZXBvc2l0aW9uUG9pbnRzKGluaXRpYWxQb3NpdGlvbnMubWFwKHBvaW50ID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMucm90YXRlQ29ybmVyQ2xvY2t3aXNlKHBvaW50KTtcclxuICAgIH0pKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHJldHVybnMgdGhlIGNvcm5lciBwb3NpdGlvbnMgYWZ0ZXIgYSA5MCBkZWdyZWVzIGNsb2Nrd2lzZSByb3RhdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgcm90YXRlQ29ybmVyQ2xvY2t3aXNlKGNvcm5lcjogUG9pbnRQb3NpdGlvbkNoYW5nZSk6IFBvaW50UG9zaXRpb25DaGFuZ2Uge1xyXG4gICAgY29uc3Qgcm90YXRlZDogUG9pbnRQb3NpdGlvbkNoYW5nZSA9IHtcclxuICAgICAgeDogdGhpcy5fcGFuZURpbWVuc2lvbnMud2lkdGggKiAoMSAtIGNvcm5lci55KSxcclxuICAgICAgeTogdGhpcy5fcGFuZURpbWVuc2lvbnMuaGVpZ2h0ICogY29ybmVyLngsXHJcbiAgICAgIHJvbGVzOiBbXVxyXG4gICAgfTtcclxuICAgIC8vIHJvdGF0ZXMgY29ybmVyIGFjY29yZGluZyB0byBvcmRlclxyXG4gICAgY29uc3Qgb3JkZXI6IEFycmF5PFJvbGVzQXJyYXk+ID0gW1xyXG4gICAgICBbJ2JvdHRvbScsICdsZWZ0J10sXHJcbiAgICAgIFsndG9wJywgJ2xlZnQnXSxcclxuICAgICAgWyd0b3AnLCAncmlnaHQnXSxcclxuICAgICAgWydib3R0b20nLCAncmlnaHQnXSxcclxuICAgICAgWydib3R0b20nLCAnbGVmdCddXHJcbiAgICBdO1xyXG4gICAgcm90YXRlZC5yb2xlcyA9IG9yZGVyW29yZGVyLmZpbmRJbmRleChyb2xlcyA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVBcnJheShyb2xlcywgY29ybmVyLnJvbGVzKTtcclxuICAgIH0pICsgMV07XHJcbiAgICByZXR1cm4gcm90YXRlZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNoZWNrcyBpZiB0d28gYXJyYXkgY29udGFpbiB0aGUgc2FtZSB2YWx1ZXNcclxuICAgKiBAcGFyYW0gYXJyYXkxIC0gYXJyYXkgMVxyXG4gICAqIEBwYXJhbSBhcnJheTIgLSBhcnJheSAyXHJcbiAgICogQHJldHVybnMgYm9vbGVhblxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb21wYXJlQXJyYXkoYXJyYXkxOiBBcnJheTxzdHJpbmc+LCBhcnJheTI6IEFycmF5PHN0cmluZz4pOiBib29sZWFuIHtcclxuICAgIHJldHVybiBhcnJheTEuZXZlcnkoKGVsZW1lbnQpID0+IHtcclxuICAgICAgcmV0dXJuIGFycmF5Mi5pbmNsdWRlcyhlbGVtZW50KTtcclxuICAgIH0pICYmIGFycmF5MS5sZW5ndGggPT09IGFycmF5Mi5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldERpcmVjdGlvbkF4aXMoZGlyZWN0aW9uKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBsZWZ0OiAneCcsXHJcbiAgICAgIHJpZ2h0OiAneCcsXHJcbiAgICAgIHRvcDogJ3knLFxyXG4gICAgICBib3R0b206ICd5J1xyXG4gICAgfVtkaXJlY3Rpb25dO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUG9pbnRQb3NpdGlvbkNoYW5nZSB7XHJcbiAgeDogbnVtYmVyO1xyXG4gIHk6IG51bWJlcjtcclxuICByb2xlczogUm9sZXNBcnJheTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBcmVhTGltaXRzIHtcclxuICB0b3A6IG51bWJlcjtcclxuICBib3R0b206IG51bWJlcjtcclxuICByaWdodDogbnVtYmVyO1xyXG4gIGxlZnQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUm9sZXNBcnJheSA9IEFycmF5PERpcmVjdGlvbj47XHJcblxyXG5leHBvcnQgY2xhc3MgUG9zaXRpb25DaGFuZ2VEYXRhIGltcGxlbWVudHMgUG9pbnRQb3NpdGlvbkNoYW5nZSB7XHJcbiAgeDogbnVtYmVyO1xyXG4gIHk6IG51bWJlcjtcclxuICByb2xlczogUm9sZXNBcnJheTtcclxuXHJcbiAgY29uc3RydWN0b3IocG9zaXRpb246IFhZUG9zaXRpb24sIHJvbGVzOiBSb2xlc0FycmF5KSB7XHJcbiAgICB0aGlzLnggPSBwb3NpdGlvbi54O1xyXG4gICAgdGhpcy55ID0gcG9zaXRpb24ueTtcclxuICAgIHRoaXMucm9sZXMgPSByb2xlcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIERpcmVjdGlvbiA9ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wJyB8ICdib3R0b20nO1xyXG4iXX0=