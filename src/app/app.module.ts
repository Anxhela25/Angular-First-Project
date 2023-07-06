import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular';

import { AppComponent } from './app.component';
import { BookingComponent } from './component/booking/booking.component';
import { UsersComponent } from './component/users/users.component';
import { CalendarComponent } from './component/calendar/calendar.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpGlobalErrorHandlerInterceptor } from './http-global-error-handler.intercepter';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    UsersComponent,

    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpGlobalErrorHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
