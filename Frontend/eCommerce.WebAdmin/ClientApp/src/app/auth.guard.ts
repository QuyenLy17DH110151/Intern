import { UserRole } from './api-clients/models/user.model';
import { UserService } from 'src/app/shared/service/user.service';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot): boolean {
        let expectedRole = route.data.expectedRole;
        if (this.userService.loggedIn()) {
              if (!expectedRole) {
                  expectedRole = this.userService.getRole();
              }
            if (this.userService.getRole() !== expectedRole) {
                Swal.fire(
                    'Error',
                    `Authorized ${UserRole[expectedRole]} only`,
                    'error'
                );
                return false;
            }
            return true;
        } else {
            this.router.navigate(['./auth/login']);
            return false;
        }
    }
}
