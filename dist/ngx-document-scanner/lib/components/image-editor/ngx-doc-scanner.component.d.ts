import { EventEmitter, OnInit } from '@angular/core';
import { LimitsService } from '../../services/limits.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PointShape } from '../../PrivateModels';
import { ImageDimensions, DocScannerConfig } from '../../PublicModels';
import { EditorActionButton, PointOptions } from '../../PrivateModels';
import { NgxOpenCVService } from 'ngx-opencv';
import * as ɵngcc0 from '@angular/core';
export declare class NgxDocScannerComponent implements OnInit {
    private ngxOpenCv;
    private limitsService;
    private bottomSheet;
    /**
     * editor config object
     */
    options: ImageEditorConfig;
    /**
     * an array of action buttons displayed on the editor screen
     */
    private editorButtons;
    /**
     * returns an array of buttons according to the editor mode
     */
    get displayedButtons(): EditorActionButton[];
    /**
     * max width of the preview area
     */
    private maxPreviewWidth;
    /**
     * dimensions of the image container
     */
    imageDivStyle: {
        [key: string]: string | number;
    };
    /**
     * editor div style
     */
    editorStyle: {
        [key: string]: string | number;
    };
    /**
     * state of opencv loading
     */
    private cvState;
    /**
     * true after the image is loaded and preview is displayed
     */
    imageLoaded: boolean;
    /**
     * editor mode
     */
    mode: 'crop' | 'color';
    /**
     * filter selected by the user, returned by the filter selector bottom sheet
     */
    private selectedFilter;
    /**
     * viewport dimensions
     */
    private screenDimensions;
    /**
     * image dimensions
     */
    private imageDimensions;
    /**
     * dimensions of the preview pane
     */
    previewDimensions: ImageDimensions;
    /**
     * ration between preview image and original
     */
    private imageResizeRatio;
    /**
     * stores the original image for reset purposes
     */
    private originalImage;
    /**
     * stores the edited image
     */
    private editedImage;
    /**
     * stores the preview image as canvas
     */
    private previewCanvas;
    /**
     * an array of points used by the crop tool
     */
    private points;
    /**
     * optional binding to the exit button of the editor
     */
    exitEditor: EventEmitter<string>;
    /**
     * fires on edit completion
     */
    editResult: EventEmitter<Blob>;
    /**
     * emits errors, can be linked to an error handler of choice
     */
    error: EventEmitter<any>;
    /**
     * emits the loading status of the cv module.
     */
    ready: EventEmitter<boolean>;
    /**
     * emits true when processing is done, false when completed
     */
    processing: EventEmitter<boolean>;
    /**
     * set image for editing
     * @param file - file from form input
     */
    set file(file: File);
    /**
     * editor configuration object
     */
    config: DocScannerConfig;
    constructor(ngxOpenCv: NgxOpenCVService, limitsService: LimitsService, bottomSheet: MatBottomSheet);
    ngOnInit(): void;
    /**
     * emits the exitEditor event
     */
    exit(): void;
    /**
     * applies the selected filter, and when done emits the resulted image
     */
    private exportImage;
    /**
     * open the bottom sheet for selecting filters, and applies the selected filter in preview mode
     */
    private chooseFilters;
    /**
     * load image from input field
     */
    private loadFile;
    /**
     * read image from File object
     */
    private readImage;
    /**
     * rotate image 90 degrees
     */
    private rotateImage;
    /**
     * detects the contours of the document and
     **/
    private detectContours;
    /**
     * apply perspective transform
     */
    private transform;
    /**
     * applies the selected filter to the image
     * @param preview - when true, will not apply the filter to the edited image but only display a preview.
     * when false, will apply to editedImage
     */
    private applyFilter;
    /**
     * resize an image to fit constraints set in options.maxImageDimensions
     */
    private resize;
    /**
     * display a preview of the image on the preview canvas
     */
    private showPreview;
    /**
     * set preview canvas dimensions according to the canvas element of the original image
     */
    private setPreviewPaneDimensions;
    /**
     * calculate dimensions of the preview canvas
     */
    private calculateDimensions;
    /**
     * returns a point by it's roles
     * @param roles - an array of roles by which the point will be fetched
     */
    private getPoint;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgxDocScannerComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NgxDocScannerComponent, "ngx-doc-scanner", never, { "file": "file"; "config": "config"; }, { "exitEditor": "exitEditor"; "editResult": "editResult"; "error": "error"; "ready": "ready"; "processing": "processing"; }, never, never>;
}
/**
 * a class for generating configuration objects for the editor
 */
