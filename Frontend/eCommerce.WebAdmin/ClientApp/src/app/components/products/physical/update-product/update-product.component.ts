import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
    productId: string;
    public config1: DropzoneConfigInterface = {
        clickable: true,
        maxFiles: 1,
        autoReset: null,
        errorReset: null,
        cancelReset: null,
    };

    public onUploadInit(args: any): void {}

    public onUploadError(args: any): void {}

    public onUploadSuccess(args: any): void {}

    constructor(private _route: ActivatedRoute) {}

    ngOnInit() {
        this.productId = this._route.snapshot.paramMap.get('productId');
        console.log(this.productId);
    }
}
