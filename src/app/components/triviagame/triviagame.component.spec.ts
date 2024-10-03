import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviagameComponent } from './triviagame.component';

describe('TriviagameComponent', () => {
  let component: TriviagameComponent;
  let fixture: ComponentFixture<TriviagameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriviagameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriviagameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
