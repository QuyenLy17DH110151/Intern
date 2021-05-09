import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DashboardClient {
    private apiSumEarnings = `${environment.apiUrl}/DashBoards/SumEarnings`;
    constructor(private http: HttpClient) {}

    getSumEarnings() {
        return this.http.get(this.apiSumEarnings);
    }

    getCountProduct(): number {
        return 1000;
    }

    getCountComment(): number {
        return 2000;
    }

    getCountUser(): number {
        return 4000;
    }
}
