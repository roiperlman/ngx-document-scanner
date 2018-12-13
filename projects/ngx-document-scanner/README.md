# Ngx Document Scanner  
  
An Angular component for cropping and enhancing images of documents, for implementation on a mobile or desktop app.  
It uses a [WASM](https://webassembly.org/) build of [OpenCV](https://opencv.org/) to manipulate images, to achieve near-native performance. 
Note that there are a few extra steps required to configure the component other than installing the package from npm.

## Live Demo
View a live demo on https://roiperlman.github.io

## Installing
install the package via npm

    npm install ngx-document-scanner --save

copy the opencv.js files to your assets folder (or any other folder). you can build the files yourself ([instructions on the OpenCV site](https://docs.opencv.org/3.4/d4/da1/tutorial_js_setup.html)), or download them from this package's [repository](https://github.com/roiperlman/ngx-document-scanner).
both opencv.js & opencv_js.wasm need to places in the same folder.

import the package to your `app.module.ts` file. you'll need to configure the location of the open cv files.
	
    import {OpenCvConfig} from 'ngx-document-scanner';
    import {NgxDocumentScannerModule} from 'ngx-document-scanner';
    //set the location of the OpenCV files
    const OpenCvConfig: OpenCvConfig = {
	  openCvDirPath: '/assets/opencv'  
	};
	
    @NgModule({ imports: 
      [NgxDocumentScannerModule.forRoot(OpenCvConfig)],
      bootstrap: [AppComponent]  
    })
    export class AppModule { }

## Usage

#### add component to tmplate and bind to inputs and outputs.

    <ngx-doc-scanner 
				 *ngIf="image"
                 [file]="image"
                 (editResult)="editResult($event)"
                 (exitEditor)="exitEditor($event)"
                 (error)="onError($event)"
                 (processing)="editorState($event)"
                 [config]="config">
    </ngx-doc-scanner>

#### set configuration otpions. for example:

    config: DocScannerConfig = {  
	    editorBackgroundColor: '#fafafa', 
	    buttonThemeColor: 'primary',  
	    cropToolColor: '#ff4081',  
	    cropToolShape: 'circle'  
    };

## Component I\O
### Inputs
	
|input|type|description|
|--|--|--|
| **file** | `File` | sets an image for editing |
| **config** | `DocScannerConfig` | configuration object for the component. see [section](#config) dedicated to te config object. |

### Outputs

|output|type|description|
|--|--|--|
| **error** | `EventEmitter<any>` | fires on error |
| **editResult** | `EventEmitter<Blob>` | fires when the users submits the image |
|**exitEditor**| `EventEmitter<any>`| fires when the user exits the editor|
|**processing**|`EventEmitter<boolean>`|fires true when the editor is prcessing or loading\parsing the OpenCV module.


##  editResult  
  
**● editResult**: *`EventEmitter`<`any`>* =  new EventEmitter<any>()

<a id="config"></a>
## Configuration Object
optional configuration values that can be passed to the component. 

    import {DocScannerConfig} form 'ngx-document-scanner'
    config: DocScannerConfig = {
	    ....
    }

| poperty | type | description |
|--|--|--|
|**buttonThemeColor** | "primary" &#124; "warn" &#124; "accent"  | material design theme color name  for the buttons on the component|
|**cropToolColor**|`string`|color of the crop tool (points and connecting lines)  |
|**cropToolDimensions**  | `{width: number; height: nubmer;}`| width and height of the crop tool points|
|**cropToolLineWeight**  |`number`|weight of the crop tool's connecting lines  |
|**cropToolShape**|`'rect' &#124; 'circle'`|shape of the crop tool points  |
|**editorBackgroundColor**|`string`|background color of the main editor div  |
|**editorDimensions** | an object of css keys value pairs| css properties for the main editor div  |
|**exportImageIcon**  |`string`| icon for the button that completes the editing and emits the edited image.|
**extraCss**|an object of css keys value pairs|css that will be added to the main div of the editor component |
|**maxImageDimensions**  | `{width: number; height: nubmer;}` | max dimensions of oputput image. if set to zero will not resize the image.|
|**maxPreviewWidth**  | `number`|max width of the preview pane|


## License  
  
This project is licensed under the MIT License.

