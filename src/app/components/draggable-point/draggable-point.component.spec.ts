import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggablePointComponent } from './draggable-point.component';

describe('DraggablePointComponent', () => {
  let component: DraggablePointComponent;
  let fixture: ComponentFixture<DraggablePointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraggablePointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggablePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
