import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    getSumEarnings(): number {
        return 3000;
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
