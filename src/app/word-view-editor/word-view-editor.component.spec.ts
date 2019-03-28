import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordViewEditorComponent } from './word-view-editor.component';

describe('WordViewEditorComponent', () => {
  let component: WordViewEditorComponent;
  let fixture: ComponentFixture<WordViewEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordViewEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordViewEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
