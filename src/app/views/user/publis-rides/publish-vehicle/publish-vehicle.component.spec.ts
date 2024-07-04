import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishVehicleComponent } from './publish-vehicle.component';

describe('PublishVehicleComponent', () => {
  let component: PublishVehicleComponent;
  let fixture: ComponentFixture<PublishVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishVehicleComponent]
    });
    fixture = TestBed.createComponent(PublishVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
