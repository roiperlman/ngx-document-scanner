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

export interface OpenCVState {
  ready: boolean;
  loading: boolean;
  error: boolean;
  state: string;
}
