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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.filterData = filters;
    this.singleFilterData = singleFilter;
    this.productData = men_sweaters;
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

  onClickSort(option: any) {
    this.sortOption = option;
  }
}
