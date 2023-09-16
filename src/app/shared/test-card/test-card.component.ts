import { Component } from '@angular/core';

@Component({
  selector: 'app-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.css'],
})
export class TestCardComponent {
  submenu_icon: string = 'fa-chevron-down';
  is_submenu_open: boolean = false;
  dropdown_open: boolean = false;

  openCollaboratorsSubmenu(): void {
    this.toggleSubmenuIcon();
    this.toggleSubmenu();
  }

  private toggleSubmenuIcon(): void {
    if (this.submenu_icon == 'fa-chevron-down') {
      this.submenu_icon = 'fa-chevron-up';
    } else {
      this.submenu_icon = 'fa-chevron-down';
    }
  }

  private toggleSubmenu(): void {
    this.is_submenu_open = !this.is_submenu_open;
  }

  toggleSettingsDropdown(): void {
    this.dropdown_open = !this.dropdown_open;
  }
}
