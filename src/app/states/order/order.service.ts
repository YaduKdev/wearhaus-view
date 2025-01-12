import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import {
  cancelOrderFailure,
  cancelOrderSuccess,
  confirmOrderFailure,
  confirmOrderSuccess,
  createOrderFailure,
  createOrderSuccess,
  deleteOrderFailure,
  deleteOrderSuccess,
  deliverOrderFailure,
  deliverOrderSuccess,
  getAllOrdersFailure,
  getAllOrdersSuccess,
  getOrderByIdFailure,
  getOrderByIdSuccess,
  getOrderHistoryFailure,
  getOrderHistoryRequest,
  getOrderHistorySuccess,
  placeOrderFailure,
  placeOrderSuccess,
  shipOrderFailure,
  shipOrderSuccess,
} from './order.actions';
import { Store } from '@ngrx/store';
import { BASE_API_URL } from '../../config/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private API_BASE_URL = BASE_API_URL;

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  createOrder(reqData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .post(`${this.API_BASE_URL}/api/orders/`, reqData, { headers })
      .pipe(
        map((data: any) => {
          if (data._id) {
            this.router.navigate([`/checkout/payment/${data._id}`], {
              queryParams: { step: '3', orderId: data._id },
            });
          }

          return createOrderSuccess({ order: data });
        }),
        catchError((error: any) => {
          return of(
            createOrderFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  getOrderById(orderId: string) {
    if (
      typeof window !== 'undefined' &&
      window.localStorage &&
      localStorage.getItem('jwt')
    ) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      });

      return this.http
        .get(`${this.API_BASE_URL}/api/orders/${orderId}`, { headers })
        .pipe(
          map((data: any) => {
            return getOrderByIdSuccess({ order: data });
          }),
          catchError((error: any) => {
            return of(
              getOrderByIdFailure(
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

  getOrderHistory() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .get(`${this.API_BASE_URL}/api/orders/user`, { headers })
      .pipe(
        map((data: any) => {
          return getOrderHistorySuccess({ orders: data });
        }),
        catchError((error: any) => {
          return of(
            getOrderHistoryFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  getAllOrders() {
    if (
      typeof window !== 'undefined' &&
      window.localStorage &&
      localStorage.getItem('jwt')
    ) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      });

      return this.http
        .get(`${this.API_BASE_URL}/api/admin/orders/`, { headers })
        .pipe(
          map((data: any) => {
            return getAllOrdersSuccess({ payload: data });
          }),
          catchError((error: any) => {
            return of(
              getAllOrdersFailure(
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

  placeOrder(orderId: Number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .put(
        `${this.API_BASE_URL}/api/admin/orders/${orderId}/place`,
        {},
        { headers }
      )
      .pipe(
        map((data: any) => {
          return placeOrderSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            placeOrderFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  confirmOrder(orderId: Number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .put(
        `${this.API_BASE_URL}/api/admin/orders/${orderId}/confirm`,
        {},
        { headers }
      )
      .pipe(
        map((data: any) => {
          return confirmOrderSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            confirmOrderFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  cancelOrder(orderId: Number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .put(
        `${this.API_BASE_URL}/api/admin/orders/${orderId}/cancel`,
        {},
        { headers }
      )
      .pipe(
        map((data: any) => {
          return cancelOrderSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            cancelOrderFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  shipOrder(orderId: Number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .put(
        `${this.API_BASE_URL}/api/admin/orders/${orderId}/ship`,
        {},
        { headers }
      )
      .pipe(
        map((data: any) => {
          return shipOrderSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            shipOrderFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  deliverOrder(orderId: Number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .put(
        `${this.API_BASE_URL}/api/admin/orders/${orderId}/deliver`,
        {},
        { headers }
      )
      .pipe(
        map((data: any) => {
          return deliverOrderSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            deliverOrderFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  deleteOrder(orderId: Number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .put(
        `${this.API_BASE_URL}/api/admin/orders/${orderId}/delete`,
        {},
        { headers }
      )
      .pipe(
        map((data: any) => {
          return deleteOrderSuccess({ payload: data._id });
        }),
        catchError((error: any) => {
          return of(
            deleteOrderFailure(
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
