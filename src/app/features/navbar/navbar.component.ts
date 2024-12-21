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
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NavContentComponent } from './nav-content/nav-content.component';
import { navigation } from '../../../Data/Navigation';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthComponent } from '../../auth/auth.component';
import { UserService } from '../../states/user/user.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../models/AppState';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    NavContentComponent,
    MatDialogModule,
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
  userProfile: any;
  private resizeListener: (() => void) | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.checkScreenSize();
    this.addResizeListener();

    this.categories = navigation.categories;

    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('jwt')) {
        this.userService.getUserProfile();
      }
    }

    this.store.pipe(select((store) => store.user)).subscribe((user) => {
      this.userProfile = user.userProfile;

      if (user.userProfile) {
        this.dialog.closeAll();
      }
    });
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

  handleLoginModal() {
    this.dialog.open(AuthComponent, {
      width: '400px',
      disableClose: false,
    });
  }

  handleMobileLoginModal() {
    this.dialog.open(AuthComponent, {
      width: '100svw',
      height: '100%',
      disableClose: true,
    });
  }

  handleLogout() {
    this.userService.logout();
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

  navigateTo(path: any) {
    this.router.navigate([path]);
  }
}
