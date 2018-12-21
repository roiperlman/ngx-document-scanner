# Ngx OpenCv
NgxOpenCV is a lightweight angular service for integrating OpenCV.js [WASM](https://webassembly.org/) in Angular 2+ applications.  
OpenCV on WASM offers near-native performance in web-based applications;  
The service loads the library in the angular zone, thus enabling better control over it's state.
Note that there are a few extra steps required to configure the component other than installing the package from npm.

## Live Demo
View a live demo of an implementation of this library in another project - **[here](https://roiperlman.github.io/ngx-document-scanner)**

## Installation & Setup
install the package via npm

    npm install ngx-opencv --save

copy the opencv.js files to your assets folder (or any other folder). you can build the files yourself ([instructions on the OpenCV site](https://docs.opencv.org/3.4/d4/da1/tutorial_js_setup.html)), or download them from this package's [repository](https://github.com/roiperlman/ngx-document-scanner).
both opencv.js & opencv_js.wasm need to placed in the same folder.

import the module to your `app.module`. you'll need to configure the location of the open cv files.
	
    import {OpenCVConfig} from 'ngx-document-scanner';
    import {NgxOpencv} from 'ngx-opencv';
    
    // set the location of the OpenCV files
    const openCVConfig: OpenCVConfig = {
	  openCVDirPath: '/assets/opencv'  
	};
	
    @NgModule({ imports: [
      NgxOpenCVModule.forRoot(openCVConfig)
    ],
      bootstrap: [AppComponent]  
    })
    export class AppModule { }
    
    
You'll need to set 'cv' as a global variable, or on the component level:

    declare var cv: any; 

this is very important to avoid TypeScript errors.

## Usage

Inject NgxOpenCVService to the constructor of your component / service etc. and subscribe to the cvState observable.

		constructor(private ngxOpenCv: NgxOpenCVService) {  
		  // subscribe to status of OpenCV module  
		  this.ngxOpenCv.cvState.subscribe(
		    (cvState: OpenCVState) => {  
		      // do something with the state string
		      this.cvState = cvState.state;  
		      if (cvState.error) {
		        // handle errors
		      } else if (cvState.loading) {
		        // e.g. show loading indicator  
		      } else if (cvState.ready) {  
		        // do image processing stuff
		      }  
		  });
		}

**Note that loading and parsing of the OpenCV library is done synchronously, and might take some time while blocking execution of other processes, depending on client's device.** Therefore it's recommended to bind a loading indicator to the state observable. 

The observable emits an `OpenCVState` object when changes occur, with the following properties: 

| property |type  | description |
|--|--|--|
| loading | boolean  | true when loading of the opencv  lib. is initiated, until it's completion callback is fires or the listener pick up an error |
| error | boolean | true when an error is picked up by the listener |
| ready | boolean | true when loading **and parsing** was copleted |
| state | string | indicates the current state of the module as a string |


## Configuration Options
You can configure the service with the OpenCVConfig object

    import {OpenCvConfig} from 'ngx-document-scanner';

| property | type | description |  
|--|--|--|  
|openCVDirPath| string |  path to the directory containing the OpenCV files, in the form of `'/path/to/[opencv directory]'`. directory must contain `opencv.js` & `opencv_js.wasm`.|
|runOnOpenCVInit| Function| additional callback that will run when OpenCv has finished loading and parsing. callback runs in the angular zone in the context of the service.|
    
