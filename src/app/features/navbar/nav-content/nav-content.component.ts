import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-content',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-content.component.html',
  styleUrl: './nav-content.component.scss',
})
export class NavContentComponent {
  @Input() category: any;

  constructor(private router: Router) {}

  handleNavigate(path: any) {
    this.router.navigate([path]);
  }
}
