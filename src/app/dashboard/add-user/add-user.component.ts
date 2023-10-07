import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DashboardService } from '../dashboard.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  users!: Array<User>;
  @Input()
  selectedUsers: Array<User> = new Array<User>();
  @Output()
  selectedUsersEmitter: EventEmitter<Array<User>> = new EventEmitter<
    Array<User>
  >();
  draggedTeacher: User | undefined | null;
  @Input()
  role!: string;
  searchTerm!: string;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.service.getAllUsersByRole(this.role.toUpperCase()).subscribe({
      next: (response) => {
        if (this.selectedUsers.length > 0) {
          this.users = response.content.filter(
            (user: User) => !this.isContaining(this.selectedUsers, user.id!)
          );
        } else {
          this.users = response.content;
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  dragStart(teacher: User) {
    this.draggedTeacher = teacher;
  }

  dragEnd() {
    this.draggedTeacher = null;
  }

  drop() {
    if (this.draggedTeacher) {
      let index = this.findIndex(this.draggedTeacher);
      this.selectedUsers = [
        ...(this.selectedUsers as User[]),
        this.draggedTeacher,
      ];
      this.users = this.users.filter((val, i) => i != index);
      this.draggedTeacher = null;
      this.selectedUsersEmitter.emit(this.selectedUsers);
    }
  }

  searchForUser() {
    this.service.getAllUsersByContainingFullName(this.searchTerm).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  deleteFromSelected(
    from: Array<User>,
    to: Array<User>,
    id: string | undefined
  ) {
    to.push(from.filter((user) => user.id == id)[0]);
    this.selectedUsers = from.filter((user) => user.id != id);
    this.selectedUsersEmitter.emit(this.selectedUsers);
  }

  private findIndex(teacher: User) {
    let index = -1;
    for (let i = 0; i < (this.users as User[]).length; i++) {
      if (teacher.id === (this.users as User[])[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }

  private isContaining(list: Array<User>, id: string) {
    let contains = list.filter((user: User) => user.id?.toString() == id);
    if (contains.length > 0) {
      return true;
    }

    return false;
  }
}
