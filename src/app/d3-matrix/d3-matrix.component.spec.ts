import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3MatrixComponent } from './d3-matrix.component';

describe('D3MatrixComponent', () => {
  let component: D3MatrixComponent;
  let fixture: ComponentFixture<D3MatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3MatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3MatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
