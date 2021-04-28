import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CouponClient } from 'src/app/api-clients/coupon.client';
import { PagedList } from 'src/app/api-clients/models/common.model';
import { Coupon } from 'src/app/api-clients/models/coupon.model';
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
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private percentPipe: PercentPipe,
  ) { }

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
      name: {
        title: 'Name',
      },
      description: {
        title: 'Description',
      },
      startDate: {
        title: 'Start Date',
        valuePrepareFunction: (startDate) => {
          return this.datePipe.transform(
            new Date(startDate),
            'dd MMM yyyy'
          );
        },
      },
      endDate: {
        title: 'End Date',
        valuePrepareFunction: (endDate) => {
          return this.datePipe.transform(
            new Date(endDate),
            'dd MMM yyyy'
          );
        },
      },
      minPrice: {
        title: 'Min Price',
        valuePrepareFunction: (minPrice) => {
          return this.currencyPipe.transform(
            minPrice,
            'USD',
            'symbol',
            '1.2-2'
          );
        },
      },
      value: {
        title: 'Value',
        valuePrepareFunction: (value) => {
          return this.percentPipe.transform(
            value,
            '1.2-2'
          );
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


  ngOnInit() {
    this.loadData();
  }


}
