import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionQuizzesComponent } from './section-quizzes.component';

describe('SectionQuizzesComponent', () => {
  let component: SectionQuizzesComponent;
  let fixture: ComponentFixture<SectionQuizzesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionQuizzesComponent]
    });
    fixture = TestBed.createComponent(SectionQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
