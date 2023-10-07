import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface TestSettings {
  opensAt: Date;
  closesAt: Date;
}

@Component({
  selector: 'app-test-settings',
  templateUrl: './test-settings.component.html',
  styleUrls: ['./test-settings.component.css'],
})
export class TestSettingsComponent {
  @Input()
  isOpen: boolean = false;
  @Output()
  toggleIsOpen: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  settings: EventEmitter<TestSettings> = new EventEmitter<TestSettings>();

  testOpens: Date | undefined | null;
  selectedDate: Date | undefined;
  selectedHour!: number;
  selectedMinute!: number;
  isOpenDateDisabled: boolean = false;

  toggleIsOpenDateDisabled(): void {
    this.isOpenDateDisabled = !this.isOpenDateDisabled;
    if (this.isOpenDateDisabled) {
      this.testOpens = new Date();
    } else {
      this.testOpens = undefined;
    }
  }

  createTestOpenDate(): void {
    const date = this.selectedDate || new Date();
    const hour = this.selectedHour || 0;
    const minute = this.selectedMinute || 0;

    const newDate = new Date(date);
    newDate.setHours(hour);
    newDate.setMinutes(minute);

    this.testOpens = newDate;
  }

  handleSettingsSave(): void {
    console.log('ada');

    const settings: TestSettings = {
      opensAt: this.testOpens!,
      closesAt: new Date(),
    };

    this.settings.emit(settings);
    this.toggleIsOpen.emit();
  }
}
