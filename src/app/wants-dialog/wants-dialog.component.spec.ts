import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WantsDialogComponent } from './wants-dialog.component';

describe('WantsDialogComponent', () => {
  let component: WantsDialogComponent;
  let fixture: ComponentFixture<WantsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WantsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WantsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
