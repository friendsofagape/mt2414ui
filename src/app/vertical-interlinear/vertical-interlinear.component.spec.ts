import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalInterlinearComponent } from './vertical-interlinear.component';

describe('VerticalInterlinearComponent', () => {
  let component: VerticalInterlinearComponent;
  let fixture: ComponentFixture<VerticalInterlinearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalInterlinearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalInterlinearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
