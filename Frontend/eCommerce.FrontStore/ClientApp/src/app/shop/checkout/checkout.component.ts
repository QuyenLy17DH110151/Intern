import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from '../../api-clients/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { OrderService } from '../../shared/services/order.service';
import { OrderClient } from 'src/app/api-clients/order.client';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';

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
    public productList = [];
    public deliveryPrice = 20;
    public finalAmount: number;

    constructor(
        private fb: FormBuilder,
        public productService: ProductService,
        private cartService: CartService,
        private orderService: OrderService,
        private orderClident: OrderClient,
        private toastr: ToastrService
    ) {
        this.checkoutForm = this.fb.group({
            fullName: [
                '',
                [Validators.required],
            ],
            phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
            email: ['', [Validators.required, Validators.email]],
            province: ['', Validators.required],
            district: ['', Validators.required],
            ward: ['', Validators.required],
            street: ['', [Validators.required, Validators.maxLength(50)]],
        });
    }

    ngOnInit(): void {
        this.cartService.cartItems.subscribe((response) => {
            this.products = response;
            console.log('product in checkout: ', this.products);
        });
        this.getTotal.subscribe((amount) => (this.amount = amount));
        this.initConfig();
        this.getTotalFinnally();
        this.getProductsInCart();
    }

    public get getTotal(): Observable<number> {
        return this.cartService.cartTotalAmount();
    }

    public async getTotalFinnally() {
        const rawValue = await this.getTotal.toPromise();
        const discountPercent = +localStorage.getItem('discountPercent');
        this.finalAmount = rawValue - this.deliveryPrice - (rawValue * discountPercent) / 100;
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
            currency: this.productService.Currency.currency,
            clientId: environment.paypal_token,
            createOrderOnClient: (data) =>
                <ICreateOrderRequest>{
                    intent: 'CAPTURE',
                    purchase_units: [
                        {
                            amount: {
                                currency_code: this.productService.Currency.currency,
                                value: this.amount,
                                breakdown: {
                                    item_total: {
                                        currency_code: this.productService.Currency.currency,
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
        const checkoutForm = this.checkoutForm.value;
        const formData = {
            buyerEmail: checkoutForm.email,
            buyerName: checkoutForm.fullName,
            buyerPhone: checkoutForm.phone,
            Address:
                checkoutForm.street + ' ' +
                checkoutForm.ward + ' ' +
                checkoutForm.district + ' ' +
                checkoutForm.province,
            products: this.productList,
            couponCode: localStorage.getItem('code'),
        };

        this.orderClident.checkout(formData).subscribe();
        this.orderService.resetData();
        this.toastr.success('Checkout is successful', 'Notification');
    }

    getProductsInCart() {
      debugger;
        const cartItems = JSON.parse(localStorage['cartItems']);

        cartItems.forEach((item, index) => {
          let product: any = {};
          product.id = item.id;
          product.quantity = item.quantity;
          product.price = item.price;    
          this.productList.push(product);
        });

        console.log(this.productList);
    }
}
