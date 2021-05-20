import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { PagedList } from 'src/app/api-clients/models/common.model';
import { Order } from 'src/app/api-clients/models/order.model';
import { OrderClient } from 'src/app/api-clients/order.client';
import { OrderViewModel } from '../order.viewModel';


@Component({
    template: `
    <button class = "btn btn-primary mr-1" (click)="example()">Accept</button>
  `,
})
export class ButtonRenderComponent implements OnInit {

    public renderValue;
    orderList: Order[] = [];
    orderListVM: OrderViewModel[] = [];
    totalPages: number;
    totalRows: number;
    listCurrrentIdOrderApproved: string[] = [];


    @Input() value;

    constructor(
        private readonly orderClient: OrderClient,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.loadData();
        this.renderValue = this.value;
    }

    example() {
        this.AcceptOrder(this.renderValue);
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

    AcceptOrder(id: string) {
        if (this.listCurrrentIdOrderApproved.length !== 0) {
            this.listCurrrentIdOrderApproved.map(idOrder => {
                if (idOrder == id) {
                    return;
                }
            })
        }
        this.listCurrrentIdOrderApproved.push(id);
        this.orderClient
            .acceptOrder(id)
            .subscribe(() => {
                this.toastr.success('Change Order Success!', 'Notification');
                this.loadData();
            })

    }

}