import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatToolbar} from '@angular/material/toolbar';

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

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngAfterViewInit() {
    this.topMargin = this.toolbar._elementRef.nativeElement.clientHeight + 'px';
    setTimeout(() => {
      this.outletCss = {
        width: '100vw',
        'max-width': '100vw',
        right: 0,
      };
    }, 10);
  }


}
