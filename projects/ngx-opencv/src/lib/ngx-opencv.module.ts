import {ModuleWithProviders, NgModule} from '@angular/core';
import {OpenCVConfig} from './models';
import {NgxOpenCVService, OpenCvConfigToken} from './ngx-open-cv.service';


@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [],
  providers: [NgxOpenCVService]
})
export class NgxOpenCVModule {
  static forRoot(config: OpenCVConfig): ModuleWithProviders {
    return {
      ngModule: NgxOpenCVModule,
      providers: [{ provide: OpenCvConfigToken, useValue: config }]
    };
  }
}
