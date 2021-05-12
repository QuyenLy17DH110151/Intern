import { response } from 'express';
import { CouponClient } from './../../api-clients/coupon.client';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from '../../api-clients/models/product.model';
import { OrderService } from '../../shared/services/order.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderClient } from 'src/app/api-clients/order.client';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
    public checkoutForm: FormGroup;
    public products: Product[] = [];
    public payPalConfig?: IPayPalConfig;
    public payment: string = 'Stripe';
    public amount: any;
    private subscription;
    private code: string;
    private discountPercent: number;

    constructor(
        private fb: FormBuilder,
        public cartService: CartService,
        private orderService: OrderService,
        private couponClient: CouponClient,
        private orderClient: OrderClient,
        private toastr: ToastrService
    ) {
        this.checkoutForm = this.fb.group({
            fullName: ['', [Validators.required]],
            phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
            email: ['', [Validators.required, Validators.email]],
            province: ['', Validators.required],
            district: ['', Validators.required],
            ward: ['', Validators.required],
            street: ['', [Validators.required, Validators.maxLength(50)]],
        });
    }

    ngOnInit(): void {
        this.code = localStorage.getItem('code') ? localStorage.getItem('code') : '';
        this.couponClient
            .getCouponValue(this.code)
            .subscribe((response) => (this.discountPercent = response));
        this.subscription = this.cartService.subscribe((response) => (this.products = response));
        this.initConfig();
        //this.getProductsInCart();
    }

    public get getTotal(): number {
        return this.cartService.getTotalPrice();
    }

    public get cartTotalAmount(): number {
        return this.cartService.cartTotalAmount(null, this.discountPercent);
    }

    // Stripe Payment Gateway
    stripeCheckout() {
        var handler = (<any>window).StripeCheckout.configure({
            key: environment.stripe_token, // publishble key
            locale: 'auto',
            token: (token: any) => {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
                this.orderService.createOrder(
                    this.products,
                    this.checkoutForm.value,
                    token.id,
                    this.amount
                );
            },
        });
        handler.open({
            name: 'Multikart',
            description: 'Online Fashion Store',
            amount: this.amount * 100,
        });
    }

    // Paypal Payment Gateway
    private initConfig(): void {
        this.payPalConfig = {
            currency: this.cartService.Currency.currency,
            clientId: environment.paypal_token,
            createOrderOnClient: (data) =>
                <ICreateOrderRequest>{
                    intent: 'CAPTURE',
                    purchase_units: [
                        {
                            amount: {
                                currency_code: this.cartService.Currency.currency,
                                value: this.amount,
                                breakdown: {
                                    item_total: {
                                        currency_code: this.cartService.Currency.currency,
                                        value: this.amount,
                                    },
                                },
                            },
                        },
                    ],
                },
            advanced: {
                commit: 'true',
            },
            style: {
                label: 'paypal',
                size: 'small', // small | medium | large | responsive
                shape: 'rect', // pill | rect
            },
            onApprove: (data, actions) => {
                this.orderService.createOrder(
                    this.products,
                    this.checkoutForm.value,
                    data.orderID,
                    this.getTotal
                );
                console.log(
                    'onApprove - transaction was approved, but not authorized',
                    data,
                    actions
                );
                actions.order.get().then((details) => {
                    console.log(
                        'onApprove - you can get full order details inside onApprove: ',
                        details
                    );
                });
            },
            onClientAuthorization: (data) => {
                console.log(
                    'onClientAuthorization - you should probably inform your server about completed transaction at this point',
                    data
                );
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
            },
            onError: (err) => {
                console.log('OnError', err);
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
            },
        };
    }

    checkout() {
        if (!this.checkoutForm.valid) {
            this.toastr.error('Please fill in the delivery address', 'Error');
            return;
        }

        const checkoutForm = this.checkoutForm.value;
        const formData = {
            buyerEmail: checkoutForm.email,
            buyerName: checkoutForm.fullName,
            buyerPhone: checkoutForm.phone,
            Address:
                checkoutForm.street +
                ', ' +
                checkoutForm.ward +
                ', ' +
                checkoutForm.district +
                ', ' +
                checkoutForm.province,
            products: this.products,
            couponCode: this.code,
        };

        this.orderClient.checkout(formData).subscribe(
            (response) => {
                this.cartService.resetLocalStorage();
                this.toastr.success('Checkout is successful', 'Notification');
            },
            (error) => this.toastr.error('Checkout is failed', 'Notification')
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
