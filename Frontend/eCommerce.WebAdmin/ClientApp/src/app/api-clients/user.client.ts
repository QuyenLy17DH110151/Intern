<<<<<<< HEAD
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PagedList, SearchRequest } from "./models/common.model";
import { User } from "./models/user.model";
import { UpdatePasswordRequest } from "./models/_index";
=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
    JwtAuthResult,
    LoginRequest,
    PagedList,
    SearchRequest,
} from './models/common.model';
import { User } from './models/user.model';
import jwt_decode from 'jwt-decode';
>>>>>>> 56e86231d1205416ef82132fc24e5647ae04e41d

@Injectable()
export class UserClient {
    apiEndpoint = `${environment.apiUrl}/Users`;
    apiToken = `${environment.apiUrl}/Token`;
    apiTokenLogout = `${environment.apiUrl}/Token/logout`;
    // helper = new JwtHelperService();
    constructor(protected httpClient: HttpClient) {}

    searchUsers(
        rq: SearchRequest = new SearchRequest()
    ): Observable<PagedList<User>> {
        const options = {
            params: { ...rq },
        };

        return this.httpClient.get<PagedList<User>>(this.apiEndpoint, options);
    }

<<<<<<< HEAD
    createUser(user: User) : Observable<string>{
        var token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1MWM2M2JjLTRlMzItNGU5ZC1iNzJjLTdjZjY2NjZkY2I5MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuYW0iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTYxNzI1MjA4NywiaXNzIjoiaHR0cHM6Ly9teXdlYmFwaS5jb20iLCJhdWQiOiJodHRwczovL215d2ViYXBpLmNvbSJ9.EF2gvzAIT7P_cqnYmIApj8prEQ8OpKsKfTpsCSmQR8w';
        var httpOptions = {
            headers: new HttpHeaders(
                { 
                    'Content-Type': 'application/json',
                    'Response-Type': 'text',
                    'Authorization': 'Bearer ' + token
                })
          };
        return this.httpClient.post<string>(this.apiEndpoint, user,httpOptions);
    }

    updatePassword(rq: UpdatePasswordRequest):  Observable<boolean>{
        return this.httpClient.put<boolean>(this.apiEndpoint, rq);
=======
    login(rq: LoginRequest = new LoginRequest()): Observable<JwtAuthResult> {
        return this.httpClient.post<JwtAuthResult>(this.apiToken, rq);
>>>>>>> 56e86231d1205416ef82132fc24e5647ae04e41d
    }
}
