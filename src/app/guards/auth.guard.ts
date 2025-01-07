// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   UrlTree,
//   Router,
// } from '@angular/router';
// import { select, Store } from '@ngrx/store';
// import { AppState } from '../models/appState';
// import { take, lastValueFrom, firstValueFrom, delay } from 'rxjs';
// import { UserService } from '../states/user/user.service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private store: Store<AppState>,
//     private router: Router,
//     private userService: UserService
//   ) {}

//   async canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Promise<boolean | UrlTree> {
//     const requiredRoles = route.data['roles'] as string[];

//     try {
//       // let user: any;

//       // const user = await lastValueFrom(
//       //   this.store.select((state: AppState) => state.auth.user).pipe(take(1))
//       // );

//       // this.store.pipe(select((store) => store.user)).subscribe((data) => {
//       //   user = data.userProfile;
//       // });

//       const userData = await firstValueFrom(
//         this.store.select((store) => store.user).pipe(take(1))
//       );
//       const user = userData.userProfile;

//       console.log('authguarduser:', user);

//       if (!user || !requiredRoles.includes(user.role)) {
//         console.log('Access denied', user);
//         // Redirect or handle unauthorized access
//         // For example:
//         this.router.navigate(['/unauthorized']);

//         return false;
//       }

//       console.log('Access granted', user.role);
//       return true;
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       // Handle potential errors during user data retrieval (optional)
//       // For example, redirect to a login page or display an error message
//       return false;
//     }
//   }
// }
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
