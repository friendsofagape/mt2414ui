import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcvSearchComponent } from './bcv-search.component';

describe('BcvSearchComponent', () => {
  let component: BcvSearchComponent;
  let fixture: ComponentFixture<BcvSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcvSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcvSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
