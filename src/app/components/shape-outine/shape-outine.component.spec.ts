import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeOutineComponent } from './shape-outine.component';

describe('ShapeOutineComponent', () => {
  let component: ShapeOutineComponent;
  let fixture: ComponentFixture<ShapeOutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeOutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeOutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
