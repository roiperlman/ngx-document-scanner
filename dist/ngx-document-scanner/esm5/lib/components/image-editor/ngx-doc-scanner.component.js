/**
 * @fileoverview added by tsickle
 * Generated from: lib/components/image-editor/ngx-doc-scanner.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __awaiter, __generator, __read, __spread } from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LimitsService, PositionChangeData } from '../../services/limits.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NgxFilterMenuComponent } from '../filter-menu/ngx-filter-menu.component';
import { NgxOpenCVService } from 'ngx-opencv';
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
                action: (/**
                 * @return {?}
                 */
                function () {
                    _this.exitEditor.emit('canceled');
                }),
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
                action: (/**
                 * @return {?}
                 */
                function () { return __awaiter(_this, void 0, void 0, function () {
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
                }); }),
                icon: 'done',
                type: 'fab',
                mode: 'crop'
            },
            {
                name: 'back',
                action: (/**
                 * @return {?}
                 */
                function () {
                    _this.mode = 'crop';
                    _this.loadFile(_this.originalImage);
                }),
                icon: 'arrow_back',
                type: 'fab',
                mode: 'color'
            },
            {
                name: 'filter',
                action: (/**
                 * @return {?}
                 */
                function () {
                    return _this.chooseFilters();
                }),
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
        this.exitEditor = new EventEmitter();
        /**
         * fires on edit completion
         */
        this.editResult = new EventEmitter();
        /**
         * emits errors, can be linked to an error handler of choice
         */
        this.error = new EventEmitter();
        /**
         * emits the loading status of the cv module.
         */
        this.ready = new EventEmitter();
        /**
         * emits true when processing is done, false when completed
         */
        this.processing = new EventEmitter();
        this.screenDimensions = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        // subscribe to status of cv module
        this.ngxOpenCv.cvState.subscribe((/**
         * @param {?} cvState
         * @return {?}
         */
        function (cvState) {
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
        }));
        // subscribe to positions of crop tool
        this.limitsService.positions.subscribe((/**
         * @param {?} points
         * @return {?}
         */
        function (points) {
            _this.points = points;
        }));
    }
    Object.defineProperty(NgxDocScannerComponent.prototype, "displayedButtons", {
        /**
         * returns an array of buttons according to the editor mode
         */
        get: /**
         * returns an array of buttons according to the editor mode
         * @return {?}
         */
        function () {
            var _this = this;
            return this.editorButtons.filter((/**
             * @param {?} button
             * @return {?}
             */
            function (button) {
                return button.mode === _this.mode;
            }));
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
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.processing.emit(true);
                }), 5);
                this.imageLoaded = false;
                this.originalImage = file;
                this.ngxOpenCv.cvState.subscribe((/**
                 * @param {?} cvState
                 * @return {?}
                 */
                function (cvState) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!cvState.ready) return [3 /*break*/, 2];
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
                }); }));
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
        this.editorButtons.forEach((/**
         * @param {?} button
         * @return {?}
         */
        function (button) {
            if (button.name === 'upload') {
                button.icon = _this.options.exportImageIcon;
            }
        }));
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
                            this.resize(this.editedImage)
                                .then((/**
                             * @param {?} resizeResult
                             * @return {?}
                             */
                            function (resizeResult) {
                                resizeResult.toBlob((/**
                                 * @param {?} blob
                                 * @return {?}
                                 */
                                function (blob) {
                                    _this.editResult.emit(blob);
                                    _this.processing.emit(false);
                                }), _this.originalImage.type);
                            }));
                        }
                        else {
                            this.editedImage.toBlob((/**
                             * @param {?} blob
                             * @return {?}
                             */
                            function (blob) {
                                _this.editResult.emit(blob);
                                _this.processing.emit(false);
                            }), this.originalImage.type);
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
        bottomSheetRef.afterDismissed().subscribe((/**
         * @return {?}
         */
        function () {
            _this.selectedFilter = data.filter;
            _this.applyFilter(true);
        }));
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
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
                        setTimeout((/**
                         * @return {?}
                         */
                        function () { return __awaiter(_this, void 0, void 0, function () {
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
                        }); }), 15);
                        return [2 /*return*/];
                }
            });
        }); }));
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
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
                        img.onload = (/**
                         * @return {?}
                         */
                        function () { return __awaiter(_this, void 0, void 0, function () {
                            var ctx, width, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        // set edited image canvas and dimensions
                                        this.editedImage = (/** @type {?} */ (document.createElement('canvas')));
                                        this.editedImage.width = img.width;
                                        this.editedImage.height = img.height;
                                        ctx = this.editedImage.getContext('2d');
                                        ctx.drawImage(img, 0, 0);
                                        // resize image if larger than max image size
                                        width = img.width > img.height ? img.height : img.width;
                                        if (!(width > this.options.maxImageDimensions.width)) return [3 /*break*/, 2];
                                        _a = this;
                                        return [4 /*yield*/, this.resize(this.editedImage)];
                                    case 1:
                                        _a.editedImage = _b.sent();
                                        _b.label = 2;
                                    case 2:
                                        this.imageDimensions.width = this.editedImage.width;
                                        this.imageDimensions.height = this.editedImage.height;
                                        this.setPreviewPaneDimensions(this.editedImage);
                                        resolve();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        img.src = imageSrc;
                        return [2 /*return*/];
                }
            });
        }); }));
        /**
         * read file from input field
         * @return {?}
         */
        function readFile() {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                /** @type {?} */
                var reader = new FileReader();
                reader.onload = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    resolve(reader.result);
                });
                reader.onerror = (/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    reject(err);
                });
                reader.readAsDataURL(file);
            }));
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.processing.emit(true);
            setTimeout((/**
             * @return {?}
             */
            function () {
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
                _this.showPreview().then((/**
                 * @return {?}
                 */
                function () {
                    _this.processing.emit(false);
                    resolve();
                }));
            }), 30);
        }));
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.processing.emit(true);
            setTimeout((/**
             * @return {?}
             */
            function () {
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
                Object.keys(rect).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) {
                    rect[key] = rect[key] * _this.imageResizeRatio;
                }));
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
            }), 30);
        }));
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.processing.emit(true);
            setTimeout((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var dst = cv.imread(_this.editedImage);
                // create source coordinates matrix
                /** @type {?} */
                var sourceCoordinates = [
                    _this.getPoint(['top', 'left']),
                    _this.getPoint(['top', 'right']),
                    _this.getPoint(['bottom', 'right']),
                    _this.getPoint(['bottom', 'left'])
                ].map((/**
                 * @param {?} point
                 * @return {?}
                 */
                function (point) {
                    return [point.x / _this.imageResizeRatio, point.y / _this.imageResizeRatio];
                }));
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
                _this.showPreview().then((/**
                 * @return {?}
                 */
                function () {
                    _this.processing.emit(false);
                    resolve();
                }));
            }), 30);
        }));
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
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
                setTimeout((/**
                 * @return {?}
                 */
                function () { return __awaiter(_this, void 0, void 0, function () {
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
                }); }), 30);
                return [2 /*return*/];
            });
        }); }));
    };
    /**
     * resize an image to fit constraints set in options.maxImageDimensions
     */
    /**
     * resize an image to fit constraints set in options.maxImageDimensions
     * @private
     * @param {?} image
     * @return {?}
     */
    NgxDocScannerComponent.prototype.resize = /**
     * resize an image to fit constraints set in options.maxImageDimensions
     * @private
     * @param {?} image
     * @return {?}
     */
    function (image) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.processing.emit(true);
            setTimeout((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var src = cv.imread(image);
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
                    var resizeResult = (/** @type {?} */ (document.createElement('canvas')));
                    cv.imshow(resizeResult, src);
                    src.delete();
                    _this.processing.emit(false);
                    resolve(resizeResult);
                }
                else {
                    _this.processing.emit(false);
                    resolve(image);
                }
            }), 30);
        }));
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
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
        }));
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
        return this.points.find((/**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            return _this.limitsService.compareArray(point.roles, roles);
        }));
    };
    NgxDocScannerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-doc-scanner',
                    template: "<div [ngStyle]=\"editorStyle\" fxLayoutAlign=\"space-around\" style=\"direction: ltr !important\">\n  <div #imageContainer [ngStyle]=\"imageDivStyle\" style=\"margin: auto;\" >\n    <ng-container *ngIf=\"imageLoaded && mode === 'crop'\">\n      <ngx-shape-outine #shapeOutline [color]=\"options.cropToolColor\" [weight]=\"options.cropToolLineWeight\" [dimensions]=\"previewDimensions\"></ngx-shape-outine>\n      <ngx-draggable-point #topLeft [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: 0, y: 0}\" [limitRoles]=\"['top', 'left']\" [container]=\"imageContainer\"></ngx-draggable-point>\n      <ngx-draggable-point #topRight [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: previewDimensions.width, y: 0}\" [limitRoles]=\"['top', 'right']\" [container]=\"imageContainer\"></ngx-draggable-point>\n      <ngx-draggable-point #bottomLeft [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: 0, y: previewDimensions.height}\" [limitRoles]=\"['bottom', 'left']\" [container]=\"imageContainer\"></ngx-draggable-point>\n      <ngx-draggable-point #bottomRight [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: previewDimensions.width, y: previewDimensions.height}\" [limitRoles]=\"['bottom', 'right']\" [container]=\"imageContainer\"></ngx-draggable-point>\n    </ng-container>\n    <canvas #PreviewCanvas [ngStyle]=\"{'max-width': options.maxPreviewWidth}\" style=\"z-index: 5\" ></canvas>\n  </div>\n  <div class=\"editor-actions\" fxLayout=\"row\" fxLayoutAlign=\"space-around\" style=\"position: absolute; bottom: 0; width: 100vw\">\n    <ng-container *ngFor=\"let button of displayedButtons\" [ngSwitch]=\"button.type\">\n      <button mat-mini-fab *ngSwitchCase=\"'fab'\" [name]=\"button.name\" (click)=\"button.action()\" [color]=\"options.buttonThemeColor\">\n        <mat-icon>{{button.icon}}</mat-icon>\n      </button>\n      <button mat-raised-button *ngSwitchCase=\"'button'\" [name]=\"button.name\" (click)=\"button.action()\" [color]=\"options.buttonThemeColor\">\n        <mat-icon>{{button.icon}}</mat-icon>\n        <span>{{button.text}}}</span>\n      </button>\n    </ng-container>\n  </div>\n</div>\n\n\n",
                    styles: [".editor-actions{padding:12px}.editor-actions button{margin:5px}"]
                }] }
    ];
    /** @nocollapse */
    NgxDocScannerComponent.ctorParameters = function () { return [
        { type: NgxOpenCVService },
        { type: LimitsService },
        { type: MatBottomSheet }
    ]; };
    NgxDocScannerComponent.propDecorators = {
        previewCanvas: [{ type: ViewChild, args: ['PreviewCanvas', { read: ElementRef },] }],
        exitEditor: [{ type: Output }],
        editResult: [{ type: Output }],
        error: [{ type: Output }],
        ready: [{ type: Output }],
        processing: [{ type: Output }],
        file: [{ type: Input }],
        config: [{ type: Input }]
    };
    return NgxDocScannerComponent;
}());
export { NgxDocScannerComponent };
if (false) {
    /**
     * editor config object
     * @type {?}
     */
    NgxDocScannerComponent.prototype.options;
    /**
     * an array of action buttons displayed on the editor screen
     * @type {?}
     * @private
     */
    NgxDocScannerComponent.prototype.editorButtons;
    /**
     * max width of the preview area
     * @type {?}
     * @private
     */
    NgxDocScannerComponent.prototype.maxPreviewWidth;
    /**
     * dimensions of the image container
     * @type {?}
     */
    NgxDocScannerComponent.prototype.imageDivStyle;
    /**
     * editor div style
     * @type {?}
     */
    NgxDocScannerComponent.prototype.editorStyle;
    /**
     * state of opencv loading
     * @type {?}
     * @private
     */
    NgxDocScannerComponent.prototype.cvState;
    /**
     * true after the image is loaded and preview is displayed
     * @type {?}
     */
    NgxDocScannerComponent.prototype.imageLoaded;
    /**
     * editor mode
     * @type {?}
     */
    NgxDocScannerComponent.prototype.mode;
    /**
     * filter selected by the user, returned by the filter selector bottom sheet
     * @type {?}
     * @private
     */
    NgxDocScannerComponent.prototype.selectedFilter;
    /**
     * viewport dimensions
     * @type {?}
     * @private
     */
    NgxDocScannerComponent.prototype.screenDimensions;
    /**
     * image dimensions
     * @type {?}
     * @private
     */
    NgxDocScannerComponent.prototype.imageDimensions;
    /**
     * dimensions of the preview pane
     * @type {?}
     */
    NgxDocScannerComponent.prototype.previewDimensions;
    /**
     * ration between preview image and original
     * @type {?}
     * @private
     */
    NgxDocScannerComponent.prototype.imageResizeRatio;
    /**
     * stores the original image for reset purposes
     * @type {?}
     * @private
     */
    NgxDocScannerComponent.prototype.originalImage;
    /**
     * stores the edited image
     * @type {?}
     * @private
     */
    NgxDocScannerComponent.prototype.editedImage;
    /**
     * stores the preview image as canvas
     * @type {?}
     * @private
     */
    NgxDocScannerComponent.prototype.previewCanvas;
    /**
     * an array of points used by the crop tool
     * @type {?}
     * @private
     */
    NgxDocScannerComponent.prototype.points;
    /**
     * optional binding to the exit button of the editor
     * @type {?}
     */
    NgxDocScannerComponent.prototype.exitEditor;
    /**
     * fires on edit completion
     * @type {?}
     */
    NgxDocScannerComponent.prototype.editResult;
    /**
     * emits errors, can be linked to an error handler of choice
     * @type {?}
     */
    NgxDocScannerComponent.prototype.error;
    /**
     * emits the loading status of the cv module.
     * @type {?}
     */
    NgxDocScannerComponent.prototype.ready;
    /**
     * emits true when processing is done, false when completed
     * @type {?}
     */
    NgxDocScannerComponent.prototype.processing;
    /**
     * editor configuration object
     * @type {?}
     */
    NgxDocScannerComponent.prototype.config;
    /**
     * @type {?}
     * @private
     */
    NgxDocScannerComponent.prototype.ngxOpenCv;
    /**
     * @type {?}
     * @private
     */
    NgxDocScannerComponent.prototype.limitsService;
    /**
     * @type {?}
     * @private
     */
    NgxDocScannerComponent.prototype.bottomSheet;
}
/**
 * a class for generating configuration objects for the editor
 */
