import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PagedList } from "./models/common.model";
import { Coupon } from "./models/coupon.model";

@Injectable({
    providedIn: 'root',
})
export class CouponClient {
    private baseUrl = `${environment.apiUrl}/Coupons`;

    constructor(protected httpClient: HttpClient) {
    }

    getAllCoupon(): Observable<PagedList<Coupon>> {
        const url = `${this.baseUrl}`;
        return this.httpClient.get<PagedList<Coupon>>(url);
    }
}