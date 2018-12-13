import {AfterViewChecked, AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatToolbar} from '@angular/material';
import {DimensionsService} from '../../services/dimensions.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements AfterViewInit {

  topMargin = '25px';
  outletCss: {[key: string]: any};
  @ViewChild('toolbar') toolbar: MatToolbar;
  @Output() outletHeight: EventEmitter<string> = new EventEmitter<string>();


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private dimensions: DimensionsService) {
  }

  ngAfterViewInit() {
    this.topMargin = this.toolbar._elementRef.nativeElement.clientHeight + 'px';
    setTimeout(() => {
      this.outletCss = {
        width: '100vw',
        'max-width': '100vw',
        height: `calc(100vh - ${this.topMargin})`,
        'max-height': `calc(100vh - ${this.topMargin})`,
        top: this.topMargin,
        left: 0,
        right: 0,
      };
      this.dimensions.setHeight(this.outletCss.height);
    }, 20);
  }


}
