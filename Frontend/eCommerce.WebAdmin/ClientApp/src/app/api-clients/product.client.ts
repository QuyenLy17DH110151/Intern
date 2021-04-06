import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/api-clients/models/product.model';

@Injectable({
    providedIn: 'root', //???
})
export class ProductClient {
    private baseUrl = `${environment.apiUrl}/Products`;

    constructor(protected httpClient: HttpClient) {}

    addProduct(newProduct: Product) {
        return this.httpClient.post<Product>(this.baseUrl, newProduct);
    }

    getProductDetail(productId:string) {
        const url = `${this.baseUrl}/${productId}`;
        return this.httpClient.get(url);
    }
}
