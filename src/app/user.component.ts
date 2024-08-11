import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>Users</h1>
      <ul>
        <li *ngFor="let user of users">{{ user.name }} ({{ user.email }})</li>
      </ul>
      <button (click)="addUser()">Add User</button>
    </div>
  `,
})
export class UserComponent {
  private userService = inject(UserService);
  users: any[] = [];

  constructor() {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  addUser() {
    this.userService.createUser('New User', 'newuser@example.com').subscribe((user) => {
      const newUsers = [...this.users];
      newUsers.push(user);
      this.users = newUsers;
    });
  }
}
