import { Component, OnInit } from '@angular/core';
import {DocScannerConfig} from '../../../../../ngx-document-scanner/src/lib/PublicModels';
import {DimensionsService} from '../../services/dimensions.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {

  overZone = false;
  image: File;
  processing: boolean;
  test: boolean;
  divHeight: string;
  config: DocScannerConfig = {
    editorBackgroundColor: '#fafafa',
    buttonThemeColor: 'primary',
    cropToolColor: '#ff4081',
    cropToolShape: 'rect'
  };

  constructor(public dimensions: DimensionsService) {
    this.dimensions.height.subscribe(height => {
      this.config.editorDimensions = {
        width: '100vw',
        height: height
      };
      this.divHeight = height;
    });
  }

  // ******************* //
  // file input handlers //
  // ******************* //
  dropFile(event) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files.item(0);
    if (this.isImage(file)) {
      this.loadFile(file);
    } else {
      this.overZone = false;
    }
  }

  loadFile(event: any) {
    this.processing = true;
    this.overZone = false;
    let f: File;
    if (event instanceof File) {
      f = event;
    } else {
      const files = event.target.files;
      f = files[0];
    }
    if (this.isImage(f)) {
      this.image = f;
    }
  }

  isImage(file: File) {
    const types = [
      'image/png',
      'image/jpeg',
      'image/jpg',
    ];
    return types.findIndex(type => {
      return type === file.type;
    }) !== -1;
  }


  // ******************************** //
  // bindings to doc scanner component//
  // ******************************** //
  // resets the file input when the user exits the editor
  exitEditor(message) {
    console.log(message);
    this.image = null;
  }

  // handles the result emitted by the editor
  editResult(result: Blob) {
    const link = <HTMLAnchorElement> document.createElement('a');
    link.href = URL.createObjectURL(result);
    link.setAttribute('download', `edited_image_${new Date().toLocaleString()}.${this.image.type.split('/')[1]}`);
    link.click();
  }

  // handles errors emitted by the component
  onError(err: Error) {
    console.error(err);
  }

  // handles changes in the editor state - is it processing or not
  editorState(processing) {
    this.processing = null;
    this.processing = processing;
  }

}
