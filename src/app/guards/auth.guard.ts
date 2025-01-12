import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const requiredRoles = route.data['roles'] as string[];

    return of(typeof window !== 'undefined' && window.localStorage).pipe(
      map((hasStorage) => {
        if (!hasStorage) return false;

        const userRole = localStorage.getItem('role');

        if (!userRole || !requiredRoles.includes(userRole)) {
          this.router.navigate(['/unauthorized']);
          return false;
        }

        return true;
      })
    );
  }
}
