import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedGoalComponent } from './detailed-goal.component';

describe('DetailedGoalComponent', () => {
  let component: DetailedGoalComponent;
  let fixture: ComponentFixture<DetailedGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
