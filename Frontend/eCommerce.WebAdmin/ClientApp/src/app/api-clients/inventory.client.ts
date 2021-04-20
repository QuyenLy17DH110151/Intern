import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UpdateInventoryRequest } from "./models/inventory.model";
import { PagedList, SearchRequestInventory } from "./models/_index";

@Injectable()
export class InventoryClient {
    private apiEndpoint = `${environment.apiUrl}/Inventories`;

    constructor(protected httpClient: HttpClient) {
    }

    getListInventory(): Observable<PagedList<SearchRequestInventory>> {
        return this.httpClient.get<PagedList<SearchRequestInventory>>(this.apiEndpoint);
    }

    updateInventory(updateInventory: UpdateInventoryRequest): Observable<any> {
        return this.httpClient.put(this.apiEndpoint,
            updateInventory
        );
    }

}