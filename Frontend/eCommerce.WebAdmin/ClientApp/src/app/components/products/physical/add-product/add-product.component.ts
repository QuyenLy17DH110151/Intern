import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
    public productForm: FormGroup;
    public descriptionValue: string = '';
    message: any;
    public url = [
        {
            img: 'assets/images/user.png',
        },
        {
            img: 'assets/images/user.png',
        },
        {
            img: 'assets/images/user.png',
        },
        {
            img: 'assets/images/user.png',
        },
        {
            img: 'assets/images/user.png',
        },
    ];

    constructor(
        private fb: FormBuilder,
        private productService: ProductService
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
            quantity: 1,
            description: '',
            OwnerId: '',
            //photoString: "photoPath1,photoPath2",
            photos: '',
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
    readUrl(event: any, i) {
        if (event.target.files.length === 0) return;
        //Image upload validation
        var mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        // Image upload
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
            this.url[i].img = reader.result.toString();
        };
    }

    ngOnInit(): void {}

    async onSubmit() {
        this.productForm.patchValue({
            description: this.descriptionValue,
            OwnerId: this.getOwnerId(),
        });

        const formData = this.productForm.value;
        formData.photos = ['urlImage', 'image2'];
        console.log(this.productForm.value);
        let result = await this.productService
            .addProduct(this.productForm.value)
            .toPromise()
            .then((response) => console.log('Response: ', response));
    }

    getOwnerId() {
        return localStorage.getItem('userId');
    }
}
