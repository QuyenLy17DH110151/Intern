import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CouponClient } from 'src/app/api-clients/coupon.client';
import { PagedList } from 'src/app/api-clients/models/common.model';
import { Coupon } from 'src/app/api-clients/models/coupon.model';
import { ConfirmService } from 'src/app/shared/service/confirm.service';
import { MoneyPipe } from 'src/app/shared/service/moneyPipe';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../smart-table-datepicker/smart-table-datepicker.component';
import { CouponViewModel } from '../coupon.viewModel';


@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrls: ['./list-coupon.component.scss'],
  providers: [DatePipe, CurrencyPipe, PercentPipe],
})
export class ListCouponComponent implements OnInit {

  couponList: Coupon[] = [];
  couponListVM: CouponViewModel[] = [];
  totalPages: number;
  totalRows: number;

  constructor(
    private readonly couponClient: CouponClient,
    private readonly confirmService: ConfirmService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private percentPipe: PercentPipe,
    private toastr: ToastrService,
    private moneyPipe: MoneyPipe
  ) { }

  public settings = {
    pager: {
      display: true,
      perPage: 5,
    },
    delete: {
      confirmDelete: true,
    },
    edit: {
      confirmSave: true,
    },
    add: {
      confirmCreate: true,
    },

    columns: {
      code: {
        title: 'Code',
      },
      name: {
        title: 'Name',
      },
      description: {
        title: 'Description',
      },
      startDate: {
        title: 'Start Date',
        type: 'custom',
        renderComponent: SmartTableDatepickerRenderComponent,
        width: '300px',
        sortDirection: 'desc',
        editor: {
          type: 'custom',
          component: SmartTableDatepickerComponent,
        }
      },
      endDate: {
        title: 'End Date',
        type: 'custom',
        renderComponent: SmartTableDatepickerRenderComponent,
        width: '300px',
        sortDirection: 'desc',
        editor: {
          type: 'custom',
          component: SmartTableDatepickerComponent,
        }
      },
      minPrice: {
        title: 'Min Price',
        valuePrepareFunction: (minPrice) => {
          return this.moneyPipe.MoneyPipeVND(minPrice);
        },
      },
      value: {
        title: 'Discount',
        valuePrepareFunction: (discount) => {
          return discount + '%';
        },
      },
    },
  };

  async loadData() {
    const response: PagedList<Coupon> = await this.couponClient
      .getAllCoupon()
      .toPromise();

    this.couponList = response.items;
    this.totalPages = response.totalPages;
    this.totalRows = response.totalRows;
    // Custom data before render
    this.couponListVM = this.couponList.map(
      (coupon) => new CouponViewModel(coupon)
    );

  }

  onCreateConfirm(event): void {
    var data = {
      "name": event.newData.name,
      "description": event.newData.description,
      "startDate": event.newData.startDate,
      "endDate": event.newData.endDate,
      "minPrice": event.newData.minPrice,
      "value": event.newData.value,
      "code": event.newData.code,
    };

    if (data.minPrice === "")
      this.couponClient.addCoupon(data).subscribe(() => {
        event.confirm.resolve(event.newData);
        this.toastr.success('Change Coupon Success!', 'Notification');
        this.loadData();
      })
  }

  onDeleteConfirm(event) {

    let action = () => {
      this.couponClient
        .deleteCoupon(event.data.id)
        .subscribe((res) => {
          this.toastr.success(
            'delete coupon successfully!',
            'Success...'
          );
          this.loadData();
        });
    }

    this.confirmService.confirmAction(action, "delete");
  }

  onEditConfirm(event) {
    var data = {
      "code": event.newData.code,
      "name": event.newData.name,
      "description": event.newData.description,
      "startDate": event.newData.startDate,
      "endDate": event.newData.endDate,
      "minPrice": event.newData.minPrice,
      "value": event.newData.value,
    };

    let action = () => {
      this.couponClient
        .updateCoupon(event.data.id, data)
        .subscribe((res) => {
          this.toastr.success(
            'Edit coupon successfully!',
            'Success...'
          );
          this.loadData();
        });
    }

    this.confirmService.confirmAction(action, "edit");
  }


  ngOnInit() {
    this.loadData();
  }


}
