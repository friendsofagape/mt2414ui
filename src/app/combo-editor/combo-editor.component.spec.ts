import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboEditorComponent } from './combo-editor.component';

describe('ComboEditorComponent', () => {
  let component: ComboEditorComponent;
  let fixture: ComponentFixture<ComboEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
