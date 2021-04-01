import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from 'src/app/api-clients/models/category.model';
import { environment } from "src/environments/environment";

@Injectable()
export class CategoryService {



    constructor(private http: HttpClient) {

    }

    getListCategory(): Observable<Category> {
        return this.http.get<Category>('https://localhost:44368/api/ProductCategories/')
            .pipe(
                map((respone: any) => respone)
            )
    }

    addCategory(category): Observable<Category> {
        return this.http.post<Category>('https://localhost:44368/api/ProductCategories/', category)
    }

    deleteCategory(id: string): Observable<void> {
        return this.http.delete<any>('https://localhost:44368/api/ProductCategories?id=' + id)
    }

    updateCategory(id: string, category): Observable<Category> {
        return this.http.put<Category>('https://localhost:44368/api/ProductCategories?id=' + id, category)
    }
}