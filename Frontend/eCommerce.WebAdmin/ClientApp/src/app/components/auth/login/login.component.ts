import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';
import { LoginRequest } from './../../../api-clients/models/common.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserClient } from 'src/app/api-clients/_index';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public registerForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private userClient: UserClient,
        private route: Router,
        private userService: UserService
    ) {
        this.createLoginForm();
        this.createRegisterForm();
    }

    owlcarousel = [
        {
            title: 'Welcome to Multikart',
            desc:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        },
        {
            title: 'Welcome to Multikart',
            desc:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        },
        {
            title: 'Welcome to Multikart',
            desc:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        },
    ];
    owlcarouselOptions = {
        loop: true,
        items: 1,
        dots: true,
    };

    createLoginForm() {
        this.loginForm = this.formBuilder.group({
            username: [''],
            password: [''],
        });
    }

    createRegisterForm() {
        this.registerForm = this.formBuilder.group({
            username: [''],
            password: [''],
            confirmPassword: [''],
        });
    }

    ngOnInit() {}

    onSubmit() {
        let getToken = this.userClient
            .login(this.loginForm.value)
            .toPromise()
            .then(
                (res) => {
                    console.log('res', res);
                    localStorage.setItem('token', res.accessToken);
                    let tokenInfo = this.userService.getDecodedAccessToken(
                        res.accessToken
                    );
                    console.log('token info user Name', tokenInfo.username);
                    localStorage.setItem('userName', tokenInfo.username);
                    this.route.navigate(['dashboard/default']);
                },
                (err) => console.log(err)
            );
    }
}
