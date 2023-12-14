import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelBeginnerQuizComponent } from './travel-beginner-quiz.component';

describe('TravelBeginnerQuizComponent', () => {
  let component: TravelBeginnerQuizComponent;
  let fixture: ComponentFixture<TravelBeginnerQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelBeginnerQuizComponent]
    });
    fixture = TestBed.createComponent(TravelBeginnerQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
