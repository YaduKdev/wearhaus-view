import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { filters, singleFilter } from './FilterData';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ProductPreviewCardComponent } from '../../shared/product-preview-card/product-preview-card.component';
import men_sweaters from '../../../../Data/Men/men_sweaters.json';
import { ProductService } from '../../../states/product/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../models/appState';

@Component({
  selector: 'app-products',
  imports: [
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    MatRadioModule,
    ProductPreviewCardComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  sortOption: string = 'Popularity';
  filterData: any;
  singleFilterData: any;
  productData: any;
  pageNumber: any = 1;
  initialPageSize: any = 9;
  pageSize: any = 9;
  totalPages: any = 0;
  levelTwo: any;
  levelOne: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.filterData = filters;
    this.singleFilterData = singleFilter;

    console.log(
      'FILTERDATA',
      this.filterData,
      'SINGLE FILTER DATA',
      this.singleFilterData
    );

    this.router.navigate([], { queryParams: { pageSize: 9 } });

    this.activatedRoute.params.subscribe((params) => {
      this.levelTwo = params['levelTwo'];
      this.levelOne = params['levelOne'];
      let reqData = {
        category: params['levelTwo'],
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 100000,
        minDiscount: 0,
        pageNumber: 1,
        pageSize: 9,
        sort: 'popularity',
        stock: null,
      };

      this.productService.findProductsByCategory(reqData);
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      const color = params['color'];
      const size = params['size'];
      const price = params['price'];
      const discount = params['discount'];
      const stock = params['stock'];
      const sort = params['sort'];
      const pageNumber = params['pageNumber'];
      const pageSize = params['pageSize'];
      const minPrice = price?.split('-')[0];
      const maxPrice = price?.split('-')[1];

      let reqData = {
        category: this.levelTwo,
        colors: color ? [color].join(',') : [],
        sizes: size ? [size].join(',') : [],
        minPrice: minPrice ? minPrice : 0,
        maxPrice: maxPrice ? maxPrice : 100000,
        minDiscount: discount ? discount : 0,
        pageNumber: pageNumber ? pageNumber : 1,
        pageSize: pageSize ? pageSize : 9,
        stock: stock ? stock : null,
        sort: sort ? sort : 'popularity',
      };

      this.productService.findProductsByCategory(reqData);
    });

    this.store
      .pipe(select((store: AppState) => store.product))
      .subscribe((data) => {
        this.productData = data.products.content;
        this.totalPages = data.products.totalPages;
      });
  }

  resetFilters() {
    this.router.navigate([], { queryParams: { pageSize: 9 } });
    window.location.reload();
  }

  viewMore() {
    if (this.pageSize <= this.totalPages * this.initialPageSize) {
      this.pageSize = this.pageSize + 9;
      this.handleSingleSelectFilter(this.pageSize, 'pageSize');
    }
  }

  handleMultipleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };

    const filterValues = queryParams[sectionId]
      ? queryParams[sectionId].split(',')
      : [];

    const valueIndex = filterValues.indexOf(value);

    if (valueIndex !== -1) {
      filterValues.splice(valueIndex, 1);
    } else {
      filterValues.push(value);
    }

    if (filterValues.length > 0) {
      queryParams[sectionId] = filterValues.join(',');
    } else {
      delete queryParams[sectionId];
    }

    this.router.navigate([], { queryParams });
  }

  handleSingleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };
    queryParams[sectionId] = value;

    this.router.navigate([], { queryParams });
  }

  onClickSort(option: any, value: string) {
    this.sortOption = option;
    this.handleSingleSelectFilter(value, 'sort');
  }
}
