export class UpdatePasswordRequest {

    username: string;
    keyParam: string;
    password: string;

    constructor( username: string, keyParam: string, password: string){
        this.username = username;
        this.keyParam = keyParam;
        this.password = password;
    }

    
}
