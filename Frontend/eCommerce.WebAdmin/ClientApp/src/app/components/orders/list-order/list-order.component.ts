import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { stat } from 'node:fs';
import { PagedList } from 'src/app/api-clients/models/common.model';
import { Order } from 'src/app/api-clients/models/order.model';
import { OrderClient } from 'src/app/api-clients/order.client';

@Component({
    selector: 'app-list-order',
    templateUrl: './list-order.component.html',
    styleUrls: ['./list-order.component.scss'],
    providers: [DatePipe, CurrencyPipe],
})
export class ListOrderComponent implements OnInit {
    orderList: any = [];
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
            stt: {
                title: 'STT',
                type: 'number',
            },
            buyerName: {
                title: 'Customer',
            },
            buyerEmail: {
                title: 'Email',
            },
            buyerPhone: {
                title: 'Number Phone',
            },
            address: {
                title: 'Address',
            },
            productName: {
                title: 'Product Name',
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
            totalValue: {
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
            status: {
                title: 'Status',
                valuePrepareFunction: (status) => {
                    if (status === 1) return 'New';
                    if (status === 2) return 'Approved';
                    if (status === 3) return 'Cancelled';
                },
            },
        },
    };

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.orderClient.getAllOrder().subscribe(
            (response: PagedList<Order>) => {
                this.orderList = response.items;
                this.totalPages = response.totalPages;
                this.totalRows = response.totalRows;

                // Custom data before render
                this.orderList.map((order, index) => {
                    order.stt = index + 1;
                    order.productName = order.product.name;
                    order.productId = order.product.id;
                    order.totalValue = order.quantity * order.price;
                });

                console.log(this.orderList);
            },
            (error) => console.log(error)
        );
    }
}
