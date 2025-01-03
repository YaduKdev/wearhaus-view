import { Component } from '@angular/core';
import { PaymentService } from '../../../states/payment/payment.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../states/order/order.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../models/appState';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../states/cart/cart.service';

@Component({
  selector: 'app-payment-success',
  imports: [OrderDetailsComponent, CommonModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
})
export class PaymentSuccessComponent {
  order: any;

  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
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
          });

          this.cartService.getCart();
        }
      }
    });
  }
}
