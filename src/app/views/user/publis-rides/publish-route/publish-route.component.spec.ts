import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishRouteComponent } from './publish-route.component';

describe('PublishRouteComponent', () => {
  let component: PublishRouteComponent;
  let fixture: ComponentFixture<PublishRouteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishRouteComponent]
    });
    fixture = TestBed.createComponent(PublishRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
