import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishSettingComponent } from './publish-setting.component';

describe('PublishSettingComponent', () => {
  let component: PublishSettingComponent;
  let fixture: ComponentFixture<PublishSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishSettingComponent]
    });
    fixture = TestBed.createComponent(PublishSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
