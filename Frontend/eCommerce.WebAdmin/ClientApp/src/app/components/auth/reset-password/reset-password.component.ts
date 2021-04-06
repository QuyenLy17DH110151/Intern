import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpdatePasswordRequest } from 'src/app/api-clients/models/_index';
import { UserClient } from 'src/app/api-clients/_index';
@Component({
    selector:'app-reset-password',
    templateUrl:'./reset-password.component.html',
    styleUrls:['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{
    public key: string;
    public email: string;
    public formResetPassword: FormGroup;
    public updatePasswordRequest: UpdatePasswordRequest = null;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userClient : UserClient) {
        this.createFromResetPassword();
     }

     createFromResetPassword(){
        this.formResetPassword = this.formBuilder.group({
            password: ['',[Validators.required, Validators.minLength(6)]],
            rePassword: ['',[Validators.required, Validators.minLength(6)]]
          })
     }

     get formValidators() {
        return this.formResetPassword.controls;
      }
    
     
    savePassword(){
        if(this.formResetPassword.value.password === this.formResetPassword.value.rePassword){
            this.updatePasswordRequest = new UpdatePasswordRequest(this.email, this.key, this.formResetPassword.value.password);            
            this.userClient.updatePassword(this.updatePasswordRequest).subscribe((res) =>{
                alert('Update Password Success');
            }); 
            this.createFromResetPassword;
        }
        if(this.formResetPassword.value.password != this.formResetPassword.value.rePassword){
            alert('password not equals password again');
        }
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.key =params['key'];
            this.email =params['email'];
          });

    }
    
}