/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LimitsService, PositionChangeData } from '../../services/limits.service';
import { MatBottomSheet } from '@angular/material';
import { NgxFilterMenuComponent } from '../filter-menu/ngx-filter-menu.component';
import { NgxOpenCvService } from '../../services/ngx-open-cv.service';
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
                action: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
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
                }); },
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
         */
        function () {
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
                this.ngxOpenCv.cvState.subscribe(function (cvState) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
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
                }); });
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var err_1, err_2;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
                        setTimeout(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.detectContours()];
                                    case 1:
                                        _a.sent();
                                        this.processing.emit(false);
                                        resolve();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 15);
                        return [2 /*return*/];
                }
            });
        }); });
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
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var imageSrc, err_3, img;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
                            _this.editedImage = (/** @type {?} */ (document.createElement('canvas')));
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
        }); });
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
            /** @type {?} */
            var src = cv.imread(_this.editedImage);
            /** @type {?} */
            var dst = new cv.Mat();
            cv.transpose(src, dst);
            cv.flip(dst, dst, 1);
            cv.imshow(_this.editedImage, dst);
            src.delete();
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
            // this.processing.emit(true);
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
            /** @type {?} */
            var src = cv.imread(_this.editedImage);
            /** @type {?} */
            var dst = new cv.Mat();
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
            var Ms = cv.matFromArray(4, 1, cv.CV_32FC2, [].concat.apply([], tslib_1.__spread(sourceCoordinates)));
            /** @type {?} */
            var Md = cv.matFromArray(4, 1, cv.CV_32FC2, [].concat.apply([], tslib_1.__spread(destCoordinates)));
            /** @type {?} */
            var transformMatrix = cv.getPerspectiveTransform(Ms, Md);
            // set new image size
            /** @type {?} */
            var dsize = new cv.Size(maxWidth, maxHeight);
            // perform warp
            cv.warpPerspective(src, dst, transformMatrix, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
            cv.imshow(_this.editedImage, dst);
            src.delete();
            dst.delete();
            Ms.delete();
            Md.delete();
            transformMatrix.delete();
            _this.setPreviewPaneDimensions(_this.editedImage);
            _this.showPreview().then(function () {
                _this.processing.emit(false);
                resolve();
            });
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
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var options, dst, ksize;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
        }); });
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
                var resizeResult = (/** @type {?} */ (document.createElement('canvas')));
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
            this.maxPreviewWidth : this.screenDimensions.width - 20;
        /** @type {?} */
        var maxHeight = this.screenDimensions.height - 200;
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
        { type: Component, args: [{
                    selector: 'ngx-doc-scanner',
                    template: "<div [ngStyle]=\"editorStyle\" fxLayoutAlign=\"space-around\">\n  <div #imageContainer [ngStyle]=\"imageDivStyle\" style=\"margin: auto;\" >\n    <ng-container *ngIf=\"imageLoaded && mode === 'crop'\">\n      <ngx-shape-outine #shapeOutline [color]=\"options.cropToolColor\" [weight]=\"options.cropToolLineWeight\" [dimensions]=\"previewDimensions\"></ngx-shape-outine>\n      <ngx-draggable-point #topLeft [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: 0, y: 0}\" [limitRoles]=\"['top', 'left']\" [container]=\"imageContainer\"></ngx-draggable-point>\n      <ngx-draggable-point #topRight [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: previewDimensions.width, y: 0}\" [limitRoles]=\"['top', 'right']\" [container]=\"imageContainer\"></ngx-draggable-point>\n      <ngx-draggable-point #bottomLeft [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: 0, y: previewDimensions.height}\" [limitRoles]=\"['bottom', 'left']\" [container]=\"imageContainer\"></ngx-draggable-point>\n      <ngx-draggable-point #bottomRight [pointOptions]=\"options.pointOptions\" [startPosition]=\"{x: previewDimensions.width, y: previewDimensions.height}\" [limitRoles]=\"['bottom', 'right']\" [container]=\"imageContainer\"></ngx-draggable-point>\n    </ng-container>\n    <canvas #PreviewCanvas [ngStyle]=\"{'max-width': options.maxPreviewWidth}\" style=\"z-index: 5\" ></canvas>\n  </div>\n  <div class=\"editor-actions\" fxLayout=\"row\" fxLayoutAlign=\"space-around\" style=\"position: absolute; bottom: 0; width: 100vw\">\n    <ng-container *ngFor=\"let button of displayedButtons\" [ngSwitch]=\"button.type\">\n      <button mat-mini-fab *ngSwitchCase=\"'fab'\" [name]=\"button.name\" (click)=\"button.action()\" [color]=\"options.buttonThemeColor\">\n        <mat-icon>{{button.icon}}</mat-icon>\n      </button>\n      <button mat-raised-button *ngSwitchCase=\"'button'\" [name]=\"button.name\" (click)=\"button.action()\" [color]=\"options.buttonThemeColor\">\n        <mat-icon>{{button.icon}}</mat-icon>\n        <span>{{button.text}}}</span>\n      </button>\n    </ng-container>\n  </div>\n</div>\n\n\n",
                    styles: [".editor-actions{padding:12px}.editor-actions button{margin:5px}"]
                }] }
    ];
    /** @nocollapse */
    NgxDocScannerComponent.ctorParameters = function () { return [
        { type: NgxOpenCvService },
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
        this.editorBackgroundColor = 'dimgrey';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRvYy1zY2FubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kb2N1bWVudC1zY2FubmVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaW1hZ2UtZWRpdG9yL25neC1kb2Mtc2Nhbm5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWtCLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBQyxhQUFhLEVBQXVCLGtCQUFrQixFQUFhLE1BQU0sK0JBQStCLENBQUM7QUFDakgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBRWhGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBTXBFO0lBOE1FLGdDQUFvQixTQUEyQixFQUFVLGFBQTRCLEVBQVUsV0FBMkI7UUFBMUgsaUJBdUJDO1FBdkJtQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWdCOzs7Ozs7O1FBOUxsSCxrQkFBYSxHQUE4QjtZQUNqRDtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUU7b0JBQ04sS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLElBQUksRUFBRSxLQUFLO2dCQUNYLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNu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QyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsWUFBWSxHQUFHO1lBQ2xCLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYTtZQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDekIsS0FBSyxFQUFFLENBQUM7WUFDUixNQUFNLEVBQUUsQ0FBQztTQUNWLENBQUM7UUFDRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQXZGRCxJQXVGQzs7Ozs7O0lBbkZDLCtDQUdFOzs7OztJQUlGLGtEQUFrQzs7Ozs7SUFJbEMsNkNBR0U7Ozs7O0lBSUYscUNBSUU7Ozs7O0lBS0YsNkNBQXVEOzs7OztJQUl2RCw0Q0FBaUM7Ozs7O0lBSWpDLDBDQUEwQjs7Ozs7SUFJMUIsMENBQW1DOzs7OztJQUluQywrQ0FHRTs7Ozs7SUFJRix5Q0FBMkI7Ozs7O0lBSTNCLHdDQUE2Qzs7Ozs7SUFJN0MsK0NBQXVCOzs7OztJQUl2Qiw0Q0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3Rpb25Ub2tlbiwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMaW1pdHNTZXJ2aWNlLCBQb2ludFBvc2l0aW9uQ2hhbmdlLCBQb3NpdGlvbkNoYW5nZURhdGEsIFJvbGVzQXJyYXl9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xpbWl0cy5zZXJ2aWNlJztcbmltcG9ydCB7TWF0Qm90dG9tU2hlZXR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7Tmd4RmlsdGVyTWVudUNvbXBvbmVudH0gZnJvbSAnLi4vZmlsdGVyLW1lbnUvbmd4LWZpbHRlci1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQge1BvaW50U2hhcGV9IGZyb20gJy4uLy4uL1ByaXZhdGVNb2RlbHMnO1xuaW1wb3J0IHtOZ3hPcGVuQ3ZTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9uZ3gtb3Blbi1jdi5zZXJ2aWNlJztcbmltcG9ydCB7SW1hZ2VEaW1lbnNpb25zLCBEb2NTY2FubmVyQ29uZmlnLCBPcGVuQ3ZDb25maWcsIE9wZW5DdlN0YXRlfSBmcm9tICcuLi8uLi9QdWJsaWNNb2RlbHMnO1xuaW1wb3J0IHtFZGl0b3JBY3Rpb25CdXR0b24sIFBvaW50T3B0aW9uc30gZnJvbSAnLi4vLi4vUHJpdmF0ZU1vZGVscyc7XG5cbmRlY2xhcmUgdmFyIGN2OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1kb2Mtc2Nhbm5lcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZG9jLXNjYW5uZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZG9jLXNjYW5uZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hEb2NTY2FubmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqXG4gICAqIGVkaXRvciBjb25maWcgb2JqZWN0XG4gICAqL1xuICBvcHRpb25zOiBJbWFnZUVkaXRvckNvbmZpZztcbiAgLy8gKioqKioqKioqKioqKiAvL1xuICAvLyBFRElUT1IgQ09ORklHIC8vXG4gIC8vICoqKioqKioqKioqKiogLy9cbiAgLyoqXG4gICAqIGFuIGFycmF5IG9mIGFjdGlvbiBidXR0b25zIGRpc3BsYXllZCBvbiB0aGUgZWRpdG9yIHNjcmVlblxuICAgKi9cbiAgcHJpdmF0ZSBlZGl0b3JCdXR0b25zOiBBcnJheTxFZGl0b3JBY3Rpb25CdXR0b24+ID0gW1xuICAgIHtcbiAgICAgIG5hbWU6ICdleGl0JyxcbiAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICB0aGlzLmV4aXRFZGl0b3IuZW1pdCgnY2FuY2VsZWQnKTtcbiAgICAgIH0sXG4gICAgICBpY29uOiAnYXJyb3dfYmFjaycsXG4gICAgICB0eXBlOiAnZmFiJyxcbiAgICAgIG1vZGU6ICdjcm9wJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3JvdGF0ZScsXG4gICAgICBhY3Rpb246IHRoaXMucm90YXRlSW1hZ2UuYmluZCh0aGlzKSxcbiAgICAgIGljb246ICdyb3RhdGVfcmlnaHQnLFxuICAgICAgdHlwZTogJ2ZhYicsXG4gICAgICBtb2RlOiAnY3JvcCdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdkb25lX2Nyb3AnLFxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRoaXMubW9kZSA9ICdjb2xvcic7XG4gICAgICAgIGF3YWl0IHRoaXMudHJhbnNmb3JtKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuYXBwbHlGaWx0ZXIodHJ1ZSk7XG4gICAgICB9LFxuICAgICAgaWNvbjogJ2RvbmUnLFxuICAgICAgdHlwZTogJ2ZhYicsXG4gICAgICBtb2RlOiAnY3JvcCdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdiYWNrJyxcbiAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICB0aGlzLm1vZGUgPSAnY3JvcCc7XG4gICAgICAgIHRoaXMubG9hZEZpbGUodGhpcy5vcmlnaW5hbEltYWdlKTtcbiAgICAgIH0sXG4gICAgICBpY29uOiAnYXJyb3dfYmFjaycsXG4gICAgICB0eXBlOiAnZmFiJyxcbiAgICAgIG1vZGU6ICdjb2xvcidcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdmaWx0ZXInLFxuICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNob29zZUZpbHRlcnMoKTtcbiAgICAgIH0sXG4gICAgICBpY29uOiAncGhvdG9fZmlsdGVyJyxcbiAgICAgIHR5cGU6ICdmYWInLFxuICAgICAgbW9kZTogJ2NvbG9yJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3VwbG9hZCcsXG4gICAgICBhY3Rpb246IHRoaXMuZXhwb3J0SW1hZ2UuYmluZCh0aGlzKSxcbiAgICAgIGljb246ICdjbG91ZF91cGxvYWQnLFxuICAgICAgdHlwZTogJ2ZhYicsXG4gICAgICBtb2RlOiAnY29sb3InXG4gICAgfSxcbiAgXTtcbiAgLyoqXG4gICAqIHJldHVybnMgYW4gYXJyYXkgb2YgYnV0dG9ucyBhY2NvcmRpbmcgdG8gdGhlIGVkaXRvciBtb2RlXG4gICAqL1xuICBnZXQgZGlzcGxheWVkQnV0dG9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5lZGl0b3JCdXR0b25zLmZpbHRlcihidXR0b24gPT4ge1xuICAgICAgcmV0dXJuIGJ1dHRvbi5tb2RlID09PSB0aGlzLm1vZGU7XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIG1heCB3aWR0aCBvZiB0aGUgcHJldmlldyBhcmVhXG4gICAqL1xuICBwcml2YXRlIG1heFByZXZpZXdXaWR0aDogbnVtYmVyO1xuICAvKipcbiAgICogZGltZW5zaW9ucyBvZiB0aGUgaW1hZ2UgY29udGFpbmVyXG4gICAqL1xuICBpbWFnZURpdlN0eWxlOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfG51bWJlcn07XG4gIC8qKlxuICAgKiBlZGl0b3IgZGl2IHN0eWxlXG4gICAqL1xuICBlZGl0b3JTdHlsZToge1trZXk6IHN0cmluZ106IHN0cmluZ3xudW1iZXJ9O1xuXG4gIC8vICoqKioqKioqKioqKiogLy9cbiAgLy8gRURJVE9SIFNUQVRFIC8vXG4gIC8vICoqKioqKioqKioqKiogLy9cbiAgLyoqXG4gICAqIHN0YXRlIG9mIG9wZW5jdiBsb2FkaW5nXG4gICAqL1xuICBwcml2YXRlIGN2U3RhdGU6IHN0cmluZztcbiAgLyoqXG4gICAqIHRydWUgYWZ0ZXIgdGhlIGltYWdlIGlzIGxvYWRlZCBhbmQgcHJldmlldyBpcyBkaXNwbGF5ZWRcbiAgICovXG4gIGltYWdlTG9hZGVkID0gZmFsc2U7XG4gIC8qKlxuICAgKiBlZGl0b3IgbW9kZVxuICAgKi9cbiAgbW9kZTogJ2Nyb3AnfCdjb2xvcicgPSAnY3JvcCc7XG4gIC8qKlxuICAgKiBmaWx0ZXIgc2VsZWN0ZWQgYnkgdGhlIHVzZXIsIHJldHVybmVkIGJ5IHRoZSBmaWx0ZXIgc2VsZWN0b3IgYm90dG9tIHNoZWV0XG4gICAqL1xuICBwcml2YXRlIHNlbGVjdGVkRmlsdGVyID0gJ2RlZmF1bHQnO1xuXG4gIC8vICoqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gT1BFUkFUSU9OIFZBUklBQkxFUyAvL1xuICAvLyAqKioqKioqKioqKioqKioqKioqIC8vXG4gIC8qKlxuICAgKiB2aWV3cG9ydCBkaW1lbnNpb25zXG4gICAqL1xuICBwcml2YXRlIHNjcmVlbkRpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucztcbiAgLyoqXG4gICAqIGltYWdlIGRpbWVuc2lvbnNcbiAgICovXG4gIHByaXZhdGUgaW1hZ2VEaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnMgPSB7XG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwXG4gIH07XG4gIC8qKlxuICAgKiBkaW1lbnNpb25zIG9mIHRoZSBwcmV2aWV3IHBhbmVcbiAgICovXG4gIHByZXZpZXdEaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnM7XG4gIC8qKlxuICAgKiByYXRpb24gYmV0d2VlbiBwcmV2aWV3IGltYWdlIGFuZCBvcmlnaW5hbFxuICAgKi9cbiAgcHJpdmF0ZSBpbWFnZVJlc2l6ZVJhdGlvOiBudW1iZXI7XG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIG9yaWdpbmFsIGltYWdlIGZvciByZXNldCBwdXJwb3Nlc1xuICAgKi9cbiAgcHJpdmF0ZSBvcmlnaW5hbEltYWdlOiBGaWxlO1xuICAvKipcbiAgICogc3RvcmVzIHRoZSBlZGl0ZWQgaW1hZ2VcbiAgICovXG4gIHByaXZhdGUgZWRpdGVkSW1hZ2U6IEhUTUxDYW52YXNFbGVtZW50O1xuICAvKipcbiAgICogc3RvcmVzIHRoZSBwcmV2aWV3IGltYWdlIGFzIGNhbnZhc1xuICAgKi9cbiAgQFZpZXdDaGlsZCgnUHJldmlld0NhbnZhcycsIHtyZWFkOiBFbGVtZW50UmVmfSkgcHJpdmF0ZSBwcmV2aWV3Q2FudmFzOiBFbGVtZW50UmVmO1xuICAvKipcbiAgICogYW4gYXJyYXkgb2YgcG9pbnRzIHVzZWQgYnkgdGhlIGNyb3AgdG9vbFxuICAgKi9cbiAgcHJpdmF0ZSBwb2ludHM6IEFycmF5PFBvaW50UG9zaXRpb25DaGFuZ2U+O1xuXG4gIC8vICoqKioqKioqKioqKioqIC8vXG4gIC8vIEVWRU5UIEVNSVRURVJTIC8vXG4gIC8vICoqKioqKioqKioqKioqIC8vXG4gIC8qKlxuICAgKiBvcHRpb25hbCBiaW5kaW5nIHRvIHRoZSBleGl0IGJ1dHRvbiBvZiB0aGUgZWRpdG9yXG4gICAqL1xuICBAT3V0cHV0KCkgZXhpdEVkaXRvcjogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgLyoqXG4gICAqIGZpcmVzIG9uIGVkaXQgY29tcGxldGlvblxuICAgKi9cbiAgQE91dHB1dCgpIGVkaXRSZXN1bHQ6IEV2ZW50RW1pdHRlcjxCbG9iPiA9IG5ldyBFdmVudEVtaXR0ZXI8QmxvYj4oKTtcbiAgLyoqXG4gICAqIGVtaXRzIGVycm9ycywgY2FuIGJlIGxpbmtlZCB0byBhbiBlcnJvciBoYW5kbGVyIG9mIGNob2ljZVxuICAgKi9cbiAgQE91dHB1dCgpIGVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvKipcbiAgICogZW1pdHMgdGhlIGxvYWRpbmcgc3RhdHVzIG9mIHRoZSBjdiBtb2R1bGUuXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZHk6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgLyoqXG4gICAqIGVtaXRzIHRydWUgd2hlbiBwcm9jZXNzaW5nIGlzIGRvbmUsIGZhbHNlIHdoZW4gY29tcGxldGVkXG4gICAqL1xuICBAT3V0cHV0KCkgcHJvY2Vzc2luZzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8vICoqKioqKiAvL1xuICAvLyBJTlBVVFMgLy9cbiAgLy8gKioqKioqIC8vXG4gIC8qKlxuICAgKiBzZXQgaW1hZ2UgZm9yIGVkaXRpbmdcbiAgICogQHBhcmFtIGZpbGUgLSBmaWxlIGZyb20gZm9ybSBpbnB1dFxuICAgKi9cbiAgQElucHV0KCkgc2V0IGZpbGUoZmlsZTogRmlsZSkge1xuICAgIGlmIChmaWxlKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQodHJ1ZSk7XG4gICAgICB9LCA1KTtcbiAgICAgIHRoaXMuaW1hZ2VMb2FkZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMub3JpZ2luYWxJbWFnZSA9IGZpbGU7XG4gICAgICB0aGlzLm5neE9wZW5Ddi5jdlN0YXRlLnN1YnNjcmliZShcbiAgICAgICAgYXN5bmMgKGN2U3RhdGU6IE9wZW5DdlN0YXRlKSA9PiB7XG4gICAgICAgICAgaWYgKGN2U3RhdGUucmVhZHkpIHtcbiAgICAgICAgICAgIC8vIHJlYWQgZmlsZSB0byBpbWFnZSAmIGNhbnZhc1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkRmlsZShmaWxlKTtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBlZGl0b3IgY29uZmlndXJhdGlvbiBvYmplY3RcbiAgICovXG4gIEBJbnB1dCgpIGNvbmZpZzogRG9jU2Nhbm5lckNvbmZpZztcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmd4T3BlbkN2OiBOZ3hPcGVuQ3ZTZXJ2aWNlLCBwcml2YXRlIGxpbWl0c1NlcnZpY2U6IExpbWl0c1NlcnZpY2UsIHByaXZhdGUgYm90dG9tU2hlZXQ6IE1hdEJvdHRvbVNoZWV0KSB7XG4gICAgdGhpcy5zY3JlZW5EaW1lbnNpb25zID0ge1xuICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICB9O1xuXG4gICAgLy8gc3Vic2NyaWJlIHRvIHN0YXR1cyBvZiBjdiBtb2R1bGVcbiAgICB0aGlzLm5neE9wZW5Ddi5jdlN0YXRlLnN1YnNjcmliZSgoY3ZTdGF0ZTogT3BlbkN2U3RhdGUpID0+IHtcbiAgICAgIHRoaXMuY3ZTdGF0ZSA9IGN2U3RhdGUuc3RhdGU7XG4gICAgICB0aGlzLnJlYWR5LmVtaXQoY3ZTdGF0ZS5yZWFkeSk7XG4gICAgICBpZiAoY3ZTdGF0ZS5lcnJvcikge1xuICAgICAgICB0aGlzLmVycm9yLmVtaXQobmV3IEVycm9yKCdlcnJvciBsb2FkaW5nIGN2JykpO1xuICAgICAgfSBlbHNlIGlmIChjdlN0YXRlLmxvYWRpbmcpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQodHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGN2U3RhdGUucmVhZHkpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQoZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gc3Vic2NyaWJlIHRvIHBvc2l0aW9ucyBvZiBjcm9wIHRvb2xcbiAgICB0aGlzLmxpbWl0c1NlcnZpY2UucG9zaXRpb25zLnN1YnNjcmliZShwb2ludHMgPT4ge1xuICAgICAgdGhpcy5wb2ludHMgPSBwb2ludHM7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBzZXQgb3B0aW9ucyBmcm9tIGNvbmZpZyBvYmplY3RcbiAgICB0aGlzLm9wdGlvbnMgPSBuZXcgSW1hZ2VFZGl0b3JDb25maWcodGhpcy5jb25maWcpO1xuICAgIC8vIHNldCBleHBvcnQgaW1hZ2UgaWNvblxuICAgIHRoaXMuZWRpdG9yQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBpZiAoYnV0dG9uLm5hbWUgPT09ICd1cGxvYWQnKSB7XG4gICAgICAgIGJ1dHRvbi5pY29uID0gdGhpcy5vcHRpb25zLmV4cG9ydEltYWdlSWNvbjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm1heFByZXZpZXdXaWR0aCA9IHRoaXMub3B0aW9ucy5tYXhQcmV2aWV3V2lkdGg7XG4gICAgdGhpcy5lZGl0b3JTdHlsZSA9IHRoaXMub3B0aW9ucy5lZGl0b3JTdHlsZTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqIC8vXG4gIC8vIGVkaXRvciBhY3Rpb24gYnV0dG9ucyBtZXRob2RzIC8vXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqIC8vXG5cbiAgLyoqXG4gICAqIGVtaXRzIHRoZSBleGl0RWRpdG9yIGV2ZW50XG4gICAqL1xuICBleGl0KCkge1xuICAgIHRoaXMuZXhpdEVkaXRvci5lbWl0KCdjYW5jZWxlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFwcGxpZXMgdGhlIHNlbGVjdGVkIGZpbHRlciwgYW5kIHdoZW4gZG9uZSBlbWl0cyB0aGUgcmVzdWx0ZWQgaW1hZ2VcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZXhwb3J0SW1hZ2UoKSB7XG4gICAgYXdhaXQgdGhpcy5hcHBseUZpbHRlcihmYWxzZSk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5tYXhJbWFnZURpbWVuc2lvbnMpIHtcbiAgICAgIHRoaXMucmVzaXplKClcbiAgICAgICAgLnRoZW4ocmVzaXplUmVzdWx0ID0+IHtcbiAgICAgICAgICByZXNpemVSZXN1bHQudG9CbG9iKChibG9iKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVkaXRSZXN1bHQuZW1pdChibG9iKTtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KGZhbHNlKTtcbiAgICAgICAgICB9LCB0aGlzLm9yaWdpbmFsSW1hZ2UudHlwZSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVkaXRlZEltYWdlLnRvQmxvYigoYmxvYikgPT4ge1xuICAgICAgICB0aGlzLmVkaXRSZXN1bHQuZW1pdChibG9iKTtcbiAgICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQoZmFsc2UpO1xuICAgICAgfSwgdGhpcy5vcmlnaW5hbEltYWdlLnR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBvcGVuIHRoZSBib3R0b20gc2hlZXQgZm9yIHNlbGVjdGluZyBmaWx0ZXJzLCBhbmQgYXBwbGllcyB0aGUgc2VsZWN0ZWQgZmlsdGVyIGluIHByZXZpZXcgbW9kZVxuICAgKi9cbiAgcHJpdmF0ZSBjaG9vc2VGaWx0ZXJzKCkge1xuICAgIGNvbnN0IGRhdGEgPSB7IGZpbHRlcjogdGhpcy5zZWxlY3RlZEZpbHRlciB9O1xuICAgIGNvbnN0IGJvdHRvbVNoZWV0UmVmID0gdGhpcy5ib3R0b21TaGVldC5vcGVuKE5neEZpbHRlck1lbnVDb21wb25lbnQsIHtcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KTtcbiAgICBib3R0b21TaGVldFJlZi5hZnRlckRpc21pc3NlZCgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGVkRmlsdGVyID0gZGF0YS5maWx0ZXI7XG4gICAgICB0aGlzLmFwcGx5RmlsdGVyKHRydWUpO1xuICAgIH0pO1xuXG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gRmlsZSBJbnB1dCAmIE91dHB1dCBNZXRob2RzIC8vXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKiAvL1xuICAvKipcbiAgICogbG9hZCBpbWFnZSBmcm9tIGlucHV0IGZpZWxkXG4gICAqL1xuICBwcml2YXRlIGxvYWRGaWxlKGZpbGU6IEZpbGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQodHJ1ZSk7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLnJlYWRJbWFnZShmaWxlKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHRoaXMuZXJyb3IuZW1pdChuZXcgRXJyb3IoZXJyKSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLnNob3dQcmV2aWV3KCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB0aGlzLmVycm9yLmVtaXQobmV3IEVycm9yKGVycikpO1xuICAgICAgfVxuICAgICAgLy8gc2V0IHBhbmUgbGltaXRzXG4gICAgICAvLyBzaG93IHBvaW50c1xuICAgICAgdGhpcy5pbWFnZUxvYWRlZCA9IHRydWU7XG4gICAgICBhd2FpdCB0aGlzLmxpbWl0c1NlcnZpY2Uuc2V0UGFuZURpbWVuc2lvbnMoe3dpZHRoOiB0aGlzLnByZXZpZXdEaW1lbnNpb25zLndpZHRoLCBoZWlnaHQ6IHRoaXMucHJldmlld0RpbWVuc2lvbnMuaGVpZ2h0fSk7XG4gICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5kZXRlY3RDb250b3VycygpO1xuICAgICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdChmYWxzZSk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0sIDE1KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZWFkIGltYWdlIGZyb20gRmlsZSBvYmplY3RcbiAgICovXG4gIHByaXZhdGUgcmVhZEltYWdlKGZpbGU6IEZpbGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IGltYWdlU3JjO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaW1hZ2VTcmMgPSBhd2FpdCByZWFkRmlsZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAvLyBzZXQgZWRpdGVkIGltYWdlIGNhbnZhcyBhbmQgZGltZW5zaW9uc1xuICAgICAgICB0aGlzLmVkaXRlZEltYWdlID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5lZGl0ZWRJbWFnZS53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgICAgdGhpcy5lZGl0ZWRJbWFnZS5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICB0aGlzLmltYWdlRGltZW5zaW9ucy53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgICAgdGhpcy5pbWFnZURpbWVuc2lvbnMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5lZGl0ZWRJbWFnZS5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgICAgIHRoaXMuc2V0UHJldmlld1BhbmVEaW1lbnNpb25zKHRoaXMuZWRpdGVkSW1hZ2UpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9O1xuICAgICAgaW1nLnNyYyA9IGltYWdlU3JjO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogcmVhZCBmaWxlIGZyb20gaW5wdXQgZmllbGRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZWFkRmlsZSgpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIub25lcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKiogLy9cbiAgLy8gSW1hZ2UgUHJvY2Vzc2luZyBNZXRob2RzIC8vXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKiAvL1xuICAvKipcbiAgICogcm90YXRlIGltYWdlIDkwIGRlZ3JlZXNcbiAgICovXG4gIHByaXZhdGUgcm90YXRlSW1hZ2UoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucHJvY2Vzc2luZy5lbWl0KHRydWUpO1xuICAgICAgY29uc3Qgc3JjID0gY3YuaW1yZWFkKHRoaXMuZWRpdGVkSW1hZ2UpO1xuICAgICAgY29uc3QgZHN0ID0gbmV3IGN2Lk1hdCgpO1xuICAgICAgY3YudHJhbnNwb3NlKHNyYywgZHN0KTtcbiAgICAgIGN2LmZsaXAoZHN0LCBkc3QsIDEpO1xuICAgICAgY3YuaW1zaG93KHRoaXMuZWRpdGVkSW1hZ2UsIGRzdCk7XG4gICAgICBzcmMuZGVsZXRlKCk7IGRzdC5kZWxldGUoKTtcbiAgICAgIC8vIHNhdmUgY3VycmVudCBwcmV2aWV3IGRpbWVuc2lvbnMgYW5kIHBvc2l0aW9uc1xuICAgICAgY29uc3QgaW5pdGlhbFByZXZpZXdEaW1lbnNpb25zID0ge3dpZHRoOiAwLCBoZWlnaHQ6IDB9O1xuICAgICAgT2JqZWN0LmFzc2lnbihpbml0aWFsUHJldmlld0RpbWVuc2lvbnMsIHRoaXMucHJldmlld0RpbWVuc2lvbnMpO1xuICAgICAgY29uc3QgaW5pdGlhbFBvc2l0aW9ucyA9IEFycmF5LmZyb20odGhpcy5wb2ludHMpO1xuICAgICAgLy8gZ2V0IG5ldyBkaW1lbnNpb25zXG4gICAgICAvLyBzZXQgbmV3IHByZXZpZXcgcGFuZSBkaW1lbnNpb25zXG4gICAgICB0aGlzLnNldFByZXZpZXdQYW5lRGltZW5zaW9ucyh0aGlzLmVkaXRlZEltYWdlKTtcbiAgICAgIC8vIGdldCBwcmV2aWV3IHBhbmUgcmVzaXplIHJhdGlvXG4gICAgICBjb25zdCBwcmV2aWV3UmVzaXplUmF0aW9zID0ge1xuICAgICAgICB3aWR0aDogdGhpcy5wcmV2aWV3RGltZW5zaW9ucy53aWR0aCAvIGluaXRpYWxQcmV2aWV3RGltZW5zaW9ucy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnByZXZpZXdEaW1lbnNpb25zLmhlaWdodCAvIGluaXRpYWxQcmV2aWV3RGltZW5zaW9ucy5oZWlnaHRcbiAgICAgIH07XG4gICAgICAvLyBzZXQgbmV3IHByZXZpZXcgcGFuZSBkaW1lbnNpb25zXG5cbiAgICAgIHRoaXMubGltaXRzU2VydmljZS5yb3RhdGVDbG9ja3dpc2UocHJldmlld1Jlc2l6ZVJhdGlvcywgaW5pdGlhbFByZXZpZXdEaW1lbnNpb25zLCBpbml0aWFsUG9zaXRpb25zKTtcbiAgICAgIHRoaXMuc2hvd1ByZXZpZXcoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQoZmFsc2UpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuXG4gIH1cblxuICAvKipcbiAgICogZGV0ZWN0cyB0aGUgY29udG91cnMgb2YgdGhlIGRvY3VtZW50IGFuZFxuICAgKiovXG4gIHByaXZhdGUgZGV0ZWN0Q29udG91cnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIHRoaXMucHJvY2Vzc2luZy5lbWl0KHRydWUpO1xuICAgICAgLy8gbG9hZCB0aGUgaW1hZ2UgYW5kIGNvbXB1dGUgdGhlIHJhdGlvIG9mIHRoZSBvbGQgaGVpZ2h0IHRvIHRoZSBuZXcgaGVpZ2h0LCBjbG9uZSBpdCwgYW5kIHJlc2l6ZSBpdFxuICAgICAgY29uc3QgcHJvY2Vzc2luZ1Jlc2l6ZVJhdGlvID0gMC41O1xuICAgICAgY29uc3QgZHN0ID0gY3YuaW1yZWFkKHRoaXMuZWRpdGVkSW1hZ2UpO1xuICAgICAgY29uc3QgZHNpemUgPSBuZXcgY3YuU2l6ZShkc3Qucm93cyAqIHByb2Nlc3NpbmdSZXNpemVSYXRpbywgZHN0LmNvbHMgKiBwcm9jZXNzaW5nUmVzaXplUmF0aW8pO1xuICAgICAgY29uc3Qga3NpemUgPSBuZXcgY3YuU2l6ZSg1LCA1KTtcbiAgICAgIC8vIGNvbnZlcnQgdGhlIGltYWdlIHRvIGdyYXlzY2FsZSwgYmx1ciBpdCwgYW5kIGZpbmQgZWRnZXMgaW4gdGhlIGltYWdlXG4gICAgICBjdi5jdnRDb2xvcihkc3QsIGRzdCwgY3YuQ09MT1JfUkdCQTJHUkFZLCAwKTtcbiAgICAgIGN2LkdhdXNzaWFuQmx1cihkc3QsIGRzdCwga3NpemUsIDAsIDAsIGN2LkJPUkRFUl9ERUZBVUxUKTtcbiAgICAgIGN2LkNhbm55KGRzdCwgZHN0LCA3NSwgMjAwKTtcbiAgICAgIC8vIGZpbmQgY29udG91cnNcbiAgICAgIGN2LnRocmVzaG9sZChkc3QsIGRzdCwgMTIwLCAyMDAsIGN2LlRIUkVTSF9CSU5BUlkpO1xuICAgICAgY29uc3QgY29udG91cnMgPSBuZXcgY3YuTWF0VmVjdG9yKCk7XG4gICAgICBjb25zdCBoaWVyYXJjaHkgPSBuZXcgY3YuTWF0KCk7XG4gICAgICBjdi5maW5kQ29udG91cnMoZHN0LCBjb250b3VycywgaGllcmFyY2h5LCBjdi5SRVRSX0NDT01QLCBjdi5DSEFJTl9BUFBST1hfU0lNUExFKTtcbiAgICAgIGNvbnN0IHJlY3QgPSBjdi5ib3VuZGluZ1JlY3QoZHN0KTtcbiAgICAgIGRzdC5kZWxldGUoKTsgaGllcmFyY2h5LmRlbGV0ZSgpOyBjb250b3Vycy5kZWxldGUoKTtcbiAgICAgIC8vIHRyYW5zZm9ybSB0aGUgcmVjdGFuZ2xlIGludG8gYSBzZXQgb2YgcG9pbnRzXG4gICAgICBPYmplY3Qua2V5cyhyZWN0KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIHJlY3Rba2V5XSA9IHJlY3Rba2V5XSAgKiB0aGlzLmltYWdlUmVzaXplUmF0aW87XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY29udG91ckNvb3JkaW5hdGVzID0gW1xuICAgICAgICBuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHt4OiByZWN0LngsIHk6IHJlY3QueX0sIFsnbGVmdCcsICd0b3AnXSksXG4gICAgICAgIG5ldyBQb3NpdGlvbkNoYW5nZURhdGEoe3g6IHJlY3QueCArIHJlY3Qud2lkdGgsIHk6IHJlY3QueX0sIFsncmlnaHQnLCAndG9wJ10pLFxuICAgICAgICBuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHt4OiByZWN0LnggKyByZWN0LndpZHRoLCB5OiByZWN0LnkgKyByZWN0LmhlaWdodH0sIFsncmlnaHQnLCAnYm90dG9tJ10pLFxuICAgICAgICBuZXcgUG9zaXRpb25DaGFuZ2VEYXRhKHt4OiByZWN0LngsIHk6IHJlY3QueSArIHJlY3QuaGVpZ2h0fSwgWydsZWZ0JywgJ2JvdHRvbSddKSxcbiAgICAgIF07XG5cbiAgICAgIHRoaXMubGltaXRzU2VydmljZS5yZXBvc2l0aW9uUG9pbnRzKGNvbnRvdXJDb29yZGluYXRlcyk7XG4gICAgICAvLyB0aGlzLnByb2Nlc3NpbmcuZW1pdChmYWxzZSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogYXBwbHkgcGVyc3BlY3RpdmUgdHJhbnNmb3JtXG4gICAqL1xuICBwcml2YXRlIHRyYW5zZm9ybSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQodHJ1ZSk7XG4gICAgICBjb25zdCBzcmMgPSBjdi5pbXJlYWQodGhpcy5lZGl0ZWRJbWFnZSk7XG4gICAgICBjb25zdCBkc3QgPSBuZXcgY3YuTWF0KCk7XG5cbiAgICAgIC8vIGNyZWF0ZSBzb3VyY2UgY29vcmRpbmF0ZXMgbWF0cml4XG4gICAgICBjb25zdCBzb3VyY2VDb29yZGluYXRlcyA9IFtcbiAgICAgICAgdGhpcy5nZXRQb2ludChbJ3RvcCcsICdsZWZ0J10pLFxuICAgICAgICB0aGlzLmdldFBvaW50KFsndG9wJywgJ3JpZ2h0J10pLFxuICAgICAgICB0aGlzLmdldFBvaW50KFsnYm90dG9tJywgJ3JpZ2h0J10pLFxuICAgICAgICB0aGlzLmdldFBvaW50KFsnYm90dG9tJywgJ2xlZnQnXSlcbiAgICAgIF0ubWFwKHBvaW50ID0+IHtcbiAgICAgICAgcmV0dXJuIFtwb2ludC54IC8gdGhpcy5pbWFnZVJlc2l6ZVJhdGlvLCBwb2ludC55IC8gdGhpcy5pbWFnZVJlc2l6ZVJhdGlvXTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBnZXQgbWF4IHdpZHRoXG4gICAgICBjb25zdCBib3R0b21XaWR0aCA9IHRoaXMuZ2V0UG9pbnQoWydib3R0b20nLCAncmlnaHQnXSkueCAtIHRoaXMuZ2V0UG9pbnQoWydib3R0b20nLCAnbGVmdCddKS54O1xuICAgICAgY29uc3QgdG9wV2lkdGggPSB0aGlzLmdldFBvaW50KFsndG9wJywgJ3JpZ2h0J10pLnggLSB0aGlzLmdldFBvaW50KFsndG9wJywgJ2xlZnQnXSkueDtcbiAgICAgIGNvbnN0IG1heFdpZHRoID0gTWF0aC5tYXgoYm90dG9tV2lkdGgsIHRvcFdpZHRoKSAvIHRoaXMuaW1hZ2VSZXNpemVSYXRpbztcbiAgICAgIC8vIGdldCBtYXggaGVpZ2h0XG4gICAgICBjb25zdCBsZWZ0SGVpZ2h0ID0gdGhpcy5nZXRQb2ludChbJ2JvdHRvbScsICdsZWZ0J10pLnkgLSB0aGlzLmdldFBvaW50KFsndG9wJywgJ2xlZnQnXSkueTtcbiAgICAgIGNvbnN0IHJpZ2h0SGVpZ2h0ID0gdGhpcy5nZXRQb2ludChbJ2JvdHRvbScsICdyaWdodCddKS55IC0gdGhpcy5nZXRQb2ludChbJ3RvcCcsICdyaWdodCddKS55O1xuICAgICAgY29uc3QgbWF4SGVpZ2h0ID0gTWF0aC5tYXgobGVmdEhlaWdodCwgcmlnaHRIZWlnaHQpIC8gdGhpcy5pbWFnZVJlc2l6ZVJhdGlvO1xuICAgICAgLy8gY3JlYXRlIGRlc3QgY29vcmRpbmF0ZXMgbWF0cml4XG4gICAgICBjb25zdCBkZXN0Q29vcmRpbmF0ZXMgPSBbXG4gICAgICAgIFswLCAwXSxcbiAgICAgICAgW21heFdpZHRoIC0gMSwgMF0sXG4gICAgICAgIFttYXhXaWR0aCAtIDEsIG1heEhlaWdodCAtIDFdLFxuICAgICAgICBbMCwgbWF4SGVpZ2h0IC0gMV1cbiAgICAgIF07XG5cbiAgICAgIC8vIGNvbnZlcnQgdG8gb3BlbiBjdiBtYXRyaXggb2JqZWN0c1xuICAgICAgY29uc3QgTXMgPSBjdi5tYXRGcm9tQXJyYXkoNCwgMSwgY3YuQ1ZfMzJGQzIsIFtdLmNvbmNhdCguLi5zb3VyY2VDb29yZGluYXRlcykpO1xuICAgICAgY29uc3QgTWQgPSBjdi5tYXRGcm9tQXJyYXkoNCwgMSwgY3YuQ1ZfMzJGQzIsIFtdLmNvbmNhdCguLi5kZXN0Q29vcmRpbmF0ZXMpKTtcbiAgICAgIGNvbnN0IHRyYW5zZm9ybU1hdHJpeCA9IGN2LmdldFBlcnNwZWN0aXZlVHJhbnNmb3JtKE1zLCBNZCk7XG4gICAgICAvLyBzZXQgbmV3IGltYWdlIHNpemVcbiAgICAgIGNvbnN0IGRzaXplID0gbmV3IGN2LlNpemUobWF4V2lkdGgsIG1heEhlaWdodCk7XG4gICAgICAvLyBwZXJmb3JtIHdhcnBcbiAgICAgIGN2LndhcnBQZXJzcGVjdGl2ZShzcmMsIGRzdCwgdHJhbnNmb3JtTWF0cml4LCBkc2l6ZSwgY3YuSU5URVJfTElORUFSLCBjdi5CT1JERVJfQ09OU1RBTlQsIG5ldyBjdi5TY2FsYXIoKSk7XG4gICAgICBjdi5pbXNob3codGhpcy5lZGl0ZWRJbWFnZSwgZHN0KTtcblxuICAgICAgc3JjLmRlbGV0ZSgpOyBkc3QuZGVsZXRlKCk7IE1zLmRlbGV0ZSgpOyBNZC5kZWxldGUoKTsgdHJhbnNmb3JtTWF0cml4LmRlbGV0ZSgpO1xuXG4gICAgICB0aGlzLnNldFByZXZpZXdQYW5lRGltZW5zaW9ucyh0aGlzLmVkaXRlZEltYWdlKTtcbiAgICAgIHRoaXMuc2hvd1ByZXZpZXcoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9jZXNzaW5nLmVtaXQoZmFsc2UpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhcHBsaWVzIHRoZSBzZWxlY3RlZCBmaWx0ZXIgdG8gdGhlIGltYWdlXG4gICAqIEBwYXJhbSBwcmV2aWV3IC0gd2hlbiB0cnVlLCB3aWxsIG5vdCBhcHBseSB0aGUgZmlsdGVyIHRvIHRoZSBlZGl0ZWQgaW1hZ2UgYnV0IG9ubHkgZGlzcGxheSBhIHByZXZpZXcuXG4gICAqIHdoZW4gZmFsc2UsIHdpbGwgYXBwbHkgdG8gZWRpdGVkSW1hZ2VcbiAgICovXG4gIHByaXZhdGUgYXBwbHlGaWx0ZXIocHJldmlldzogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdCh0cnVlKTtcbiAgICAgIC8vIGRlZmF1bHQgb3B0aW9uc1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgYmx1cjogZmFsc2UsXG4gICAgICAgIHRoOiB0cnVlLFxuICAgICAgICB0aE1vZGU6IGN2LkFEQVBUSVZFX1RIUkVTSF9NRUFOX0MsXG4gICAgICAgIHRoTWVhbkNvcnJlY3Rpb246IDEwLFxuICAgICAgICB0aEJsb2NrU2l6ZTogMjUsXG4gICAgICAgIHRoTWF4OiAyNTUsXG4gICAgICAgIGdyYXlTY2FsZTogdHJ1ZSxcbiAgICAgIH07XG4gICAgICBjb25zdCBkc3QgPSBjdi5pbXJlYWQodGhpcy5lZGl0ZWRJbWFnZSk7XG5cbiAgICAgIHN3aXRjaCAodGhpcy5zZWxlY3RlZEZpbHRlcikge1xuICAgICAgICBjYXNlICdvcmlnaW5hbCc6XG4gICAgICAgICAgb3B0aW9ucy50aCA9IGZhbHNlO1xuICAgICAgICAgIG9wdGlvbnMuZ3JheVNjYWxlID0gZmFsc2U7XG4gICAgICAgICAgb3B0aW9ucy5ibHVyID0gZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ21hZ2ljX2NvbG9yJzpcbiAgICAgICAgICBvcHRpb25zLmdyYXlTY2FsZSA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdidzInOlxuICAgICAgICAgIG9wdGlvbnMudGhNb2RlID0gY3YuQURBUFRJVkVfVEhSRVNIX0dBVVNTSUFOX0M7XG4gICAgICAgICAgb3B0aW9ucy50aE1lYW5Db3JyZWN0aW9uID0gMTU7XG4gICAgICAgICAgb3B0aW9ucy50aEJsb2NrU2l6ZSA9IDE1O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdidzMnOlxuICAgICAgICAgIG9wdGlvbnMuYmx1ciA9IHRydWU7XG4gICAgICAgICAgb3B0aW9ucy50aE1lYW5Db3JyZWN0aW9uID0gMTU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5ncmF5U2NhbGUpIHtcbiAgICAgICAgY3YuY3Z0Q29sb3IoZHN0LCBkc3QsIGN2LkNPTE9SX1JHQkEyR1JBWSwgMCk7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5ibHVyKSB7XG4gICAgICAgIGNvbnN0IGtzaXplID0gbmV3IGN2LlNpemUoNSwgNSk7XG4gICAgICAgIGN2LkdhdXNzaWFuQmx1cihkc3QsIGRzdCwga3NpemUsIDAsIDAsIGN2LkJPUkRFUl9ERUZBVUxUKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLnRoKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmdyYXlTY2FsZSkge1xuICAgICAgICAgIGN2LmFkYXB0aXZlVGhyZXNob2xkKGRzdCwgZHN0LCBvcHRpb25zLnRoTWF4LCBvcHRpb25zLnRoTW9kZSwgY3YuVEhSRVNIX0JJTkFSWSwgb3B0aW9ucy50aEJsb2NrU2l6ZSwgb3B0aW9ucy50aE1lYW5Db3JyZWN0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkc3QuY29udmVydFRvKGRzdCwgLTEsIDEsIDYwKTtcbiAgICAgICAgICBjdi50aHJlc2hvbGQoZHN0LCBkc3QsIDE3MCwgMjU1LCBjdi5USFJFU0hfQklOQVJZKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFwcmV2aWV3KSB7XG5cbiAgICAgICAgY3YuaW1zaG93KHRoaXMuZWRpdGVkSW1hZ2UsIGRzdCk7XG4gICAgICB9XG4gICAgICBhd2FpdCB0aGlzLnNob3dQcmV2aWV3KGRzdCk7XG4gICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdChmYWxzZSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogcmVzaXplIGFuIGltYWdlIHRvIGZpdCBjb25zdHJhaW50cyBzZXQgaW4gb3B0aW9ucy5tYXhJbWFnZURpbWVuc2lvbnNcbiAgICovXG4gIHByaXZhdGUgcmVzaXplKGltYWdlPzogYW55KTogUHJvbWlzZTxIVE1MQ2FudmFzRWxlbWVudD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdCh0cnVlKTtcbiAgICAgIGNvbnN0IHNyYyA9IGN2LmltcmVhZCh0aGlzLmVkaXRlZEltYWdlKTtcbiAgICAgIGNvbnN0IGN1cnJlbnREaW1lbnNpb25zID0ge1xuICAgICAgICB3aWR0aDogc3JjLnNpemUoKS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBzcmMuc2l6ZSgpLmhlaWdodFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlc2l6ZURpbWVuc2lvbnMgPSB7XG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDBcbiAgICAgIH07XG4gICAgICBpZiAoY3VycmVudERpbWVuc2lvbnMud2lkdGggPiB0aGlzLm9wdGlvbnMubWF4SW1hZ2VEaW1lbnNpb25zLndpZHRoKSB7XG4gICAgICAgIHJlc2l6ZURpbWVuc2lvbnMud2lkdGggPSB0aGlzLm9wdGlvbnMubWF4SW1hZ2VEaW1lbnNpb25zLndpZHRoO1xuICAgICAgICByZXNpemVEaW1lbnNpb25zLmhlaWdodCA9IHRoaXMub3B0aW9ucy5tYXhJbWFnZURpbWVuc2lvbnMud2lkdGggLyBjdXJyZW50RGltZW5zaW9ucy53aWR0aCAqIGN1cnJlbnREaW1lbnNpb25zLmhlaWdodDtcbiAgICAgICAgaWYgKHJlc2l6ZURpbWVuc2lvbnMuaGVpZ2h0ID4gdGhpcy5vcHRpb25zLm1heEltYWdlRGltZW5zaW9ucy5oZWlnaHQpIHtcbiAgICAgICAgICByZXNpemVEaW1lbnNpb25zLmhlaWdodCA9IHRoaXMub3B0aW9ucy5tYXhJbWFnZURpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgICAgIHJlc2l6ZURpbWVuc2lvbnMud2lkdGggPSB0aGlzLm9wdGlvbnMubWF4SW1hZ2VEaW1lbnNpb25zLmhlaWdodCAvIGN1cnJlbnREaW1lbnNpb25zLmhlaWdodCAqIGN1cnJlbnREaW1lbnNpb25zLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRzaXplID0gbmV3IGN2LlNpemUoTWF0aC5mbG9vcihyZXNpemVEaW1lbnNpb25zLndpZHRoKSwgTWF0aC5mbG9vcihyZXNpemVEaW1lbnNpb25zLmhlaWdodCkpO1xuICAgICAgICBjdi5yZXNpemUoc3JjLCBzcmMsIGRzaXplLCAwLCAwLCBjdi5JTlRFUl9BUkVBKTtcbiAgICAgICAgY29uc3QgcmVzaXplUmVzdWx0ID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY3YuaW1zaG93KHJlc2l6ZVJlc3VsdCwgc3JjKTtcbiAgICAgICAgc3JjLmRlbGV0ZSgpO1xuICAgICAgICB0aGlzLnByb2Nlc3NpbmcuZW1pdChmYWxzZSk7XG4gICAgICAgIHJlc29sdmUocmVzaXplUmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpbWFnZSkge1xuICAgICAgICAgIHJlc29sdmUoaW1hZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUodGhpcy5lZGl0ZWRJbWFnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkaXNwbGF5IGEgcHJldmlldyBvZiB0aGUgaW1hZ2Ugb24gdGhlIHByZXZpZXcgY2FudmFzXG4gICAqL1xuICBwcml2YXRlIHNob3dQcmV2aWV3KGltYWdlPzogYW55KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBzcmM7XG4gICAgICBpZiAoaW1hZ2UpIHtcbiAgICAgICAgc3JjID0gaW1hZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcmMgPSBjdi5pbXJlYWQodGhpcy5lZGl0ZWRJbWFnZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkc3QgPSBuZXcgY3YuTWF0KCk7XG4gICAgICBjb25zdCBkc2l6ZSA9IG5ldyBjdi5TaXplKDAsIDApO1xuICAgICAgY3YucmVzaXplKHNyYywgZHN0LCBkc2l6ZSwgdGhpcy5pbWFnZVJlc2l6ZVJhdGlvLCB0aGlzLmltYWdlUmVzaXplUmF0aW8sIGN2LklOVEVSX0FSRUEpO1xuICAgICAgY3YuaW1zaG93KHRoaXMucHJldmlld0NhbnZhcy5uYXRpdmVFbGVtZW50LCBkc3QpO1xuICAgICAgc3JjLmRlbGV0ZSgpO1xuICAgICAgZHN0LmRlbGV0ZSgpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqIC8vXG4gIC8vIFV0aWxpdHkgTWV0aG9kcyAvL1xuICAvLyAqKioqKioqKioqKioqKiogLy9cbiAgLyoqXG4gICAqIHNldCBwcmV2aWV3IGNhbnZhcyBkaW1lbnNpb25zIGFjY29yZGluZyB0byB0aGUgY2FudmFzIGVsZW1lbnQgb2YgdGhlIG9yaWdpbmFsIGltYWdlXG4gICAqL1xuICBwcml2YXRlIHNldFByZXZpZXdQYW5lRGltZW5zaW9ucyhpbWc6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgLy8gc2V0IHByZXZpZXcgcGFuZSBkaW1lbnNpb25zXG4gICAgdGhpcy5wcmV2aWV3RGltZW5zaW9ucyA9IHRoaXMuY2FsY3VsYXRlRGltZW5zaW9ucyhpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuICAgIHRoaXMucHJldmlld0NhbnZhcy5uYXRpdmVFbGVtZW50LndpZHRoID0gdGhpcy5wcmV2aWV3RGltZW5zaW9ucy53aWR0aDtcbiAgICB0aGlzLnByZXZpZXdDYW52YXMubmF0aXZlRWxlbWVudC5oZWlnaHQgPSB0aGlzLnByZXZpZXdEaW1lbnNpb25zLmhlaWdodDtcbiAgICB0aGlzLmltYWdlUmVzaXplUmF0aW8gPSB0aGlzLnByZXZpZXdEaW1lbnNpb25zLndpZHRoIC8gaW1nLndpZHRoO1xuICAgIHRoaXMuaW1hZ2VEaXZTdHlsZSA9IHtcbiAgICAgIHdpZHRoOiB0aGlzLnByZXZpZXdEaW1lbnNpb25zLndpZHRoICsgdGhpcy5vcHRpb25zLmNyb3BUb29sRGltZW5zaW9ucy53aWR0aCArICdweCcsXG4gICAgICBoZWlnaHQ6IHRoaXMucHJldmlld0RpbWVuc2lvbnMuaGVpZ2h0ICsgdGhpcy5vcHRpb25zLmNyb3BUb29sRGltZW5zaW9ucy5oZWlnaHQgKyAncHgnLFxuICAgICAgJ21hcmdpbi1sZWZ0JzogYGNhbGMoKDEwMCUgLSAke3RoaXMucHJldmlld0RpbWVuc2lvbnMud2lkdGggKyAxMH1weCkgLyAyICsgJHt0aGlzLm9wdGlvbnMuY3JvcFRvb2xEaW1lbnNpb25zLndpZHRoIC8gMn1weClgLFxuICAgICAgJ21hcmdpbi1yaWdodCc6IGBjYWxjKCgxMDAlIC0gJHt0aGlzLnByZXZpZXdEaW1lbnNpb25zLndpZHRoICsgMTB9cHgpIC8gMiAtICR7dGhpcy5vcHRpb25zLmNyb3BUb29sRGltZW5zaW9ucy53aWR0aCAvIDJ9cHgpYCxcbiAgICB9O1xuICAgIHRoaXMubGltaXRzU2VydmljZS5zZXRQYW5lRGltZW5zaW9ucyh7d2lkdGg6IHRoaXMucHJldmlld0RpbWVuc2lvbnMud2lkdGgsIGhlaWdodDogdGhpcy5wcmV2aWV3RGltZW5zaW9ucy5oZWlnaHR9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxjdWxhdGUgZGltZW5zaW9ucyBvZiB0aGUgcHJldmlldyBjYW52YXNcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlRGltZW5zaW9ucyh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXI7IHJhdGlvOiBudW1iZXJ9IHtcbiAgICBjb25zdCByYXRpbyA9IHdpZHRoIC8gaGVpZ2h0O1xuXG4gICAgY29uc3QgbWF4V2lkdGggPSB0aGlzLnNjcmVlbkRpbWVuc2lvbnMud2lkdGggPiB0aGlzLm1heFByZXZpZXdXaWR0aCA/XG4gICAgICB0aGlzLm1heFByZXZpZXdXaWR0aCA6IHRoaXMuc2NyZWVuRGltZW5zaW9ucy53aWR0aCAtIDIwO1xuICAgIGNvbnN0IG1heEhlaWdodCA9IHRoaXMuc2NyZWVuRGltZW5zaW9ucy5oZWlnaHQgLSAyMDA7XG4gICAgY29uc3QgY2FsY3VsYXRlZCA9IHtcbiAgICAgIHdpZHRoOiBtYXhXaWR0aCxcbiAgICAgIGhlaWdodDogTWF0aC5yb3VuZChtYXhXaWR0aCAvIHJhdGlvKSxcbiAgICAgIHJhdGlvOiByYXRpb1xuICAgIH07XG5cbiAgICBpZiAoY2FsY3VsYXRlZC5oZWlnaHQgPiBtYXhIZWlnaHQpIHtcbiAgICAgIGNhbGN1bGF0ZWQuaGVpZ2h0ID0gbWF4SGVpZ2h0O1xuICAgICAgY2FsY3VsYXRlZC53aWR0aCA9IE1hdGgucm91bmQobWF4SGVpZ2h0ICogcmF0aW8pO1xuICAgIH1cbiAgICByZXR1cm4gY2FsY3VsYXRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGEgcG9pbnQgYnkgaXQncyByb2xlc1xuICAgKiBAcGFyYW0gcm9sZXMgLSBhbiBhcnJheSBvZiByb2xlcyBieSB3aGljaCB0aGUgcG9pbnQgd2lsbCBiZSBmZXRjaGVkXG4gICAqL1xuICBwcml2YXRlIGdldFBvaW50KHJvbGVzOiBSb2xlc0FycmF5KSB7XG4gICAgcmV0dXJuIHRoaXMucG9pbnRzLmZpbmQocG9pbnQgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubGltaXRzU2VydmljZS5jb21wYXJlQXJyYXkocG9pbnQucm9sZXMsIHJvbGVzKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIGEgY2xhc3MgZm9yIGdlbmVyYXRpbmcgY29uZmlndXJhdGlvbiBvYmplY3RzIGZvciB0aGUgZWRpdG9yXG4gKi9cbmNsYXNzIEltYWdlRWRpdG9yQ29uZmlnIGltcGxlbWVudHMgRG9jU2Nhbm5lckNvbmZpZyB7XG4gIC8qKlxuICAgKiBtYXggZGltZW5zaW9ucyBvZiBvcHV0cHV0IGltYWdlLiBpZiBzZXQgdG8gemVyb1xuICAgKi9cbiAgbWF4SW1hZ2VEaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnMgPSB7XG4gICAgd2lkdGg6IDgwMCxcbiAgICBoZWlnaHQ6IDEyMDBcbiAgfTtcbiAgLyoqXG4gICAqIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIG1haW4gZWRpdG9yIGRpdlxuICAgKi9cbiAgZWRpdG9yQmFja2dyb3VuZENvbG9yID0gJ2RpbWdyZXknO1xuICAvKipcbiAgICogY3NzIHByb3BlcnRpZXMgZm9yIHRoZSBtYWluIGVkaXRvciBkaXZcbiAgICovXG4gIGVkaXRvckRpbWVuc2lvbnM6IHsgd2lkdGg6IHN0cmluZzsgaGVpZ2h0OiBzdHJpbmc7IH0gPSB7XG4gICAgd2lkdGg6ICcxMDB2dycsXG4gICAgaGVpZ2h0OiAnMTAwdmgnXG4gIH07XG4gIC8qKlxuICAgKiBjc3MgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBtYWluIGRpdiBvZiB0aGUgZWRpdG9yIGNvbXBvbmVudFxuICAgKi9cbiAgZXh0cmFDc3M6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd8bnVtYmVyfSA9IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB0b3A6IDAsXG4gICAgbGVmdDogMFxuICB9O1xuXG4gIC8qKlxuICAgKiBtYXRlcmlhbCBkZXNpZ24gdGhlbWUgY29sb3IgbmFtZVxuICAgKi9cbiAgYnV0dG9uVGhlbWVDb2xvcjogJ3ByaW1hcnknfCd3YXJuJ3wnYWNjZW50JyA9ICdhY2NlbnQnO1xuICAvKipcbiAgICogaWNvbiBmb3IgdGhlIGJ1dHRvbiB0aGF0IGNvbXBsZXRlcyB0aGUgZWRpdGluZyBhbmQgZW1pdHMgdGhlIGVkaXRlZCBpbWFnZVxuICAgKi9cbiAgZXhwb3J0SW1hZ2VJY29uID0gJ2Nsb3VkX3VwbG9hZCc7XG4gIC8qKlxuICAgKiBjb2xvciBvZiB0aGUgY3JvcCB0b29sXG4gICAqL1xuICBjcm9wVG9vbENvbG9yID0gJyMzY2FiZTInO1xuICAvKipcbiAgICogc2hhcGUgb2YgdGhlIGNyb3AgdG9vbCwgY2FuIGJlIGVpdGhlciBhIHJlY3RhbmdsZSBvciBhIGNpcmNsZVxuICAgKi9cbiAgY3JvcFRvb2xTaGFwZTogUG9pbnRTaGFwZSA9ICdyZWN0JztcbiAgLyoqXG4gICAqIGRpbWVuc2lvbnMgb2YgdGhlIGNyb3AgdG9vbFxuICAgKi9cbiAgY3JvcFRvb2xEaW1lbnNpb25zOiBJbWFnZURpbWVuc2lvbnMgPSB7XG4gICAgd2lkdGg6IDEwLFxuICAgIGhlaWdodDogMTBcbiAgfTtcbiAgLyoqXG4gICAqIGFnZ3JlZ2F0aW9uIG9mIHRoZSBwcm9wZXJ0aWVzIHJlZ2FyZGluZyBwb2ludCBhdHRyaWJ1dGVzIGdlbmVyYXRlZCBieSB0aGUgY2xhc3MgY29uc3RydWN0b3JcbiAgICovXG4gIHBvaW50T3B0aW9uczogUG9pbnRPcHRpb25zO1xuICAvKipcbiAgICogYWdncmVnYXRpb24gb2YgdGhlIHByb3BlcnRpZXMgcmVnYXJkaW5nIHRoZSBlZGl0b3Igc3R5bGUgZ2VuZXJhdGVkIGJ5IHRoZSBjbGFzcyBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZWRpdG9yU3R5bGU/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfG51bWJlcn07XG4gIC8qKlxuICAgKiBjcm9wIHRvb2wgb3V0bGluZSB3aWR0aFxuICAgKi9cbiAgY3JvcFRvb2xMaW5lV2VpZ2h0ID0gMztcbiAgLyoqXG4gICAqIG1heGltdW0gc2l6ZSBvZiB0aGUgcHJldmlldyBwYW5lXG4gICAqL1xuICBtYXhQcmV2aWV3V2lkdGggPSA4MDA7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogRG9jU2Nhbm5lckNvbmZpZykge1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZWRpdG9yU3R5bGUgPSB7J2JhY2tncm91bmQtY29sb3InOiB0aGlzLmVkaXRvckJhY2tncm91bmRDb2xvciB9O1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5lZGl0b3JTdHlsZSwgdGhpcy5lZGl0b3JEaW1lbnNpb25zKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuZWRpdG9yU3R5bGUsIHRoaXMuZXh0cmFDc3MpO1xuXG4gICAgdGhpcy5wb2ludE9wdGlvbnMgPSB7XG4gICAgICBzaGFwZTogdGhpcy5jcm9wVG9vbFNoYXBlLFxuICAgICAgY29sb3I6IHRoaXMuY3JvcFRvb2xDb2xvcixcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwXG4gICAgfTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMucG9pbnRPcHRpb25zLCB0aGlzLmNyb3BUb29sRGltZW5zaW9ucyk7XG4gIH1cbn1cblxuIl19