import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { filters, singleFilter } from './FilterData';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ProductPreviewCardComponent } from '../../shared/product-preview-card/product-preview-card.component';
import { ProductService } from '../../../states/product/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../models/appState';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule,
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
  isVisible = false;
  isBrowser: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private store: Store<AppState>,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.checkScroll();
    }

    this.filterData = filters;
    this.singleFilterData = singleFilter;

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

  @HostListener('window:scroll', [])
  checkScroll() {
    if (this.isBrowser) {
      this.isVisible = window.pageYOffset > 800;
    }
  }

  scrollToTop() {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
