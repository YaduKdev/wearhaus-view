import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-match',
  imports: [],
  templateUrl: './no-match.component.html',
  styleUrl: './no-match.component.scss',
})
export class NoMatchComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
