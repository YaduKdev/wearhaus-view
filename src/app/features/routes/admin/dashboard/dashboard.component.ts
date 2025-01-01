import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { OrderService } from '../../../../states/order/order.service';
import { ProductService } from '../../../../states/product/product.service';
import { AppState } from '../../../../models/appState';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  displayedColumns: string[] = ['image', 'price', 'status'];
  displayedColumnsP: string[] = ['image', 'category', 'price', 'quantity'];
  productData: any;
  ordersData: any;

  constructor(
    private store: Store<AppState>,
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    let reqData = {
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      pageNumber: 1,
      pageSize: 10,
      sort: 'popularity',
      stock: null,
    };

    this.productService.findProductsByCategory(reqData);

    this.orderService.getAllOrders();

    this.store
      .pipe(select((store: AppState) => store.product))
      .subscribe((data) => {
        this.productData = data.products.content.slice(0, 5);
      });

    this.store
      .pipe(select((store: AppState) => store.order))
      .subscribe((data) => {
        console.log('ORDERS DATA', data.orders);
        this.ordersData = data.orders.slice(0, 5);
      });
  }

  navigateTo(path: any) {
    this.router.navigate([path]);
  }
}
