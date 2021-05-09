import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DashboardClient {
    private apiSumEarnings = `${environment.apiUrl}/DashBoards/SumEarnings`;
    private apiCountProduct = `${environment.apiUrl}/DashBoards/CountProduct`;
    private apiCountComment = `${environment.apiUrl}/DashBoards/CountComment`;
    private apiGetCountUser = `${environment.apiUrl}/DashBoards/GetCountUser`;

    constructor(private http: HttpClient) {}

    getSumEarnings() {
        return this.http.get(this.apiSumEarnings);
    }

    getCountProduct() {
        return this.http.get(this.apiCountProduct);
    }

    getCountComment() {
        return this.http.get(this.apiCountComment);
    }

    getCountUser() {
        return this.http.get(this.apiGetCountUser);
    }
}
