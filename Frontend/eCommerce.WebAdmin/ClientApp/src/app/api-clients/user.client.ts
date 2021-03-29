import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
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

    createUser(user: User) : Observable<string>{
        var token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1MWM2M2JjLTRlMzItNGU5ZC1iNzJjLTdjZjY2NjZkY2I5MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuYW0iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTYxNzAxMDczMiwiaXNzIjoiaHR0cHM6Ly9teXdlYmFwaS5jb20iLCJhdWQiOiJodHRwczovL215d2ViYXBpLmNvbSJ9.EzD0bLg4VUZ24JwtcTtaxCz97Zub95kcbWYigbVtlcI';
        var httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token})
          };
        return this.httpClient.post<string>(this.apiEndpoint, user,httpOptions);
        }
}
