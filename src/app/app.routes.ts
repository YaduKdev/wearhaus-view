import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/routes/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: 'products/:levelOne/:levelTwo',
    loadComponent: () =>
      import('./features/routes/products/products.component').then(
        (c) => c.ProductsComponent
      ),
    data: { renderMode: 'client' },
  },
  {
    path: 'product-details/:category/:id',
    loadComponent: () =>
      import(
        './features/routes/product-details/product-details.component'
      ).then((c) => c.ProductDetailsComponent),
    data: { renderMode: 'client' },
  },
  {
    path: 'payments/:orderId',
    loadComponent: () =>
      import(
        './features/routes/payment-success/payment-success.component'
      ).then((c) => c.PaymentSuccessComponent),
    data: { renderMode: 'client' },
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    data: { roles: ['CUSTOMER'] },
    loadComponent: () =>
      import('./features/routes/cart/cart.component').then(
        (c) => c.CartComponent
      ),
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    data: { roles: ['CUSTOMER'] },
    loadComponent: () =>
      import('./features/routes/checkout/checkout.component').then(
        (c) => c.CheckoutComponent
      ),
  },
  {
    path: 'checkout/payment/:id',
    canActivate: [AuthGuard],
    data: { roles: ['CUSTOMER'], renderMode: 'client' },
    loadComponent: () =>
      import('./features/routes/payment/payment.component').then(
        (c) => c.PaymentComponent
      ),
  },
  {
    path: 'user/orders',
    canActivate: [AuthGuard],
    data: { roles: ['CUSTOMER'] },
    loadComponent: () =>
      import('./features/routes/orders/orders.component').then(
        (c) => c.OrdersComponent
      ),
  },
  {
    path: 'user/profile',
    canActivate: [AuthGuard],
    data: { roles: ['CUSTOMER'] },
    loadComponent: () =>
      import('./features/routes/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
  },
  {
    path: 'order/:id',
    canActivate: [AuthGuard],
    data: { roles: ['CUSTOMER'], renderMode: 'client' },
    loadComponent: () =>
      import('./features/routes/order-details/order-details.component').then(
        (c) => c.OrderDetailsComponent
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () =>
      import('./features/routes/admin/admin.component').then(
        (c) => c.AdminComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/routes/admin/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import(
            './features/routes/admin/admin-products/admin-products.component'
          ).then((c) => c.AdminProductsComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import(
            './features/routes/admin/orders-list/orders-list.component'
          ).then((c) => c.OrdersListComponent),
      },
      {
        path: 'products/add',
        loadComponent: () =>
          import(
            './features/routes/admin/add-product/add-product.component'
          ).then((c) => c.AddProductComponent),
      },
    ],
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/routes/unauthorized/unauthorized.component').then(
        (c) => c.UnauthorizedComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/routes/no-match/no-match.component').then(
        (c) => c.NoMatchComponent
      ),
  },
];
