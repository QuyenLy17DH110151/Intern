import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import {
    UrlImage,
    UserInformationResponse,
    UserUpdateInformation,
} from 'src/app/api-clients/models/_index';
import { UserClient } from 'src/app/api-clients/_index';
import { FileUpload } from 'src/app/shared/service/upload-image/uploadImage.model';
import { UserService } from 'src/app/shared/service/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [UserService],
})
export class ProfileComponent implements OnInit {
    public formUser: FormGroup;
    public displayBtnActionImg: boolean = true;
    public displayEditImg: boolean = false;
    public user: UserInformationResponse;
    userUpdateInformation: UserUpdateInformation;
    private basePath = '/uploads';
    public displayEditProfile: boolean = false;
    public fileUpload?: FileUpload = null;
    public selectedFiles?: FileList = null;
    public defaultUrl = 'https://via.placeholder.com/150';
    public defaultUrlAvata = 'assets/images/dashboard/designer.jpg';
    userUrlImage: string;

    constructor(
        private userClient: UserClient,
        private storage: AngularFireStorage,
        private formBuilder: FormBuilder,
        private toastr: ToastrService
    ) {
        this.createUserForm();
        this.getInformation();
    }
    resetPassword() {
        this.userClient.resetPassword().subscribe((res) => {
            this.toastr.success('Reset Password Success!', 'Notification');
        });
    }

    createUserForm() {
        this.formUser = this.formBuilder.group({
            username: [''],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            phoneNumber: [
                '',
                [Validators.maxLength(15), Validators.minLength(8)],
            ],
        });
    }
    setValueDefaultInUserForm() {
        this.formUser.patchValue({
            username: this.user.username,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            phoneNumber: this.user.phoneNumber,
        });
    }
    get formValidators() {
        return this.formUser.controls;
    }

    async saveUser() {
        this.userUpdateInformation = new UserUpdateInformation(
            this.formUser.value.firstName,
            this.formUser.value.lastName,
            this.formUser.value.phoneNumber
        );
        this.userClient
            .updateMyInformation(this.userUpdateInformation)
            .subscribe((res) => {
                this.toastr.success(
                    'Update My Information Success!',
                    'Notification'
                );
                this.createUserForm();
                this.getInformation();
                //return page profile
                this.clickEditProfile();
                console.log(this.user);
            });
    }

    getInformation() {
        this.userClient.getMyInformation().subscribe((res) => {
            this.user = res;
            console.log('user', this.user);

            this.setValueDefaultInUserForm();
        });
    }
    ngOnInit() {}
    clickImg() {
        this.displayBtnActionImg = !this.displayBtnActionImg;
    }

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }

    changeImage() {
        this.displayEditImg = !this.displayEditImg;
    }
    async uploadImage() {
        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);
            this.selectedFiles = undefined;

            if (file) {
                this.fileUpload = new FileUpload(file);

                const filePath = `${this.basePath}/${this.fileUpload.file.name}`;
                const storageRef = this.storage.ref(filePath);
                const uploadTask = this.storage.upload(
                    filePath,
                    this.fileUpload.file
                );

                await uploadTask
                    .snapshotChanges()
                    .pipe(
                        finalize(() => {
                            storageRef
                                .getDownloadURL()
                                .subscribe((downloadURL) => {
                                    this.fileUpload.url = downloadURL;
                                    this.fileUpload.name = this.fileUpload.file.name;
                                });
                        })
                    )
                    .subscribe();
            }
        }
    }

    saveChangeImage() {
        if (this.fileUpload == null || this.fileUpload.url == null) {
            Swal.fire('Cancelled', 'upload image please!', 'error');
            return;
        }
        var urlImage: UrlImage = new UrlImage(this.fileUpload.url);
        this.userClient.updateAvata(urlImage).subscribe(() => {
            this.fileUpload = null;
            this.displayEditImg = !this.displayEditImg;
            this.displayBtnActionImg = true;
            this.getInformation();
            this.toastr.success('upload image success!', 'Notification');
        });
    }

    clickEditProfile() {
        this.displayEditProfile = !this.displayEditProfile;
    }
}
