export class UserRegisterationForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(){
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
    }
}
