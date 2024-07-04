import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleRegistrationComponent } from './edit-vehicle-registration.component';

describe('EditVehicleRegistrationComponent', () => {
  let component: EditVehicleRegistrationComponent;
  let fixture: ComponentFixture<EditVehicleRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVehicleRegistrationComponent]
    });
    fixture = TestBed.createComponent(EditVehicleRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
