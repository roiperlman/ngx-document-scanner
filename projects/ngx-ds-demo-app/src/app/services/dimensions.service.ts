import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DimensionsService {

  height: BehaviorSubject<string> = new BehaviorSubject<string>('600px');

  constructor() { }

  setHeight(height: string) {
    this.height.next(height);
  }
}
