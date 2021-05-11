import { Order } from 'src/app/api-clients/models/order.model';
import { OrderClient } from 'src/app/api-clients/order.client';
import { Component, OnInit } from '@angular/core';
import * as chartData from '../../shared/data/chart'; // khac gi import chartData thoi
import { doughnutData, pieData } from '../../shared/data/chart';
import { DashboardClient } from 'src/app/api-clients/Dashboard.client';
import { SearchRequestOrder } from 'src/app/api-clients/models/order.model';
import { OrderViewModel } from '../orders/order.viewModel';
import * as HighCharts from 'highcharts';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public doughnutData = doughnutData;
    public pieData = pieData;
    rq: SearchRequestOrder = {};
    orders: Order[];
    header = [];
    orderListVM: OrderViewModel[] = [];
    constructor(
        private _dashBoard: DashboardClient,
        private _orderClient: OrderClient
    ) {
        Object.assign(this, { doughnutData, pieData });
    }

    // events
    public chartClicked(e: any): void {}
    public chartHovered(e: any): void {}

    ngOnInit() {
        this.getSumEarnings();
        this.getCountComment();
        this.getCountUser();
        this.getCountProduct();
        this.getLastedOrder();
        this.pieChartBrowser();
        // this.createChart();
        // this._dashBoard.getSumEarnings();
    }

    public chart3 = chartData.chart3;

    sumEarnings: number;
    countProduct: number;
    countUser: number;
    countComment: number;
    getSumEarnings() {
        // this.sumEarnings = this._dashBoard.getSumEarnings();
        console.log(
            'sads',
            this._dashBoard.getSumEarnings().subscribe((res) => {
                this.sumEarnings = Number(res);
            })
        );
    }

    getCountProduct() {
        this._dashBoard.getCountProduct().subscribe((res) => {
            this.countProduct = Number(res);
        });
    }

    getCountComment() {
        this._dashBoard.getCountComment().subscribe((res) => {
            this.countComment = Number(res);
        });
    }

    getCountUser() {
        this._dashBoard.getCountUser().subscribe((res) => {
            this.countUser = Number(res);
        });
    }

    getLastedOrder() {
        // Get 5 Orders Lastest
        this.rq.orderBy = 'createdDate|true';
        this.rq.pageSize = '5';
        this.rq.pageIndex = '0';
        this._orderClient.searchOrder(this.rq).subscribe((res) => {
            console.log('get Lasted Order', res);
            this.orders = res.items;
            this.orderListVM = this.orders.map(
                (order, index) => new OrderViewModel(order, index)
            );
        });
    }

    pieChartBrowser() {
        HighCharts.chart('pieChart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
            },
            title: {
                text: 'Best Selling Categories',
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    },
                },
            },
            series: [
                {
                    name: 'Brands',
                    colorByPoint: true,
                    type: undefined,
                    data: [
                        {
                            name: 'Chrome',
                            y: 61.41,
                            sliced: true,
                            selected: true,
                        },
                        {
                            name: 'Internet Explorer',
                            y: 11.84,
                        },
                        {
                            name: 'Firefox',
                            y: 10.85,
                        },
                        {
                            name: 'Edge',
                            y: 4.67,
                        },
                        {
                            name: 'Safari',
                            y: 4.18,
                        },
                        {
                            name: 'Sogou Explorer',
                            y: 1.64,
                        },
                        {
                            name: 'Opera',
                            y: 1.6,
                        },
                        {
                            name: 'QQ',
                            y: 1.2,
                        },
                        {
                            name: 'Other',
                            y: 2.61,
                        },
                    ],
                },
            ],
        });
    }
}
