import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { OrderService } from '../../../../states/order/order.service';
import { ProductService } from '../../../../states/product/product.service';
import { AppState } from '../../../../models/appState';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';

interface month {
  value: string;
  viewValue: string;
}

export interface profitExpanceChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export interface trafficdistributionChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export interface productsalesChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    NgApexchartsModule,
    NgOptimizedImage,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public profitExpanceChart!: Partial<profitExpanceChart> | any;
  public trafficdistributionChart!: Partial<trafficdistributionChart> | any;
  public productsalesChart!: Partial<productsalesChart> | any;
  months: month[] = [
    { value: 'mar', viewValue: 'Sep 2024' },
    { value: 'apr', viewValue: 'Oct 2024' },
    { value: 'june', viewValue: 'Nov 2024' },
  ];
  displayedColumns: string[] = ['image', 'price', 'status'];
  displayedColumnsP: string[] = ['image', 'category', 'price', 'quantity'];
  displayedColumnsPMob: string[] = ['image', 'price', 'quantity'];
  productData: any;
  ordersData: any;

  constructor(
    private store: Store<AppState>,
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router
  ) {
    this.profitExpanceChart = {
      series: [
        {
          name: 'Eanings this month',
          data: [9, 5, 3, 7, 5, 10, 3],
          color: '#0085db',
        },
        {
          name: 'Expense this month',
          data: [6, 3, 9, 5, 4, 6, 4],
          color: '#fb977d',
        },
      ],

      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          borderRadius: 4,
          endingShape: 'rounded',
        },
      },
      chart: {
        type: 'bar',
        height: 390,
        offsetY: 10,
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['transparent'],
      },
      tooltip: { theme: 'light' },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    };

    this.trafficdistributionChart = {
      series: [5368, 3500, 4106],
      labels: ['Others', 'Refferal Traffic', 'Oragnic Traffic'],
      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 160,
      },
      colors: ['#e7ecf0', '#fb977d', '#0085db'],
      plotOptions: {
        pie: {
          donut: {
            size: '80%',
            background: 'none',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '12px',
                color: undefined,
                offsetY: 5,
              },
              value: {
                show: false,
                color: '#98aab4',
              },
            },
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
      tooltip: {
        enabled: false,
      },
    };

    this.productsalesChart = {
      series: [
        {
          name: '',
          color: '#8763da',
          data: [25, 66, 20, 40, 12, 58, 20],
        },
      ],

      chart: {
        type: 'area',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 60,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        colors: ['#8763da'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };
  }

  ngOnInit() {
    let reqData = {
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      pageNumber: 1,
      pageSize: 10,
      sort: 'popularity',
      stock: null,
    };

    this.productService.findProductsByCategory(reqData);

    this.orderService.getAllOrders();

    this.store
      .pipe(select((store: AppState) => store.product))
      .subscribe((data) => {
        this.productData = data.products.content.slice(0, 5);
      });

    this.store
      .pipe(select((store: AppState) => store.order))
      .subscribe((data) => {
        this.ordersData = data.orders.slice(0, 5);
      });
  }

  navigateTo(path: any) {
    this.router.navigate([path]);
  }
}
