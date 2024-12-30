import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../config/api';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  deleteProductFailure,
  deleteProductSuccess,
  findProductsByCategoryFailure,
  findProductsByCategorySuccess,
  findProductsByIdFailure,
  findProductsByIdSuccess,
} from './product.actions';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  API_BASE_URL = BASE_API_URL;

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

  findProductsByCategory(reqData: any) {
    const {
      colors,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      category,
      stock,
      sort,
      pageNumber,
      pageSize,
    } = reqData;

    let params = new HttpParams()
      .set('color', colors)
      .set('sizes', sizes)
      .set('minPrice', minPrice)
      .set('maxPrice', maxPrice)
      .set('minDiscount', minDiscount)
      .set('category', category)
      .set('stock', stock)
      .set('sort', sort)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    const headers = this.getHeader();

    return this.http
      .get(`${this.API_BASE_URL}/api/products`, { headers, params })
      .pipe(
        map((data: any) => {
          console.log('Products Data', data);

          return findProductsByCategorySuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            findProductsByCategoryFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  findProductsById(productId: any) {
    const headers = this.getHeader();

    return this.http
      .get(`${this.API_BASE_URL}/api/products/id/${productId}`, { headers })
      .pipe(
        map((data: any) => {
          console.log('Product Details', data);

          return findProductsByIdSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            findProductsByIdFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  deleteProduct(productId: any) {
    const headers = this.getHeader();

    return this.http
      .delete(`${this.API_BASE_URL}/api/admin/products/${productId}`, {
        headers,
      })
      .pipe(
        map((data: any) => {
          console.log('Deleted Product', data);

          return deleteProductSuccess({ payload: data.deletedProductId });
        }),
        catchError((error: any) => {
          return of(
            deleteProductFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  createProduct(reqData: any) {
    const headers = this.getHeader();

    return this.http
      .post(`${this.API_BASE_URL}/api/admin/products`, reqData, { headers })
      .pipe(
        map((data: any) => {
          console.log('Created Product', data);

          return deleteProductSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            deleteProductFailure(
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
