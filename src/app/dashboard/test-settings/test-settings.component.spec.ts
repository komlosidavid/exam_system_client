import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSettingsComponent } from './test-settings.component';

describe('TestSettingsComponent', () => {
  let component: TestSettingsComponent;
  let fixture: ComponentFixture<TestSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestSettingsComponent]
    });
    fixture = TestBed.createComponent(TestSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
