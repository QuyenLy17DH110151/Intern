import { UserClient } from 'src/app/api-clients/user.client';
import { UserRole } from './../../api-clients/models/user.model';
import { Injectable, OnDestroy } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {
    JwtAuthResult,
    RefreshToken,
    RefreshTokenRequest,
    TokenInfo,
} from 'src/app/api-clients/models/common.model';
import { of, Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable()
export class UserService {
    tokenInfo: TokenInfo;
    private timer: Subscription;
    constructor(private userClient: UserClient) {}
    loggedIn() {
        return !!localStorage.getItem('access_token');
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    getToken(): string {
        return localStorage.getItem('access_token');
    }

    getRole(): string {
        let token_info: TokenInfo = JSON.parse(
            localStorage.getItem('token_info')
        );
        console.log(UserRole[token_info.role]);

        return UserRole[token_info.role];
    }

    localStorageSetToken(responseToken: JwtAuthResult, tokenInfo: TokenInfo) {
        //accessToken
        localStorage.setItem('access_token', responseToken.accessToken);
        //refreshToken
        localStorage.setItem(
            'refresh_token',
            JSON.stringify(responseToken.refreshToken)
        );
        //tokenInfo
        localStorage.setItem('token_info', JSON.stringify(tokenInfo));
    }

    public startTokenTimer() {
        const timeout = this.getTokenRemainingTime();
        this.timer = of(true)
            .pipe(
                delay(timeout),
                tap(() => this.refreshToken())
            )
            .subscribe();
    }

    refreshToken(): any {
        const refreshToken: RefreshToken = JSON.parse(
            localStorage.getItem('refresh_token')
        );
        if (!refreshToken) {
            this.clearLocalStorage();
            return of(null);
        }
        let rq: RefreshTokenRequest;
        rq = { refreshToken: refreshToken.value };
        // return this.userClient.refreshToken(rq).subscribe((res) => {
        //     this.setLocalStorage(res);
        //     this.startTokenTimer();
        //     console.log('token is refreshed', res);
        //     return res;
        // });
        return this.userClient.refreshToken(rq).subscribe((res) => {
            console.log(rq);
            console.log(res);
            let token_info = this.getDecodedAccessToken(res.accessToken);
            this.setLocalStorage(res, token_info);
            this.startTokenTimer();
            return res;
        });
    }

    getTokenRemainingTime() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return 0;
        }
        const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        console.log(expires.getTime() - Date.now());
        return expires.getTime() - Date.now();
    }

    clearLocalStorage() {
        // localStorage.removeItem('access_token');
        // localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token_info');
        localStorage.setItem('logout-event', 'logout' + Math.random());
    }

    setLocalStorage(x: JwtAuthResult, tokenInfo?: TokenInfo) {
        localStorage.setItem('access_token', x.accessToken);
        localStorage.setItem('refresh_token', JSON.stringify(x.refreshToken));
        localStorage.setItem('token_info', JSON.stringify(tokenInfo));
    }
    stopTokenTimer() {
        this.timer?.unsubscribe();
    }
}
