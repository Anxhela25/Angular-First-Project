import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../entity/user.model';
import { UserService } from '../../service/user.service';
import { BookingModel } from '../../entity/booking.model';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  firstName: string;
  lastName: string;
  phoneNumber: number;

  users: UserModel[];
  booking: BookingModel[];

  userForm: FormGroup;

  constructor(private userService: UserService) {
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = 0;

    this.users = [];
    this.booking = [];

    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getusers();
  }

  getusers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  createUser(event: SubmitEvent) {
    event.preventDefault();

    let firstName = this.userForm.value.firstName;
    let lastName = this.userForm.value.lastName;
    let phoneNumber = this.userForm.value.phoneNumber;
    if (firstName && lastName && phoneNumber) {
      this.userService
        .createUser({ firstName, lastName, phoneNumber })

        .subscribe((user) => {
          this.users.push(user);
          this.userForm.reset();
        });
    } else {
      alert('Please fill in all fields');
    }
  }
}
