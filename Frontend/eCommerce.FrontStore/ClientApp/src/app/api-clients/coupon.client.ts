import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from './models/category.model';
import { PagedList } from './models/common.model';
import { Coupon } from './models/coupon.model';

@Injectable({
    providedIn: 'root',
})
export class CouponClient {
    constructor(private http: HttpClient) {}

    getCouponById(couponId): Observable<Coupon> {
        const url = `${environment.apiUrl}/frontstore/api/coupons/${couponId}`;
        return this.http.get<Coupon>(url);
    }

    getCouponValue(code: string): Observable<number> {
        const url = `${environment.apiUrl}/frontstore/api/coupons/verify/${code}`;
        return this.http.get<number>(url);
    }

    getAllValidCoupon(orderValue): Observable<Coupon[]> {
        const url = `${environment.apiUrl}/frontstore/api/coupons/valid?valueOrder=${orderValue}`;
        return this.http.get<Coupon[]>(url);
    }
}