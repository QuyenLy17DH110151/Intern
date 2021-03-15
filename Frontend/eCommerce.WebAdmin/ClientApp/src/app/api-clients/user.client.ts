import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PagedList, SearchRequest } from "./models/common.model";
import { User } from "./models/user.model";

@Injectable()
export class UserClient {
    apiEndpoint = `${environment.apiUrl}/Users`;

    constructor(protected httpClient: HttpClient) {
    }

    searchUsers(rq: SearchRequest = new SearchRequest()): Observable<PagedList<User>> {
        const options = {
            params: { ...rq }
        };

        return this.httpClient.get<PagedList<User>>(this.apiEndpoint, options);
    }
}
