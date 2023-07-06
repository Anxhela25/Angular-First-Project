import { Component, OnInit } from '@angular/core';

import { UserService } from './service/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showUsersComponent: boolean;
  showComponent: boolean;
  disableAddUserButton: boolean;
  disableAddBookingButton: boolean;

  constructor(private userService: UserService) {
    this.showUsersComponent = false;
    this.showComponent = false;
    this.disableAddUserButton = false;
    this.disableAddBookingButton = false;
  }

  ngOnInit() {
    this.userService.openUserComponent.subscribe(() => {
      this.showUsersComponent = true;
    });
  }
  toggleUsersComponent() {
    this.showUsersComponent = !this.showUsersComponent;
    this.disableAddBookingButton = this.showUsersComponent;
  }

  toggleComponent() {
    this.showComponent = !this.showComponent;
    this.disableAddUserButton = this.showComponent;
  }
}
