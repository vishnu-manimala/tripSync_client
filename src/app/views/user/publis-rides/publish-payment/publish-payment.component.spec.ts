import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishPaymentComponent } from './publish-payment.component';

describe('PublishPaymentComponent', () => {
  let component: PublishPaymentComponent;
  let fixture: ComponentFixture<PublishPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishPaymentComponent]
    });
    fixture = TestBed.createComponent(PublishPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
