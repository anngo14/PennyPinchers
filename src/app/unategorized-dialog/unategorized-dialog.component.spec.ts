import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnategorizedDialogComponent } from './unategorized-dialog.component';

describe('UnategorizedDialogComponent', () => {
  let component: UnategorizedDialogComponent;
  let fixture: ComponentFixture<UnategorizedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnategorizedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnategorizedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
