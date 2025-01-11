import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  HostListener,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { AppState } from '../../models/appState';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../states/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../states/product/product.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    NavContentComponent,
    MatDialogModule,
    MatButtonModule,
    MatBadgeModule,
    ReactiveFormsModule,
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
  cartItems: any;
  private _snackBar = inject(MatSnackBar);
  private resizeListener: (() => void) | null = null;

  searchControl = new FormControl('');
  results: any[] = [];
  showResults = false;
  isSearchOpen = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private userService: UserService,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  openMobileSearch() {
    this.isSearchOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeMobileSearch() {
    this.isSearchOpen = false;
    document.body.style.overflow = '';
  }

  selectResult(result: any) {
    this.searchControl.setValue('');
    this.showResults = false;
    this.router.navigate([`/product-details/${result.category}/${result.id}`]);
  }

  ngOnInit() {
    this.checkScreenSize();
    this.addResizeListener();

    this.categories = navigation.categories;

    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('jwt')) {
        this.userService.getUserProfile();
        this.cartService.getCart();
      }
    }

    this.store.pipe(select((store) => store.user)).subscribe((user) => {
      this.userProfile = user.userProfile;

      if (user.userProfile) {
        this.dialog.closeAll();
      }
    });

    this.store
      .pipe(select((store: AppState) => store.cart))
      .subscribe((data) => {
        if (data.error) {
          this._snackBar.open(data.error, '', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'warning-snackbar',
          });
        } else {
          this.cartItems = data?.cartItems;
        }
      });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        if (searchTerm && searchTerm.length >= 2) {
          this.productService.searchProducts(searchTerm);
        } else {
          this.results = [];
        }
      });

    this.store
      .pipe(select((store: AppState) => store.product))
      .subscribe((data) => {
        if (data) {
          if (data?.searchResults?.data?.length > 0) {
            this.results = data.searchResults.data;
          } else {
            this.results = [];
          }
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

  handleMobileNavigate(path: any) {
    this.router.navigate([path]);

    this.closeMobileMenu();
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

    this.closeMobileMenu();
  }

  handleLogout() {
    this.userService.logout();
    this.cartItems = [];
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

    const searchContainer = document.querySelector('.search-container');
    if (searchContainer && !searchContainer.contains(event.target as Node)) {
      this.showResults = false;
    }
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

  goToCart() {
    this.router.navigate(['cart']);
  }
}
