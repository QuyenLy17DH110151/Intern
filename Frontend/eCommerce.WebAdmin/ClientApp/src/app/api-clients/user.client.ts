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

@Injectable()
export class UserClient {
    apiEndpoint = `${environment.apiUrl}/Users`;
    apiToken = `${environment.apiUrl}/Token`;
    apiTokenLogout = `${environment.apiUrl}/Token/logout`;
    apiGetAll = `${environment.apiUrl}/Users/GetAll`;
    constructor(protected httpClient: HttpClient) {}

    searchUsers(
        rq: SearchRequest = new SearchRequest()
    ): Observable<PagedList<User>> {
        const options = {
            params: { ...rq },
        };

        return this.httpClient.get<PagedList<User>>(this.apiEndpoint, options);
    }

    login(rq: LoginRequest = new LoginRequest()): Observable<JwtAuthResult> {
        return this.httpClient.post<JwtAuthResult>(this.apiToken, rq);
    }

    lockoutUser(Id: string) {
        return this.httpClient.put(
            `${environment.apiUrl}/Users/${Id}/Lockout`,
            Id
        );
    }

    unlockoutUser(Id: string) {
        return this.httpClient.put(
            `${environment.apiUrl}/Users/${Id}/Unlockout`,
            Id
        );
    }
}
