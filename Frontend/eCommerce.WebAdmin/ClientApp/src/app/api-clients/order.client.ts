import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PagedList, SearchRequest } from "./models/common.model";
import { Order } from "./models/order.model";

@Injectable({
    providedIn: 'root'
})

export class OrderClient{
    private baseUrl = `${environment.apiUrl}/Order`;

    constructor(protected httpClient: HttpClient) { }

    getAllOrder() {
        const url = `${this.baseUrl}`;
        return this.httpClient.get(url);
    }
}


