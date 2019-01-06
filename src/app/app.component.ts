import { Component } from '@angular/core';
import {DraggablePointConfig} from './components/draggable-point/draggable-point.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'doc-scanner';
  points: Array<DraggablePointConfig> = [
    {
      startPosition: {
        x: 0,
        y: 0
      }
    },
    {
      startPosition: {
        x: 100,
        y: 0
      }
    },
    {
      startPosition: {
        x: 0,
        y: 100
      }
    },
    {
      startPosition: {
        x: 100,
        y: 100
      }
    },
  ];
  image: File;

  addPoint() {
    this.points.push({width: 15, height: 15});
  }
}
