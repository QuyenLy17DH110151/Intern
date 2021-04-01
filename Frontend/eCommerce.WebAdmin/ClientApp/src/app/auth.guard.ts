import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './shared/service/user.service';
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private userService: UserService,private router:Router){}
    canActivate(): boolean {
     if (this.userService.loggedIn()) {
        return true;
     } else {
        this.router.navigate(['./components/auth/login']);
        return false;
     }
    }



}
