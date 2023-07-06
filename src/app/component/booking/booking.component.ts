import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { BookingModel } from '../../entity/booking.model';
import { UserService } from '../../service/user.service';
import { formatDate } from '@angular/common';
import { UserModel } from '../../entity/user.model';
import { Event } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { FullCalendarComponent } from '@fullcalendar/angular';

import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  service: string;
  dateTime: Date;

  selectedUser: any;

  booking: BookingModel[];
  users: UserModel[] = [];

  bookingForm: FormGroup;

  usersComponent: any;

  constructor(private userService: UserService) {
    this.service = '';
    this.dateTime = new Date();

    this.selectedUser = null;

    this.booking = [];

    this.bookingForm = new FormGroup({
      service: new FormControl('', Validators.required),
      dateTime: new FormControl('', Validators.required),
    });
  }

  selectUserFromList(users: UserModel[]): UserModel | null {
    const userNames = users.map((user) => user.firstName + ' ' + user.lastName);
    const selectedUserName = window.prompt(
      'Please enter the number of the user you want to choose:\n\n' +
        userNames.map((name, index) => `${index + 1}. ${name}`).join('\n')
    );

    if (selectedUserName) {
      const selectedIndex = parseInt(selectedUserName, 10) - 1;
      if (selectedIndex >= 0 && selectedIndex < users.length) {
        return users[selectedIndex];
      }
    }

    return null;
  }

  openUser() {
    const isNewUser = confirm('Is this a new user?');
    if (isNewUser) {
      this.userService.openUserComponent.emit();
    } else {
      this.userService.getUsers().subscribe((users) => {
        const selectedUser = this.selectUserFromList(users);
        if (selectedUser) {
          this.selectedUser = selectedUser;
          this.users = users;
        }
      });
    }
  }

  ngOnInit(): void {
    this.getbooking();
  }
  getbooking() {
    this.userService.getBooking().subscribe((booking) => {
      this.booking = booking;
    });
  }

  onDelete(book: BookingModel): void {
    const { id, dateTime } = book;
    const currentTime = new Date();
    if (currentTime <= new Date(dateTime)) {
      if (confirm(`Are you sure you want to delete this booking? `)) {
        this.userService.deleteUserBooking(id).subscribe((deletedUserId) => {
          const deletedUserIndex: number = this.booking.findIndex(
            (user) => user.id === deletedUserId
          );

          if (deletedUserIndex !== -1) {
            this.booking.splice(deletedUserIndex, 1);
          }
        });
      }
    } else {
      alert('You cannot delete a booking with a past date/time.');
    }
  }

  createBooking(event: SubmitEvent): void {
    event.preventDefault();
    let service = this.bookingForm.value.service;
    let dateTime = this.bookingForm.value.dateTime;

    if (service && dateTime) {
      dateTime = formatDate(dateTime, 'short', 'en-US');
      const bookingData = {
        service,
        dateTime,
        user: {
          firstName: this.selectedUser.firstName,
          lastName: this.selectedUser.lastName,
          phoneNumber: this.selectedUser.phoneNumber,
        },
      };

      this.userService.createBooking(bookingData).subscribe((book) => {
        this.booking.push(book);
        this.bookingForm.reset();
      });
    } else {
      alert('Please fill in all fields');
    }
  }
}
