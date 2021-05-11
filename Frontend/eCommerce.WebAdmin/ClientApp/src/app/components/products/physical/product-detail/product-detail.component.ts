import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '@ks89/angular-modal-gallery';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductClient } from 'src/app/api-clients/product.client';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
    providers: [NgbRatingConfig],
})
export class ProductDetailComponent implements OnInit {
    public closeResult: string;
    public counter: number = 1;
    product: any;
    productId: string;
    public labels: string[] = [];

    public imagesRect: Image[] = [
        new Image(
            0,
            { img: 'assets/images/pro3/2.jpg' },
            { img: 'assets/images/pro3/1.jpg' }
        ),
        new Image(
            1,
            { img: 'assets/images/pro3/27.jpg' },
            { img: 'assets/images/pro3/27.jpg' }
        ),
        new Image(
            2,
            { img: 'assets/images/pro3/1.jpg' },
            { img: 'assets/images/pro3/1.jpg' }
        ),
        new Image(
            3,
            { img: 'assets/images/pro3/2.jpg' },
            { img: 'assets/images/pro3/2.jpg' }
        ),
    ];

    constructor(
        private modalService: NgbModal,
        config: NgbRatingConfig,
        private productClient: ProductClient,
        private _route: ActivatedRoute
    ) {
        config.max = 5;
        config.readonly = false;
    }

    open(content) {
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result.then(
                (result) => {
                    this.closeResult = `Closed with: ${result}`;
                },
                (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(
                        reason
                    )}`;
                }
            );
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    async getProductDetail(productId: string) {
        return await this.productClient
            .getProductDetail(this.productId)
            .subscribe((response) => {
                this.product = response;
                console.log(this.product);
                let labels: any[] = [];
                let category = this.product.category;

                if (category && category.c1Lable) {
                    //options.push(category.c1Options.split(/[ ,]+/))
                    labels.push(
                        {
                            label: category.c1Lable,
                            options: category.c1Options.split(/[ ,]+/)
                        }
                    )
                }
                if (category && category.c2Lable) {
                    labels.push(
                        {
                            label: category.c2Lable,
                            options: category.c2Options.split(/[ ,]+/)
                        }
                    )

                }
                if (category && category.c3Lable) {
                    labels.push(
                        {
                            label: category.c3Lable,
                            options: category.c3Options.split(/[ ,]+/)
                        }
                    )
                }
                if (category && category.c4Lable) {
                    labels.push(
                        {
                            label: category.c4Lable,
                            options: category.c4Options.split(/[ ,]+/)
                        }
                    )
                }
                if (category && category.c5Lable) {
                    labels.push(
                        {
                            label: category.c5Lable,
                            options: category.c5Options.split(/[ ,]+/)
                        }
                    )
                }
                this.labels = labels;
                console.log(this.labels)
            });



    }

    increment() {
        this.counter += 1;
    }

    decrement() {
        this.counter -= 1;
    }

    async ngOnInit() {
        this.productId = this._route.snapshot.paramMap.get('productId');
        this.product = await this.getProductDetail(this.productId);

        if (!this.product.quantity) {
            this.product.quantity = 0;
        }
    }
}
