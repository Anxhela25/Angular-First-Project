import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';
import { UserService } from '../../service/user.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { BookingModel } from '../../entity/booking.model';
import { UserModel } from '../../entity/user.model';
import { EventInput } from '@fullcalendar/core';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
// export class CalendarComponent implements OnInit {
//   calendarOptions: CalendarOptions = {
//     initialView: 'dayGridMonth',
//     plugins: [dayGridPlugin],
//   };

//   ngOnInit(): void {}
// }
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getBooking();
  }

  getBooking() {
    this.userService.getBooking().subscribe((bookings) => {
      const events = this.mapBookingsToEvents(bookings);
      this.calendarOptions.events = events;
    });
  }

  mapBookingsToEvents(bookings: BookingModel[]): any {
    return bookings.map((booking) => ({
      title: booking.service,
      start: new Date(booking.dateTime),
    }));
  }
}
