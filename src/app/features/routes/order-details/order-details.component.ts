import { Component, Input } from '@angular/core';
import { AddressCardComponent } from '../../shared/address-card/address-card.component';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from '../../shared/order-card/order-card.component';
import { OrderTrackerComponent } from '../../shared/order-tracker/order-tracker.component';
import { OrderService } from '../../../states/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../models/appState';

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
  order: any;
  step: any;
  steps = [
    { id: 0, title: 'PLACED', isCompleted: true },
    { id: 1, title: 'CONFIRMED', isCompleted: true },
    { id: 2, title: 'SHIPPED', isCompleted: false },
    { id: 3, title: 'DELIVERED', isCompleted: false },
  ];

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    let orderId: any;

    this.activatedRoute.params.subscribe((params) => {
      orderId = params['id'];

      if (orderId) {
        this.orderService.getOrderById(orderId);
      }
    });

    this.store
      .pipe(select((store: AppState) => store.order))
      .subscribe((data) => {
        console.log('DATA FOR ORDER ID ======>', data);
        this.order = data.order;

        this.steps.map((step) => {
          if (step.title === data?.order?.orderStatus) this.step = step.id;
        });
      });
  }
}