var /**
 * a class for generating configuration objects for the editor
 */
ImageEditorConfig = /** @class */ (function () {
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
            Object.keys(options).forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                _this[key] = options[key];
            }));
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
if (false) {
    /**
     * max dimensions of oputput image. if set to zero
     * @type {?}
     */
    ImageEditorConfig.prototype.maxImageDimensions;
    /**
     * background color of the main editor div
     * @type {?}
     */
    ImageEditorConfig.prototype.editorBackgroundColor;
    /**
     * css properties for the main editor div
     * @type {?}
     */
    ImageEditorConfig.prototype.editorDimensions;
    /**
     * css that will be added to the main div of the editor component
     * @type {?}
     */
    ImageEditorConfig.prototype.extraCss;
    /**
     * material design theme color name
     * @type {?}
     */
    ImageEditorConfig.prototype.buttonThemeColor;
    /**
     * icon for the button that completes the editing and emits the edited image
     * @type {?}
     */
    ImageEditorConfig.prototype.exportImageIcon;
    /**
     * color of the crop tool
     * @type {?}
     */
    ImageEditorConfig.prototype.cropToolColor;
    /**
     * shape of the crop tool, can be either a rectangle or a circle
     * @type {?}
     */
    ImageEditorConfig.prototype.cropToolShape;
    /**
     * dimensions of the crop tool
     * @type {?}
     */
    ImageEditorConfig.prototype.cropToolDimensions;
    /**
     * aggregation of the properties regarding point attributes generated by the class constructor
     * @type {?}
     */
    ImageEditorConfig.prototype.pointOptions;
    /**
     * aggregation of the properties regarding the editor style generated by the class constructor
     * @type {?}
     */
    ImageEditorConfig.prototype.editorStyle;
    /**
     * crop tool outline width
     * @type {?}
     */
    ImageEditorConfig.prototype.cropToolLineWeight;
    /**
     * maximum size of the preview pane
     * @type {?}
     */
    ImageEditorConfig.prototype.maxPreviewWidth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRvYy1zY2FubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kb2N1bWVudC1zY2FubmVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaW1hZ2UtZWRpdG9yL25neC1kb2Mtc2Nhbm5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBQyxhQUFhLEVBQXVCLGtCQUFrQixFQUFhLE1BQU0sK0JBQStCLENBQUM7QUFDakgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBS2hGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUk1QztJQThNRSxnQ0FBb0IsU0FBMkIsRUFBVSxhQUE0QixFQUFVLFdBQTJCO1FBQTFILGlCQXVCQztRQXZCbUIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjs7Ozs7OztRQTlMbEgsa0JBQWEsR0FBOEI7WUFDakQ7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osTUFBTTs7O2dCQUFFO29CQUNOLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUE7Z0JBQ0QsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLElBQUksRUFBRSxLQUFLO2dCQUNYLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFD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QUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQXZGRCxJQXVGQzs7Ozs7O0lBbkZDLCtDQUdFOzs7OztJQUlGLGtEQUFrQzs7Ozs7SUFJbEMsNkNBR0U7Ozs7O0lBSUYscUNBSUU7Ozs7O0lBS0YsNkNBQXVEOzs7OztJQUl2RCw0Q0FBaUM7Ozs7O0lBSWpDLDBDQUEwQjs7Ozs7SUFJMUIsMENBQW1DOzs7OztJQUluQywrQ0FHRTs7Ozs7SUFJRix5Q0FBMkI7Ozs7O0lBSTNCLHdDQUE2Qzs7Ozs7SUFJN0MsK0NBQXVCOzs7OztJQUl2Qiw0Q0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xpbWl0c1NlcnZpY2UsIFBvaW50UG9zaXRpb25DaGFuZ2UsIFBvc2l0aW9uQ2hhbmdlRGF0YSwgUm9sZXNBcnJheX0gZnJvbSAnLi4vLi4vc2VydmljZXMvbGltaXRzLnNlcnZpY2UnO1xuaW1wb3J0IHtNYXRCb3R0b21TaGVldH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYm90dG9tLXNoZWV0JztcbmltcG9ydCB7Tmd4RmlsdGVyTWVudUNvbXBvbmVudH0gZnJvbSAnLi4vZmlsdGVyLW1lbnUvbmd4LWZpbHRlci1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQge1BvaW50U2hhcGV9IGZyb20gJy4uLy4uL1ByaXZhdGVNb2RlbHMnO1xuLy8gaW1wb3J0IHtOZ3hPcGVuQ1ZTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9uZ3gtb3BlbmN2LnNlcnZpY2UnO1xuaW1wb3J0IHtJbWFnZURpbWVuc2lvbnMsIERvY1NjYW5uZXJDb25maWcsIE9wZW5DVlN0YXRlfSBmcm9tICcuLi8uLi9QdWJsaWNNb2RlbHMnO1xuaW1wb3J0IHtFZGl0b3JBY3Rpb25CdXR0b24sIFBvaW50T3B0aW9uc30gZnJvbSAnLi4vLi4vUHJpdmF0ZU1vZGVscyc7XG5pbXBvcnQge05neE9wZW5DVlNlcnZpY2V9IGZyb20gJ25neC1vcGVuY3YnO1xuXG5kZWNsYXJlIHZhciBjdjogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZG9jLXNjYW5uZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWRvYy1zY2FubmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LWRvYy1zY2FubmVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmd4RG9jU2Nhbm5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKlxuICAgKiBlZGl0b3IgY29uZmlnIG9iamVjdFxuICAgKi9cbiAgb3B0aW9uczogSW1hZ2VFZGl0b3JDb25maWc7XG4gIC8vICoqKioqKioqKioqKiogLy9cbiAgLy8gRURJVE9SIENPTkZJRyAvL1xuICAvLyAqKioqKioqKioqKioqIC8vXG4gIC8qKlxuICAgKiBhbiBhcnJheSBvZiBhY3Rpb24gYnV0dG9ucyBkaXNwbGF5ZWQgb24gdGhlIGVkaXRvciBzY3JlZW5cbiAgICovXG4gIHByaXZhdGUgZWRpdG9yQnV0dG9uczogQXJyYXk8RWRpdG9yQWN0aW9uQnV0dG9uPiA9IFtcbiAgICB7XG4gICAgICBuYW1lOiAnZXhpdCcsXG4gICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgdGhpcy5leGl0RWRpdG9yLmVtaXQoJ2NhbmNlbGVkJyk7XG4gICAgICB9LFxuICAgICAgaWNvbjogJ2Fycm93X2JhY2snLFxuICAgICAgdHlwZTogJ2ZhYicsXG4gICAgICBtb2RlOiAnY3JvcCdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdyb3RhdGUnLFxuICAgICAgYWN0aW9uOiB0aGlzLnJvdGF0ZUltYWdlLmJpbmQodGhpcyksXG4gICAgICBpY29uOiAncm90YXRlX3JpZ2h0JyxcbiAgICAgIHR5cGU6ICdmYWInLFxuICAgICAgbW9kZTogJ2Nyb3AnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZG9uZV9jcm9wJyxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLm1vZGUgPSAnY29sb3InO1xuICAgICAgICBhd2FpdCB0aGlzLnRyYW5zZm9ybSgpO1xuICAgICAgICBhd2FpdCB0aGlzLmFwcGx5RmlsdGVyKHRydWUpO1xuICAgICAgfSxcbiAgICAgIGljb246ICdkb25lJyxcbiAgICAgIHR5cGU6ICdmYWInLFxuICAgICAgbW9kZTogJ2Nyb3AnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnYmFjaycsXG4gICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgdGhpcy5tb2RlID0gJ2Nyb3AnO1xuICAgICAgICB0aGlzLmxvYWRGaWxlKHRoaXMub3JpZ2luYWxJbWFnZSk7XG4gICAgICB9LFxuICAgICAgaWNvbjogJ2Fycm93X2JhY2snLFxuICAgICAgdHlwZTogJ2ZhYicsXG4gICAgICBtb2RlOiAnY29sb3InXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZmlsdGVyJyxcbiAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jaG9vc2VGaWx0ZXJzKCk7XG4gICAgICB9LFxuICAgICAgaWNvbjogJ3Bob3RvX2ZpbHRlcicsXG4gICAgICB0eXBlOiAnZmFiJyxcbiAgICAgIG1vZGU6ICdjb2xvcidcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICd1cGxvYWQnLFxuICAgICAgYWN0aW9uOiB0aGlzLmV4cG9ydEltYWdlLmJpbmQodGhpcyksXG4gICAgICBpY29uOiAnY2xvdWRfdXBsb2FkJyxcbiAgICAgIHR5cGU6ICdmYWInLFxuICAgICAgbW9kZTogJ2NvbG9yJ1xuICAgIH0sXG4gIF07XG4gIC8qKlxuICAgKiByZXR1cm5zIGFuIGFycmF5IG9mIGJ1dHRvbnMgYWNjb3JkaW5nIHRvIHRoZSBlZGl0b3IgbW9kZVxuICAgKi9cbiAgZ2V0IGRpc3BsYXllZEJ1dHRvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWRpdG9yQnV0dG9ucy5maWx0ZXIoYnV0dG9uID0+IHtcbiAgICAgIHJldHVybiBidXR0b24ubW9kZSA9PT0gdGhpcy5tb2RlO1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBtYXggd2lkdGggb2YgdGhlIHByZXZpZXcgYXJlYVxuICAgKi9cbiAgcHJpdmF0ZSBtYXhQcmV2aWV3V2lkdGg6IG51bWJlcjtcbiAgLyoqXG4gICAqIGRpbWVuc2lvbnMgb2YgdGhlIGltYWdlIGNvbnRhaW5lclxuICAgKi9cbiAgaW1hZ2VEaXZTdHlsZToge1trZXk6IHN0cmluZ106IHN0cmluZ3xudW1iZXJ9O1xuICAvKipcbiAgICogZWRpdG9yIGRpdiBzdHlsZVxuICAgKi9cbiAgZWRpdG9yU3R5bGU6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd8bnVtYmVyfTtcblxuICAvLyAqKioqKioqKioqKioqIC8vXG4gIC8vIEVESVRPUiBTVEFURSAvL1xuICAvLyAqKioqKioqKioqKioqIC8vXG4gIC8qKlxuICAgKiBzdGF0ZSBvZiBvcGVuY3YgbG9hZGluZ1xuICAgKi9cbiAgcHJpdmF0ZSBjdlN0YXRlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiB0cnVlIGFmdGVyIHRoZSBpbWFnZSBpcyBsb2FkZWQgYW5kIHByZXZpZXcgaXMgZGlzcGxheWVkXG4gICAqL1xuICBpbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAvKipcbiAgICogZWRpdG9yIG1vZGVcbiAgICovXG4gIG1vZGU6ICdjcm9wJ3wnY29sb3InID0gJ2Nyb3AnO1xuICAvKipcbiAgICogZmlsdGVyIHNlbGVjdGVkIGJ5IHRoZSB1c2VyLCByZXR1cm5lZCBieSB0aGUgZmlsdGVyIHNlbGVjdG9yIGJvdHRvbSBzaGVldFxuICAgKi9cbiAgcHJpdmF0ZSBzZWxlY3RlZEZpbHRlciA9ICdkZWZhdWx0JztcblxuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIC8vIE9QRVJBVElPTiBWQVJJQUJMRVMgLy9cbiAgLy8gKioqKioqKioqKioqKioqKioqKiAvL1xuICAvKipcbiAgICogdmlld3BvcnQgZGltZW5zaW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBzY3JlZW5EaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnM7XG4gIC8qKlxuICAgKiBpbWFnZSBkaW1lbnNpb25zXG4gICAqL1xuICBwcml2YXRlIGltYWdlRGltZW5zaW9uczogSW1hZ2VEaW1lbnNpb25zID0ge1xuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMFxuICB9O1xuICAvKipcbiAgICogZGltZW5zaW9ucyBvZiB0aGUgcHJldmlldyBwYW5lXG4gICAqL1xuICBwcmV2aWV3RGltZW5zaW9uczogSW1hZ2VEaW1lbnNpb25zO1xuICAvKipcbiAgICogcmF0aW9uIGJldHdlZW4gcHJldmlldyBpbWFnZSBhbmQgb3JpZ2luYWxcbiAgICovXG4gIHByaXZhdGUgaW1hZ2VSZXNpemVSYXRpbzogbnVtYmVyO1xuICAvKipcbiAgICogc3RvcmVzIHRoZSBvcmlnaW5hbCBpbWFnZSBmb3IgcmVzZXQgcHVycG9zZXNcbiAgICovXG4gIHByaXZhdGUgb3JpZ2luYWxJbWFnZTogRmlsZTtcbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgZWRpdGVkIGltYWdlXG4gICAqL1xuICBwcml2YXRlIGVkaXRlZEltYWdlOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgcHJldmlldyBpbWFnZSBhcyBjYW52YXNcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ1ByZXZpZXdDYW52YXMnLCB7cmVhZDogRWxlbWVudFJlZn0pIHByaXZhdGUgcHJldmlld0NhbnZhczogRWxlbWVudFJlZjtcbiAgLyoqXG4gICAqIGFuIGFycmF5IG9mIHBvaW50cyB1c2VkIGJ5IHRoZSBjcm9wIHRvb2xcbiAgICovXG4gIHByaXZhdGUgcG9pbnRzOiBBcnJheTxQb2ludFBvc2l0aW9uQ2hhbmdlPjtcblxuICAvLyAqKioqKioqKioqKioqKiAvL1xuICAvLyBFVkVOVCBFTUlUVEVSUyAvL1xuICAvLyAqKioqKioqKioqKioqKiAvL1xuICAvKipcbiAgICogb3B0aW9uYWwgYmluZGluZyB0byB0aGUgZXhpdCBidXR0b24gb2YgdGhlIGVkaXRvclxuICAgKi9cbiAgQE91dHB1dCgpIGV4aXRFZGl0b3I6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIC8qKlxuICAgKiBmaXJlcyBvbiBlZGl0IGNvbXBsZXRpb25cbiAgICovXG4gIEBPdXRwdXQoKSBlZGl0UmVzdWx0OiBFdmVudEVtaXR0ZXI8QmxvYj4gPSBuZXcgRXZlbnRFbWl0dGVyPEJsb2I+KCk7XG4gIC8qKlxuICAgKiBlbWl0cyBlcnJvcnMsIGNhbiBiZSBsaW5rZWQgdG8gYW4gZXJyb3IgaGFuZGxlciBvZiBjaG9pY2VcbiAgICovXG4gIEBPdXRwdXQoKSBlcnJvcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgLyoqXG4gICAqIGVtaXRzIHRoZSBsb2FkaW5nIHN0YXR1cyBvZiB0aGUgY3YgbW9kdWxlLlxuICAgKi9cbiAgQE91dHB1dCgpIHJlYWR5OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIC8qKlxuICAgKiBlbWl0cyB0cnVlIHdoZW4gcHJvY2Vzc2luZyBpcyBkb25lLCBmYWxzZSB3aGVuIGNvbXBsZXRlZFxuICAgKi9cbiAgQE91dHB1dCgpIHByb2Nlc3Npbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvLyAqKioqKiogLy9cbiAgLy8gSU5QVVRTIC8vXG4gIC8vICoqKioqKiAvL1xuICAvKipcbiAgICogc2V0IGltYWdlIGZvciBlZGl0aW5nXG4gICAqIEBwYXJhbSBmaWxlIC0gZmlsZSBmcm9tIGZvcm0gaW5wdXRcbiAgICovXG4gIEBJbnB1dCgpIHNldCBmaWxlKGZpbGU6IEZpbGUpIHtcbiAgICBpZiAoZmlsZSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KHRydWUpO1xuICAgICAgfSwgNSk7XG4gICAgICB0aGlzLmltYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICB0aGlzLm9yaWdpbmFsSW1hZ2UgPSBmaWxlO1xuICAgICAgdGhpcy5uZ3hPcGVuQ3YuY3ZTdGF0ZS5zdWJzY3JpYmUoXG4gICAgICAgIGFzeW5jIChjdlN0YXRlOiBPcGVuQ1ZTdGF0ZSkgPT4ge1xuICAgICAgICAgIGlmIChjdlN0YXRlLnJlYWR5KSB7XG4gICAgICAgICAgICAvLyByZWFkIGZpbGUgdG8gaW1hZ2UgJiBjYW52YXNcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZEZpbGUoZmlsZSk7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdChmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZWRpdG9yIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAqL1xuICBASW5wdXQoKSBjb25maWc6IERvY1NjYW5uZXJDb25maWc7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5neE9wZW5DdjogTmd4T3BlbkNWU2VydmljZSwgcHJpdmF0ZSBsaW1pdHNTZXJ2aWNlOiBMaW1pdHNTZXJ2aWNlLCBwcml2YXRlIGJvdHRvbVNoZWV0OiBNYXRCb3R0b21TaGVldCkge1xuICAgIHRoaXMuc2NyZWVuRGltZW5zaW9ucyA9IHtcbiAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0XG4gICAgfTtcblxuICAgIC8vIHN1YnNjcmliZSB0byBzdGF0dXMgb2YgY3YgbW9kdWxlXG4gICAgdGhpcy5uZ3hPcGVuQ3YuY3ZTdGF0ZS5zdWJzY3JpYmUoKGN2U3RhdGU6IE9wZW5DVlN0YXRlKSA9PiB7XG4gICAgICB0aGlzLmN2U3RhdGUgPSBjdlN0YXRlLnN0YXRlO1xuICAgICAgdGhpcy5yZWFkeS5lbWl0KGN2U3RhdGUucmVhZHkpO1xuICAgICAgaWYgKGN2U3RhdGUuZXJyb3IpIHtcbiAgICAgICAgdGhpcy5lcnJvci5lbWl0KG5ldyBFcnJvcignZXJyb3IgbG9hZGluZyBjdicpKTtcbiAgICAgIH0gZWxzZSBpZiAoY3ZTdGF0ZS5sb2FkaW5nKSB7XG4gICAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChjdlN0YXRlLnJlYWR5KSB7XG4gICAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHN1YnNjcmliZSB0byBwb3NpdGlvbnMgb2YgY3JvcCB0b29sXG4gICAgdGhpcy5saW1pdHNTZXJ2aWNlLnBvc2l0aW9ucy5zdWJzY3JpYmUocG9pbnRzID0+IHtcbiAgICAgIHRoaXMucG9pbnRzID0gcG9pbnRzO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gc2V0IG9wdGlvbnMgZnJvbSBjb25maWcgb2JqZWN0XG4gICAgdGhpcy5vcHRpb25zID0gbmV3IEltYWdlRWRpdG9yQ29uZmlnKHRoaXMuY29uZmlnKTtcbiAgICAvLyBzZXQgZXhwb3J0IGltYWdlIGljb25cbiAgICB0aGlzLmVkaXRvckJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgaWYgKGJ1dHRvbi5uYW1lID09PSAndXBsb2FkJykge1xuICAgICAgICBidXR0b24uaWNvbiA9IHRoaXMub3B0aW9ucy5leHBvcnRJbWFnZUljb247XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5tYXhQcmV2aWV3V2lkdGggPSB0aGlzLm9wdGlvbnMubWF4UHJldmlld1dpZHRoO1xuICAgIHRoaXMuZWRpdG9yU3R5bGUgPSB0aGlzLm9wdGlvbnMuZWRpdG9yU3R5bGU7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAvL1xuICAvLyBlZGl0b3IgYWN0aW9uIGJ1dHRvbnMgbWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAvL1xuXG4gIC8qKlxuICAgKiBlbWl0cyB0aGUgZXhpdEVkaXRvciBldmVudFxuICAgKi9cbiAgZXhpdCgpIHtcbiAgICB0aGlzLmV4aXRFZGl0b3IuZW1pdCgnY2FuY2VsZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhcHBsaWVzIHRoZSBzZWxlY3RlZCBmaWx0ZXIsIGFuZCB3aGVuIGRvbmUgZW1pdHMgdGhlIHJlc3VsdGVkIGltYWdlXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGV4cG9ydEltYWdlKCkge1xuICAgIGF3YWl0IHRoaXMuYXBwbHlGaWx0ZXIoZmFsc2UpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMubWF4SW1hZ2VEaW1lbnNpb25zKSB7XG4gICAgICB0aGlzLnJlc2l6ZSh0aGlzLmVkaXRlZEltYWdlKVxuICAgICAgICAudGhlbihyZXNpemVSZXN1bHQgPT4ge1xuICAgICAgICAgIHJlc2l6ZVJlc3VsdC50b0Jsb2IoKGJsb2IpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWRpdFJlc3VsdC5lbWl0KGJsb2IpO1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQoZmFsc2UpO1xuICAgICAgICAgIH0sIHRoaXMub3JpZ2luYWxJbWFnZS50eXBlKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWRpdGVkSW1hZ2UudG9CbG9iKChibG9iKSA9PiB7XG4gICAgICAgIHRoaXMuZWRpdFJlc3VsdC5lbWl0KGJsb2IpO1xuICAgICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdChmYWxzZSk7XG4gICAgICB9LCB0aGlzLm9yaWdpbmFsSW1hZ2UudHlwZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG9wZW4gdGhlIGJvdHRvbSBzaGVldCBmb3Igc2VsZWN0aW5nIGZpbHRlcnMsIGFuZCBhcHBsaWVzIHRoZSBzZWxlY3RlZCBmaWx0ZXIgaW4gcHJldmlldyBtb2RlXG4gICAqL1xuICBwcml2YXRlIGNob29zZUZpbHRlcnMoKSB7XG4gICAgY29uc3QgZGF0YSA9IHsgZmlsdGVyOiB0aGlzLnNlbGVjdGVkRmlsdGVyIH07XG4gICAgY29uc3QgYm90dG9tU2hlZXRSZWYgPSB0aGlzLmJvdHRvbVNoZWV0Lm9wZW4oTmd4RmlsdGVyTWVudUNvbXBvbmVudCwge1xuICAgICAgZGF0YTogZGF0YVxuICAgIH0pO1xuICAgIGJvdHRvbVNoZWV0UmVmLmFmdGVyRGlzbWlzc2VkKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRGaWx0ZXIgPSBkYXRhLmZpbHRlcjtcbiAgICAgIHRoaXMuYXBwbHlGaWx0ZXIodHJ1ZSk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKiAvL1xuICAvLyBGaWxlIElucHV0ICYgT3V0cHV0IE1ldGhvZHMgLy9cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqIC8vXG4gIC8qKlxuICAgKiBsb2FkIGltYWdlIGZyb20gaW5wdXQgZmllbGRcbiAgICovXG4gIHByaXZhdGUgbG9hZEZpbGUoZmlsZTogRmlsZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdCh0cnVlKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMucmVhZEltYWdlKGZpbGUpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgdGhpcy5lcnJvci5lbWl0KG5ldyBFcnJvcihlcnIpKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2hvd1ByZXZpZXcoKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHRoaXMuZXJyb3IuZW1pdChuZXcgRXJyb3IoZXJyKSk7XG4gICAgICB9XG4gICAgICAvLyBzZXQgcGFuZSBsaW1pdHNcbiAgICAgIC8vIHNob3cgcG9pbnRzXG4gICAgICB0aGlzLmltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgIGF3YWl0IHRoaXMubGltaXRzU2VydmljZS5zZXRQYW5lRGltZW5zaW9ucyh7d2lkdGg6IHRoaXMucHJldmlld0RpbWVuc2lvbnMud2lkdGgsIGhlaWdodDogdGhpcy5wcmV2aWV3RGltZW5zaW9ucy5oZWlnaHR9KTtcbiAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLmRldGVjdENvbnRvdXJzKCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KGZhbHNlKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSwgMTUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlYWQgaW1hZ2UgZnJvbSBGaWxlIG9iamVjdFxuICAgKi9cbiAgcHJpdmF0ZSByZWFkSW1hZ2UoZmlsZTogRmlsZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgaW1hZ2VTcmM7XG4gICAgICB0cnkge1xuICAgICAgICBpbWFnZVNyYyA9IGF3YWl0IHJlYWRGaWxlKCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5vbmxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIC8vIHNldCBlZGl0ZWQgaW1hZ2UgY2FudmFzIGFuZCBkaW1lbnNpb25zXG4gICAgICAgIHRoaXMuZWRpdGVkSW1hZ2UgPSA8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmVkaXRlZEltYWdlLndpZHRoID0gaW1nLndpZHRoO1xuICAgICAgICB0aGlzLmVkaXRlZEltYWdlLmhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuZWRpdGVkSW1hZ2UuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuICAgICAgICAvLyByZXNpemUgaW1hZ2UgaWYgbGFyZ2VyIHRoYW4gbWF4IGltYWdlIHNpemVcbiAgICAgICAgY29uc3Qgd2lkdGggPSBpbWcud2lkdGggPiBpbWcuaGVpZ2h0ID8gaW1nLmhlaWdodCA6IGltZy53aWR0aDtcbiAgICAgICAgaWYgKHdpZHRoID4gdGhpcy5vcHRpb25zLm1heEltYWdlRGltZW5zaW9ucy53aWR0aCkge1xuICAgICAgICAgIHRoaXMuZWRpdGVkSW1hZ2UgPSBhd2FpdCB0aGlzLnJlc2l6ZSh0aGlzLmVkaXRlZEltYWdlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmltYWdlRGltZW5zaW9ucy53aWR0aCA9IHRoaXMuZWRpdGVkSW1hZ2Uud2lkdGg7XG4gICAgICAgIHRoaXMuaW1hZ2VEaW1lbnNpb25zLmhlaWdodCA9IHRoaXMuZWRpdGVkSW1hZ2UuaGVpZ2h0O1xuICAgICAgICB0aGlzLnNldFByZXZpZXdQYW5lRGltZW5zaW9ucyh0aGlzLmVkaXRlZEltYWdlKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfTtcbiAgICAgIGltZy5zcmMgPSBpbWFnZVNyYztcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIHJlYWQgZmlsZSBmcm9tIGlucHV0IGZpZWxkXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVhZEZpbGUoKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoZXJyKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqIC8vXG4gIC8vIEltYWdlIFByb2Nlc3NpbmcgTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKiogLy9cbiAgLyoqXG4gICAqIHJvdGF0ZSBpbWFnZSA5MCBkZWdyZWVzXG4gICAqL1xuICBwcml2YXRlIHJvdGF0ZUltYWdlKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdCh0cnVlKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBkc3QgPSBjdi5pbXJlYWQodGhpcy5lZGl0ZWRJbWFnZSk7XG4gICAgICAgIC8vIGNvbnN0IGRzdCA9IG5ldyBjdi5NYXQoKTtcbiAgICAgICAgY3YudHJhbnNwb3NlKGRzdCwgZHN0KTtcbiAgICAgICAgY3YuZmxpcChkc3QsIGRzdCwgMSk7XG4gICAgICAgIGN2Lmltc2hvdyh0aGlzLmVkaXRlZEltYWdlLCBkc3QpO1xuICAgICAgICAvLyBzcmMuZGVsZXRlKCk7XG4gICAgICAgIGRzdC5kZWxldGUoKTtcbiAgICAgICAgLy8gc2F2ZSBjdXJyZW50IHByZXZpZXcgZGltZW5zaW9ucyBhbmQgcG9zaXRpb25zXG4gICAgICAgIGNvbnN0IGluaXRpYWxQcmV2aWV3RGltZW5zaW9ucyA9IHt3aWR0aDogMCwgaGVpZ2h0OiAwfTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihpbml0aWFsUHJldmlld0RpbWVuc2lvbnMsIHRoaXMucHJldmlld0RpbWVuc2lvbnMpO1xuICAgICAgICBjb25zdCBpbml0aWFsUG9zaXRpb25zID0gQXJyYXkuZnJvbSh0aGlzLnBvaW50cyk7XG4gICAgICAgIC8vIGdldCBuZXcgZGltZW5zaW9uc1xuICAgICAgICAvLyBzZXQgbmV3IHByZXZpZXcgcGFuZSBkaW1lbnNpb25zXG4gICAgICAgIHRoaXMuc2V0UHJldmlld1BhbmVEaW1lbnNpb25zKHRoaXMuZWRpdGVkSW1hZ2UpO1xuICAgICAgICAvLyBnZXQgcHJldmlldyBwYW5lIHJlc2l6ZSByYXRpb1xuICAgICAgICBjb25zdCBwcmV2aWV3UmVzaXplUmF0aW9zID0ge1xuICAgICAgICAgIHdpZHRoOiB0aGlzLnByZXZpZXdEaW1lbnNpb25zLndpZHRoIC8gaW5pdGlhbFByZXZpZXdEaW1lbnNpb25zLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogdGhpcy5wcmV2aWV3RGltZW5zaW9ucy5oZWlnaHQgLyBpbml0aWFsUHJldmlld0RpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgIH07XG4gICAgICAgIC8vIHNldCBuZXcgcHJldmlldyBwYW5lIGRpbWVuc2lvbnNcblxuICAgICAgICB0aGlzLmxpbWl0c1NlcnZpY2Uucm90YXRlQ2xvY2t3aXNlKHByZXZpZXdSZXNpemVSYXRpb3MsIGluaXRpYWxQcmV2aWV3RGltZW5zaW9ucywgaW5pdGlhbFBvc2l0aW9ucyk7XG4gICAgICAgIHRoaXMuc2hvd1ByZXZpZXcoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdChmYWxzZSk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sIDMwKTtcbiAgICB9KTtcblxuXG4gIH1cblxuICAvKipcbiAgICogZGV0ZWN0cyB0aGUgY29udG91cnMgb2YgdGhlIGRvY3VtZW50IGFuZFxuICAgKiovXG4gIHByaXZhdGUgZGV0ZWN0Q29udG91cnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KHRydWUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIGxvYWQgdGhlIGltYWdlIGFuZCBjb21wdXRlIHRoZSByYXRpbyBvZiB0aGUgb2xkIGhlaWdodCB0byB0aGUgbmV3IGhlaWdodCwgY2xvbmUgaXQsIGFuZCByZXNpemUgaXRcbiAgICAgICAgY29uc3QgcHJvY2Vzc2luZ1Jlc2l6ZVJhdGlvID0gMC41O1xuICAgICAgICBjb25zdCBkc3QgPSBjdi5pbXJlYWQodGhpcy5lZGl0ZWRJbWFnZSk7XG4gICAgICAgIGNvbnN0IGRzaXplID0gbmV3IGN2LlNpemUoZHN0LnJvd3MgKiBwcm9jZXNzaW5nUmVzaXplUmF0aW8sIGRzdC5jb2xzICogcHJvY2Vzc2luZ1Jlc2l6ZVJhdGlvKTtcbiAgICAgICAgY29uc3Qga3NpemUgPSBuZXcgY3YuU2l6ZSg1LCA1KTtcbiAgICAgICAgLy8gY29udmVydCB0aGUgaW1hZ2UgdG8gZ3JheXNjYWxlLCBibHVyIGl0LCBhbmQgZmluZCBlZGdlcyBpbiB0aGUgaW1hZ2VcbiAgICAgICAgY3YuY3Z0Q29sb3IoZHN0LCBkc3QsIGN2LkNPTE9SX1JHQkEyR1JBWSwgMCk7XG4gICAgICAgIGN2LkdhdXNzaWFuQmx1cihkc3QsIGRzdCwga3NpemUsIDAsIDAsIGN2LkJPUkRFUl9ERUZBVUxUKTtcbiAgICAgICAgY3YuQ2FubnkoZHN0LCBkc3QsIDc1LCAyMDApO1xuICAgICAgICAvLyBmaW5kIGNvbnRvdXJzXG4gICAgICAgIGN2LnRocmVzaG9sZChkc3QsIGRzdCwgMTIwLCAyMDAsIGN2LlRIUkVTSF9CSU5BUlkpO1xuICAgICAgICBjb25zdCBjb250b3VycyA9IG5ldyBjdi5NYXRWZWN0b3IoKTtcbiAgICAgICAgY29uc3QgaGllcmFyY2h5ID0gbmV3IGN2Lk1hdCgpO1xuICAgICAgICBjdi5maW5kQ29udG91cnMoZHN0LCBjb250b3VycywgaGllcmFyY2h5LCBjdi5SRVRSX0NDT01QLCBjdi5DSEFJTl9BUFBST1hfU0lNUExFKTtcbiAgICAgICAgY29uc3QgcmVjdCA9IGN2LmJvdW5kaW5nUmVjdChkc3QpO1xuICAgICAgICBkc3QuZGVsZXRlKCk7IGhpZXJhcmNoeS5kZWxldGUoKTsgY29udG91cnMuZGVsZXRlKCk7XG4gICAgICAgIC8vIHRyYW5zZm9ybSB0aGUgcmVjdGFuZ2xlIGludG8gYSBzZXQgb2YgcG9pbnRzXG4gICAgICAgIE9iamVjdC5rZXlzKHJlY3QpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICByZWN0W2tleV0gPSByZWN0W2tleV0gICogdGhpcy5pbWFnZVJlc2l6ZVJhdGlvO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjb250b3VyQ29vcmRpbmF0ZXMgPSBbXG4gICAgICAgICAgbmV3IFBvc2l0aW9uQ2hhbmdlRGF0YSh7eDogcmVjdC54LCB5OiByZWN0Lnl9LCBbJ2xlZnQnLCAndG9wJ10pLFxuICAgICAgICAgIG5ldyBQb3NpdGlvbkNoYW5nZURhdGEoe3g6IHJlY3QueCArIHJlY3Qud2lkdGgsIHk6IHJlY3QueX0sIFsncmlnaHQnLCAndG9wJ10pLFxuICAgICAgICAgIG5ldyBQb3NpdGlvbkNoYW5nZURhdGEoe3g6IHJlY3QueCArIHJlY3Qud2lkdGgsIHk6IHJlY3QueSArIHJlY3QuaGVpZ2h0fSwgWydyaWdodCcsICdib3R0b20nXSksXG4gICAgICAgICAgbmV3IFBvc2l0aW9uQ2hhbmdlRGF0YSh7eDogcmVjdC54LCB5OiByZWN0LnkgKyByZWN0LmhlaWdodH0sIFsnbGVmdCcsICdib3R0b20nXSksXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5saW1pdHNTZXJ2aWNlLnJlcG9zaXRpb25Qb2ludHMoY29udG91ckNvb3JkaW5hdGVzKTtcbiAgICAgICAgLy8gdGhpcy5wcm9jZXNzaW5nLmVtaXQoZmFsc2UpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9LCAzMCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogYXBwbHkgcGVyc3BlY3RpdmUgdHJhbnNmb3JtXG4gICAqL1xuICBwcml2YXRlIHRyYW5zZm9ybSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQodHJ1ZSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZHN0ID0gY3YuaW1yZWFkKHRoaXMuZWRpdGVkSW1hZ2UpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBzb3VyY2UgY29vcmRpbmF0ZXMgbWF0cml4XG4gICAgICAgIGNvbnN0IHNvdXJjZUNvb3JkaW5hdGVzID0gW1xuICAgICAgICAgIHRoaXMuZ2V0UG9pbnQoWyd0b3AnLCAnbGVmdCddKSxcbiAgICAgICAgICB0aGlzLmdldFBvaW50KFsndG9wJywgJ3JpZ2h0J10pLFxuICAgICAgICAgIHRoaXMuZ2V0UG9pbnQoWydib3R0b20nLCAncmlnaHQnXSksXG4gICAgICAgICAgdGhpcy5nZXRQb2ludChbJ2JvdHRvbScsICdsZWZ0J10pXG4gICAgICAgIF0ubWFwKHBvaW50ID0+IHtcbiAgICAgICAgICByZXR1cm4gW3BvaW50LnggLyB0aGlzLmltYWdlUmVzaXplUmF0aW8sIHBvaW50LnkgLyB0aGlzLmltYWdlUmVzaXplUmF0aW9dO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZXQgbWF4IHdpZHRoXG4gICAgICAgIGNvbnN0IGJvdHRvbVdpZHRoID0gdGhpcy5nZXRQb2ludChbJ2JvdHRvbScsICdyaWdodCddKS54IC0gdGhpcy5nZXRQb2ludChbJ2JvdHRvbScsICdsZWZ0J10pLng7XG4gICAgICAgIGNvbnN0IHRvcFdpZHRoID0gdGhpcy5nZXRQb2ludChbJ3RvcCcsICdyaWdodCddKS54IC0gdGhpcy5nZXRQb2ludChbJ3RvcCcsICdsZWZ0J10pLng7XG4gICAgICAgIGNvbnN0IG1heFdpZHRoID0gTWF0aC5tYXgoYm90dG9tV2lkdGgsIHRvcFdpZHRoKSAvIHRoaXMuaW1hZ2VSZXNpemVSYXRpbztcbiAgICAgICAgLy8gZ2V0IG1heCBoZWlnaHRcbiAgICAgICAgY29uc3QgbGVmdEhlaWdodCA9IHRoaXMuZ2V0UG9pbnQoWydib3R0b20nLCAnbGVmdCddKS55IC0gdGhpcy5nZXRQb2ludChbJ3RvcCcsICdsZWZ0J10pLnk7XG4gICAgICAgIGNvbnN0IHJpZ2h0SGVpZ2h0ID0gdGhpcy5nZXRQb2ludChbJ2JvdHRvbScsICdyaWdodCddKS55IC0gdGhpcy5nZXRQb2ludChbJ3RvcCcsICdyaWdodCddKS55O1xuICAgICAgICBjb25zdCBtYXhIZWlnaHQgPSBNYXRoLm1heChsZWZ0SGVpZ2h0LCByaWdodEhlaWdodCkgLyB0aGlzLmltYWdlUmVzaXplUmF0aW87XG4gICAgICAgIC8vIGNyZWF0ZSBkZXN0IGNvb3JkaW5hdGVzIG1hdHJpeFxuICAgICAgICBjb25zdCBkZXN0Q29vcmRpbmF0ZXMgPSBbXG4gICAgICAgICAgWzAsIDBdLFxuICAgICAgICAgIFttYXhXaWR0aCAtIDEsIDBdLFxuICAgICAgICAgIFttYXhXaWR0aCAtIDEsIG1heEhlaWdodCAtIDFdLFxuICAgICAgICAgIFswLCBtYXhIZWlnaHQgLSAxXVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgdG8gb3BlbiBjdiBtYXRyaXggb2JqZWN0c1xuICAgICAgICBjb25zdCBNcyA9IGN2Lm1hdEZyb21BcnJheSg0LCAxLCBjdi5DVl8zMkZDMiwgW10uY29uY2F0KC4uLnNvdXJjZUNvb3JkaW5hdGVzKSk7XG4gICAgICAgIGNvbnN0IE1kID0gY3YubWF0RnJvbUFycmF5KDQsIDEsIGN2LkNWXzMyRkMyLCBbXS5jb25jYXQoLi4uZGVzdENvb3JkaW5hdGVzKSk7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybU1hdHJpeCA9IGN2LmdldFBlcnNwZWN0aXZlVHJhbnNmb3JtKE1zLCBNZCk7XG4gICAgICAgIC8vIHNldCBuZXcgaW1hZ2Ugc2l6ZVxuICAgICAgICBjb25zdCBkc2l6ZSA9IG5ldyBjdi5TaXplKG1heFdpZHRoLCBtYXhIZWlnaHQpO1xuICAgICAgICAvLyBwZXJmb3JtIHdhcnBcbiAgICAgICAgY3Yud2FycFBlcnNwZWN0aXZlKGRzdCwgZHN0LCB0cmFuc2Zvcm1NYXRyaXgsIGRzaXplLCBjdi5JTlRFUl9MSU5FQVIsIGN2LkJPUkRFUl9DT05TVEFOVCwgbmV3IGN2LlNjYWxhcigpKTtcbiAgICAgICAgY3YuaW1zaG93KHRoaXMuZWRpdGVkSW1hZ2UsIGRzdCk7XG5cbiAgICAgICAgZHN0LmRlbGV0ZSgpOyBNcy5kZWxldGUoKTsgTWQuZGVsZXRlKCk7IHRyYW5zZm9ybU1hdHJpeC5kZWxldGUoKTtcblxuICAgICAgICB0aGlzLnNldFByZXZpZXdQYW5lRGltZW5zaW9ucyh0aGlzLmVkaXRlZEltYWdlKTtcbiAgICAgICAgdGhpcy5zaG93UHJldmlldygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KGZhbHNlKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgMzApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGFwcGxpZXMgdGhlIHNlbGVjdGVkIGZpbHRlciB0byB0aGUgaW1hZ2VcbiAgICogQHBhcmFtIHByZXZpZXcgLSB3aGVuIHRydWUsIHdpbGwgbm90IGFwcGx5IHRoZSBmaWx0ZXIgdG8gdGhlIGVkaXRlZCBpbWFnZSBidXQgb25seSBkaXNwbGF5IGEgcHJldmlldy5cbiAgICogd2hlbiBmYWxzZSwgd2lsbCBhcHBseSB0byBlZGl0ZWRJbWFnZVxuICAgKi9cbiAgcHJpdmF0ZSBhcHBseUZpbHRlcihwcmV2aWV3OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KHRydWUpO1xuICAgICAgLy8gZGVmYXVsdCBvcHRpb25zXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBibHVyOiBmYWxzZSxcbiAgICAgICAgdGg6IHRydWUsXG4gICAgICAgIHRoTW9kZTogY3YuQURBUFRJVkVfVEhSRVNIX01FQU5fQyxcbiAgICAgICAgdGhNZWFuQ29ycmVjdGlvbjogMTAsXG4gICAgICAgIHRoQmxvY2tTaXplOiAyNSxcbiAgICAgICAgdGhNYXg6IDI1NSxcbiAgICAgICAgZ3JheVNjYWxlOiB0cnVlLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGRzdCA9IGN2LmltcmVhZCh0aGlzLmVkaXRlZEltYWdlKTtcblxuICAgICAgc3dpdGNoICh0aGlzLnNlbGVjdGVkRmlsdGVyKSB7XG4gICAgICAgIGNhc2UgJ29yaWdpbmFsJzpcbiAgICAgICAgICBvcHRpb25zLnRoID0gZmFsc2U7XG4gICAgICAgICAgb3B0aW9ucy5ncmF5U2NhbGUgPSBmYWxzZTtcbiAgICAgICAgICBvcHRpb25zLmJsdXIgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWFnaWNfY29sb3InOlxuICAgICAgICAgIG9wdGlvbnMuZ3JheVNjYWxlID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2J3Mic6XG4gICAgICAgICAgb3B0aW9ucy50aE1vZGUgPSBjdi5BREFQVElWRV9USFJFU0hfR0FVU1NJQU5fQztcbiAgICAgICAgICBvcHRpb25zLnRoTWVhbkNvcnJlY3Rpb24gPSAxNTtcbiAgICAgICAgICBvcHRpb25zLnRoQmxvY2tTaXplID0gMTU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2J3Myc6XG4gICAgICAgICAgb3B0aW9ucy5ibHVyID0gdHJ1ZTtcbiAgICAgICAgICBvcHRpb25zLnRoTWVhbkNvcnJlY3Rpb24gPSAxNTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb25zLmdyYXlTY2FsZSkge1xuICAgICAgICAgIGN2LmN2dENvbG9yKGRzdCwgZHN0LCBjdi5DT0xPUl9SR0JBMkdSQVksIDApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmJsdXIpIHtcbiAgICAgICAgICBjb25zdCBrc2l6ZSA9IG5ldyBjdi5TaXplKDUsIDUpO1xuICAgICAgICAgIGN2LkdhdXNzaWFuQmx1cihkc3QsIGRzdCwga3NpemUsIDAsIDAsIGN2LkJPUkRFUl9ERUZBVUxUKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy50aCkge1xuICAgICAgICAgIGlmIChvcHRpb25zLmdyYXlTY2FsZSkge1xuICAgICAgICAgICAgY3YuYWRhcHRpdmVUaHJlc2hvbGQoZHN0LCBkc3QsIG9wdGlvbnMudGhNYXgsIG9wdGlvbnMudGhNb2RlLCBjdi5USFJFU0hfQklOQVJZLCBvcHRpb25zLnRoQmxvY2tTaXplLCBvcHRpb25zLnRoTWVhbkNvcnJlY3Rpb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkc3QuY29udmVydFRvKGRzdCwgLTEsIDEsIDYwKTtcbiAgICAgICAgICAgIGN2LnRocmVzaG9sZChkc3QsIGRzdCwgMTcwLCAyNTUsIGN2LlRIUkVTSF9CSU5BUlkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByZXZpZXcpIHtcbiAgICAgICAgICBjdi5pbXNob3codGhpcy5lZGl0ZWRJbWFnZSwgZHN0KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnNob3dQcmV2aWV3KGRzdCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KGZhbHNlKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSwgMzApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlc2l6ZSBhbiBpbWFnZSB0byBmaXQgY29uc3RyYWludHMgc2V0IGluIG9wdGlvbnMubWF4SW1hZ2VEaW1lbnNpb25zXG4gICAqL1xuICBwcml2YXRlIHJlc2l6ZShpbWFnZTogSFRNTENhbnZhc0VsZW1lbnQpOiBQcm9taXNlPEhUTUxDYW52YXNFbGVtZW50PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KHRydWUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNyYyA9IGN2LmltcmVhZChpbWFnZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREaW1lbnNpb25zID0ge1xuICAgICAgICAgIHdpZHRoOiBzcmMuc2l6ZSgpLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogc3JjLnNpemUoKS5oZWlnaHRcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzaXplRGltZW5zaW9ucyA9IHtcbiAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICBoZWlnaHQ6IDBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGN1cnJlbnREaW1lbnNpb25zLndpZHRoID4gdGhpcy5vcHRpb25zLm1heEltYWdlRGltZW5zaW9ucy53aWR0aCkge1xuICAgICAgICAgIHJlc2l6ZURpbWVuc2lvbnMud2lkdGggPSB0aGlzLm9wdGlvbnMubWF4SW1hZ2VEaW1lbnNpb25zLndpZHRoO1xuICAgICAgICAgIHJlc2l6ZURpbWVuc2lvbnMuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLm1heEltYWdlRGltZW5zaW9ucy53aWR0aCAvIGN1cnJlbnREaW1lbnNpb25zLndpZHRoICogY3VycmVudERpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICAgIGlmIChyZXNpemVEaW1lbnNpb25zLmhlaWdodCA+IHRoaXMub3B0aW9ucy5tYXhJbWFnZURpbWVuc2lvbnMuaGVpZ2h0KSB7XG4gICAgICAgICAgICByZXNpemVEaW1lbnNpb25zLmhlaWdodCA9IHRoaXMub3B0aW9ucy5tYXhJbWFnZURpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICAgICAgcmVzaXplRGltZW5zaW9ucy53aWR0aCA9IHRoaXMub3B0aW9ucy5tYXhJbWFnZURpbWVuc2lvbnMuaGVpZ2h0IC8gY3VycmVudERpbWVuc2lvbnMuaGVpZ2h0ICogY3VycmVudERpbWVuc2lvbnMud2lkdGg7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGRzaXplID0gbmV3IGN2LlNpemUoTWF0aC5mbG9vcihyZXNpemVEaW1lbnNpb25zLndpZHRoKSwgTWF0aC5mbG9vcihyZXNpemVEaW1lbnNpb25zLmhlaWdodCkpO1xuICAgICAgICAgIGN2LnJlc2l6ZShzcmMsIHNyYywgZHNpemUsIDAsIDAsIGN2LklOVEVSX0FSRUEpO1xuICAgICAgICAgIGNvbnN0IHJlc2l6ZVJlc3VsdCA9IDxIVE1MQ2FudmFzRWxlbWVudD4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgY3YuaW1zaG93KHJlc2l6ZVJlc3VsdCwgc3JjKTtcbiAgICAgICAgICBzcmMuZGVsZXRlKCk7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQoZmFsc2UpO1xuICAgICAgICAgIHJlc29sdmUocmVzaXplUmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdChmYWxzZSk7XG4gICAgICAgICAgcmVzb2x2ZShpbWFnZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDMwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkaXNwbGF5IGEgcHJldmlldyBvZiB0aGUgaW1hZ2Ugb24gdGhlIHByZXZpZXcgY2FudmFzXG4gICAqL1xuICBwcml2YXRlIHNob3dQcmV2aWV3KGltYWdlPzogYW55KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBzcmM7XG4gICAgICBpZiAoaW1hZ2UpIHtcbiAgICAgICAgc3JjID0gaW1hZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcmMgPSBjdi5pbXJlYWQodGhpcy5lZGl0ZWRJbWFnZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkc3QgPSBuZXcgY3YuTWF0KCk7XG4gICAgICBjb25zdCBkc2l6ZSA9IG5ldyBjdi5TaXplKDAsIDApO1xuICAgICAgY3YucmVzaXplKHNyYywgZHN0LCBkc2l6ZSwgdGhpcy5pbWFnZVJlc2l6ZVJhdGlvLCB0aGlzLmltYWdlUmVzaXplUmF0aW8sIGN2LklOVEVSX0FSRUEpO1xuICAgICAgY3YuaW1zaG93KHRoaXMucHJldmlld0NhbnZhcy5uYXRpdmVFbGVtZW50LCBkc3QpO1xuICAgICAgc3JjLmRlbGV0ZSgpO1xuICAgICAgZHN0LmRlbGV0ZSgpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqIC8vXG4gIC8vIFV0aWxpdHkgTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKioqKiogLy9cbiAgLyoqXG4gICAqIHNldCBwcmV2aWV3IGNhbnZhcyBkaW1lbnNpb25zIGFjY29yZGluZyB0byB0aGUgY2FudmFzIGVsZW1lbnQgb2YgdGhlIG9yaWdpbmFsIGltYWdlXG4gICAqL1xuICBwcml2YXRlIHNldFByZXZpZXdQYW5lRGltZW5zaW9ucyhpbWc6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgLy8gc2V0IHByZXZpZXcgcGFuZSBkaW1lbnNpb25zXG4gICAgdGhpcy5wcmV2aWV3RGltZW5zaW9ucyA9IHRoaXMuY2FsY3VsYXRlRGltZW5zaW9ucyhpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuICAgIHRoaXMucHJldmlld0NhbnZhcy5uYXRpdmVFbGVtZW50LndpZHRoID0gdGhpcy5wcmV2aWV3RGltZW5zaW9ucy53aWR0aDtcbiAgICB0aGlzLnByZXZpZXdDYW52YXMubmF0aXZlRWxlbWVudC5oZWlnaHQgPSB0aGlzLnByZXZpZXdEaW1lbnNpb25zLmhlaWdodDtcbiAgICB0aGlzLmltYWdlUmVzaXplUmF0aW8gPSB0aGlzLnByZXZpZXdEaW1lbnNpb25zLndpZHRoIC8gaW1nLndpZHRoO1xuICAgIHRoaXMuaW1hZ2VEaXZTdHlsZSA9IHtcbiAgICAgIHdpZHRoOiB0aGlzLnByZXZpZXdEaW1lbnNpb25zLndpZHRoICsgdGhpcy5vcHRpb25zLmNyb3BUb29sRGltZW5zaW9ucy53aWR0aCArICdweCcsXG4gICAgICBoZWlnaHQ6IHRoaXMucHJldmlld0RpbWVuc2lvbnMuaGVpZ2h0ICsgdGhpcy5vcHRpb25zLmNyb3BUb29sRGltZW5zaW9ucy5oZWlnaHQgKyAncHgnLFxuICAgICAgJ21hcmdpbi1sZWZ0JzogYGNhbGMoKDEwMCUgLSAke3RoaXMucHJldmlld0RpbWVuc2lvbnMud2lkdGggKyAxMH1weCkgLyAyICsgJHt0aGlzLm9wdGlvbnMuY3JvcFRvb2xEaW1lbnNpb25zLndpZHRoIC8gMn1weClgLFxuICAgICAgJ21hcmdpbi1yaWdodCc6IGBjYWxjKCgxMDAlIC0gJHt0aGlzLnByZXZpZXdEaW1lbnNpb25zLndpZHRoICsgMTB9cHgpIC8gMiAtICR7dGhpcy5vcHRpb25zLmNyb3BUb29sRGltZW5zaW9ucy53aWR0aCAvIDJ9cHgpYCxcbiAgICB9O1xuICAgIHRoaXMubGltaXRzU2VydmljZS5zZXRQYW5lRGltZW5zaW9ucyh7d2lkdGg6IHRoaXMucHJldmlld0RpbWVuc2lvbnMud2lkdGgsIGhlaWdodDogdGhpcy5wcmV2aWV3RGltZW5zaW9ucy5oZWlnaHR9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxjdWxhdGUgZGltZW5zaW9ucyBvZiB0aGUgcHJldmlldyBjYW52YXNcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlRGltZW5zaW9ucyh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXI7IHJhdGlvOiBudW1iZXJ9IHtcbiAgICBjb25zdCByYXRpbyA9IHdpZHRoIC8gaGVpZ2h0O1xuXG4gICAgY29uc3QgbWF4V2lkdGggPSB0aGlzLnNjcmVlbkRpbWVuc2lvbnMud2lkdGggPiB0aGlzLm1heFByZXZpZXdXaWR0aCA/XG4gICAgICB0aGlzLm1heFByZXZpZXdXaWR0aCA6IHRoaXMuc2NyZWVuRGltZW5zaW9ucy53aWR0aCAtIDQwO1xuICAgIGNvbnN0IG1heEhlaWdodCA9IHRoaXMuc2NyZWVuRGltZW5zaW9ucy5oZWlnaHQgLSAyNDA7XG4gICAgY29uc3QgY2FsY3VsYXRlZCA9IHtcbiAgICAgIHdpZHRoOiBtYXhXaWR0aCxcbiAgICAgIGhlaWdodDogTWF0aC5yb3VuZChtYXhXaWR0aCAvIHJhdGlvKSxcbiAgICAgIHJhdGlvOiByYXRpb1xuICAgIH07XG5cbiAgICBpZiAoY2FsY3VsYXRlZC5oZWlnaHQgPiBtYXhIZWlnaHQpIHtcbiAgICAgIGNhbGN1bGF0ZWQuaGVpZ2h0ID0gbWF4SGVpZ2h0O1xuICAgICAgY2FsY3VsYXRlZC53aWR0aCA9IE1hdGgucm91bmQobWF4SGVpZ2h0ICogcmF0aW8pO1xuICAgIH1cbiAgICByZXR1cm4gY2FsY3VsYXRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGEgcG9pbnQgYnkgaXQncyByb2xlc1xuICAgKiBAcGFyYW0gcm9sZXMgLSBhbiBhcnJheSBvZiByb2xlcyBieSB3aGljaCB0aGUgcG9pbnQgd2lsbCBiZSBmZXRjaGVkXG4gICAqL1xuICBwcml2YXRlIGdldFBvaW50KHJvbGVzOiBSb2xlc0FycmF5KSB7XG4gICAgcmV0dXJuIHRoaXMucG9pbnRzLmZpbmQocG9pbnQgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubGltaXRzU2VydmljZS5jb21wYXJlQXJyYXkocG9pbnQucm9sZXMsIHJvbGVzKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIGEgY2xhc3MgZm9yIGdlbmVyYXRpbmcgY29uZmlndXJhdGlvbiBvYmplY3RzIGZvciB0aGUgZWRpdG9yXG4gKi9cbmNsYXNzIEltYWdlRWRpdG9yQ29uZmlnIGltcGxlbWVudHMgRG9jU2Nhbm5lckNvbmZpZyB7XG4gIC8qKlxuICAgKiBtYXggZGltZW5zaW9ucyBvZiBvcHV0cHV0IGltYWdlLiBpZiBzZXQgdG8gemVyb1xuICAgKi9cbiAgbWF4SW1hZ2VEaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnMgPSB7XG4gICAgd2lkdGg6IDgwMCxcbiAgICBoZWlnaHQ6IDEyMDBcbiAgfTtcbiAgLyoqXG4gICAqIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIG1haW4gZWRpdG9yIGRpdlxuICAgKi9cbiAgZWRpdG9yQmFja2dyb3VuZENvbG9yID0gJyNmZWZlZmUnO1xuICAvKipcbiAgICogY3NzIHByb3BlcnRpZXMgZm9yIHRoZSBtYWluIGVkaXRvciBkaXZcbiAgICovXG4gIGVkaXRvckRpbWVuc2lvbnM6IHsgd2lkdGg6IHN0cmluZzsgaGVpZ2h0OiBzdHJpbmc7IH0gPSB7XG4gICAgd2lkdGg6ICcxMDB2dycsXG4gICAgaGVpZ2h0OiAnMTAwdmgnXG4gIH07XG4gIC8qKlxuICAgKiBjc3MgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBtYWluIGRpdiBvZiB0aGUgZWRpdG9yIGNvbXBvbmVudFxuICAgKi9cbiAgZXh0cmFDc3M6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd8bnVtYmVyfSA9IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB0b3A6IDAsXG4gICAgbGVmdDogMFxuICB9O1xuXG4gIC8qKlxuICAgKiBtYXRlcmlhbCBkZXNpZ24gdGhlbWUgY29sb3IgbmFtZVxuICAgKi9cbiAgYnV0dG9uVGhlbWVDb2xvcjogJ3ByaW1hcnknfCd3YXJuJ3wnYWNjZW50JyA9ICdhY2NlbnQnO1xuICAvKipcbiAgICogaWNvbiBmb3IgdGhlIGJ1dHRvbiB0aGF0IGNvbXBsZXRlcyB0aGUgZWRpdGluZyBhbmQgZW1pdHMgdGhlIGVkaXRlZCBpbWFnZVxuICAgKi9cbiAgZXhwb3J0SW1hZ2VJY29uID0gJ2Nsb3VkX3VwbG9hZCc7XG4gIC8qKlxuICAgKiBjb2xvciBvZiB0aGUgY3JvcCB0b29sXG4gICAqL1xuICBjcm9wVG9vbENvbG9yID0gJyMzY2FiZTInO1xuICAvKipcbiAgICogc2hhcGUgb2YgdGhlIGNyb3AgdG9vbCwgY2FuIGJlIGVpdGhlciBhIHJlY3RhbmdsZSBvciBhIGNpcmNsZVxuICAgKi9cbiAgY3JvcFRvb2xTaGFwZTogUG9pbnRTaGFwZSA9ICdyZWN0JztcbiAgLyoqXG4gICAqIGRpbWVuc2lvbnMgb2YgdGhlIGNyb3AgdG9vbFxuICAgKi9cbiAgY3JvcFRvb2xEaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnMgPSB7XG4gICAgd2lkdGg6IDEwLFxuICAgIGhlaWdodDogMTBcbiAgfTtcbiAgLyoqXG4gICAqIGFnZ3JlZ2F0aW9uIG9mIHRoZSBwcm9wZXJ0aWVzIHJlZ2FyZGluZyBwb2ludCBhdHRyaWJ1dGVzIGdlbmVyYXRlZCBieSB0aGUgY2xhc3MgY29uc3RydWN0b3JcbiAgICovXG4gIHBvaW50T3B0aW9uczogUG9pbnRPcHRpb25zO1xuICAvKipcbiAgICogYWdncmVnYXRpb24gb2YgdGhlIHByb3BlcnRpZXMgcmVnYXJkaW5nIHRoZSBlZGl0b3Igc3R5bGUgZ2VuZXJhdGVkIGJ5IHRoZSBjbGFzcyBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZWRpdG9yU3R5bGU/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfG51bWJlcn07XG4gIC8qKlxuICAgKiBjcm9wIHRvb2wgb3V0bGluZSB3aWR0aFxuICAgKi9cbiAgY3JvcFRvb2xMaW5lV2VpZ2h0ID0gMztcbiAgLyoqXG4gICAqIG1heGltdW0gc2l6ZSBvZiB0aGUgcHJldmlldyBwYW5lXG4gICAqL1xuICBtYXhQcmV2aWV3V2lkdGggPSA4MDA7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogRG9jU2Nhbm5lckNvbmZpZykge1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZWRpdG9yU3R5bGUgPSB7J2JhY2tncm91bmQtY29sb3InOiB0aGlzLmVkaXRvckJhY2tncm91bmRDb2xvciB9O1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5lZGl0b3JTdHlsZSwgdGhpcy5lZGl0b3JEaW1lbnNpb25zKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuZWRpdG9yU3R5bGUsIHRoaXMuZXh0cmFDc3MpO1xuXG4gICAgdGhpcy5wb2ludE9wdGlvbnMgPSB7XG4gICAgICBzaGFwZTogdGhpcy5jcm9wVG9vbFNoYXBlLFxuICAgICAgY29sb3I6IHRoaXMuY3JvcFRvb2xDb2xvcixcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwXG4gICAgfTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMucG9pbnRPcHRpb25zLCB0aGlzLmNyb3BUb29sRGltZW5zaW9ucyk7XG4gIH1cbn1cblxuIl19