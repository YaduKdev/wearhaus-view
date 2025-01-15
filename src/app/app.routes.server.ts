import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static routes to prerender
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'cart',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'unauthorized',
    renderMode: RenderMode.Prerender,
  },
  // Dynamic routes with parameters - set to client side rendering
  {
    path: 'products/:levelOne/:levelTwo',
    renderMode: RenderMode.Client,
  },
  {
    path: 'product-details/:category/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'checkout/payment/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'order/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'payments/:orderId',
    renderMode: RenderMode.Client,
  },
  // Admin routes - better as client-side rendered
  {
    path: 'admin/**',
    renderMode: RenderMode.Client,
  },
  // Catch-all route
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
