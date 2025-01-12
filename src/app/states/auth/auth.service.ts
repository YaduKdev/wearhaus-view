import { inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '../../config/api';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import {
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
} from './auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = BASE_API_URL + '/auth';
  private _snackBar = inject(MatSnackBar);

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {}

  login(loginData: any) {
    return this.http
      .post(`${this.apiUrl}/signin`, loginData)
      .pipe(
        map((user: any) => {
          if (user.jwt) {
            localStorage.setItem('jwt', user.jwt);
            localStorage.setItem('role', user.role);

            this.router.navigate(['/']);

            this._snackBar.open('Logged In Successfully!', '', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: 'success-snackbar',
            });
          }
          return loginSuccess({ user });
        }),
        catchError((error) => {
          return of(
            loginFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  register(user: any) {
    return this.http
      .post(`${this.apiUrl}/signup`, user)
      .pipe(
        map((user: any) => {
          if (user.jwt) {
            localStorage.setItem('jwt', user.jwt);
            localStorage.setItem('role', user.role);

            this.router.navigate(['/']);

            this._snackBar.open('Registered Successfully!', '', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: 'success-snackbar',
            });
          }
          return registerSuccess({ user });
        }),
        catchError((error) => {
          return of(
            registerFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }
}
