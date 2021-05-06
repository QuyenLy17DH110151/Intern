import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { ProductClient } from 'src/app/api-clients/product.client';
import { FileUpload } from 'src/app/shared/service/upload-image/uploadImage.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { CategoryReturnModel } from 'src/app/api-clients/models/_index';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
    public productForm: FormGroup;
    private basePath = '/uploads';
    private defaultPrice = 1000;
    defaultUrl = 'https://via.placeholder.com/150';
    selectedFiles?: FileList = null;
    fileUpload?: FileUpload;
    categories = [];
    listUrlImage = [];
    @ViewChild('inputImage', { static: true, read: ElementRef })
    inputImage: ElementRef<HTMLInputElement>;
    constructor(
        private fb: FormBuilder,
        private productClient: ProductClient,
        private db: AngularFireDatabase,
        private storage: AngularFireStorage
    ) {}

    get name() {
        return this.productForm.get('name');
    }

    get price() {
        return this.productForm.get('price');
    }

    get categoryId() {
        return this.productForm.get('categoryId');
    }

    get description() {
        return this.productForm.get('description');
    }

    ngOnInit() {
        this.productClient.getAllCategory().subscribe(
            (response: CategoryReturnModel) => {
                this.categories = response.items;

                // Initial create product form
                this.productForm = this.fb.group({
                    name: [
                        '',
                        [
                            Validators.required,
                            // Validators.minLength(10),
                            // Validators.pattern('^[A-Za-z0-9 .,_-]*$'), //^[A-Za-z0-9_-]*$
                        ],
                    ],
                    price: [
                        this.defaultPrice,
                        [Validators.required, Validators.pattern('^[0-9]*$')],
                    ],
                    categoryId: [this.categories[0].id, [Validators.required]],
                    description: [
                        '',
                        [
                            Validators.required,
                            // Validators.minLength(10),
                            // Validators.pattern('^[A-Za-z0-9 .,_-]*$'),
                        ],
                    ],
                });
            },
            (error) => console.log(error)
        );
    }

    async onSubmit() {
        if (!this.fileUpload) {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Please upload photos before submitting!',
            });
            return;
        }

        const formData = {
            ...this.productForm.value,
            ownerId: this.getOwnerId(),
            photos: this.listUrlImage,
        };

        const response = await this.productClient
            .addProduct(formData)
            .toPromise();
        console.log('response: ', response);
        if (response !== null) {
            Swal.fire({
                icon: 'success',
                title: 'Success...',
                text: 'Create new product successfully!',
            });
        }
    }

    getOwnerId() {
        return localStorage.getItem('userId');
    }

    async uploadImage() {
        if (this.selectedFiles) {
            const numFile = this.selectedFiles.length;
            for (let index = 0; index < numFile; index++) {
                console.log(this.selectedFiles[index]);
                this.uploadSingleImage(this.selectedFiles[index]);
            }
            // this.listUrlImage = [];
        }
    }
    uploadSingleImage(selectedFiles) {
        const file: File | null = selectedFiles;
        selectedFiles = undefined;

        if (file) {
            this.fileUpload = new FileUpload(file);
            console.log('123456', file, this.fileUpload);

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
                        storageRef.getDownloadURL().subscribe((downloadURL) => {
                            this.fileUpload.url = downloadURL;
                            this.fileUpload.name = this.fileUpload.file.name;
                            this.listUrlImage.push(this.fileUpload.url);
                            console.log('list url', this.listUrlImage);
                        });
                    })
                )
                .subscribe();
        }
    }

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }

    discard() {
        this.productForm.reset();

        this.productForm.patchValue({
            price: this.defaultPrice,
            categoryId: this.categories[0].id,
        });
        this.fileUpload = null;
        this.inputImage.nativeElement.value = '';
        this.selectedFiles = null;
        this.listUrlImage = [];
    }
}
