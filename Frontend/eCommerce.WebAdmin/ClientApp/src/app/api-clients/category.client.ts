import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PagedList, SearchRequest } from "./models/common.model";
import { Category, CategoryDetails, CreateCategoryRequest } from "./models/category.model";
import { map } from "rxjs/operators";

@Injectable()
export class CategoryClient {
    apiEndpoint = `${environment.apiUrl}/ProductCategories/`;

    constructor(protected httpClient: HttpClient) {
    }

    searchProductCategories(rq: SearchRequest = new SearchRequest()): Observable<PagedList<Category>> {
        const options = {
            params: { ...rq }
        };

        return this.httpClient.get<PagedList<Category>>(this.apiEndpoint, options);
    }

    getListCategory(): Observable<Category> {
        return this.httpClient.get<Category>(this.apiEndpoint)
            .pipe(
                map((respone: any) => respone)
            )
    }

    addCategory(category: CreateCategoryRequest): Observable<Category> {
        return this.httpClient.post<Category>(this.apiEndpoint, category)
    }

    deleteCategory(id: string): Observable<void> {
        return this.httpClient.delete<any>(this.apiEndpoint + id)
    }

    updateCategory(id: string, category): Observable<Category> {
        return this.httpClient.put<Category>(this.apiEndpoint + id, category)
    }

    getCategoryDetailsById(id: string): Observable<CategoryDetails> {
        return this.httpClient.get<CategoryDetails>(this.apiEndpoint + id);
    }
}