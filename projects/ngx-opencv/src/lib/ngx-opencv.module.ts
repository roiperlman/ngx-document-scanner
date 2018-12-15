import {ModuleWithProviders, NgModule} from '@angular/core';
import {OpenCVConfig} from './models';
import {NgxOpenCvService, OpenCvConfigToken} from './ngx-open-cv.service';


@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [],
  providers: [NgxOpenCvService]
})
export class NgxOpencvModule {
  static forRoot(config: OpenCVConfig): ModuleWithProviders {
    return {
      ngModule: NgxOpencvModule,
      providers: [{ provide: OpenCvConfigToken, useValue: config }]
    };
  }
}
