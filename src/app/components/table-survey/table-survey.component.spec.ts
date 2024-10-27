import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSurveyComponent } from './table-survey.component';

describe('TableSurveyComponent', () => {
  let component: TableSurveyComponent;
  let fixture: ComponentFixture<TableSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
