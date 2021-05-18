import { UserService } from 'src/app/shared/service/user.service';
import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor,
} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})

export class ExceptionInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private userService: UserService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                //authen
                if (error.status === 401) {
                    this.toastr.error('access_token is expires');
                    this.Logout();
                    return;
                }
                //err reset password
                if (error.error.errorMessage == 'token or username invalid') {
                    this.router.navigate(['/reset-password-error']);
                    return;
                }

                if (error.status === 500) {
                    Swal.fire('Error', 'Internal Server Error', 'error');
                    return;
                }

                let message = '';
                console.log('errrrrrrrrrrrr');
                console.log(error);

                if (error.error instanceof ErrorEvent) {
                    // handle client-side error
                    message = `Error: ${error.error.message}`;
                } else {
                    // handle server-side error
                    message = `Error Status: ${error.status}.\nMessage: ${error.message}`;
                }

                console.log(error.error);
                Swal.fire(
                    'Error',
                    error.error.message || error.error.errorMessage,
                    'error'
                );

                // Swal.fire({
                //     icon: 'error',
                //     title: 'Error...',
                //     text: message,
                // });
                return throwError(message);
            })
        );
    }

    Logout() {
        this.userService.clearLocalStorage();
        this.router.navigate(['./auth/login']);
    }
}
