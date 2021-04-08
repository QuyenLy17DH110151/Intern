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
    private defaultCategoryId = '11e06484-b99d-48f1-80a5-90dd2082ca6d';
    private defaultPrice = 1000;
    defaultUrl = 'https://via.placeholder.com/150';
    selectedFiles?: FileList = null;
    fileUpload?: FileUpload;
    categories = [];

    @ViewChild('inputImage', { static: true, read: ElementRef }) inputImage: ElementRef<HTMLInputElement>;
    @ViewChild('inputName') inputName: ElementRef;
    constructor(
        private fb: FormBuilder,
        private productClient: ProductClient,
        private db: AngularFireDatabase,
        private storage: AngularFireStorage
    ) {
        this.productForm = this.fb.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.pattern('^[A-Za-z0-9 .,_-]*$'), //^[A-Za-z0-9_-]*$
                ],
            ],
            price: [
                this.defaultPrice,
                [Validators.required, Validators.pattern('^[0-9]*$')],
            ],
            categoryId: [
                this.defaultCategoryId,
                [Validators.required],
            ],
            description: [
                '',
                [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.pattern('^[A-Za-z0-9 .,_-]*$'),
                ],
            ],
        });
    }

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

    ngOnInit(){
        this.productClient.getAllCategory().subscribe(
            (response: CategoryReturnModel) => this.categories = response.items,
            error => console.log(error)
        );
    }

    ngAfterViewInit(): void {
        this.inputName.nativeElement.placeholder = "Sản phẩm 1";
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
            photos: [this.fileUpload.url],
        };

        const response = await this.productClient
            .addProduct(formData)
            .toPromise();
        console.log("response: ", response);
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

    discard() {
        this.productForm.reset();

        this.productForm.patchValue({
            price: this.defaultPrice,
            categoryId: this.defaultCategoryId,
        });
        this.fileUpload = null;
        this.inputImage.nativeElement.value = '';
        this.selectedFiles = null;
    }
}
