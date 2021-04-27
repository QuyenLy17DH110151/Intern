import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';
import { LoginRequest } from './../../../api-clients/models/common.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserClient } from 'src/app/api-clients/_index';
import Swal from 'sweetalert2';
import {
    ForgotPasswordRequest,
    UserRole,
} from 'src/app/api-clients/models/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public forgotPasswordForm: FormGroup;
    submitted = false;
    public isStartForgotPassword = false;
    constructor(
        private formBuilder: FormBuilder,
        private userClient: UserClient,
        private route: Router,
        private userService: UserService
    ) {
        this.createLoginForm();
        this.createForgotPasswordForm();
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

    createForgotPasswordForm() {
        this.forgotPasswordForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
        });
    }

    ngOnInit() {
        this.createLoginForm();
    }
    get f() {
        return this.loginForm.controls;
    }
    get forgotPasswordValidators() {
        return this.forgotPasswordForm.controls;
    }
    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            console.log(this.loginForm.invalid);
            return;
        }
        this.userClient
            .login(this.loginForm.value)
            .toPromise()
            .then(
                (res) => {
                    localStorage.setItem('access_token', res.accessToken);
                    let tokenInfo = this.userService.getDecodedAccessToken(
                        res.accessToken
                    );
                    console.log('token info user Name', tokenInfo);
                    localStorage.setItem('userName', tokenInfo.username);
                    localStorage.setItem('userId', tokenInfo.id);
                    localStorage.setItem('userRole', tokenInfo.role);
                    this.route.navigate(['dashboard/default']);
                },
                (err) => {
                    Swal.fire('Error', err.error.message, 'error');
                    // alert(err.error.message);
                }
            );
    }

    submitForgotPassword() {
        this.isStartForgotPassword = true;
        if (!this.forgotPasswordForm.invalid) {
            let rq: ForgotPasswordRequest = new ForgotPasswordRequest(
                this.forgotPasswordForm.value.firstName,
                this.forgotPasswordForm.value.lastName,
                this.forgotPasswordForm.value.username
            );
            this.createForgotPasswordForm();
            this.isStartForgotPassword = false;
            this.userClient.forgotPassword(rq).subscribe(
                (res) => {
                    alert('Request change password Success');
                    this.createForgotPasswordForm();

                }
            );
        }
    }
}
