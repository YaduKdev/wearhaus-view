import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OrderService } from '../../../../states/order/order.service';
import { AppState } from '../../../../models/appState';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-orders-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'image',
    'title',
    'id',
    'price',
    'status',
    'update',
    'delete',
  ];
  ordersData: any;
  totalOrders: any;

  constructor(
    private store: Store<AppState>,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderService.getAllOrders();

    this.store
      .pipe(select((store: AppState) => store.order))
      .subscribe((data) => {
        console.log('ORDERS DATA', data.orders);
        this.ordersData = data.orders;
        this.totalOrders = data.orders?.length;
      });
  }

  confirmOrder(orderId: any) {
    this.orderService.confirmOrder(orderId);
  }

  shipOrder(orderId: any) {
    this.orderService.shipOrder(orderId);
  }

  deliverOrder(orderId: any) {
    this.orderService.deliverOrder(orderId);
  }

  deleteOrder(orderId: any) {
    this.orderService.deleteOrder(orderId);
  }
}
