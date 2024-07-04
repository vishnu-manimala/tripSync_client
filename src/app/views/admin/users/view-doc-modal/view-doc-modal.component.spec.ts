import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocModalComponent } from './view-doc-modal.component';

describe('ViewDocModalComponent', () => {
  let component: ViewDocModalComponent;
  let fixture: ComponentFixture<ViewDocModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDocModalComponent]
    });
    fixture = TestBed.createComponent(ViewDocModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
