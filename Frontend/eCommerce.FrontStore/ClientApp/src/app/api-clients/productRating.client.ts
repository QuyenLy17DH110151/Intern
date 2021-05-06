import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CreateProductRatingRequest } from "./models/productRating";

@Injectable({
    providedIn: 'root',
})
export class ProductRatingClient {
    private apiEndpoint = `${environment.apiUrl}/ProductRating`;

    constructor(private http: HttpClient) { }

    addProductRating(productRating: CreateProductRatingRequest): Observable<any> {
        return this.http.post<any>(this.apiEndpoint, productRating);
    }
}