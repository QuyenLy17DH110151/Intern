import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PagedList } from 'src/app/api-clients/models/common.model';
import { Order } from 'src/app/api-clients/models/order.model';
import { OrderClient } from 'src/app/api-clients/order.client';
import { OrderViewModel } from '../order.viewModel';

@Component({
    selector: 'app-list-order',
    templateUrl: './list-order.component.html',
    styleUrls: ['./list-order.component.scss'],
    providers: [DatePipe, CurrencyPipe],
})
export class ListOrderComponent implements OnInit {
    orderList: Order[] = [];
    orderListVM: OrderViewModel[] = [];
    totalPages: number;
    totalRows: number;

    keyWordSearch: string = '';
    constructor(
        private readonly orderClient: OrderClient,
        private datePipe: DatePipe,
        private currencyPipe: CurrencyPipe
    ) {}

    public settings = {
        delete: {
            confirmDelete: true,
        },
        edit: {
            confirmSave: true,
        },
        actions: {
            custom: [
                {
                    name: 'Button',
                    title: 'Button ',
                },
            ],
        },
        columns: {
            index: {
                title: 'STT',
            },
            customer: {
                title: 'Customer',
            },
            email: {
                title: 'Email',
            },
            phoneNumber: {
                title: 'Number Phone',
            },
            address: {
                title: 'Address',
            },
            product: {
                title: 'Product Name',
                type: 'html',
                valuePrepareFunction: (product) => {
                    return `<a href= "/products/product-detail/${product.id}">${product.name}</a>`;
                }
            },
            quantity: {
                title: 'Quantity',
            },
            price: {
                title: 'Price',
                valuePrepareFunction: (price) => {
                    return this.currencyPipe.transform(
                        price,
                        'USD',
                        'symbol',
                        '1.2-2'
                    );
                },
            },
            totalAmount: {
                title: 'Total Value',
                valuePrepareFunction: (totalValue) => {
                    return this.currencyPipe.transform(
                        totalValue,
                        'USD',
                        'symbol',
                        '1.2-2'
                    );
                },
            },
            createdDate: {
                title: 'Created Date',
                valuePrepareFunction: (createdDate) => {
                    return this.datePipe.transform(
                        new Date(createdDate),
                        'dd MMM yyyy'
                    );
                },
            },
            statusString: {
                title: 'Status',
            },
        },
    };

    ngOnInit() {
        this.loadData();
    }

    async loadData() {
        const response: PagedList<Order> = await this.orderClient
            .getAllOrder()
            .toPromise();

        this.orderList = response.items;
        this.totalPages = response.totalPages;
        this.totalRows = response.totalRows;
        // Custom data before render
        this.orderListVM = this.orderList.map(
            (order, index) => new OrderViewModel(order, index)
        );

    }
}
