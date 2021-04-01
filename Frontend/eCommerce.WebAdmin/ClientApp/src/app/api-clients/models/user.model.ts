export class User {
    userName: string;
    firstName: string;
    lastName: string;
}
export enum UserRole {
    Admin = 1,
    Seller,
}

export class ListUser {
    username: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    lockoutEnd?: Date;
    createDate: Date;
    createBy: string;
    lastUpdate?: Date;
    lastUpdateBy: string;
}
