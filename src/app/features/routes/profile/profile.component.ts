import { Component } from '@angular/core';
import { UserService } from '../../../states/user/user.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../models/appState';
import { CommonModule } from '@angular/common';
import { AddressCardComponent } from '../../shared/address-card/address-card.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, AddressCardComponent, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  userProfile: any;

  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) {}

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('jwt')) {
        this.userService.getUserProfile();
      }
    }

    this.store.pipe(select((store) => store.user)).subscribe((user) => {
      this.userProfile = user.userProfile;
    });
  }
}
