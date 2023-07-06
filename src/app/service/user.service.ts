import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserModel } from '../entity/user.model';
import { BookingModel } from '../entity/booking.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly urlu: string;
  private readonly urlb: string;

  @Output() openUserComponent: EventEmitter<void>;

  constructor(private httpClient: HttpClient) {
    this.urlu = `${environment.baseUrl}/users`;
    this.urlb = `${environment.baseUrl}/booking`;

    this.openUserComponent = new EventEmitter<void>();
  }

  getUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.urlu);
  }

  getBooking(): Observable<BookingModel[]> {
    return this.httpClient.get<BookingModel[]>(this.urlb);
  }

  createUser(newUser: Omit<UserModel, 'id' | 'active'>): Observable<UserModel> {
    const user: Omit<UserModel, 'id'> = {
      ...newUser,
      active: false,
    };

    return this.httpClient.post<UserModel>(this.urlu, user);
  }

  createBooking(
    newBooking: Omit<BookingModel, 'id' | 'active'>
  ): Observable<BookingModel> {
    const book: Omit<BookingModel, 'id'> = {
      ...newBooking,
      active: false,
    };

    return this.httpClient.post<BookingModel>(this.urlb, book);
  }

  deleteUserBooking(userId: number): Observable<unknown> {
    return this.httpClient
      .delete(`${this.urlb}/${userId}`)
      .pipe(map(() => userId));
  }
}
