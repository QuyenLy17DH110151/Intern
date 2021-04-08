import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';
import { LoginRequest } from './../../../api-clients/models/common.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserClient } from 'src/app/api-clients/_index';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public registerForm: FormGroup;
    submitted = false;
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
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    createRegisterForm() {
        this.registerForm = this.formBuilder.group({
            username: [''],
            password: [''],
            confirmPassword: [''],
        });
    }

    ngOnInit() {
        this.createLoginForm();
    }
    get f() {
        return this.loginForm.controls;
    }
    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            console.log(this.loginForm.invalid);
            return;
        }
        let getToken = this.userClient
            .login(this.loginForm.value)
            .toPromise()
            .then(
                (res) => {
                    console.log('res', res);
                    localStorage.setItem('access_token', res.accessToken);
                    let tokenInfo = this.userService.getDecodedAccessToken(
                        res.accessToken
                    );
                    console.log('token info user Name', tokenInfo);
                    localStorage.setItem('userName', tokenInfo.username);
                    localStorage.setItem('userId', tokenInfo.id);
                    this.route.navigate(['dashboard/default']);
                },
                (err) => console.log(err)
            );
    }
}
