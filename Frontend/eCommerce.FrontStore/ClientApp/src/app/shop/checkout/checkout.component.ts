import { CouponClient } from './../../api-clients/coupon.client';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from '../../api-clients/models/product.model';
import { OrderService } from '../../shared/services/order.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderClient } from 'src/app/api-clients/order.client';
import { takeUntil } from 'rxjs/operators';
import { Order, OrderDetail } from 'src/app/api-clients/models/order.model';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
    public checkoutForm: FormGroup;
    public orderDetails: OrderDetail[] = [];
    public payPalConfig?: IPayPalConfig;
    public payment: string = 'Stripe';
    public amount: any;
    private code: string;
    private discountPercent: number;
    ngUnsubscribe = new Subject<void>();

    constructor(
        private fb: FormBuilder,
        public cartService: CartService,
        private orderService: OrderService,
        private couponClient: CouponClient,
        private orderClient: OrderClient,
        private toastr: ToastrService
    ) {
        const address = JSON.parse(localStorage.getItem('checkoutForm'));

        this.checkoutForm = this.fb.group({
            fullName: [address ? address.fullName : '', [Validators.required]],
            phone: [
                address ? address.phone : '',
                [Validators.required, Validators.pattern('[0-9]+')],
            ],
            email: [address ? address.email : '', [Validators.required, Validators.email]],
            province: [address ? address.province : '', Validators.required],
            district: [address ? address.district : '', Validators.required],
            ward: [address ? address.ward : '', Validators.required],
            street: [
                address ? address.street : '',
                [Validators.required, Validators.maxLength(50)],
            ],
        });
    }

    ngOnInit(): void {
        this.code = localStorage.getItem('code') ? localStorage.getItem('code') : '';
        this.couponClient
            .getCouponValue(this.code)
            .subscribe((response) => (this.discountPercent = response));

        this.cartService.cart$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => (this.orderDetails = response));
        //this.getProductsInCart();
    }

    public get getTotal(): number {
        return this.cartService.getTotalPrice();
    }

    public get cartTotalAmount(): number {
        return this.cartService.cartTotalAmount(null, this.discountPercent);
    }

    checkout() {
        if (!this.checkoutForm.valid) {
            this.toastr.error('Please fill in the delivery address', 'Error');
            return;
        }

        const checkoutForm = this.checkoutForm.value;
        const formData: Order = {
            buyerEmail: checkoutForm.email,
            buyerName: checkoutForm.fullName,
            buyerPhone: checkoutForm.phone,
            address:
                checkoutForm.street +
                ', ' +
                checkoutForm.ward +
                ', ' +
                checkoutForm.district +
                ', ' +
                checkoutForm.province,
            orderItems: this.orderDetails,
            couponCode: this.code,
        };

        this.orderClient.checkout(formData).subscribe(
            (response) => {
                this.cartService.resetLocalStorage();
                this.toastr.success('Checkout is successful', 'Notification');
                this.cartService.resetLocalStorage();
                this.storeAddressToLocalStorage();
            },
            (error) => this.toastr.error('Checkout is failed', 'Notification')
        );
    }

    storeAddressToLocalStorage() {
        localStorage.setItem('checkoutForm', JSON.stringify(this.checkoutForm.value));
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
