import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { BASE_API_URL } from '../../config/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {
  createPaymentFailure,
  createPaymentSuccess,
  updatePaymentInfoFailure,
  updatePaymentInfoSuccess,
} from './payment.actions';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private API_BASE_URL = BASE_API_URL;

  private getHeader(): HttpHeaders {
    if (
      typeof window !== 'undefined' &&
      window.localStorage &&
      localStorage.getItem('jwt')
    ) {
      const token = localStorage.getItem('jwt');

      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      return new HttpHeaders().set('Authorization', `Bearer null`);
    }
  }

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  createPayment(orderId: any) {
    const headers = this.getHeader();

    return this.http
      .post(`${this.API_BASE_URL}/api/payments/${orderId}`, {}, { headers })
      .pipe(
        map((data: any) => {
          console.log('Payment', data);

          if (data.payment_link_url) {
            if (typeof window !== 'undefined')
              window.location.href = data.payment_link_url;
          }

          return createPaymentSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            createPaymentFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  updatePaymentInfo(reqData: any) {
    const headers = this.getHeader();

    return this.http
      .get(
        `${this.API_BASE_URL}/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`,
        { headers }
      )
      .pipe(
        map((data: any) => {
          console.log('update-payment', data);

          return updatePaymentInfoSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            updatePaymentInfoFailure(
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
