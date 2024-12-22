import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './features/navbar/navbar.component';
import { FooterComponent } from './features/footer/footer.component';
import { select, Store } from '@ngrx/store';
import { UserService } from './states/user/user.service';
import { AppState } from './models/appState';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'wearhaus-view';

  constructor(
    private store: Store<AppState>,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        this.userService.getUserProfile();
      }
    }

    this.store.pipe(select((store) => store.auth)).subscribe((user) => {
      this.userService.getUserProfile();
    });
  }
}
