# Ngx Document Scanner  
  
An Angular component for cropping and enhancing images of documents, for implementation on a mobile or desktop app.  
It uses a [WASM](https://webassembly.org/) build of [OpenCV](https://opencv.org/) to manipulate images, to achieve near-native performance. 
Note that there are a few extra steps required to configure the component other than installing the package from npm.

## Live Demo
View a live demo **[here](https://roiperlman.github.io/ngx-document-scanner)**

## Installation & Setup
install the package via npm

    npm install ngx-document-scanner --save

the UI is based on `@angular/material`, if you don't have it installed:

    ng add @angular/material 

choose 'yes' when prompted if you wish to add angular animations as it is needed for some of the components.

##### Configure OpenCV 
copy the opencv.js files to your assets folder (or any other folder). you can build the files yourself ([instructions on the OpenCV site](https://docs.opencv.org/3.4/d4/da1/tutorial_js_setup.html)), or download them from this package's [repository](https://github.com/roiperlman/ngx-document-scanner).
both opencv.js & opencv_js.wasm need to placed in the same folder.

import the package to your `app.module`. you'll need to configure the location of the open cv files.
	
    import {OpenCVConfig} from 'ngx-document-scanner';
    import {NgxDocumentScannerModule} from 'ngx-document-scanner';
    
    // set the location of the OpenCV files
    const openCVConfig: OpenCVConfig = {
	  openCVDirPath: '/assets/opencv'  
	};
	
    @NgModule({ imports: 
      [NgxDocumentScannerModule.forRoot(openCVConfig)],
      bootstrap: [AppComponent]  
    })
    export class AppModule { }

## Usage

#### add component to template and bind to inputs and outputs.

    <ngx-doc-scanner 
         *ngIf="image"
         [file]="image"
         [config]="config"
         (editResult)="editResult($event)"
         (exitEditor)="exitEditor($event)"
         (error)="onError($event)"
         (processing)="editorState($event)">
    </ngx-doc-scanner>

#### set configuration options. for example:

    config: DocScannerConfig = {  
	    editorBackgroundColor: '#fafafa', 
	    buttonThemeColor: 'primary',  
	    cropToolColor: '#ff4081',  
	    cropToolShape: 'circle',
	    exportImageIcon: 'cloud_download'  
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


<a id="config"></a>
## Configuration Object
optional configuration values that can be passed to the component. 

    import {DocScannerConfig} from 'ngx-document-scanner'
    config: DocScannerConfig = {
	    ....
    }

| property | type | description |
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

## Ngx-OpenCV
The angular service used to load the open cv library and monitor it's state is also available as a standalone package: [NgxOpenCV](https://www.npmjs.com/ngx-opencv)

## License  
  
This project is licensed under the MIT License.

