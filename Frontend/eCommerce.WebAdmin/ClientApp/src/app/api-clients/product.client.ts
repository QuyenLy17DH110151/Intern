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
    private setupHeader() {
        const access_token = localStorage.getItem('access_token');
        return new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            // .set(
            //     'Authorization',
            //     `Bearer ${access_token}`
            // );
    }

    addProduct(newProduct: Product) {
        //const headers = this.setupHeader();
        return this.httpClient.post<Product>(this.baseUrl, newProduct);
    }

    getProductDetail(productId:string) {
        const url = `${this.baseUrl}/${productId}`;
        //const headers = this.setupHeader();
        return this.httpClient.get(url);
    }
}
