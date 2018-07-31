import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvToTableComponent } from './csv-to-table.component';

describe('CsvToTableComponent', () => {
  let component: CsvToTableComponent;
  let fixture: ComponentFixture<CsvToTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvToTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvToTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
