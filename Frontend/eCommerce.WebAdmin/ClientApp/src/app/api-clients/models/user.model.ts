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
export class UpdatePasswordRequest {

    username: string;
    keyParam: string;
    password: string;

    constructor(username: string, keyParam: string, password: string) {
        this.username = username;
        this.keyParam = keyParam;
        this.password = password;
    }


}

class UserBasic {
    username: string;
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string, username: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }
}

export class CreateUserRequest extends UserBasic {

}

export class ForgotPasswordRequest extends UserBasic {

}
