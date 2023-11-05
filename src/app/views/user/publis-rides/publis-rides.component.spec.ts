import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisRidesComponent } from './publis-rides.component';

describe('PublisRidesComponent', () => {
  let component: PublisRidesComponent;
  let fixture: ComponentFixture<PublisRidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisRidesComponent]
    });
    fixture = TestBed.createComponent(PublisRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
