import { Component } from '@angular/core';
import { ProductService } from '../../../../states/product/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../models/appState';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-products',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss',
})
export class AdminProductsComponent {
  displayedColumns: string[] = [
    'image',
    'title',
    'category',
    'price',
    'quantity',
    'delete',
  ];
  productData: any;

  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    let reqData = {
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      pageNumber: 7,
      pageSize: 9,
      sort: 'popularity',
      stock: null,
    };

    this.productService.findProductsByCategory(reqData);

    this.store
      .pipe(select((store: AppState) => store.product))
      .subscribe((data) => {
        this.productData = data.products.content;
      });
  }

  deleteProduct() {}
}
