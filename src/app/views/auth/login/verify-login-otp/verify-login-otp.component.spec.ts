import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyLoginOtpComponent } from './verify-login-otp.component';

describe('VerifyLoginOtpComponent', () => {
  let component: VerifyLoginOtpComponent;
  let fixture: ComponentFixture<VerifyLoginOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyLoginOtpComponent]
    });
    fixture = TestBed.createComponent(VerifyLoginOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
