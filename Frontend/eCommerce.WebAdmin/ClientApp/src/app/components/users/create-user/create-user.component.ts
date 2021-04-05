import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateUserRequest } from 'src/app/api-clients/models/createUser.model';
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

  constructor(private formBuilder: FormBuilder, private userClient : UserClient) {
    this.createAccountForm();
  }

  createAccountForm() {
    this.formUser = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email]]
    })
  }

  get formValidators() {
    return this.formUser.controls;
  }


  async saveUser() {
    this.user = new CreateUserRequest(this.formUser.value.firstName, this.formUser.value.lastName,this.formUser.value.username);
    if (!this.formUser.invalid) {
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
