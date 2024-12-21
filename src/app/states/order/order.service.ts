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
export class ProductService {
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
          if (data.id) {
            this.router.navigate([`/checkout/payment/${data.id}`], {
              queryParams: { step: '3', orderId: data.id },
            });
          }

          console.log('CREATED ORDER', data);

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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .get(`${this.API_BASE_URL}/api/orders/${orderId}`, { headers })
      .pipe(
        map((data: any) => {
          console.log('ORDER BY ID', data);

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
          console.log('ORDER HISTORY', data);

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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .get(`${this.API_BASE_URL}/api/admin/orders/`, { headers })
      .pipe(
        map((data: any) => {
          console.log('ALL ORDERS', data);

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
          console.log('PLACED ORDER', data);

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
          console.log('CONFIRMED ORDER', data);

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
          console.log('CANCELLED ORDER', data);

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
          console.log('SHIPPED ORDER', data);

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
          console.log('DELIVERED ORDER', data);

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
          console.log('DELETED ORDER', data);

          return deleteOrderSuccess({ payload: orderId });
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
