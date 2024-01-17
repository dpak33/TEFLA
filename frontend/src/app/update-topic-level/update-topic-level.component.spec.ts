import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTopicLevelComponent } from './update-topic-level.component';

describe('UpdateTopicLevelComponent', () => {
  let component: UpdateTopicLevelComponent;
  let fixture: ComponentFixture<UpdateTopicLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTopicLevelComponent]
    });
    fixture = TestBed.createComponent(UpdateTopicLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