declare class ImageEditorConfig implements DocScannerConfig {
    /**
     * max dimensions of oputput image. if set to zero
     */
    maxImageDimensions: ImageDimensions;
    /**
     * background color of the main editor div
     */
    editorBackgroundColor: string;
    /**
     * css properties for the main editor div
     */
    editorDimensions: {
        width: string;
        height: string;
    };
    /**
     * css that will be added to the main div of the editor component
     */
    extraCss: {
        [key: string]: string | number;
    };
    /**
     * material design theme color name
     */
    buttonThemeColor: 'primary' | 'warn' | 'accent';
    /**
     * icon for the button that completes the editing and emits the edited image
     */
    exportImageIcon: string;
    /**
     * color of the crop tool
     */
    cropToolColor: string;
    /**
     * shape of the crop tool, can be either a rectangle or a circle
     */
    cropToolShape: PointShape;
    /**
     * dimensions of the crop tool
     */
    cropToolDimensions: ImageDimensions;
    /**
     * aggregation of the properties regarding point attributes generated by the class constructor
     */
    pointOptions: PointOptions;
    /**
     * aggregation of the properties regarding the editor style generated by the class constructor
     */
    editorStyle?: {
        [key: string]: string | number;
    };
    /**
     * crop tool outline width
     */
    cropToolLineWeight: number;
    /**
     * maximum size of the preview pane
     */
    maxPreviewWidth: number;
    constructor(options: DocScannerConfig);
}
export {};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRvYy1zY2FubmVyLmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJuZ3gtZG9jLXNjYW5uZXIuY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGltaXRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xpbWl0cy5zZXJ2aWNlJztcbmltcG9ydCB7IE1hdEJvdHRvbVNoZWV0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYm90dG9tLXNoZWV0JztcbmltcG9ydCB7IFBvaW50U2hhcGUgfSBmcm9tICcuLi8uLi9Qcml2YXRlTW9kZWxzJztcbmltcG9ydCB7IEltYWdlRGltZW5zaW9ucywgRG9jU2Nhbm5lckNvbmZpZyB9IGZyb20gJy4uLy4uL1B1YmxpY01vZGVscyc7XG5pbXBvcnQgeyBFZGl0b3JBY3Rpb25CdXR0b24sIFBvaW50T3B0aW9ucyB9IGZyb20gJy4uLy4uL1ByaXZhdGVNb2RlbHMnO1xuaW1wb3J0IHsgTmd4T3BlbkNWU2VydmljZSB9IGZyb20gJ25neC1vcGVuY3YnO1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTmd4RG9jU2Nhbm5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHJpdmF0ZSBuZ3hPcGVuQ3Y7XG4gICAgcHJpdmF0ZSBsaW1pdHNTZXJ2aWNlO1xuICAgIHByaXZhdGUgYm90dG9tU2hlZXQ7XG4gICAgLyoqXG4gICAgICogZWRpdG9yIGNvbmZpZyBvYmplY3RcbiAgICAgKi9cbiAgICBvcHRpb25zOiBJbWFnZUVkaXRvckNvbmZpZztcbiAgICAvKipcbiAgICAgKiBhbiBhcnJheSBvZiBhY3Rpb24gYnV0dG9ucyBkaXNwbGF5ZWQgb24gdGhlIGVkaXRvciBzY3JlZW5cbiAgICAgKi9cbiAgICBwcml2YXRlIGVkaXRvckJ1dHRvbnM7XG4gICAgLyoqXG4gICAgICogcmV0dXJucyBhbiBhcnJheSBvZiBidXR0b25zIGFjY29yZGluZyB0byB0aGUgZWRpdG9yIG1vZGVcbiAgICAgKi9cbiAgICBnZXQgZGlzcGxheWVkQnV0dG9ucygpOiBFZGl0b3JBY3Rpb25CdXR0b25bXTtcbiAgICAvKipcbiAgICAgKiBtYXggd2lkdGggb2YgdGhlIHByZXZpZXcgYXJlYVxuICAgICAqL1xuICAgIHByaXZhdGUgbWF4UHJldmlld1dpZHRoO1xuICAgIC8qKlxuICAgICAqIGRpbWVuc2lvbnMgb2YgdGhlIGltYWdlIGNvbnRhaW5lclxuICAgICAqL1xuICAgIGltYWdlRGl2U3R5bGU6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZWRpdG9yIGRpdiBzdHlsZVxuICAgICAqL1xuICAgIGVkaXRvclN0eWxlOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHN0YXRlIG9mIG9wZW5jdiBsb2FkaW5nXG4gICAgICovXG4gICAgcHJpdmF0ZSBjdlN0YXRlO1xuICAgIC8qKlxuICAgICAqIHRydWUgYWZ0ZXIgdGhlIGltYWdlIGlzIGxvYWRlZCBhbmQgcHJldmlldyBpcyBkaXNwbGF5ZWRcbiAgICAgKi9cbiAgICBpbWFnZUxvYWRlZDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBlZGl0b3IgbW9kZVxuICAgICAqL1xuICAgIG1vZGU6ICdjcm9wJyB8ICdjb2xvcic7XG4gICAgLyoqXG4gICAgICogZmlsdGVyIHNlbGVjdGVkIGJ5IHRoZSB1c2VyLCByZXR1cm5lZCBieSB0aGUgZmlsdGVyIHNlbGVjdG9yIGJvdHRvbSBzaGVldFxuICAgICAqL1xuICAgIHByaXZhdGUgc2VsZWN0ZWRGaWx0ZXI7XG4gICAgLyoqXG4gICAgICogdmlld3BvcnQgZGltZW5zaW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgc2NyZWVuRGltZW5zaW9ucztcbiAgICAvKipcbiAgICAgKiBpbWFnZSBkaW1lbnNpb25zXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbWFnZURpbWVuc2lvbnM7XG4gICAgLyoqXG4gICAgICogZGltZW5zaW9ucyBvZiB0aGUgcHJldmlldyBwYW5lXG4gICAgICovXG4gICAgcHJldmlld0RpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucztcbiAgICAvKipcbiAgICAgKiByYXRpb24gYmV0d2VlbiBwcmV2aWV3IGltYWdlIGFuZCBvcmlnaW5hbFxuICAgICAqL1xuICAgIHByaXZhdGUgaW1hZ2VSZXNpemVSYXRpbztcbiAgICAvKipcbiAgICAgKiBzdG9yZXMgdGhlIG9yaWdpbmFsIGltYWdlIGZvciByZXNldCBwdXJwb3Nlc1xuICAgICAqL1xuICAgIHByaXZhdGUgb3JpZ2luYWxJbWFnZTtcbiAgICAvKipcbiAgICAgKiBzdG9yZXMgdGhlIGVkaXRlZCBpbWFnZVxuICAgICAqL1xuICAgIHByaXZhdGUgZWRpdGVkSW1hZ2U7XG4gICAgLyoqXG4gICAgICogc3RvcmVzIHRoZSBwcmV2aWV3IGltYWdlIGFzIGNhbnZhc1xuICAgICAqL1xuICAgIHByaXZhdGUgcHJldmlld0NhbnZhcztcbiAgICAvKipcbiAgICAgKiBhbiBhcnJheSBvZiBwb2ludHMgdXNlZCBieSB0aGUgY3JvcCB0b29sXG4gICAgICovXG4gICAgcHJpdmF0ZSBwb2ludHM7XG4gICAgLyoqXG4gICAgICogb3B0aW9uYWwgYmluZGluZyB0byB0aGUgZXhpdCBidXR0b24gb2YgdGhlIGVkaXRvclxuICAgICAqL1xuICAgIGV4aXRFZGl0b3I6IEV2ZW50RW1pdHRlcjxzdHJpbmc+O1xuICAgIC8qKlxuICAgICAqIGZpcmVzIG9uIGVkaXQgY29tcGxldGlvblxuICAgICAqL1xuICAgIGVkaXRSZXN1bHQ6IEV2ZW50RW1pdHRlcjxCbG9iPjtcbiAgICAvKipcbiAgICAgKiBlbWl0cyBlcnJvcnMsIGNhbiBiZSBsaW5rZWQgdG8gYW4gZXJyb3IgaGFuZGxlciBvZiBjaG9pY2VcbiAgICAgKi9cbiAgICBlcnJvcjogRXZlbnRFbWl0dGVyPGFueT47XG4gICAgLyoqXG4gICAgICogZW1pdHMgdGhlIGxvYWRpbmcgc3RhdHVzIG9mIHRoZSBjdiBtb2R1bGUuXG4gICAgICovXG4gICAgcmVhZHk6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcbiAgICAvKipcbiAgICAgKiBlbWl0cyB0cnVlIHdoZW4gcHJvY2Vzc2luZyBpcyBkb25lLCBmYWxzZSB3aGVuIGNvbXBsZXRlZFxuICAgICAqL1xuICAgIHByb2Nlc3Npbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcbiAgICAvKipcbiAgICAgKiBzZXQgaW1hZ2UgZm9yIGVkaXRpbmdcbiAgICAgKiBAcGFyYW0gZmlsZSAtIGZpbGUgZnJvbSBmb3JtIGlucHV0XG4gICAgICovXG4gICAgc2V0IGZpbGUoZmlsZTogRmlsZSk7XG4gICAgLyoqXG4gICAgICogZWRpdG9yIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAgICovXG4gICAgY29uZmlnOiBEb2NTY2FubmVyQ29uZmlnO1xuICAgIGNvbnN0cnVjdG9yKG5neE9wZW5DdjogTmd4T3BlbkNWU2VydmljZSwgbGltaXRzU2VydmljZTogTGltaXRzU2VydmljZSwgYm90dG9tU2hlZXQ6IE1hdEJvdHRvbVNoZWV0KTtcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIGVtaXRzIHRoZSBleGl0RWRpdG9yIGV2ZW50XG4gICAgICovXG4gICAgZXhpdCgpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIGFwcGxpZXMgdGhlIHNlbGVjdGVkIGZpbHRlciwgYW5kIHdoZW4gZG9uZSBlbWl0cyB0aGUgcmVzdWx0ZWQgaW1hZ2VcbiAgICAgKi9cbiAgICBwcml2YXRlIGV4cG9ydEltYWdlO1xuICAgIC8qKlxuICAgICAqIG9wZW4gdGhlIGJvdHRvbSBzaGVldCBmb3Igc2VsZWN0aW5nIGZpbHRlcnMsIGFuZCBhcHBsaWVzIHRoZSBzZWxlY3RlZCBmaWx0ZXIgaW4gcHJldmlldyBtb2RlXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaG9vc2VGaWx0ZXJzO1xuICAgIC8qKlxuICAgICAqIGxvYWQgaW1hZ2UgZnJvbSBpbnB1dCBmaWVsZFxuICAgICAqL1xuICAgIHByaXZhdGUgbG9hZEZpbGU7XG4gICAgLyoqXG4gICAgICogcmVhZCBpbWFnZSBmcm9tIEZpbGUgb2JqZWN0XG4gICAgICovXG4gICAgcHJpdmF0ZSByZWFkSW1hZ2U7XG4gICAgLyoqXG4gICAgICogcm90YXRlIGltYWdlIDkwIGRlZ3JlZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIHJvdGF0ZUltYWdlO1xuICAgIC8qKlxuICAgICAqIGRldGVjdHMgdGhlIGNvbnRvdXJzIG9mIHRoZSBkb2N1bWVudCBhbmRcbiAgICAgKiovXG4gICAgcHJpdmF0ZSBkZXRlY3RDb250b3VycztcbiAgICAvKipcbiAgICAgKiBhcHBseSBwZXJzcGVjdGl2ZSB0cmFuc2Zvcm1cbiAgICAgKi9cbiAgICBwcml2YXRlIHRyYW5zZm9ybTtcbiAgICAvKipcbiAgICAgKiBhcHBsaWVzIHRoZSBzZWxlY3RlZCBmaWx0ZXIgdG8gdGhlIGltYWdlXG4gICAgICogQHBhcmFtIHByZXZpZXcgLSB3aGVuIHRydWUsIHdpbGwgbm90IGFwcGx5IHRoZSBmaWx0ZXIgdG8gdGhlIGVkaXRlZCBpbWFnZSBidXQgb25seSBkaXNwbGF5IGEgcHJldmlldy5cbiAgICAgKiB3aGVuIGZhbHNlLCB3aWxsIGFwcGx5IHRvIGVkaXRlZEltYWdlXG4gICAgICovXG4gICAgcHJpdmF0ZSBhcHBseUZpbHRlcjtcbiAgICAvKipcbiAgICAgKiByZXNpemUgYW4gaW1hZ2UgdG8gZml0IGNvbnN0cmFpbnRzIHNldCBpbiBvcHRpb25zLm1heEltYWdlRGltZW5zaW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgcmVzaXplO1xuICAgIC8qKlxuICAgICAqIGRpc3BsYXkgYSBwcmV2aWV3IG9mIHRoZSBpbWFnZSBvbiB0aGUgcHJldmlldyBjYW52YXNcbiAgICAgKi9cbiAgICBwcml2YXRlIHNob3dQcmV2aWV3O1xuICAgIC8qKlxuICAgICAqIHNldCBwcmV2aWV3IGNhbnZhcyBkaW1lbnNpb25zIGFjY29yZGluZyB0byB0aGUgY2FudmFzIGVsZW1lbnQgb2YgdGhlIG9yaWdpbmFsIGltYWdlXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRQcmV2aWV3UGFuZURpbWVuc2lvbnM7XG4gICAgLyoqXG4gICAgICogY2FsY3VsYXRlIGRpbWVuc2lvbnMgb2YgdGhlIHByZXZpZXcgY2FudmFzXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVEaW1lbnNpb25zO1xuICAgIC8qKlxuICAgICAqIHJldHVybnMgYSBwb2ludCBieSBpdCdzIHJvbGVzXG4gICAgICogQHBhcmFtIHJvbGVzIC0gYW4gYXJyYXkgb2Ygcm9sZXMgYnkgd2hpY2ggdGhlIHBvaW50IHdpbGwgYmUgZmV0Y2hlZFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UG9pbnQ7XG59XG4vKipcbiAqIGEgY2xhc3MgZm9yIGdlbmVyYXRpbmcgY29uZmlndXJhdGlvbiBvYmplY3RzIGZvciB0aGUgZWRpdG9yXG4gKi9cbmRlY2xhcmUgY2xhc3MgSW1hZ2VFZGl0b3JDb25maWcgaW1wbGVtZW50cyBEb2NTY2FubmVyQ29uZmlnIHtcbiAgICAvKipcbiAgICAgKiBtYXggZGltZW5zaW9ucyBvZiBvcHV0cHV0IGltYWdlLiBpZiBzZXQgdG8gemVyb1xuICAgICAqL1xuICAgIG1heEltYWdlRGltZW5zaW9uczogSW1hZ2VEaW1lbnNpb25zO1xuICAgIC8qKlxuICAgICAqIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIG1haW4gZWRpdG9yIGRpdlxuICAgICAqL1xuICAgIGVkaXRvckJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIGNzcyBwcm9wZXJ0aWVzIGZvciB0aGUgbWFpbiBlZGl0b3IgZGl2XG4gICAgICovXG4gICAgZWRpdG9yRGltZW5zaW9uczoge1xuICAgICAgICB3aWR0aDogc3RyaW5nO1xuICAgICAgICBoZWlnaHQ6IHN0cmluZztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGNzcyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIG1haW4gZGl2IG9mIHRoZSBlZGl0b3IgY29tcG9uZW50XG4gICAgICovXG4gICAgZXh0cmFDc3M6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogbWF0ZXJpYWwgZGVzaWduIHRoZW1lIGNvbG9yIG5hbWVcbiAgICAgKi9cbiAgICBidXR0b25UaGVtZUNvbG9yOiAncHJpbWFyeScgfCAnd2FybicgfCAnYWNjZW50JztcbiAgICAvKipcbiAgICAgKiBpY29uIGZvciB0aGUgYnV0dG9uIHRoYXQgY29tcGxldGVzIHRoZSBlZGl0aW5nIGFuZCBlbWl0cyB0aGUgZWRpdGVkIGltYWdlXG4gICAgICovXG4gICAgZXhwb3J0SW1hZ2VJY29uOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogY29sb3Igb2YgdGhlIGNyb3AgdG9vbFxuICAgICAqL1xuICAgIGNyb3BUb29sQ29sb3I6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBzaGFwZSBvZiB0aGUgY3JvcCB0b29sLCBjYW4gYmUgZWl0aGVyIGEgcmVjdGFuZ2xlIG9yIGEgY2lyY2xlXG4gICAgICovXG4gICAgY3JvcFRvb2xTaGFwZTogUG9pbnRTaGFwZTtcbiAgICAvKipcbiAgICAgKiBkaW1lbnNpb25zIG9mIHRoZSBjcm9wIHRvb2xcbiAgICAgKi9cbiAgICBjcm9wVG9vbERpbWVuc2lvbnM6IEltYWdlRGltZW5zaW9ucztcbiAgICAvKipcbiAgICAgKiBhZ2dyZWdhdGlvbiBvZiB0aGUgcHJvcGVydGllcyByZWdhcmRpbmcgcG9pbnQgYXR0cmlidXRlcyBnZW5lcmF0ZWQgYnkgdGhlIGNsYXNzIGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgcG9pbnRPcHRpb25zOiBQb2ludE9wdGlvbnM7XG4gICAgLyoqXG4gICAgICogYWdncmVnYXRpb24gb2YgdGhlIHByb3BlcnRpZXMgcmVnYXJkaW5nIHRoZSBlZGl0b3Igc3R5bGUgZ2VuZXJhdGVkIGJ5IHRoZSBjbGFzcyBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGVkaXRvclN0eWxlPzoge1xuICAgICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBjcm9wIHRvb2wgb3V0bGluZSB3aWR0aFxuICAgICAqL1xuICAgIGNyb3BUb29sTGluZVdlaWdodDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIG1heGltdW0gc2l6ZSBvZiB0aGUgcHJldmlldyBwYW5lXG4gICAgICovXG4gICAgbWF4UHJldmlld1dpZHRoOiBudW1iZXI7XG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogRG9jU2Nhbm5lckNvbmZpZyk7XG59XG5leHBvcnQge307XG4iXX0=