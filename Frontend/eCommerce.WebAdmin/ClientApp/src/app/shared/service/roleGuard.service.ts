import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
    constructor(
        public auth: AuthGuard,
        public router: Router,
        private userService: UserService
    ) {}
    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data.expectedRole;
        if (
            !this.userService.loggedIn() ||
            localStorage.getItem('userRole') !== expectedRole
        ) {
            this.router.navigate(['./dashboard/default']);
            return false;
        }
        return true;
    }
}
