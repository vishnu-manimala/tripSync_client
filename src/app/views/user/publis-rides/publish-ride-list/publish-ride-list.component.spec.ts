import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishRideListComponent } from './publish-ride-list.component';

describe('PublishRideListComponent', () => {
  let component: PublishRideListComponent;
  let fixture: ComponentFixture<PublishRideListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishRideListComponent]
    });
    fixture = TestBed.createComponent(PublishRideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
