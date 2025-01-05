import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrderCardComponent } from '../../shared/order-card/order-card.component';
import { Router } from '@angular/router';
import { OrderService } from '../../../states/order/order.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../models/appState';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, MatCheckboxModule, OrderCardComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orderFilters = [
    {
      value: 'in_transit',
      label: 'In Transit',
    },
    {
      value: 'delivered',
      label: 'Delivered',
    },
    {
      value: 'cancelled',
      label: 'Cancelled',
    },
    {
      value: 'returned',
      label: 'Returned',
    },
  ];
  orders: any;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private store: Store<AppState>
  ) {}

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  ngOnInit() {
    if (
      typeof window !== 'undefined' &&
      window.localStorage &&
      localStorage.getItem('jwt')
    ) {
      this.orderService.getOrderHistory();

      this.store
        .pipe(select((store: AppState) => store.order))
        .subscribe((data) => {
          this.orders = data?.orders;
        });
    }
  }

  navigateToOrderDetails = (id: any) => {
    this.router.navigate([`order/${id}`]);
  };
}
