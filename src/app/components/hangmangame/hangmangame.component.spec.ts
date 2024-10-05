import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangmangameComponent } from './hangmangame.component';

describe('HangmangameComponent', () => {
  let component: HangmangameComponent;
  let fixture: ComponentFixture<HangmangameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HangmangameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HangmangameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
