import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../config/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import {
  getUserProfileSuccess,
  getUserProfileFailure,
  logoutSuccess,
} from './user.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = BASE_API_URL + '/api';

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {}

  getUserProfile() {
    if (
      typeof window !== 'undefined' &&
      window.localStorage &&
      localStorage.getItem('jwt')
    ) {
      return this.http
        .get(`${this.apiUrl}/users/profile`, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          }),
        })
        .pipe(
          map((user: any) => {
            console.log('User profile', user);

            return getUserProfileSuccess({ userProfile: user });
          }),
          catchError((error) => {
            return of(
              getUserProfileFailure(
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message
              )
            );
          })
        )
        .subscribe((action) => this.store.dispatch(action));
    } else {
      return;
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');

    this.store.dispatch(logoutSuccess());

    this.router.navigate(['/']);
  }
}
