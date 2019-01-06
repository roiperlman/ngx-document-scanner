import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements OnInit {

  /**
   * an array of action buttons displayed on the editor screen
   */
  private editorButtons: Array<EditorActionButton> = [
    {
      name: 'exit',
      action: this.exit,
      icon: 'arrow_back',
      type: 'fab',
      mode: 'crop'
    },
    {
      name: 'rotate',
      action: function() {},
      icon: 'rotate_right',
      type: 'fab',
      mode: 'crop'
    },
    {
      name: 'done_crop',
      action: () => {
        this.mode = 'color';
      },
      icon: 'done',
      type: 'fab',
      mode: 'crop'
    },
    {
      name: 'back',
      action: () => {
        this.mode = 'color';
      },
      icon: 'arrow_back',
      type: 'fab',
      mode: 'color'
    },
    {
      name: 'filter',
      action: () => {
        return this.applyFilter('default');
      },
      icon: 'photo_filter',
      type: 'fab',
      mode: 'color'
    },
    {
      name: 'upload',
      action: this.exit,
      icon: 'cloud_upload',
      type: 'fab',
      mode: 'color'
    },
  ];
  get displayedButtons() {
    return this.editorButtons.filter(button => {
      return button.mode === this.mode;
    });
  }
  private maxDisplayWidth: 800;
  imageDivStyle: {'background-image': string; width: string; height: string; };
  imageLoaded = false;
  mode: 'crop'|'color';
  private screenDimensions: ImageDimensions;
  private imageDimensions: ImageDimensions;
  private imageResizeRatio: number;
  private originalImage: HTMLCanvasElement;
  private editedImage: HTMLCanvasElement;
  private _file: File;
  @Output() error: EventEmitter<any> = new EventEmitter<any>();
  @Output() exitEditor: EventEmitter<any> = new EventEmitter<any>();
  @Output() editResult: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  set file(image: File) {
    this._file = image;
    this.readImage()
      .then(() => {

      })
      .catch(err => {
        console.error(err);
        this.error.emit(err);
      });
  }
  @Input() maxImageWidth: number;
  @Input() buttonThemeColor: 'primary'|'warn'|'accent' = 'accent';

  constructor() {
    this.screenDimensions = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  ngOnInit() {
    this.mode = 'crop';
  }

  exit() {
    this.exitEditor.emit('canceled');
  }

  applyFilter(filter) {

  }

  saveImage() {
    this.editResult.emit(this.editedImage);
  }

  resizeImage() {

  }

  readFile() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log(event);
        resolve(reader.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsDataURL(this._file);
    });
  }

  readImage() {
    return new Promise(async (resolve, reject) => {
      let imageSrc;
      try {
        imageSrc = await this.readFile();
      } catch (err) {
        reject(err);
      }
      const img = new Image();
      img.onload = () => {
        const canvasDimensions = this.calculateDimensions(img.width, img.height);
        this.imageResizeRatio = canvasDimensions.ratio;

        this.originalImage = <HTMLCanvasElement> document.createElement('canvas');
        this.originalImage.width = canvasDimensions.width;
        this.originalImage.height = canvasDimensions.height;
        this.imageDimensions.width = canvasDimensions.width;
        this.imageDimensions.height = canvasDimensions.height;
        const ctx = this.originalImage.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve();
      };
      img.src = imageSrc;
    });
  }

  calculateDimensions(width: number, height: number): { width: number; height: number; ratio: number} {
    const ratio = width / height;
    const maxWidth = this.screenDimensions.width < this.maxDisplayWidth ? this.screenDimensions.width = 30 : this.maxDisplayWidth;
    if (width > this.maxDisplayWidth) {
      return {
        width: maxWidth,
        height: maxWidth * ratio,
        ratio: maxWidth / ratio
      };
    }
  }


}


export interface ImageDimensions {
  width: number;
  height: number;
}

export interface EditorActionButton {
  name: string;
  type: 'button'|'fab';
  icon: string;
  action: Function;
  text?: string;
  mode: 'crop'|'color';
}
