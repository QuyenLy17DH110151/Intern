import { DashboardService } from './../../shared/service/dashboard.service';
import { Component, OnInit } from '@angular/core';
import * as chartData from '../../shared/data/chart'; // khac gi import chartData thoi
import { doughnutData, pieData } from '../../shared/data/chart';
import { DashboardClient } from 'src/app/api-clients/Dashboard.client';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public doughnutData = doughnutData;
    public pieData = pieData;
    constructor(private _dashBoard: DashboardClient) {
        Object.assign(this, { doughnutData, pieData });
    }

    // doughnut 2
    public view = chartData.view;
    public doughnutChartColorScheme = chartData.doughnutChartcolorScheme;
    public doughnutChartShowLabels = chartData.doughnutChartShowLabels;
    public doughnutChartGradient = chartData.doughnutChartGradient;
    public doughnutChartTooltip = chartData.doughnutChartTooltip;

    public chart5 = chartData.chart5;

    // lineChart
    public lineChartData = chartData.lineChartData;
    public lineChartLabels = chartData.lineChartLabels;
    public lineChartOptions = chartData.lineChartOptions;
    public lineChartColors = chartData.lineChartColors;
    public lineChartLegend = chartData.lineChartLegend;
    public lineChartType = chartData.lineChartType;

    // lineChart
    public smallLineChartData = chartData.smallLineChartData;
    public smallLineChartLabels = chartData.smallLineChartLabels;
    public smallLineChartOptions = chartData.smallLineChartOptions;
    public smallLineChartColors = chartData.smallLineChartColors;
    public smallLineChartLegend = chartData.smallLineChartLegend;
    public smallLineChartType = chartData.smallLineChartType;

    // lineChart
    public smallLine2ChartData = chartData.smallLine2ChartData;
    public smallLine2ChartLabels = chartData.smallLine2ChartLabels;
    public smallLine2ChartOptions = chartData.smallLine2ChartOptions;
    public smallLine2ChartColors = chartData.smallLine2ChartColors;
    public smallLine2ChartLegend = chartData.smallLine2ChartLegend;
    public smallLine2ChartType = chartData.smallLine2ChartType;

    // lineChart
    public smallLine3ChartData = chartData.smallLine3ChartData;
    public smallLine3ChartLabels = chartData.smallLine3ChartLabels;
    public smallLine3ChartOptions = chartData.smallLine3ChartOptions;
    public smallLine3ChartColors = chartData.smallLine3ChartColors;
    public smallLine3ChartLegend = chartData.smallLine3ChartLegend;
    public smallLine3ChartType = chartData.smallLine3ChartType;

    // lineChart
    public smallLine4ChartData = chartData.smallLine4ChartData;
    public smallLine4ChartLabels = chartData.smallLine4ChartLabels;
    public smallLine4ChartOptions = chartData.smallLine4ChartOptions;
    public smallLine4ChartColors = chartData.smallLine4ChartColors;
    public smallLine4ChartLegend = chartData.smallLine4ChartLegend;
    public smallLine4ChartType = chartData.smallLine4ChartType;

    public chart3 = chartData.chart3;

    // events
    public chartClicked(e: any): void {}
    public chartHovered(e: any): void {}

    ngOnInit() {
        this.getSumEarnings();
        this.getCountComment();
        this.getCountUser();
        this.getCountProduct();
        // this._dashBoard.getSumEarnings();
    }

    sumEarnings: number;
    countProduct: number;
    countUser: number;
    countComment: number;
    getSumEarnings() {
        // this.sumEarnings = this._dashBoard.getSumEarnings();
        console.log('sads', this._dashBoard.getSumEarnings());
        this.sumEarnings = 3000;
    }

    getCountProduct() {
        this.countProduct = this._dashBoard.getCountProduct();
    }

    getCountComment() {
        this.countComment = this._dashBoard.getCountComment();
    }

    getCountUser() {
        this.countUser = this._dashBoard.getCountUser();
    }
}
