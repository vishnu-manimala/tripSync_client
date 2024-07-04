import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleBasicComponent } from './edit-vehicle-basic.component';

describe('EditVehicleBasicComponent', () => {
  let component: EditVehicleBasicComponent;
  let fixture: ComponentFixture<EditVehicleBasicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVehicleBasicComponent]
    });
    fixture = TestBed.createComponent(EditVehicleBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
