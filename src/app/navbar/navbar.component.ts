// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-navbar',
//   imports: [],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.scss',
// })
// export class NavbarComponent {}

// nav.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  HostListener,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NavContentComponent } from './nav-content/nav-content.component';
import { navigation } from '../../Data/Navigation';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    NavContentComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isMobileView = false;
  activeCategory: string | null = null;
  currentSection: any;
  isNavbarContentOpen = false;
  categories: any[] = [];
  selectedCategory: any;
  private resizeListener: (() => void) | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.checkScreenSize();
    this.addResizeListener();

    this.categories = navigation.categories;
  }

  ngOnDestroy() {
    this.removeResizeListener();
  }

  private addResizeListener() {
    if (isPlatformBrowser(this.platformId)) {
      const resizeHandler = () => this.checkScreenSize();
      window.addEventListener('resize', resizeHandler);
      this.resizeListener = () =>
        window.removeEventListener('resize', resizeHandler);
    }
  }

  private removeResizeListener() {
    if (this.resizeListener) {
      this.resizeListener();
      this.resizeListener = null;
    }
  }

  private checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = window.innerWidth <= 900;
    }
  }

  openNavContent(menu: any) {
    this.selectedCategory = menu;
    this.isNavbarContentOpen = true;
  }

  closeNavContent() {
    this.isNavbarContentOpen = false;
  }

  @HostListener('document: click', [`$event`])
  onDocumentClick(event: MouseEvent) {
    const modalContainer = document.querySelector('.modal-container');
    const openButtons = document.querySelectorAll('.open-button');
    const focusButtons = document.querySelectorAll('button');
    let clickInsideButton = false;

    openButtons.forEach((button: Element) => {
      if (button.contains(event.target as Node)) {
        clickInsideButton = true;
      }

      if (modalContainer && !clickInsideButton && this.isNavbarContentOpen) {
        Array.from(focusButtons).forEach((el) => el.blur());

        this.closeNavContent();
      }
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  setActiveCategory(category: string) {
    this.activeCategory = this.activeCategory === category ? null : category;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.activeCategory = null;
  }

  // Sample categories data
  // categories = [
  //   {
  //     name: 'Men',
  //     subcategories: [
  //       'T-Shirts',
  //       'Shirts',
  //       'Pants',
  //       'Shorts',
  //       'Jackets',
  //       'Sweatshirts & Hoodies',
  //     ],
  //   },
  //   {
  //     name: 'Women',
  //     subcategories: [
  //       'Tops',
  //       'Dresses',
  //       'Shirts',
  //       'Pants',
  //       'Skirts',
  //       'Jumpsuits',
  //     ],
  //   },
  //   {
  //     name: 'Sneakers',
  //     subcategories: ['Bags', 'Caps', 'Socks', 'Masks', 'Phone Cases'],
  //   },
  // ];
}
