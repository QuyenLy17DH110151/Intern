import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { PagedList } from 'src/app/api-clients/models/common.model';
import { Order } from 'src/app/api-clients/models/order.model';
import { OrderClient } from 'src/app/api-clients/order.client';
import { OrderViewModel } from '../order.viewModel';


@Component({
    template: `
    <button class = "btn btn-primary mr-1" (click)="accept()"  [disabled]="status" >Accept</button>
  `,
})
export class ButtonRenderComponent implements OnInit {

    public id;
    orderList: Order[] = [];
    orderListVM: OrderViewModel[] = [];
    totalPages: number;
    totalRows: number;
    listCurrrentIdOrderApproved: string[] = [];
    status: boolean;

    @Input() value;

    constructor(
        private readonly orderClient: OrderClient,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.loadData();
        this.id = this.value.id;
        this.status = this.value.status == "Approved";
    }

    accept() {
        this.AcceptOrder(this.id);
    }

    async loadData() {
        this.value.e();
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