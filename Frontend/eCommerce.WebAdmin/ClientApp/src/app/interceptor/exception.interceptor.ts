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

@Injectable({
    providedIn: 'root'
})
export class ExceptionInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let message = '';

                if (error.error instanceof ErrorEvent) {
                    // handle client-side error
                    message = `Error: ${error.error.message}`;
                } else {
                    // handle server-side error
                    message = `Error Status: ${error.status}.\nMessage: ${error.message}`;
                }
                console.log(error.error);
                Swal.fire('Error', error.error.message || error.error.errorMessage, 'error');
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Error...',
                //     text: message,
                // });
                return throwError(message);
            })
        );
    }
}
