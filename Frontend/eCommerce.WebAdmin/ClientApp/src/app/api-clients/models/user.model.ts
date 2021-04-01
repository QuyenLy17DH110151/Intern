export class User {
    userName: string;
    firstName: string;
    lastName: string;
    username: string;
    role: UserRole;
    lockoutEnd?: Date;
    createDate: Date;
    createBy: string;
    lastUpdate?: Date;
    lastUpdateBy: string;
}
export enum UserRole {
    Admin = 1,
    Seller,
}
