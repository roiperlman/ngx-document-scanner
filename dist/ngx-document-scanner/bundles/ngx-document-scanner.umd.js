(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('@angular/core'), require('@angular/flex-layout'), require('@angular/material'), require('angular2-draggable'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-document-scanner', ['exports', 'rxjs', '@angular/core', '@angular/flex-layout', '@angular/material', 'angular2-draggable', '@angular/common'], factory) :
    (factory((global['ngx-document-scanner'] = {}),global.rxjs,global.ng.core,global.ng['flex-layout'],global.ng.material,global.angular2Draggable,global.ng.common));
}(this, (function (exports,rxjs,i0,flexLayout,material,angular2Draggable,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var OpenCvConfigToken = new i0.InjectionToken('OpenCV config object token');
    var NgxOpenCVService = /** @class */ (function () {
        function NgxOpenCVService(options, _ngZone) {
            this._ngZone = _ngZone;
            this.cvState = new rxjs.BehaviorSubject({
                ready: false,
                error: false,
                loading: true,
                state: 'loading'
            });
            if (!options) {
                options = {};
            }
            this.configModule = this.generateConfigModule(options);
            this.loadOpenCv();
        }
        /**
         * load the OpenCV script
         */
        /**
         * load the OpenCV script
         * @return {?}
         */
        NgxOpenCVService.prototype.loadOpenCv = /**
         * load the OpenCV script
         * @return {?}
         */
            function () {
                var _this = this;
                this.cvState.next(this.newState('loading'));
                // create global module variable
                window['Module'] = this.configModule;
                // create script element and set attributes
                /** @type {?} */
                var script = ( /** @type {?} */(document.createElement('script')));
                script.setAttribute('async', '');
                script.setAttribute('type', 'text/javascript');
                // listen for errors
                script.addEventListener('error', function () {
                    /** @type {?} */
                    var err = new Error('Failed to load ' + _this.configModule.scriptUrl);
                    _this.cvState.next(_this.newState('error'));
                    _this.cvState.error(err);
                }, { passive: true });
                // set script url
                script.src = this.configModule.scriptUrl;
                // insert script as first script tag
                /** @type {?} */
                var node = document.getElementsByTagName('script')[0];
                if (node) {
                    node.parentNode.insertBefore(script, node);
                }
                else {
                    document.head.appendChild(script);
                }
            };
        /**
         * generates a new state object
         * @param change - the new state of the module
         */
        /**
         * generates a new state object
         * @private
         * @param {?} change - the new state of the module
         * @return {?}
         */
        NgxOpenCVService.prototype.newState = /**
         * generates a new state object
         * @private
         * @param {?} change - the new state of the module
         * @return {?}
         */
            function (change) {
                /** @type {?} */
                var newStateObj = {
                    ready: false,
                    loading: false,
                    error: false,
                    state: ''
                };
                Object.keys(newStateObj).forEach(function (key) {
                    if (key !== 'state') {
                        if (key === change) {
                            newStateObj[key] = true;
                            newStateObj.state = key;
                        }
                        else {
                            newStateObj[key] = false;
                        }
                    }
                });
                return newStateObj;
            };
        /**
         * generates a config module for the global Module object
         * @param options - configuration options
         */
        /**
         * generates a config module for the global Module object
         * @private
         * @param {?} options - configuration options
         * @return {?}
         */
        NgxOpenCVService.prototype.generateConfigModule = /**
         * generates a config module for the global Module object
         * @private
         * @param {?} options - configuration options
         * @return {?}
         */
            function (options) {
                var _this = this;
                return {
                    scriptUrl: options.openCVDirPath ? options.openCVDirPath + "/opencv.js" : "/assets/opencv/opencv.js",
                    wasmBinaryFile: 'opencv_js.wasm',
                    usingWasm: true,
                    onRuntimeInitialized: function () {
                        _this._ngZone.run(function () {
                            console.log('openCV Ready');
                            _this.cvState.next(_this.newState('ready'));
                            if (options.runOnOpenCVInit) {
                                options.runOnOpenCVInit();
                            }
                        });
                    }
                };
            };
        NgxOpenCVService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        NgxOpenCVService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: i0.Inject, args: [OpenCvConfigToken,] }] },
                { type: i0.NgZone }
            ];
        };
        /** @nocollapse */ NgxOpenCVService.ngInjectableDef = i0.defineInjectable({ factory: function NgxOpenCVService_Factory() { return new NgxOpenCVService(i0.inject(OpenCvConfigToken), i0.inject(i0.NgZone)); }, token: NgxOpenCVService, providedIn: "root" });
        return NgxOpenCVService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            this.positions = new rxjs.BehaviorSubject(Array.from(this._points));
            this.repositionEvent = new rxjs.BehaviorSubject([]);
            this.limits = new rxjs.BehaviorSubject(this._limits);
            this.paneDimensions = new rxjs.BehaviorSubject({ width: 0, height: 0 });
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
                        limit = Math.max.apply(Math, __spread(relevantPoints));
                    }
                    if (direction === 'right' || direction === 'bottom') {
                        limit = Math.min.apply(Math, __spread(relevantPoints));
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        LimitsService.ctorParameters = function () { return []; };
        /** @nocollapse */ LimitsService.ngInjectableDef = i0.defineInjectable({ factory: function LimitsService_Factory() { return new LimitsService(); }, token: LimitsService, providedIn: "root" });
        return LimitsService;
    }());
    var PositionChangeData = /** @class */ (function () {
        function PositionChangeData(position, roles) {
            this.x = position.x;
            this.y = position.y;
            this.roles = roles;
        }
        return PositionChangeData;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            { type: i0.Component, args: [{
                        selector: 'ngx-draggable-point',
                        template: "<div #point ngDraggable=\"draggable\"\r\n     (movingOffset)=\"positionChange($event)\"\r\n     [ngStyle]=\"pointStyle()\"\r\n     [position]=\"position\"\r\n     [bounds]=\"container\"\r\n     [inBounds]=\"true\"\r\n     (endOffset)=\"movementEnd($event)\"\r\n      style=\"z-index: 1000\">\r\n</div>\r\n"
                    }] }
        ];
        /** @nocollapse */
        NgxDraggablePointComponent.ctorParameters = function () {
            return [
                { type: LimitsService }
            ];
        };
        NgxDraggablePointComponent.propDecorators = {
            width: [{ type: i0.Input }],
            height: [{ type: i0.Input }],
            color: [{ type: i0.Input }],
            shape: [{ type: i0.Input }],
            pointOptions: [{ type: i0.Input }],
            limitRoles: [{ type: i0.Input }],
            startPosition: [{ type: i0.Input }],
            container: [{ type: i0.Input }],
            _currentPosition: [{ type: i0.Input }]
        };
        return NgxDraggablePointComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxFilterMenuComponent = /** @class */ (function () {
        function NgxFilterMenuComponent(bottomSheetRef, data) {
            var _this = this;
            this.bottomSheetRef = bottomSheetRef;
            this.data = data;
            this.filterOptions = [
                {
                    name: 'default',
                    icon: 'filter_b_and_w',
                    action: function (filter) {
                        _this.filterSelected.emit(filter);
                    },
                    text: 'B&W'
                },
                {
                    name: 'bw2',
                    icon: 'filter_b_and_w',
                    action: function (filter) {
                        _this.filterSelected.emit(filter);
                    },
                    text: 'B&W 2'
                },
                {
                    name: 'bw3',
                    icon: 'blur_on',
                    action: function (filter) {
                        _this.filterSelected.emit(filter);
                    },
                    text: 'B&W 3'
                },
                {
                    name: 'magic_color',
                    icon: 'filter_vintage',
                    action: function (filter) {
                        _this.filterSelected.emit(filter);
                    },
                    text: 'Magic Color'
                },
                {
                    name: 'original',
                    icon: 'crop_original',
                    action: function (filter) {
                        _this.filterSelected.emit(filter);
                    },
                    text: 'Original'
                },
            ];
            this.filterSelected = new i0.EventEmitter();
        }
        /**
         * @param {?} optionName
         * @return {?}
         */
        NgxFilterMenuComponent.prototype.selectOption = /**
         * @param {?} optionName
         * @return {?}
         */
            function (optionName) {
                this.data.filter = optionName;
                this.bottomSheetRef.dismiss();
            };
        NgxFilterMenuComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ngx-filter-menu',
                        template: "<mat-action-list>\r\n  <button mat-list-item *ngFor=\"let option of filterOptions\" (click)=\"selectOption(option.name)\">\r\n    <mat-icon>{{option.icon}}</mat-icon>\r\n    <span fxFlex=\"100\" style=\"text-align: start; margin: 5px\">{{option.text}}</span>\r\n    <span fxFlex=\"100\"></span>\r\n    <mat-icon *ngIf=\"option.name === data.filter\">done</mat-icon>\r\n  </button>\r\n</mat-action-list>\r\n"
                    }] }
        ];
        /** @nocollapse */
        NgxFilterMenuComponent.ctorParameters = function () {
            return [
                { type: material.MatBottomSheetRef },
                { type: undefined, decorators: [{ type: i0.Inject, args: [material.MAT_BOTTOM_SHEET_DATA,] }] }
            ];
        };
        NgxFilterMenuComponent.propDecorators = {
            filterSelected: [{ type: i0.Output }]
        };
        return NgxFilterMenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxShapeOutlineComponent = /** @class */ (function () {
        function NgxShapeOutlineComponent(limitsService) {
            this.limitsService = limitsService;
            this.color = '#3cabe2';
        }
        /**
         * @return {?}
         */
        NgxShapeOutlineComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                // init drawing canvas dimensions
                this.canvas.nativeElement.width = this.dimensions.width;
                this.canvas.nativeElement.height = this.dimensions.height;
                this.limitsService.positions.subscribe(function (positions) {
                    if (positions.length === 4) {
                        _this._points = positions;
                        _this.sortPoints();
                        _this.clearCanvas();
                        _this.drawShape();
                    }
                });
                // subscribe to changes in the pane's dimensions
                this.limitsService.paneDimensions.subscribe(function (dimensions) {
                    _this.clearCanvas();
                    _this.canvas.nativeElement.width = dimensions.width;
                    _this.canvas.nativeElement.height = dimensions.height;
                });
                // subscribe to reposition events
                this.limitsService.repositionEvent.subscribe(function (positions) {
                    if (positions.length === 4) {
                        setTimeout(function () {
                            _this.clearCanvas();
                            _this.sortPoints();
                            _this.drawShape();
                        }, 10);
                    }
                });
            };
        /**
         * clears the shape canvas
         */
        /**
         * clears the shape canvas
         * @private
         * @return {?}
         */
        NgxShapeOutlineComponent.prototype.clearCanvas = /**
         * clears the shape canvas
         * @private
         * @return {?}
         */
            function () {
                /** @type {?} */
                var canvas = this.canvas.nativeElement;
                /** @type {?} */
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
            };
        /**
         * sorts the array of points according to their clockwise alignment
         */
        /**
         * sorts the array of points according to their clockwise alignment
         * @private
         * @return {?}
         */
        NgxShapeOutlineComponent.prototype.sortPoints = /**
         * sorts the array of points according to their clockwise alignment
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var _points = Array.from(this._points);
                /** @type {?} */
                var sortedPoints = [];
                /** @type {?} */
                var sortOrder = {
                    vertical: ['top', 'top', 'bottom', 'bottom'],
                    horizontal: ['left', 'right', 'right', 'left']
                };
                var _loop_1 = function (i) {
                    /** @type {?} */
                    var roles = Array.from([sortOrder.vertical[i], sortOrder.horizontal[i]]);
                    sortedPoints.push(_points.filter(function (point) {
                        return _this.limitsService.compareArray(point.roles, roles);
                    })[0]);
                };
                for (var i = 0; i < 4; i++) {
                    _loop_1(i);
                }
                this._sortedPoints = sortedPoints;
            };
        /**
         * draws a line between the points according to their order
         */
        /**
         * draws a line between the points according to their order
         * @private
         * @return {?}
         */
        NgxShapeOutlineComponent.prototype.drawShape = /**
         * draws a line between the points according to their order
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var canvas = this.canvas.nativeElement;
                /** @type {?} */
                var ctx = canvas.getContext('2d');
                ctx.lineWidth = this.weight;
                ctx.strokeStyle = this.color;
                ctx.beginPath();
                this._sortedPoints.forEach(function (point, index) {
                    if (index === 0) {
                        ctx.moveTo(point.x, point.y);
                    }
                    if (index !== _this._sortedPoints.length - 1) {
                        /** @type {?} */
                        var nextPoint = _this._sortedPoints[index + 1];
                        ctx.lineTo(nextPoint.x, nextPoint.y);
                    }
                    else {
                        ctx.closePath();
                    }
                });
                ctx.stroke();
            };
        NgxShapeOutlineComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ngx-shape-outine',
                        template: "<canvas #outline\r\n        style=\"position: absolute; z-index: 1000\"\r\n        [ngStyle]=\"{width: dimensions.width + 'px', height: dimensions.height + 'px'}\"\r\n        *ngIf=\"dimensions\">\r\n</canvas>\r\n"
                    }] }
        ];
        /** @nocollapse */
        NgxShapeOutlineComponent.ctorParameters = function () {
            return [
                { type: LimitsService }
            ];
        };
        NgxShapeOutlineComponent.propDecorators = {
            color: [{ type: i0.Input }],
            weight: [{ type: i0.Input }],
            dimensions: [{ type: i0.Input }],
            canvas: [{ type: i0.ViewChild, args: ['outline',] }]
        };
        return NgxShapeOutlineComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxDocScannerComponent = /** @class */ (function () {
        function NgxDocScannerComponent(ngxOpenCv, limitsService, bottomSheet) {
            var _this = this;
            this.ngxOpenCv = ngxOpenCv;
            this.limitsService = limitsService;
            this.bottomSheet = bottomSheet;
            // ************* //
            // EDITOR CONFIG //
            // ************* //
            /**
             * an array of action buttons displayed on the editor screen
             */
            this.editorButtons = [
                {
                    name: 'exit',
                    action: function () {
                        _this.exitEditor.emit('canceled');
                    },
                    icon: 'arrow_back',
                    type: 'fab',
                    mode: 'crop'
                },
                {
                    name: 'rotate',
                    action: this.rotateImage.bind(this),
                    icon: 'rotate_right',
                    type: 'fab',
                    mode: 'crop'
                },
                {
                    name: 'done_crop',
                    action: function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.mode = 'color';
                                        return [4 /*yield*/, this.transform()];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this.applyFilter(true)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    },
                    icon: 'done',
                    type: 'fab',
                    mode: 'crop'
                },
                {
                    name: 'back',
                    action: function () {
                        _this.mode = 'crop';
                        _this.loadFile(_this.originalImage);
                    },
                    icon: 'arrow_back',
                    type: 'fab',
                    mode: 'color'
                },
                {
                    name: 'filter',
                    action: function () {
                        return _this.chooseFilters();
                    },
                    icon: 'photo_filter',
                    type: 'fab',
                    mode: 'color'
                },
                {
                    name: 'upload',
                    action: this.exportImage.bind(this),
                    icon: 'cloud_upload',
                    type: 'fab',
                    mode: 'color'
                },
            ];
            /**
             * true after the image is loaded and preview is displayed
             */
            this.imageLoaded = false;
            /**
             * editor mode
             */
            this.mode = 'crop';
            /**
             * filter selected by the user, returned by the filter selector bottom sheet
             */
            this.selectedFilter = 'default';
            /**
             * image dimensions
             */
            this.imageDimensions = {
                width: 0,
                height: 0
            };
            // ************** //
            // EVENT EMITTERS //
            // ************** //
            /**
             * optional binding to the exit button of the editor
             */
            this.exitEditor = new i0.EventEmitter();
            /**
             * fires on edit completion
             */
            this.editResult = new i0.EventEmitter();
            /**
             * emits errors, can be linked to an error handler of choice
             */
            this.error = new i0.EventEmitter();
            /**
             * emits the loading status of the cv module.
             */
            this.ready = new i0.EventEmitter();
            /**
             * emits true when processing is done, false when completed
             */
            this.processing = new i0.EventEmitter();
            this.screenDimensions = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            // subscribe to status of cv module
            this.ngxOpenCv.cvState.subscribe(function (cvState) {
                _this.cvState = cvState.state;
                _this.ready.emit(cvState.ready);
                if (cvState.error) {
                    _this.error.emit(new Error('error loading cv'));
                }
                else if (cvState.loading) {
                    _this.processing.emit(true);
                }
                else if (cvState.ready) {
                    _this.processing.emit(false);
                }
            });
            // subscribe to positions of crop tool
            this.limitsService.positions.subscribe(function (points) {
                _this.points = points;
            });
        }
        Object.defineProperty(NgxDocScannerComponent.prototype, "displayedButtons", {
            /**
             * returns an array of buttons according to the editor mode
             */
            get: /**
             * returns an array of buttons according to the editor mode
             * @return {?}
             */ function () {
                var _this = this;
                return this.editorButtons.filter(function (button) {
                    return button.mode === _this.mode;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxDocScannerComponent.prototype, "file", {
            // ****** //
            // INPUTS //
            // ****** //
            /**
             * set image for editing
             * @param file - file from form input
             */
            set: 
            // ****** //
            // INPUTS //
            // ****** //
            /**
             * set image for editing
             * @param {?} file - file from form input
             * @return {?}
             */
            function (file) {
                var _this = this;
                if (file) {
                    setTimeout(function () {
                        _this.processing.emit(true);
                    }, 5);
                    this.imageLoaded = false;
                    this.originalImage = file;
                    this.ngxOpenCv.cvState.subscribe(function (cvState) {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!cvState.ready)
                                            return [3 /*break*/, 2];
                                        // read file to image & canvas
                                        return [4 /*yield*/, this.loadFile(file)];
                                    case 1:
                                        // read file to image & canvas
                                        _a.sent();
                                        this.processing.emit(false);
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        });
                    });
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NgxDocScannerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                // set options from config object
                this.options = new ImageEditorConfig(this.config);
                // set export image icon
                this.editorButtons.forEach(function (button) {
                    if (button.name === 'upload') {
                        button.icon = _this.options.exportImageIcon;
                    }
                });
                this.maxPreviewWidth = this.options.maxPreviewWidth;
                this.editorStyle = this.options.editorStyle;
            };
        // ***************************** //
        // editor action buttons methods //
        // ***************************** //
        /**
         * emits the exitEditor event
         */
        // ***************************** //
        // editor action buttons methods //
        // ***************************** //
        /**
         * emits the exitEditor event
         * @return {?}
         */
        NgxDocScannerComponent.prototype.exit =
            // ***************************** //
            // editor action buttons methods //
            // ***************************** //
            /**
             * emits the exitEditor event
             * @return {?}
             */
            function () {
                this.exitEditor.emit('canceled');
            };
        /**
         * applies the selected filter, and when done emits the resulted image
         */
        /**
         * applies the selected filter, and when done emits the resulted image
         * @private
         * @return {?}
         */
        NgxDocScannerComponent.prototype.exportImage = /**
         * applies the selected filter, and when done emits the resulted image
         * @private
         * @return {?}
         */
            function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.applyFilter(false)];
                            case 1:
                                _a.sent();
                                if (this.options.maxImageDimensions) {
                                    this.resize()
                                        .then(function (resizeResult) {
                                        resizeResult.toBlob(function (blob) {
                                            _this.editResult.emit(blob);
                                            _this.processing.emit(false);
                                        }, _this.originalImage.type);
                                    });
                                }
                                else {
                                    this.editedImage.toBlob(function (blob) {
                                        _this.editResult.emit(blob);
                                        _this.processing.emit(false);
                                    }, this.originalImage.type);
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            };
        /**
         * open the bottom sheet for selecting filters, and applies the selected filter in preview mode
         */
        /**
         * open the bottom sheet for selecting filters, and applies the selected filter in preview mode
         * @private
         * @return {?}
         */
        NgxDocScannerComponent.prototype.chooseFilters = /**
         * open the bottom sheet for selecting filters, and applies the selected filter in preview mode
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var data = { filter: this.selectedFilter };
                /** @type {?} */
                var bottomSheetRef = this.bottomSheet.open(NgxFilterMenuComponent, {
                    data: data
                });
                bottomSheetRef.afterDismissed().subscribe(function () {
                    _this.selectedFilter = data.filter;
                    _this.applyFilter(true);
                });
            };
        // *************************** //
        // File Input & Output Methods //
        // *************************** //
        /**
         * load image from input field
         */
        // *************************** //
        // File Input & Output Methods //
        // *************************** //
        /**
         * load image from input field
         * @private
         * @param {?} file
         * @return {?}
         */
        NgxDocScannerComponent.prototype.loadFile =
            // *************************** //
            // File Input & Output Methods //
            // *************************** //
            /**
             * load image from input field
             * @private
             * @param {?} file
             * @return {?}
             */
            function (file) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var err_1, err_2;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.processing.emit(true);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.readImage(file)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_1 = _a.sent();
                                    console.error(err_1);
                                    this.error.emit(new Error(err_1));
                                    return [3 /*break*/, 4];
                                case 4:
                                    _a.trys.push([4, 6, , 7]);
                                    return [4 /*yield*/, this.showPreview()];
                                case 5:
                                    _a.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    err_2 = _a.sent();
                                    console.error(err_2);
                                    this.error.emit(new Error(err_2));
                                    return [3 /*break*/, 7];
                                case 7:
                                    // set pane limits
                                    // show points
                                    this.imageLoaded = true;
                                    return [4 /*yield*/, this.limitsService.setPaneDimensions({ width: this.previewDimensions.width, height: this.previewDimensions.height })];
                                case 8:
                                    _a.sent();
                                    setTimeout(function () {
                                        return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.detectContours()];
                                                    case 1:
                                                        _a.sent();
                                                        this.processing.emit(false);
                                                        resolve();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        });
                                    }, 15);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            };
        /**
         * read image from File object
         */
        /**
         * read image from File object
         * @private
         * @param {?} file
         * @return {?}
         */
        NgxDocScannerComponent.prototype.readImage = /**
         * read image from File object
         * @private
         * @param {?} file
         * @return {?}
         */
            function (file) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var imageSrc, err_3, img;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, readFile()];
                                case 1:
                                    imageSrc = _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_3 = _a.sent();
                                    reject(err_3);
                                    return [3 /*break*/, 3];
                                case 3:
                                    img = new Image();
                                    img.onload = function () {
                                        // set edited image canvas and dimensions
                                        _this.editedImage = ( /** @type {?} */(document.createElement('canvas')));
                                        _this.editedImage.width = img.width;
                                        _this.editedImage.height = img.height;
                                        _this.imageDimensions.width = img.width;
                                        _this.imageDimensions.height = img.height;
                                        /** @type {?} */
                                        var ctx = _this.editedImage.getContext('2d');
                                        ctx.drawImage(img, 0, 0);
                                        _this.setPreviewPaneDimensions(_this.editedImage);
                                        resolve();
                                    };
                                    img.src = imageSrc;
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                /**
                 * read file from input field
                 * @return {?}
                 */
                function readFile() {
                    return new Promise(function (resolve, reject) {
                        /** @type {?} */
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            resolve(reader.result);
                        };
                        reader.onerror = function (err) {
                            reject(err);
                        };
                        reader.readAsDataURL(file);
                    });
                }
            };
        // ************************ //
        // Image Processing Methods //
        // ************************ //
        /**
         * rotate image 90 degrees
         */
        // ************************ //
        // Image Processing Methods //
        // ************************ //
        /**
         * rotate image 90 degrees
         * @private
         * @return {?}
         */
        NgxDocScannerComponent.prototype.rotateImage =
            // ************************ //
            // Image Processing Methods //
            // ************************ //
            /**
             * rotate image 90 degrees
             * @private
             * @return {?}
             */
            function () {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    _this.processing.emit(true);
                    setTimeout(function () {
                        /** @type {?} */
                        var dst = cv.imread(_this.editedImage);
                        // const dst = new cv.Mat();
                        cv.transpose(dst, dst);
                        cv.flip(dst, dst, 1);
                        cv.imshow(_this.editedImage, dst);
                        // src.delete();
                        dst.delete();
                        // save current preview dimensions and positions
                        /** @type {?} */
                        var initialPreviewDimensions = { width: 0, height: 0 };
                        Object.assign(initialPreviewDimensions, _this.previewDimensions);
                        /** @type {?} */
                        var initialPositions = Array.from(_this.points);
                        // get new dimensions
                        // set new preview pane dimensions
                        _this.setPreviewPaneDimensions(_this.editedImage);
                        // get preview pane resize ratio
                        /** @type {?} */
                        var previewResizeRatios = {
                            width: _this.previewDimensions.width / initialPreviewDimensions.width,
                            height: _this.previewDimensions.height / initialPreviewDimensions.height
                        };
                        // set new preview pane dimensions
                        _this.limitsService.rotateClockwise(previewResizeRatios, initialPreviewDimensions, initialPositions);
                        _this.showPreview().then(function () {
                            _this.processing.emit(false);
                            resolve();
                        });
                    }, 30);
                });
            };
        /**
         * detects the contours of the document and
         **/
        /**
         * detects the contours of the document and
         *
         * @private
         * @return {?}
         */
        NgxDocScannerComponent.prototype.detectContours = /**
         * detects the contours of the document and
         *
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    _this.processing.emit(true);
                    setTimeout(function () {
                        // load the image and compute the ratio of the old height to the new height, clone it, and resize it
                        /** @type {?} */
                        var processingResizeRatio = 0.5;
                        /** @type {?} */
                        var dst = cv.imread(_this.editedImage);
                        /** @type {?} */
                        var dsize = new cv.Size(dst.rows * processingResizeRatio, dst.cols * processingResizeRatio);
                        /** @type {?} */
                        var ksize = new cv.Size(5, 5);
                        // convert the image to grayscale, blur it, and find edges in the image
                        cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
                        cv.GaussianBlur(dst, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
                        cv.Canny(dst, dst, 75, 200);
                        // find contours
                        cv.threshold(dst, dst, 120, 200, cv.THRESH_BINARY);
                        /** @type {?} */
                        var contours = new cv.MatVector();
                        /** @type {?} */
                        var hierarchy = new cv.Mat();
                        cv.findContours(dst, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
                        /** @type {?} */
                        var rect = cv.boundingRect(dst);
                        dst.delete();
                        hierarchy.delete();
                        contours.delete();
                        // transform the rectangle into a set of points
                        Object.keys(rect).forEach(function (key) {
                            rect[key] = rect[key] * _this.imageResizeRatio;
                        });
                        /** @type {?} */
                        var contourCoordinates = [
                            new PositionChangeData({ x: rect.x, y: rect.y }, ['left', 'top']),
                            new PositionChangeData({ x: rect.x + rect.width, y: rect.y }, ['right', 'top']),
                            new PositionChangeData({ x: rect.x + rect.width, y: rect.y + rect.height }, ['right', 'bottom']),
                            new PositionChangeData({ x: rect.x, y: rect.y + rect.height }, ['left', 'bottom']),
                        ];
                        _this.limitsService.repositionPoints(contourCoordinates);
                        // this.processing.emit(false);
                        resolve();
                    }, 30);
                });
            };
        /**
         * apply perspective transform
         */
        /**
         * apply perspective transform
         * @private
         * @return {?}
         */
        NgxDocScannerComponent.prototype.transform = /**
         * apply perspective transform
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    _this.processing.emit(true);
                    setTimeout(function () {
                        /** @type {?} */
                        var dst = cv.imread(_this.editedImage);
                        // create source coordinates matrix
                        /** @type {?} */
                        var sourceCoordinates = [
                            _this.getPoint(['top', 'left']),
                            _this.getPoint(['top', 'right']),
                            _this.getPoint(['bottom', 'right']),
                            _this.getPoint(['bottom', 'left'])
                        ].map(function (point) {
                            return [point.x / _this.imageResizeRatio, point.y / _this.imageResizeRatio];
                        });
                        // get max width
                        /** @type {?} */
                        var bottomWidth = _this.getPoint(['bottom', 'right']).x - _this.getPoint(['bottom', 'left']).x;
                        /** @type {?} */
                        var topWidth = _this.getPoint(['top', 'right']).x - _this.getPoint(['top', 'left']).x;
                        /** @type {?} */
                        var maxWidth = Math.max(bottomWidth, topWidth) / _this.imageResizeRatio;
                        // get max height
                        /** @type {?} */
                        var leftHeight = _this.getPoint(['bottom', 'left']).y - _this.getPoint(['top', 'left']).y;
                        /** @type {?} */
                        var rightHeight = _this.getPoint(['bottom', 'right']).y - _this.getPoint(['top', 'right']).y;
                        /** @type {?} */
                        var maxHeight = Math.max(leftHeight, rightHeight) / _this.imageResizeRatio;
                        // create dest coordinates matrix
                        /** @type {?} */
                        var destCoordinates = [
                            [0, 0],
                            [maxWidth - 1, 0],
                            [maxWidth - 1, maxHeight - 1],
                            [0, maxHeight - 1]
                        ];
                        // convert to open cv matrix objects
                        /** @type {?} */
                        var Ms = cv.matFromArray(4, 1, cv.CV_32FC2, [].concat.apply([], __spread(sourceCoordinates)));
                        /** @type {?} */
                        var Md = cv.matFromArray(4, 1, cv.CV_32FC2, [].concat.apply([], __spread(destCoordinates)));
                        /** @type {?} */
                        var transformMatrix = cv.getPerspectiveTransform(Ms, Md);
                        // set new image size
                        /** @type {?} */
                        var dsize = new cv.Size(maxWidth, maxHeight);
                        // perform warp
                        cv.warpPerspective(dst, dst, transformMatrix, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
                        cv.imshow(_this.editedImage, dst);
                        dst.delete();
                        Ms.delete();
                        Md.delete();
                        transformMatrix.delete();
                        _this.setPreviewPaneDimensions(_this.editedImage);
                        _this.showPreview().then(function () {
                            _this.processing.emit(false);
                            resolve();
                        });
                    }, 30);
                });
            };
        /**
         * applies the selected filter to the image
         * @param preview - when true, will not apply the filter to the edited image but only display a preview.
         * when false, will apply to editedImage
         */
        /**
         * applies the selected filter to the image
         * @private
         * @param {?} preview - when true, will not apply the filter to the edited image but only display a preview.
         * when false, will apply to editedImage
         * @return {?}
         */
        NgxDocScannerComponent.prototype.applyFilter = /**
         * applies the selected filter to the image
         * @private
         * @param {?} preview - when true, will not apply the filter to the edited image but only display a preview.
         * when false, will apply to editedImage
         * @return {?}
         */
            function (preview) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var options, dst;
                        var _this = this;
                        return __generator(this, function (_a) {
                            this.processing.emit(true);
                            // default options
                            options = {
                                blur: false,
                                th: true,
                                thMode: cv.ADAPTIVE_THRESH_MEAN_C,
                                thMeanCorrection: 10,
                                thBlockSize: 25,
                                thMax: 255,
                                grayScale: true,
                            };
                            dst = cv.imread(this.editedImage);
                            switch (this.selectedFilter) {
                                case 'original':
                                    options.th = false;
                                    options.grayScale = false;
                                    options.blur = false;
                                    break;
                                case 'magic_color':
                                    options.grayScale = false;
                                    break;
                                case 'bw2':
                                    options.thMode = cv.ADAPTIVE_THRESH_GAUSSIAN_C;
                                    options.thMeanCorrection = 15;
                                    options.thBlockSize = 15;
                                    break;
                                case 'bw3':
                                    options.blur = true;
                                    options.thMeanCorrection = 15;
                                    break;
                            }
                            setTimeout(function () {
                                return __awaiter(_this, void 0, void 0, function () {
                                    var ksize;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (options.grayScale) {
                                                    cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
                                                }
                                                if (options.blur) {
                                                    ksize = new cv.Size(5, 5);
                                                    cv.GaussianBlur(dst, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
                                                }
                                                if (options.th) {
                                                    if (options.grayScale) {
                                                        cv.adaptiveThreshold(dst, dst, options.thMax, options.thMode, cv.THRESH_BINARY, options.thBlockSize, options.thMeanCorrection);
                                                    }
                                                    else {
                                                        dst.convertTo(dst, -1, 1, 60);
                                                        cv.threshold(dst, dst, 170, 255, cv.THRESH_BINARY);
                                                    }
                                                }
                                                if (!preview) {
                                                    cv.imshow(this.editedImage, dst);
                                                }
                                                return [4 /*yield*/, this.showPreview(dst)];
                                            case 1:
                                                _a.sent();
                                                this.processing.emit(false);
                                                resolve();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            }, 30);
                            return [2 /*return*/];
                        });
                    });
                });
            };
        /**
         * resize an image to fit constraints set in options.maxImageDimensions
         */
        /**
         * resize an image to fit constraints set in options.maxImageDimensions
         * @private
         * @param {?=} image
         * @return {?}
         */
        NgxDocScannerComponent.prototype.resize = /**
         * resize an image to fit constraints set in options.maxImageDimensions
         * @private
         * @param {?=} image
         * @return {?}
         */
            function (image) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    _this.processing.emit(true);
                    setTimeout(function () {
                        /** @type {?} */
                        var src = cv.imread(_this.editedImage);
                        /** @type {?} */
                        var currentDimensions = {
                            width: src.size().width,
                            height: src.size().height
                        };
                        /** @type {?} */
                        var resizeDimensions = {
                            width: 0,
                            height: 0
                        };
                        if (currentDimensions.width > _this.options.maxImageDimensions.width) {
                            resizeDimensions.width = _this.options.maxImageDimensions.width;
                            resizeDimensions.height = _this.options.maxImageDimensions.width / currentDimensions.width * currentDimensions.height;
                            if (resizeDimensions.height > _this.options.maxImageDimensions.height) {
                                resizeDimensions.height = _this.options.maxImageDimensions.height;
                                resizeDimensions.width = _this.options.maxImageDimensions.height / currentDimensions.height * currentDimensions.width;
                            }
                            /** @type {?} */
                            var dsize = new cv.Size(Math.floor(resizeDimensions.width), Math.floor(resizeDimensions.height));
                            cv.resize(src, src, dsize, 0, 0, cv.INTER_AREA);
                            /** @type {?} */
                            var resizeResult = ( /** @type {?} */(document.createElement('canvas')));
                            cv.imshow(resizeResult, src);
                            src.delete();
                            _this.processing.emit(false);
                            resolve(resizeResult);
                        }
                        else {
                            if (image) {
                                resolve(image);
                            }
                            else {
                                resolve(_this.editedImage);
                            }
                        }
                    }, 30);
                });
            };
        /**
         * display a preview of the image on the preview canvas
         */
        /**
         * display a preview of the image on the preview canvas
         * @private
         * @param {?=} image
         * @return {?}
         */
        NgxDocScannerComponent.prototype.showPreview = /**
         * display a preview of the image on the preview canvas
         * @private
         * @param {?=} image
         * @return {?}
         */
            function (image) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    /** @type {?} */
                    var src;
                    if (image) {
                        src = image;
                    }
                    else {
                        src = cv.imread(_this.editedImage);
                    }
                    /** @type {?} */
                    var dst = new cv.Mat();
                    /** @type {?} */
                    var dsize = new cv.Size(0, 0);
                    cv.resize(src, dst, dsize, _this.imageResizeRatio, _this.imageResizeRatio, cv.INTER_AREA);
                    cv.imshow(_this.previewCanvas.nativeElement, dst);
                    src.delete();
                    dst.delete();
                    resolve();
                });
            };
        // *************** //
        // Utility Methods //
        // *************** //
        /**
         * set preview canvas dimensions according to the canvas element of the original image
         */
        // *************** //
        // Utility Methods //
        // *************** //
        /**
         * set preview canvas dimensions according to the canvas element of the original image
         * @private
         * @param {?} img
         * @return {?}
         */
        NgxDocScannerComponent.prototype.setPreviewPaneDimensions =
            // *************** //
            // Utility Methods //
            // *************** //
            /**
             * set preview canvas dimensions according to the canvas element of the original image
             * @private
             * @param {?} img
             * @return {?}
             */
            function (img) {
                // set preview pane dimensions
                this.previewDimensions = this.calculateDimensions(img.width, img.height);
                this.previewCanvas.nativeElement.width = this.previewDimensions.width;
                this.previewCanvas.nativeElement.height = this.previewDimensions.height;
                this.imageResizeRatio = this.previewDimensions.width / img.width;
                this.imageDivStyle = {
                    width: this.previewDimensions.width + this.options.cropToolDimensions.width + 'px',
                    height: this.previewDimensions.height + this.options.cropToolDimensions.height + 'px',
                    'margin-left': "calc((100% - " + (this.previewDimensions.width + 10) + "px) / 2 + " + this.options.cropToolDimensions.width / 2 + "px)",
                    'margin-right': "calc((100% - " + (this.previewDimensions.width + 10) + "px) / 2 - " + this.options.cropToolDimensions.width / 2 + "px)",
                };
                this.limitsService.setPaneDimensions({ width: this.previewDimensions.width, height: this.previewDimensions.height });
            };
        /**
         * calculate dimensions of the preview canvas
         */
        /**
         * calculate dimensions of the preview canvas
         * @private
         * @param {?} width
         * @param {?} height
         * @return {?}
         */
        NgxDocScannerComponent.prototype.calculateDimensions = /**
         * calculate dimensions of the preview canvas
         * @private
         * @param {?} width
         * @param {?} height
         * @return {?}
         */
            function (width, height) {
                /** @type {?} */
                var ratio = width / height;
                /** @type {?} */
                var maxWidth = this.screenDimensions.width > this.maxPreviewWidth ?
                    this.maxPreviewWidth : this.screenDimensions.width - 40;
                /** @type {?} */
                var maxHeight = this.screenDimensions.height - 240;
                /** @type {?} */
                var calculated = {
                    width: maxWidth,
                    height: Math.round(maxWidth / ratio),
                    ratio: ratio
                };
                if (calculated.height > maxHeight) {
                    calculated.height = maxHeight;
                    calculated.width = Math.round(maxHeight * ratio);
                }
                return calculated;
            };
        /**
         * returns a point by it's roles
         * @param roles - an array of roles by which the point will be fetched
         */
        /**
         * returns a point by it's roles
         * @private
         * @param {?} roles - an array of roles by which the point will be fetched
         * @return {?}
         */
        NgxDocScannerComponent.prototype.getPoint = /**
         * returns a point by it's roles
         * @private
         * @param {?} roles - an array of roles by which the point will be fetched
         * @return {?}
         */
            function (roles) {
                var _this = this;
                return this.points.find(function (point) {
                    return _this.limitsService.compareArray(point.roles, roles);
                });
            };
        NgxDocScannerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ngx-doc-scanner',
                        template: "<div [ngStyle]=\"editorStyle\" fxLayoutAlign=\"space-around\" style=\"direction: ltr !important\">\r\n  <div #imageContainer [ngStyle]=\"imageDivStyle\" style=\"margin: auto;\" >\r\n    <ng-container *ngIf=\"imageLoaded && mode === 'crop'\">\r\n      <ngx-shape-outine #shapeOutline [color]=\"options.cropToolColor\" [weight]=\"options.cropToolLineWeight\" [dimensions]=\"previewDimensions\"></ngx-shape-outine>\r\n      <ngx-draggable-point #topLeft [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: 0, y: 0}\" [limitRoles]=\"['top', 'left']\" [container]=\"imageContainer\"></ngx-draggable-point>\r\n      <ngx-draggable-point #topRight [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: previewDimensions.width, y: 0}\" [limitRoles]=\"['top', 'right']\" [container]=\"imageContainer\"></ngx-draggable-point>\r\n      <ngx-draggable-point #bottomLeft [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: 0, y: previewDimensions.height}\" [limitRoles]=\"['bottom', 'left']\" [container]=\"imageContainer\"></ngx-draggable-point>\r\n      <ngx-draggable-point #bottomRight [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: previewDimensions.width, y: previewDimensions.height}\" [limitRoles]=\"['bottom', 'right']\" [container]=\"imageContainer\"></ngx-draggable-point>\r\n    </ng-container>\r\n    <canvas #PreviewCanvas [ngStyle]=\"{'max-width': options.maxPreviewWidth}\" style=\"z-index: 5\" ></canvas>\r\n  </div>\r\n  <div class=\"editor-actions\" fxLayout=\"row\" fxLayoutAlign=\"space-around\" style=\"position: absolute; bottom: 0; width: 100vw\">\r\n    <ng-container *ngFor=\"let button of displayedButtons\" [ngSwitch]=\"button.type\">\r\n      <button mat-mini-fab *ngSwitchCase=\"'fab'\" [name]=\"button.name\" (click)=\"button.action()\" [color]=\"options.buttonThemeColor\">\r\n        <mat-icon>{{button.icon}}</mat-icon>\r\n      </button>\r\n      <button mat-raised-button *ngSwitchCase=\"'button'\" [name]=\"button.name\" (click)=\"button.action()\" [color]=\"options.buttonThemeColor\">\r\n        <mat-icon>{{button.icon}}</mat-icon>\r\n        <span>{{button.text}}}</span>\r\n      </button>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n\r\n\r\n",
                        styles: [".editor-actions{padding:12px}.editor-actions button{margin:5px}"]
                    }] }
        ];
        /** @nocollapse */
        NgxDocScannerComponent.ctorParameters = function () {
            return [
                { type: NgxOpenCVService },
                { type: LimitsService },
                { type: material.MatBottomSheet }
            ];
        };
        NgxDocScannerComponent.propDecorators = {
            previewCanvas: [{ type: i0.ViewChild, args: ['PreviewCanvas', { read: i0.ElementRef },] }],
            exitEditor: [{ type: i0.Output }],
            editResult: [{ type: i0.Output }],
            error: [{ type: i0.Output }],
            ready: [{ type: i0.Output }],
            processing: [{ type: i0.Output }],
            file: [{ type: i0.Input }],
            config: [{ type: i0.Input }]
        };
        return NgxDocScannerComponent;
    }());
    /**
     * a class for generating configuration objects for the editor
     */
    var /**
     * a class for generating configuration objects for the editor
     */ ImageEditorConfig = /** @class */ (function () {
        function ImageEditorConfig(options) {
            var _this = this;
            /**
             * max dimensions of oputput image. if set to zero
             */
            this.maxImageDimensions = {
                width: 800,
                height: 1200
            };
            /**
             * background color of the main editor div
             */
            this.editorBackgroundColor = '#fefefe';
            /**
             * css properties for the main editor div
             */
            this.editorDimensions = {
                width: '100vw',
                height: '100vh'
            };
            /**
             * css that will be added to the main div of the editor component
             */
            this.extraCss = {
                position: 'absolute',
                top: 0,
                left: 0
            };
            /**
             * material design theme color name
             */
            this.buttonThemeColor = 'accent';
            /**
             * icon for the button that completes the editing and emits the edited image
             */
            this.exportImageIcon = 'cloud_upload';
            /**
             * color of the crop tool
             */
            this.cropToolColor = '#3cabe2';
            /**
             * shape of the crop tool, can be either a rectangle or a circle
             */
            this.cropToolShape = 'rect';
            /**
             * dimensions of the crop tool
             */
            this.cropToolDimensions = {
                width: 10,
                height: 10
            };
            /**
             * crop tool outline width
             */
            this.cropToolLineWeight = 3;
            /**
             * maximum size of the preview pane
             */
            this.maxPreviewWidth = 800;
            if (options) {
                Object.keys(options).forEach(function (key) {
                    _this[key] = options[key];
                });
            }
            this.editorStyle = { 'background-color': this.editorBackgroundColor };
            Object.assign(this.editorStyle, this.editorDimensions);
            Object.assign(this.editorStyle, this.extraCss);
            this.pointOptions = {
                shape: this.cropToolShape,
                color: this.cropToolColor,
                width: 0,
                height: 0
            };
            Object.assign(this.pointOptions, this.cropToolDimensions);
        }
        return ImageEditorConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxDocumentScannerModule = /** @class */ (function () {
        function NgxDocumentScannerModule() {
        }
        /**
         * @param {?} config
         * @return {?}
         */
        NgxDocumentScannerModule.forRoot = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                return {
                    ngModule: NgxDocumentScannerModule,
                    providers: [{ provide: OpenCvConfigToken, useValue: config }]
                };
            };
        NgxDocumentScannerModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [
                            NgxDraggablePointComponent,
                            NgxFilterMenuComponent,
                            NgxShapeOutlineComponent,
                            NgxDocScannerComponent,
                        ],
                        imports: [
                            flexLayout.FlexLayoutModule,
                            material.MatButtonModule,
                            material.MatIconModule,
                            material.MatBottomSheetModule,
                            material.MatListModule,
                            angular2Draggable.AngularDraggableModule,
                            common.CommonModule,
                        ],
                        exports: [
                            NgxDocScannerComponent,
                        ],
                        entryComponents: [
                            NgxFilterMenuComponent,
                        ],
                        providers: [
                            NgxOpenCVService,
                            LimitsService,
                        ]
                    },] }
        ];
        return NgxDocumentScannerModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgxDocumentScannerModule = NgxDocumentScannerModule;
    exports.NgxDocScannerComponent = NgxDocScannerComponent;
    exports.OpenCvConfigToken = OpenCvConfigToken;
    exports.NgxOpenCVService = NgxOpenCVService;
    exports.ɵa = NgxDraggablePointComponent;
    exports.ɵc = NgxFilterMenuComponent;
    exports.ɵd = NgxShapeOutlineComponent;
    exports.ɵb = LimitsService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-document-scanner.umd.js.map