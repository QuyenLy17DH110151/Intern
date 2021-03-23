import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtAuthResult, LoginRequest, PagedList, SearchRequest } from "./models/common.model";
import { User } from "./models/user.model";
import jwt_decode from 'jwt-decode';
@Injectable()
export class UserClient {
    apiEndpoint = `${environment.apiUrl}/Users`;
    apiToken = `${environment.apiUrl}/Token`;
    apiTokenLogout = `${environment.apiUrl}/Token/logout`;
    // helper = new JwtHelperService();
    constructor(protected httpClient: HttpClient) {
    }

    searchUsers(rq: SearchRequest = new SearchRequest()): Observable<PagedList<User>> {
        const options = {
            params: { ...rq }
        };

        return this.httpClient.get<PagedList<User>>(this.apiEndpoint, options);
    }

    loginAdmin(rq: LoginRequest = new LoginRequest()):Observable<JwtAuthResult>{
        return this.httpClient.post<JwtAuthResult>(this.apiToken,rq);
    }
    loggedIn(){
        return !! localStorage.getItem('token');
    }
    getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
  }
}
