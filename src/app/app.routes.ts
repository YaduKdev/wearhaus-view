import { Routes } from '@angular/router';
import { HomeComponent } from './features/routes/home/home.component';
import { ProductsComponent } from './features/routes/products/products.component';
import { CartComponent } from './features/routes/cart/cart.component';
import { ProductDetailsComponent } from './features/routes/product-details/product-details.component';
import { CheckoutComponent } from './features/routes/checkout/checkout.component';
import { PaymentComponent } from './features/routes/payment/payment.component';
import { PaymentSuccessComponent } from './features/routes/payment-success/payment-success.component';
import { OrdersComponent } from './features/routes/orders/orders.component';
import { OrderDetailsComponent } from './features/routes/order-details/order-details.component';
import { AdminComponent } from './features/routes/admin/admin.component';
import { DashboardComponent } from './features/routes/admin/dashboard/dashboard.component';
import { AdminProductsComponent } from './features/routes/admin/admin-products/admin-products.component';
import { OrdersListComponent } from './features/routes/admin/orders-list/orders-list.component';
import { CustomersComponent } from './features/routes/admin/customers/customers.component';
import { AddProductComponent } from './features/routes/admin/add-product/add-product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:levelOne/:levelTwo', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout/payment/:id', component: PaymentComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'user/orders', component: OrdersComponent },
  { path: 'order/:id', component: OrderDetailsComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'orders', component: OrdersListComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'products/add', component: AddProductComponent },
    ],
  },
];
