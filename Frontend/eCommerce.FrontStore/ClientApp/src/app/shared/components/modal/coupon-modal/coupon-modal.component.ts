import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-coupon-modal',
    templateUrl: './coupon-modal.component.html',
    styleUrls: ['./coupon-modal.component.scss'],
})
export class CouponModalComponent implements OnInit {
    constructor(public modal: NgbActiveModal) {}

    ngOnInit(): void {}
}
