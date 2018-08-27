import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearWidgetComponent } from './linear-widget.component';

describe('LinearWidgetComponent', () => {
  let component: LinearWidgetComponent;
  let fixture: ComponentFixture<LinearWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinearWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
