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
export class TestCardComponent implements OnInit {
  is_submenu_open: boolean = false;
  dropdown_open: boolean = false;

  menu_items: MenuItem[] | undefined;

  @Input()
  test!: Test;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.menu_items = [
      {
        label: 'Settings',
        items: [
          {
            label: 'Edit test',
            icon: 'pi pi-file-edit',
          },
        ],
      },
    ];
  }

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

  onHandleNavigateToTest(test: Test): void {
    this.router.navigate(['/test', { data: JSON.stringify(test) }]);
  }
}
