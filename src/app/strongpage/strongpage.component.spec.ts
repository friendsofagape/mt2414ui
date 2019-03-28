import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrongpageComponent } from './strongpage.component';

describe('StrongpageComponent', () => {
  let component: StrongpageComponent;
  let fixture: ComponentFixture<StrongpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrongpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrongpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
