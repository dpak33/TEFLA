import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelBeginnerComponent } from './travel-beginner.component';

describe('TravelBeginnerComponent', () => {
  let component: TravelBeginnerComponent;
  let fixture: ComponentFixture<TravelBeginnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelBeginnerComponent]
    });
    fixture = TestBed.createComponent(TravelBeginnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
