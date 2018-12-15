/**
 * describes a state object for the OpenCV module
 */
import {PointShape} from './PrivateModels';

export interface OpenCVState {
  ready: boolean;
  loading: boolean;
  error: boolean;
  state: string;
}

/**
 * describes an object with width and height properties
 */
export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * describes a configuration object for the editor
 */
export interface DocScannerConfig {
  /**
   * max dimensions of output image. if set to zero will not resize the image
   */
  maxImageDimensions?: ImageDimensions;
  /**
   * background color of the main editor div
   */
  editorBackgroundColor?: string;
  /**
   * css properties for the main editor div
   */
  editorDimensions?: { width: string; height: string; };
  /**
   * css that will be added to the main div of the editor component
   */
  extraCss?: { [key: string]: string | number };
  /**
   * material design theme color name
   */
  buttonThemeColor?: 'primary' | 'warn' | 'accent';
  /**
   * icon for the button that completes the editing and emits the edited image
   */
  exportImageIcon?: string;
  /**
   * color of the crop tool (points and connecting lines)
   */
  cropToolColor?: string;
  /**
   * shape of the crop tool points
   */
  cropToolShape?: PointShape;
  /**
   * width and height of the crop tool points
   */
  cropToolDimensions?: ImageDimensions;
  /**
   * weight of the crop tool's connecting lines
   */
  cropToolLineWeight?: number;
  /**
   * max width of the preview pane
   */
  maxPreviewWidth?: number;
}

/**
 * describes a configuration object for the OpenCV service
 */
export interface OpenCVConfig {
  /**
   * path to the directory containing the OpenCV files, in the form of '/path/to/<opencv directory>'
   * directory must contain the the following files:
   * --<OpenCvDir>
   * ----opencv.js
   * ----opencv_js.wasm
   */
  openCVDirPath?: string;
  /**
   * additional callback that will run when OpenCv has finished loading and parsing
   */
  runOnOpenCVInit?: Function;
}
