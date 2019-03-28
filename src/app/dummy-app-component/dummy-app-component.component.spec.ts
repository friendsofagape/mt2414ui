import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyAppComponentComponent } from './dummy-app-component.component';

describe('DummyAppComponentComponent', () => {
  let component: DummyAppComponentComponent;
  let fixture: ComponentFixture<DummyAppComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyAppComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyAppComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
