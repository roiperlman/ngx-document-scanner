import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LimitsService, PointPositionChange, PositionChangeData, RolesArray} from '../../services/limits.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {NgxFilterMenuComponent} from '../filter-menu/ngx-filter-menu.component';
import {PointShape} from '../../PrivateModels';
// import {NgxOpenCVService} from '../../services/ngx-opencv.service';
import {ImageDimensions, DocScannerConfig, OpenCVState} from '../../PublicModels';
import {EditorActionButton, PointOptions} from '../../PrivateModels';
import {NgxOpenCVService} from 'ngx-opencv';

declare var cv: any;

@Component({
  selector: 'ngx-doc-scanner',
  templateUrl: './ngx-doc-scanner.component.html',
  styleUrls: ['./ngx-doc-scanner.component.scss']
})
export class NgxDocScannerComponent implements OnInit {
  /**
   * editor config object
   */
  options: ImageEditorConfig;
  // ************* //
  // EDITOR CONFIG //
  // ************* //
  /**
   * an array of action buttons displayed on the editor screen
   */
  private editorButtons: Array<EditorActionButton> = [
    {
      name: 'exit',
      action: () => {
        this.exitEditor.emit('canceled');
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
      action: async () => {
        this.mode = 'color';
        await this.transform();
        await this.applyFilter(true);
      },
      icon: 'done',
      type: 'fab',
      mode: 'crop'
    },
    {
      name: 'back',
      action: () => {
        this.mode = 'crop';
        this.loadFile(this.originalImage);
      },
      icon: 'arrow_back',
      type: 'fab',
      mode: 'color'
    },
    {
      name: 'filter',
      action: () => {
        return this.chooseFilters();
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
   * returns an array of buttons according to the editor mode
   */
  get displayedButtons() {
    return this.editorButtons.filter(button => {
      return button.mode === this.mode;
    });
  }
  /**
   * max width of the preview area
   */
  private maxPreviewWidth: number;
  /**
   * dimensions of the image container
   */
  imageDivStyle: {[key: string]: string|number};
  /**
   * editor div style
   */
  editorStyle: {[key: string]: string|number};

  // ************* //
  // EDITOR STATE //
  // ************* //
  /**
   * state of opencv loading
   */
  private cvState: string;
  /**
   * true after the image is loaded and preview is displayed
   */
  imageLoaded = false;
  /**
   * editor mode
   */
  mode: 'crop'|'color' = 'crop';
  /**
   * filter selected by the user, returned by the filter selector bottom sheet
   */
  private selectedFilter = 'default';

  // ******************* //
  // OPERATION VARIABLES //
  // ******************* //
  /**
   * viewport dimensions
   */
  private screenDimensions: ImageDimensions;
  /**
   * image dimensions
   */
  private imageDimensions: ImageDimensions = {
    width: 0,
    height: 0
  };
  /**
   * dimensions of the preview pane
   */
  previewDimensions: ImageDimensions;
  /**
   * ration between preview image and original
   */
  private imageResizeRatio: number;
  /**
   * stores the original image for reset purposes
   */
  private originalImage: File;
  /**
   * stores the edited image
   */
  private editedImage: HTMLCanvasElement;
  /**
   * stores the preview image as canvas
   */
  @ViewChild('PreviewCanvas', {read: ElementRef}) private previewCanvas: ElementRef;
  /**
   * an array of points used by the crop tool
   */
  private points: Array<PointPositionChange>;

  // ************** //
  // EVENT EMITTERS //
  // ************** //
  /**
   * optional binding to the exit button of the editor
   */
  @Output() exitEditor: EventEmitter<string> = new EventEmitter<string>();
  /**
   * fires on edit completion
   */
  @Output() editResult: EventEmitter<Blob> = new EventEmitter<Blob>();
  /**
   * emits errors, can be linked to an error handler of choice
   */
  @Output() error: EventEmitter<any> = new EventEmitter<any>();
  /**
   * emits the loading status of the cv module.
   */
  @Output() ready: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
   * emits true when processing is done, false when completed
   */
  @Output() processing: EventEmitter<boolean> = new EventEmitter<boolean>();

  // ****** //
  // INPUTS //
  // ****** //
  /**
   * set image for editing
   * @param file - file from form input
   */
  @Input() set file(file: File) {
    if (file) {
      setTimeout(() => {
        this.processing.emit(true);
      }, 5);
      this.imageLoaded = false;
      this.originalImage = file;
      this.ngxOpenCv.cvState.subscribe(
        async (cvState: OpenCVState) => {
          if (cvState.ready) {
            // read file to image & canvas
            await this.loadFile(file);
            this.processing.emit(false);
          }
        });
    }
  }

  /**
   * editor configuration object
   */
  @Input() config: DocScannerConfig;


  constructor(private ngxOpenCv: NgxOpenCVService, private limitsService: LimitsService, private bottomSheet: MatBottomSheet) {
    this.screenDimensions = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // subscribe to status of cv module
    this.ngxOpenCv.cvState.subscribe((cvState: OpenCVState) => {
      this.cvState = cvState.state;
      this.ready.emit(cvState.ready);
      if (cvState.error) {
        this.error.emit(new Error('error loading cv'));
      } else if (cvState.loading) {
        this.processing.emit(true);
      } else if (cvState.ready) {
        this.processing.emit(false);
      }
    });

    // subscribe to positions of crop tool
    this.limitsService.positions.subscribe(points => {
      this.points = points;
    });
  }

  ngOnInit() {
    // set options from config object
    this.options = new ImageEditorConfig(this.config);
    // set export image icon
    this.editorButtons.forEach(button => {
      if (button.name === 'upload') {
        button.icon = this.options.exportImageIcon;
      }
    });
    this.maxPreviewWidth = this.options.maxPreviewWidth;
    this.editorStyle = this.options.editorStyle;
  }

  // ***************************** //
  // editor action buttons methods //
  // ***************************** //

  /**
   * emits the exitEditor event
   */
  exit() {
    this.exitEditor.emit('canceled');
  }

  /**
   * applies the selected filter, and when done emits the resulted image
   */
  private async exportImage() {
    await this.applyFilter(false);
    if (this.options.maxImageDimensions) {
      this.resize(this.editedImage)
        .then(resizeResult => {
          resizeResult.toBlob((blob) => {
            this.editResult.emit(blob);
            this.processing.emit(false);
          }, this.originalImage.type);
        });
    } else {
      this.editedImage.toBlob((blob) => {
        this.editResult.emit(blob);
        this.processing.emit(false);
      }, this.originalImage.type);
    }
  }

  /**
   * open the bottom sheet for selecting filters, and applies the selected filter in preview mode
   */
  private chooseFilters() {
    const data = { filter: this.selectedFilter };
    const bottomSheetRef = this.bottomSheet.open(NgxFilterMenuComponent, {
      data: data
    });
    bottomSheetRef.afterDismissed().subscribe(() => {
      this.selectedFilter = data.filter;
      this.applyFilter(true);
    });

  }

  // *************************** //
  // File Input & Output Methods //
  // *************************** //
  /**
   * load image from input field
   */
  private loadFile(file: File) {
    return new Promise(async (resolve, reject) => {
      this.processing.emit(true);
      try {
        await this.readImage(file);
      } catch (err) {
        console.error(err);
        this.error.emit(new Error(err));
      }
      try {
        await this.showPreview();
      } catch (err) {
        console.error(err);
        this.error.emit(new Error(err));
      }
      // set pane limits
      // show points
      this.imageLoaded = true;
      await this.limitsService.setPaneDimensions({width: this.previewDimensions.width, height: this.previewDimensions.height});
      setTimeout(async () => {
        await this.detectContours();
        this.processing.emit(false);
        resolve();
      }, 15);
    });
  }

  /**
   * read image from File object
   */
  private readImage(file: File) {
    return new Promise(async (resolve, reject) => {
      let imageSrc;
      try {
        imageSrc = await readFile();
      } catch (err) {
        reject(err);
      }
      const img = new Image();
      img.onload = async () => {
        // set edited image canvas and dimensions
        this.editedImage = <HTMLCanvasElement> document.createElement('canvas');
        this.editedImage.width = img.width;
        this.editedImage.height = img.height;
        const ctx = this.editedImage.getContext('2d');
        ctx.drawImage(img, 0, 0);
        // resize image if larger than max image size
        const width = img.width > img.height ? img.height : img.width;
        if (width > this.options.maxImageDimensions.width) {
          this.editedImage = await this.resize(this.editedImage);
        }
        this.imageDimensions.width = this.editedImage.width;
        this.imageDimensions.height = this.editedImage.height;
        this.setPreviewPaneDimensions(this.editedImage);
        resolve();
      };
      img.src = imageSrc;
    });

    /**
     * read file from input field
     */
    function readFile() {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(reader.result);
        };
        reader.onerror = (err) => {
          reject(err);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // ************************ //
  // Image Processing Methods //
  // ************************ //
  /**
   * rotate image 90 degrees
   */
  private rotateImage() {
    return new Promise((resolve, reject) => {
      this.processing.emit(true);
      setTimeout(() => {
        const dst = cv.imread(this.editedImage);
        // const dst = new cv.Mat();
        cv.transpose(dst, dst);
        cv.flip(dst, dst, 1);
        cv.imshow(this.editedImage, dst);
        // src.delete();
        dst.delete();
        // save current preview dimensions and positions
        const initialPreviewDimensions = {width: 0, height: 0};
        Object.assign(initialPreviewDimensions, this.previewDimensions);
        const initialPositions = Array.from(this.points);
        // get new dimensions
        // set new preview pane dimensions
        this.setPreviewPaneDimensions(this.editedImage);
        // get preview pane resize ratio
        const previewResizeRatios = {
          width: this.previewDimensions.width / initialPreviewDimensions.width,
          height: this.previewDimensions.height / initialPreviewDimensions.height
        };
        // set new preview pane dimensions

        this.limitsService.rotateClockwise(previewResizeRatios, initialPreviewDimensions, initialPositions);
        this.showPreview().then(() => {
          this.processing.emit(false);
          resolve();
        });
      }, 30);
    });


  }

  /**
   * detects the contours of the document and
   **/
  private detectContours(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.processing.emit(true);
      setTimeout(() => {
        // load the image and compute the ratio of the old height to the new height, clone it, and resize it
        const processingResizeRatio = 0.5;
        const dst = cv.imread(this.editedImage);
        const dsize = new cv.Size(dst.rows * processingResizeRatio, dst.cols * processingResizeRatio);
        const ksize = new cv.Size(5, 5);
        // convert the image to grayscale, blur it, and find edges in the image
        cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
        cv.GaussianBlur(dst, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
        cv.Canny(dst, dst, 75, 200);
        // find contours
        cv.threshold(dst, dst, 120, 200, cv.THRESH_BINARY);
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(dst, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
        const rect = cv.boundingRect(dst);
        dst.delete(); hierarchy.delete(); contours.delete();
        // transform the rectangle into a set of points
        Object.keys(rect).forEach(key => {
          rect[key] = rect[key]  * this.imageResizeRatio;
        });

        const contourCoordinates = [
          new PositionChangeData({x: rect.x, y: rect.y}, ['left', 'top']),
          new PositionChangeData({x: rect.x + rect.width, y: rect.y}, ['right', 'top']),
          new PositionChangeData({x: rect.x + rect.width, y: rect.y + rect.height}, ['right', 'bottom']),
          new PositionChangeData({x: rect.x, y: rect.y + rect.height}, ['left', 'bottom']),
        ];

        this.limitsService.repositionPoints(contourCoordinates);
        // this.processing.emit(false);
        resolve();
      }, 30);
    });
  }

  /**
   * apply perspective transform
   */
  private transform(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.processing.emit(true);
      setTimeout(() => {
        const dst = cv.imread(this.editedImage);

        // create source coordinates matrix
        const sourceCoordinates = [
          this.getPoint(['top', 'left']),
          this.getPoint(['top', 'right']),
          this.getPoint(['bottom', 'right']),
          this.getPoint(['bottom', 'left'])
        ].map(point => {
          return [point.x / this.imageResizeRatio, point.y / this.imageResizeRatio];
        });

        // get max width
        const bottomWidth = this.getPoint(['bottom', 'right']).x - this.getPoint(['bottom', 'left']).x;
        const topWidth = this.getPoint(['top', 'right']).x - this.getPoint(['top', 'left']).x;
        const maxWidth = Math.max(bottomWidth, topWidth) / this.imageResizeRatio;
        // get max height
        const leftHeight = this.getPoint(['bottom', 'left']).y - this.getPoint(['top', 'left']).y;
        const rightHeight = this.getPoint(['bottom', 'right']).y - this.getPoint(['top', 'right']).y;
        const maxHeight = Math.max(leftHeight, rightHeight) / this.imageResizeRatio;
        // create dest coordinates matrix
        const destCoordinates = [
          [0, 0],
          [maxWidth - 1, 0],
          [maxWidth - 1, maxHeight - 1],
          [0, maxHeight - 1]
        ];

        // convert to open cv matrix objects
        const Ms = cv.matFromArray(4, 1, cv.CV_32FC2, [].concat(...sourceCoordinates));
        const Md = cv.matFromArray(4, 1, cv.CV_32FC2, [].concat(...destCoordinates));
        const transformMatrix = cv.getPerspectiveTransform(Ms, Md);
        // set new image size
        const dsize = new cv.Size(maxWidth, maxHeight);
        // perform warp
        cv.warpPerspective(dst, dst, transformMatrix, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
        cv.imshow(this.editedImage, dst);

        dst.delete(); Ms.delete(); Md.delete(); transformMatrix.delete();

        this.setPreviewPaneDimensions(this.editedImage);
        this.showPreview().then(() => {
          this.processing.emit(false);
          resolve();
        });
      }, 30);
    });
  }

  /**
   * applies the selected filter to the image
   * @param preview - when true, will not apply the filter to the edited image but only display a preview.
   * when false, will apply to editedImage
   */
  private applyFilter(preview: boolean): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.processing.emit(true);
      // default options
      const options = {
        blur: false,
        th: true,
        thMode: cv.ADAPTIVE_THRESH_MEAN_C,
        thMeanCorrection: 10,
        thBlockSize: 25,
        thMax: 255,
        grayScale: true,
      };
      const dst = cv.imread(this.editedImage);

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

      setTimeout(async () => {
        if (options.grayScale) {
          cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
        }
        if (options.blur) {
          const ksize = new cv.Size(5, 5);
          cv.GaussianBlur(dst, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
        }
        if (options.th) {
          if (options.grayScale) {
            cv.adaptiveThreshold(dst, dst, options.thMax, options.thMode, cv.THRESH_BINARY, options.thBlockSize, options.thMeanCorrection);
          } else {
            dst.convertTo(dst, -1, 1, 60);
            cv.threshold(dst, dst, 170, 255, cv.THRESH_BINARY);
          }
        }
        if (!preview) {
          cv.imshow(this.editedImage, dst);
        }
        await this.showPreview(dst);
        this.processing.emit(false);
        resolve();
      }, 30);
    });
  }

  /**
   * resize an image to fit constraints set in options.maxImageDimensions
   */
  private resize(image: HTMLCanvasElement): Promise<HTMLCanvasElement> {
    return new Promise((resolve, reject) => {
      this.processing.emit(true);
      setTimeout(() => {
        const src = cv.imread(image);
        const currentDimensions = {
          width: src.size().width,
          height: src.size().height
        };
        const resizeDimensions = {
          width: 0,
          height: 0
        };
        if (currentDimensions.width > this.options.maxImageDimensions.width) {
          resizeDimensions.width = this.options.maxImageDimensions.width;
          resizeDimensions.height = this.options.maxImageDimensions.width / currentDimensions.width * currentDimensions.height;
          if (resizeDimensions.height > this.options.maxImageDimensions.height) {
            resizeDimensions.height = this.options.maxImageDimensions.height;
            resizeDimensions.width = this.options.maxImageDimensions.height / currentDimensions.height * currentDimensions.width;
          }
          const dsize = new cv.Size(Math.floor(resizeDimensions.width), Math.floor(resizeDimensions.height));
          cv.resize(src, src, dsize, 0, 0, cv.INTER_AREA);
          const resizeResult = <HTMLCanvasElement> document.createElement('canvas');
          cv.imshow(resizeResult, src);
          src.delete();
          this.processing.emit(false);
          resolve(resizeResult);
        } else {
          this.processing.emit(false);
          resolve(image);
        }
      }, 30);
    });
  }

  /**
   * display a preview of the image on the preview canvas
   */
  private showPreview(image?: any) {
    return new Promise((resolve, reject) => {
      let src;
      if (image) {
        src = image;
      } else {
        src = cv.imread(this.editedImage);
      }
      const dst = new cv.Mat();
      const dsize = new cv.Size(0, 0);
      cv.resize(src, dst, dsize, this.imageResizeRatio, this.imageResizeRatio, cv.INTER_AREA);
      cv.imshow(this.previewCanvas.nativeElement, dst);
      src.delete();
      dst.delete();
      resolve();
    });
  }

  // *************** //
  // Utility Methods //
  // *************** //
  /**
   * set preview canvas dimensions according to the canvas element of the original image
   */
  private setPreviewPaneDimensions(img: HTMLCanvasElement) {
    // set preview pane dimensions
    this.previewDimensions = this.calculateDimensions(img.width, img.height);
    this.previewCanvas.nativeElement.width = this.previewDimensions.width;
    this.previewCanvas.nativeElement.height = this.previewDimensions.height;
    this.imageResizeRatio = this.previewDimensions.width / img.width;
    this.imageDivStyle = {
      width: this.previewDimensions.width + this.options.cropToolDimensions.width + 'px',
      height: this.previewDimensions.height + this.options.cropToolDimensions.height + 'px',
      'margin-left': `calc((100% - ${this.previewDimensions.width + 10}px) / 2 + ${this.options.cropToolDimensions.width / 2}px)`,
      'margin-right': `calc((100% - ${this.previewDimensions.width + 10}px) / 2 - ${this.options.cropToolDimensions.width / 2}px)`,
    };
    this.limitsService.setPaneDimensions({width: this.previewDimensions.width, height: this.previewDimensions.height});
  }

  /**
   * calculate dimensions of the preview canvas
   */
  private calculateDimensions(width: number, height: number): { width: number; height: number; ratio: number} {
    const ratio = width / height;

    const maxWidth = this.screenDimensions.width > this.maxPreviewWidth ?
      this.maxPreviewWidth : this.screenDimensions.width - 40;
    const maxHeight = this.screenDimensions.height - 240;
    const calculated = {
      width: maxWidth,
      height: Math.round(maxWidth / ratio),
      ratio: ratio
    };

    if (calculated.height > maxHeight) {
      calculated.height = maxHeight;
      calculated.width = Math.round(maxHeight * ratio);
    }
    return calculated;
  }

  /**
   * returns a point by it's roles
   * @param roles - an array of roles by which the point will be fetched
   */
  private getPoint(roles: RolesArray) {
    return this.points.find(point => {
      return this.limitsService.compareArray(point.roles, roles);
    });
  }
}

/**
 * a class for generating configuration objects for the editor
 */
class ImageEditorConfig implements DocScannerConfig {
  /**
   * max dimensions of oputput image. if set to zero
   */
  maxImageDimensions: ImageDimensions = {
    width: 800,
    height: 1200
  };
  /**
   * background color of the main editor div
   */
  editorBackgroundColor = '#fefefe';
  /**
   * css properties for the main editor div
   */
  editorDimensions: { width: string; height: string; } = {
    width: '100vw',
    height: '100vh'
  };
  /**
   * css that will be added to the main div of the editor component
   */
  extraCss: {[key: string]: string|number} = {
    position: 'absolute',
    top: 0,
    left: 0
  };

  /**
   * material design theme color name
   */
  buttonThemeColor: 'primary'|'warn'|'accent' = 'accent';
  /**
   * icon for the button that completes the editing and emits the edited image
   */
  exportImageIcon = 'cloud_upload';
  /**
   * color of the crop tool
   */
  cropToolColor = '#3cabe2';
  /**
   * shape of the crop tool, can be either a rectangle or a circle
   */
  cropToolShape: PointShape = 'rect';
  /**
   * dimensions of the crop tool
   */
  cropToolDimensions: ImageDimensions = {
    width: 10,
    height: 10
  };
  /**
   * aggregation of the properties regarding point attributes generated by the class constructor
   */
  pointOptions: PointOptions;
  /**
   * aggregation of the properties regarding the editor style generated by the class constructor
   */
  editorStyle?: {[key: string]: string|number};
  /**
   * crop tool outline width
   */
  cropToolLineWeight = 3;
  /**
   * maximum size of the preview pane
   */
  maxPreviewWidth = 800;

  constructor(options: DocScannerConfig) {
    if (options) {
      Object.keys(options).forEach(key => {
        this[key] = options[key];
      });
    }

    this.editorStyle = {'background-color': this.editorBackgroundColor };
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
}

