import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgxOpenCvService, OpenCvConfigToken} from './services/ngx-open-cv.service';
import {NgxDraggablePointComponent} from './components/draggable-point/ngx-draggable-point.component';
import {NgxFilterMenuComponent} from './components/filter-menu/ngx-filter-menu.component';
import {NgxShapeOutlineComponent} from './components/shape-outline/ngx-shape-outline.component';
import {NgxDocScannerComponent} from './components/image-editor/ngx-doc-scanner.component';
import {LimitsService} from './services/limits.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatBottomSheetModule, MatButtonModule, MatIconModule, MatListModule} from '@angular/material';
import {AngularDraggableModule} from 'angular2-draggable';
import {CommonModule} from '@angular/common';
import {OpenCvConfig} from './PublicModels';

@NgModule({
  declarations: [
    NgxDraggablePointComponent,
    NgxFilterMenuComponent,
    NgxShapeOutlineComponent,
    NgxDocScannerComponent,
  ],
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
    MatListModule,
    AngularDraggableModule,
    CommonModule,
  ],
  exports: [
    NgxDocScannerComponent,
  ],
  entryComponents: [
    NgxFilterMenuComponent,
  ],
  providers: [
    NgxOpenCvService,
    LimitsService,
  ]
})
export class NgxDocumentScannerModule {
  static forRoot(config: OpenCvConfig): ModuleWithProviders {
    return {
      ngModule: NgxDocumentScannerModule,
      providers: [{ provide: OpenCvConfigToken, useValue: config }]
    };
  }
}
