import { Component } from '@angular/core';
import { AddressCardComponent } from '../../shared/address-card/address-card.component';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from '../../shared/order-card/order-card.component';
import { OrderTrackerComponent } from '../../shared/order-tracker/order-tracker.component';

@Component({
  selector: 'app-order-details',
  imports: [
    AddressCardComponent,
    CommonModule,
    OrderCardComponent,
    OrderTrackerComponent,
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  orders = [1, 1, 1];
  steps = [
    { id: 0, title: 'PLACED', isCompleted: true },
    { id: 1, title: 'CONFIRMED', isCompleted: true },
    { id: 2, title: 'SHIPPED', isCompleted: false },
    { id: 3, title: 'DELIVERED', isCompleted: false },
  ];
}
