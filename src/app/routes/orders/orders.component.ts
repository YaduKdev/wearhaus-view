import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrderCardComponent } from '../../shared/order-card/order-card.component';
import { Router } from '@angular/router';

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
  orders = [
    [1, 1],
    [1, 1, 1],
  ];

  constructor(private router: Router) {}

  navigateToOrderDetails = (id: any) => {
    this.router.navigate([`order/${id}`]);
  };
}
