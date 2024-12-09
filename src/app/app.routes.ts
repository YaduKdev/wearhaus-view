import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { ProductsComponent } from './routes/products/products.component';
import { CartComponent } from './routes/cart/cart.component';
import { ProductDetailsComponent } from './routes/product-details/product-details.component';
import { CheckoutComponent } from './routes/checkout/checkout.component';
import { PaymentComponent } from './routes/payment/payment.component';
import { PaymentSuccessComponent } from './routes/payment-success/payment-success.component';
import { OrdersComponent } from './routes/orders/orders.component';
import { OrderDetailsComponent } from './routes/order-details/order-details.component';
import { AdminComponent } from './routes/admin/admin.component';
import { DashboardComponent } from './routes/admin/dashboard/dashboard.component';
import { AdminProductsComponent } from './routes/admin/admin-products/admin-products.component';
import { OrdersListComponent } from './routes/admin/orders-list/orders-list.component';
import { CustomersComponent } from './routes/admin/customers/customers.component';
import { AddProductComponent } from './routes/admin/add-product/add-product.component';

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
