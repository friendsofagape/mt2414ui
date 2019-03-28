import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordViewAlignerComponent } from './word-view-aligner.component';

describe('WordViewAlignerComponent', () => {
  let component: WordViewAlignerComponent;
  let fixture: ComponentFixture<WordViewAlignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordViewAlignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordViewAlignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
