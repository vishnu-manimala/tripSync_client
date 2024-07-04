import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleterideModalComponent } from './deleteride-modal.component';

describe('DeleterideModalComponent', () => {
  let component: DeleterideModalComponent;
  let fixture: ComponentFixture<DeleterideModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleterideModalComponent]
    });
    fixture = TestBed.createComponent(DeleterideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
