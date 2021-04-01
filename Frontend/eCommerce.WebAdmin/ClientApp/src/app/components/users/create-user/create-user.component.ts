import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateUserRequest } from 'src/app/api-clients/models/createUser.model';
import { User } from 'src/app/api-clients/models/user.model';
import { UserClient } from 'src/app/api-clients/user.client';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public formUser: FormGroup;
  public permissionForm: FormGroup;
  public user: CreateUserRequest;
  public erroFirstName: string = 'First Name not empty';
  public erroLastName: string = 'Last Name not empty';
  public erroUsername: string = 'Username not empty';
  public isDisableButtonSubmit: boolean = true;

  constructor(private formBuilder: FormBuilder, private userClient : UserClient) {
    this.createAccountForm();
  }

  createAccountForm() {
    this.formUser = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      username: ['']
    })
  }

  updateDisableButtonSubmit(){
    if(this.erroFirstName==null && this.erroLastName==null && this.erroUsername==null){
      this.isDisableButtonSubmit=false;
      return;
    }
    this.isDisableButtonSubmit=true;
  }

  changeFirstName(){
    if(this.formUser.value.firstName == ''){
      this.erroFirstName = 'First Name not empty';
    }
    if(this.formUser.value.firstName!= ''){
      this.erroFirstName = null;
    }
    this.updateDisableButtonSubmit();
  }

  changeLaststName(){
    if(this.formUser.value.lastName == ''){
      this.erroLastName = 'Last Name not empty';
    }
    if(this.formUser.value.lastName!= ''){
      this.erroLastName = null;
    }
    this.updateDisableButtonSubmit()
  }

  changeUsername(){
    if(this.formUser.value.username == ''){
      this.erroUsername = 'Username not empty';
    }
    if (this.formUser.value.username != ''){
      this.erroUsername = null;
    }
    if (this.formUser.value.username != ''&& !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.formUser.value.username ))
    {
      this.erroUsername = 'Username not email address';
    }
    
    this.updateDisableButtonSubmit();
  }

  async saveUser() {
    this.user = new CreateUserRequest(this.formUser.value.firstName, this.formUser.value.lastName,this.formUser.value.username);
    if(this.isDisableButtonSubmit==false){
      this.userClient.createUser(this.user).subscribe((res) =>{
        alert('Create User Success')
      }, 
      (erro) =>{
       
        if(erro.status<400){
          alert('Create User Success')
        }
        if(erro.status>=400){
          alert('Create User Fails')
        }
      });
    }
    this.createAccountForm();
  }

  ngOnInit() {
  }

}
