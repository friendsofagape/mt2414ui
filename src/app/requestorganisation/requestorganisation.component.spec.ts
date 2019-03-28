import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestorganisationComponent } from './requestorganisation.component';

describe('RequestorganisationComponent', () => {
  let component: RequestorganisationComponent;
  let fixture: ComponentFixture<RequestorganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestorganisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestorganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
