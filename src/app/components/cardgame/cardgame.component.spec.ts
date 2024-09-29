import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardgameComponent } from './cardgame.component';

describe('CardgameComponent', () => {
  let component: CardgameComponent;
  let fixture: ComponentFixture<CardgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardgameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
