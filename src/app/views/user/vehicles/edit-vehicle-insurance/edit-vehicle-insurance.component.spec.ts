import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleInsuranceComponent } from './edit-vehicle-insurance.component';

describe('EditVehicleInsuranceComponent', () => {
  let component: EditVehicleInsuranceComponent;
  let fixture: ComponentFixture<EditVehicleInsuranceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVehicleInsuranceComponent]
    });
    fixture = TestBed.createComponent(EditVehicleInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
