import { Component } from '@angular/core';
import { PaymentService } from '../../../states/payment/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../states/order/order.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../models/appState';
import { OrderTrackerComponent } from '../../shared/order-tracker/order-tracker.component';
import { AddressCardComponent } from '../../shared/address-card/address-card.component';
import { OrderCardComponent } from '../../shared/order-card/order-card.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../states/cart/cart.service';

@Component({
  selector: 'app-payment-success',
  imports: [
    CommonModule,
    OrderTrackerComponent,
    AddressCardComponent,
    OrderCardComponent,
  ],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
})
export class PaymentSuccessComponent {
  order: any;
  step: any;
  steps = [
    { id: 0, title: 'PLACED', isCompleted: true },
    { id: 1, title: 'CONFIRMED', isCompleted: true },
    { id: 2, title: 'SHIPPED', isCompleted: false },
    { id: 3, title: 'DELIVERED', isCompleted: false },
  ];

  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const orderId = this.activatedRoute.snapshot.params['orderId'];
    let paymentId: any;

    this.activatedRoute.queryParams.subscribe((params) => {
      paymentId = params['razorpay_payment_id'];
    });

    const reqData = {
      paymentId,
      orderId,
    };

    this.paymentService.updatePaymentInfo(reqData);

    this.store.pipe(select((store) => store.payment)).subscribe((data) => {
      if (data?.paymentInfo?.status) {
        if (orderId) {
          this.orderService.getOrderById(orderId);

          this.store.pipe(select((store) => store.order)).subscribe((data) => {
            this.order = data.order;

            this.steps.map((step) => {
              if (step.title === data.order?.orderStatus) this.step = step;
            });
          });

          this.cartService.getCart();
        }
      }
    });
  }
}
