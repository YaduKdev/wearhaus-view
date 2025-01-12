import { inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '../../config/api';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import {
  addItemToCartFailure,
  addItemToCartSuccess,
  getCartFailure,
  getCartSuccess,
  removeCartItemFailure,
  removeCartItemSuccess,
  updateCartItemFailure,
  updateCartItemSuccess,
} from './cart.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  API_BASE_URL = BASE_API_URL;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  addItemToCart(reqData: any) {
    const url = `${this.API_BASE_URL}/api/cart/add`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .put(url, reqData, { headers })
      .pipe(
        map((data: any) => {
          this._snackBar.open('Item Added To Cart', '', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
          });

          return addItemToCartSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            addItemToCartFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.error
                ? error.error
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  getCart() {
    const url = `${this.API_BASE_URL}/api/cart/`;

    if (
      typeof window !== 'undefined' &&
      window.localStorage &&
      localStorage.getItem('jwt')
    ) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      });

      return this.http
        .get(url, { headers })
        .pipe(
          map((data: any) => {
            return getCartSuccess({ payload: data });
          }),
          catchError((error: any) => {
            return of(
              getCartFailure(
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

  removeCartItem(cartItemId: any) {
    const url = `${this.API_BASE_URL}/api/cart_items/${cartItemId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .delete(url, { headers })
      .pipe(
        map((data: any) => {
          return removeCartItemSuccess({ cartItemId });
        }),
        catchError((error: any) => {
          return of(
            removeCartItemFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  updateCartItem(reqData: any) {
    const url = `${this.API_BASE_URL}/api/cart_items/${reqData.cartItemId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .put(url, reqData.data, { headers })
      .pipe(
        map((data: any) => {
          return updateCartItemSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            updateCartItemFailure(
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
