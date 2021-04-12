import { stringify } from '@angular/compiler/src/util';

export class PagedList<T> {
    totalRows: number;
    totalPages: number;
    items: T[];
}

export class SearchRequest {
    searchTerm?: string;
    sort?: string;
    pageNumber?: string;
    pageSize?: string;
    isLockout?: string;
}

export class SearchRequestProduct {
    searchTerm?: string;
    sort?: string;
    pageNumber?: string;
    pageSize?: string;
    OnwerName?: string;
    CategoryName?: string;
}

export class NameValue {
    value = 0;
    name: string;
}

export class LoginRequest {
    userName: string;
    password: string;
    constructor(userName?: string, password?: string) {
        this.userName = userName;
        this.password = password;
    }
}

export class JwtAuthResult {
    accessToken: string;
    refreshToken: RefreshToken;
}

export class RefreshToken {
    userName: string;
    value: string;
    expireAt: Date;
}
