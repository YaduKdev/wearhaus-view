import { inject, Injectable } from '@angular/core';
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
  getHomeProductsFailure,
  getHomeProductsSuccess,
  searchProductsFailure,
  searchProductsRequest,
  searchProductsSuccess,
} from './product.actions';
import { catchError, map, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  API_BASE_URL = BASE_API_URL;
  private _snackBar = inject(MatSnackBar);

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

    return this.http
      .get(`${this.API_BASE_URL}/api/products`, { params })
      .pipe(
        map((data: any) => {
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

  getHomeProducts() {
    return this.http
      .get(`${this.API_BASE_URL}/api/products/home`)
      .pipe(
        map((data: any) => {
          return getHomeProductsSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            getHomeProductsFailure(
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
    return this.http
      .get(`${this.API_BASE_URL}/api/products/id/${productId}`)
      .pipe(
        map((data: any) => {
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
          this._snackBar.open('Product Deleted Successfully!', '', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
          });

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
          this._snackBar.open(
            'Product Created Successfully! Reloading Page, Please Wait...',
            '',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: 'success-snackbar',
            }
          );

          setTimeout(() => {
            window.location.reload();
          }, 3500);

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

  searchProducts(searchQuery: string) {
    const params = new HttpParams().set('q', searchQuery);

    this.store.dispatch(searchProductsRequest({ searchQuery }));

    return this.http
      .get(`${this.API_BASE_URL}/api/products/search`, { params })
      .pipe(
        map((data: any) => {
          return searchProductsSuccess({ payload: data });
        }),
        catchError((error: any) => {
          console.error('Search Error:', error);
          return of(
            searchProductsFailure({
              error: error.response?.data?.message || error.message,
            })
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  // Add method for advanced search with filters
  searchProductsWithFilters(filters: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const headers = this.getHeader();
    let params = new HttpParams();

    // Add each filter to params if it exists
    if (filters.search) params = params.set('q', filters.search);
    if (filters.category) params = params.set('category', filters.category);
    if (filters.minPrice)
      params = params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice)
      params = params.set('maxPrice', filters.maxPrice.toString());

    this.store.dispatch(
      searchProductsRequest({ searchQuery: filters.search || '' })
    );

    return this.http
      .get(`${this.API_BASE_URL}/api/products/search/filters`, {
        headers,
        params,
      })
      .pipe(
        map((data: any) => {
          return searchProductsSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            searchProductsFailure({
              error: error.response?.data?.message || error.message,
            })
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }
}
