export class CreateUserRequest{
    username: string;
    firstName: string;
    lastName: string;

    constructor( firstName: string, lastName: string, username: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }

}