import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PagedList, SearchRequest } from "./models/common.model";
import { Category } from "./models/category.model";

@Injectable()
export class CategoryClient {
    apiEndpoint = `${environment.apiUrl}/ProductCategories`;

    constructor(protected httpClient: HttpClient) {
    }

    searchProductCategories(rq: SearchRequest = new SearchRequest()): Observable<PagedList<Category>> {
        const options = {
            params: { ...rq }
        };

        return this.httpClient.get<PagedList<Category>>(this.apiEndpoint, options);
    }

    
}