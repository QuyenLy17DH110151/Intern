import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    public password: string; 
    public erroPassword: string = 'Password not empty';
    public erroRePassword: string = null;
    public isDisableButtonSubmit: boolean = true;
    public isDisableRePassword: boolean = true;
    public updatePasswordRequest: UpdatePasswordRequest = null;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userClient : UserClient) {
        this.createFromResetPassword();
     }

     createFromResetPassword(){
        this.formResetPassword = this.formBuilder.group({
            password: [''],
            rePassword: ['']
          })
     }

     updateDisableButtonSubmit(){
        if(this.erroPassword==null && this.erroRePassword==null ){
          this.isDisableButtonSubmit=false;
          return;
        }
        this.isDisableButtonSubmit=true;
      }

    changePassword(){
        let password = this.formResetPassword.value.password;
        if(password == ''){
            this.erroPassword = 'Password not empty';
        }
        if(password!= ''){
            if(password.length<6){
                this.erroPassword = 'Password min length 6 characters';
            }
            if(password.length>=6){
                this.erroPassword = null;
                this.isDisableRePassword =true;
                this.changeRePassword();
            }
        }
        
    }

    changeRePassword(){
        if(this.formResetPassword.value.password != this.formResetPassword.value.rePassword){
            this.erroRePassword = 'Not equals password'; 
        } 
        if(this.formResetPassword.value.password == this.formResetPassword.value.rePassword){
            this.erroRePassword = null; 
        }
        this.updateDisableButtonSubmit();
    }

    savePassword(){
        this.updatePasswordRequest = new UpdatePasswordRequest(this.email, this.key, this.formResetPassword.value.password);
        if(this.isDisableButtonSubmit==false){
          this.userClient.updatePassword(this.updatePasswordRequest).subscribe((res) =>{
            alert('Update Password Success');
          }, 
          (erro) =>{
            alert('Update Password Fail')
          });
        }
        this.createFromResetPassword;
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.key =params['key'];
            this.email =params['email'];
          });

    }
    
}