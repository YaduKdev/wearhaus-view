import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, MatSidenavModule, MatIconModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  constructor(private router: Router) {}

  navigateTo(path: any) {
    this.router.navigate([path]);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
