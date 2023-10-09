import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Test } from 'src/app/models/test.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.css'],
})
export class TestCardComponent {
  is_submenu_open: boolean = false;
  dropdown_open: boolean = false;

  menu_items: MenuItem[] | undefined;

  @Input()
  test!: Test;

  constructor(private router: Router) {}

  toggleCollaboratorsSubmenu(): void {
    this.is_submenu_open = !this.is_submenu_open;
  }

  getCollaboratorInitials(collaborator: User): string {
    var names = collaborator.fullName?.split(' ');
    if (names) {
      return names[0].charAt(0) + names[1].charAt(0);
    }

    return '';
  }

  onHandleNavigateToEditTest(id: string) {
    this.router.navigateByUrl('edit/' + id);
  }

  onHandleNavigateToTest(test: Test): void {
    this.router.navigateByUrl('test/' + test.id);
  }
}
