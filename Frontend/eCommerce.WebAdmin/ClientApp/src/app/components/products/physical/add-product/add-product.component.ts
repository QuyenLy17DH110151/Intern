import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductClient } from 'src/app/api-clients/product.client';
import { FileUploadService } from 'src/app/shared/service/upload-image/uploadImage.service';
import { FileUpload } from 'src/app/shared/service/upload-image/uploadImage.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
    public productForm: FormGroup;
    public descriptionValue: string = '';
    private basePath = '/uploads';
    message: any;
    selectedFiles?: FileList;
    fileUpload?: FileUpload;
    percentage = 0;

    constructor(
        private fb: FormBuilder,
        private productClient: ProductClient,
        private uploadService: FileUploadService,
        private db: AngularFireDatabase,
        private storage: AngularFireStorage
    ) {
        this.productForm = this.fb.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$'),
                ],
            ],
            price: [
                1000,
                [
                    Validators.required,
                    Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$'),
                ],
            ],
            categoryId: [
                '',
                [
                    Validators.required,
                    Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$'),
                ],
            ],
        });
    }

    increment() {
        this.productForm.patchValue({
            quantity: this.productForm.controls['quantity'].value + 1,
        });
        console.log(this.descriptionValue + 'vvv');
    }

    decrement() {
        this.productForm.patchValue({
            quantity: this.productForm.controls['quantity'].value - 1,
        });
    }

    //FileUpload
    // readUrl(event: any, i) {
    //     if (event.target.files.length === 0) return;
    //     //Image upload validation
    //     var mimeType = event.target.files[0].type;
    //     if (mimeType.match(/image\/*/) == null) {
    //         return;
    //     }
    //     // Image upload
    //     var reader = new FileReader();
    //     reader.readAsDataURL(event.target.files[0]);
    //     reader.onload = (_event) => {
    //         this.url[i].img = reader.result.toString();
    //     };
    // }

    ngOnInit(): void {}

    async onSubmit() {
        // this.productForm.patchValue({
        //     description: this.descriptionValue,
        //     OwnerId: this.getOwnerId(),
        // });

        //debugger;
        const formData = {
            ...this.productForm.value,
            description: this.descriptionValue,
            ownerId: this.getOwnerId(),
            photos: [this.fileUpload.url]
        };

        console.log("data submit: ", formData);
        await this.productClient
            .addProduct(formData)
            .toPromise()
            .then((response) => {
                if(response !== null) {
                    alert("Them moi sp thanh cong!");
                }
            });
    }

    getOwnerId() {
        return localStorage.getItem('userId');
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

                uploadTask
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

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
}
