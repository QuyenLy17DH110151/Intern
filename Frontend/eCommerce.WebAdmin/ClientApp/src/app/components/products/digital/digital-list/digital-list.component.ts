import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchRequestProduct } from 'src/app/api-clients/models/common.model';
import { ProductClient } from 'src/app/api-clients/product.client';
import { MoneyPipe } from 'src/app/shared/service/moneyPipe';

@Component({
    selector: 'app-digital-list',
    templateUrl: './digital-list.component.html',
    styleUrls: ['./digital-list.component.scss'],
    providers: [ProductClient],
})
export class DigitalListComponent implements OnInit {
    public product_list: any;
    rq: SearchRequestProduct = {};

    constructor(protected productClient: ProductClient, private router: Router, private moneyPipe: MoneyPipe) {

    }

    async loadData() {
        this.rq.sort = 'CreatedDate|true';
        let products = await this.productClient
            .searchProducts(this.rq)
            .toPromise();

        this.product_list = products.items;
    }

    public settings = {
        pager: {
            display: true,
            perPage: 5,
        },
        actions: {
            position: 'left',
            add: false,
            delete: false,
            edit: false,
        },
        columns: {
            photos: {
                title: 'Image',
                type: 'html',
                valuePrepareFunction: (photos) => {
                    return (
                        '<img src="' +
                        photos[0].url +
                        '" height="150" width="150"/>'
                    );
                },
                filter: false,
            },
            name: {
                title: 'Product Name',
            },
            price: {
                title: 'Price',
                valuePrepareFunction: (price) => {
                    return this.moneyPipe.MoneyPipeVND(price);
                }
            },
            category: {
                title: 'Category',
                valuePrepareFunction: (category) => {
                    return category.name;
                },
                filterFunction(category?: any, search?: string): boolean {
                    if (category.name.toLowerCase().indexOf(search) > -1)
                        return true;
                    return false;
                },
            },
            owner: {
                title: 'Owner',
                valuePrepareFunction: (owner) => {
                    return owner.username;
                },
                filterFunction(owner?: any, search?: string): boolean {
                    if (owner.username.toLowerCase().indexOf(search) > -1)
                        return true;
                    return false;
                },
            },
            description: {
                title: 'Description',
                filter: false,
            },
        },
    };

    ngOnInit() {
        this.loadData();
    }

    onProductRowSelected(event) {
        const productId = event.data.id;
        this.router.navigate(['/products/product-detail', productId]);
    }
}
