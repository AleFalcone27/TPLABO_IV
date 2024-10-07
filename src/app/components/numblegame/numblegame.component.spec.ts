import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumblegameComponent } from './numblegame.component';

describe('NumblegameComponent', () => {
  let component: NumblegameComponent;
  let fixture: ComponentFixture<NumblegameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumblegameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumblegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
