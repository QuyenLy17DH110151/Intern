import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CouponClient } from 'src/app/api-clients/coupon.client';
import { Coupon } from 'src/app/api-clients/models/coupon.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from '../../api-clients/models/product.model';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
    public products: Product[] = [];
    discountPercent: number = 0;
    code: string = '';
    orderValue: number;
    errorMessage: string;
    deliveryPrice = 20;
    finalAmount: number;

    constructor(
        private cartService: CartService,
        public productService: ProductService,
        private couponClient: CouponClient,
        private router: Router
    ) {}

    ngOnInit() {
        this.cartService.cartItems.subscribe((response) => {
            console.log(response);
            this.products = response;
        });
        console.log('cart: ', this.products);

        this.calculateTotalAmountAfterApplyCoupon();
    }

    public get getTotal(): Observable<number> {
        return this.cartService.cartTotalAmount();
    }

    async calculateTotalAmountAfterApplyCoupon() {
        const rawValue = await this.getTotal.toPromise();
        this.finalAmount = rawValue - this.deliveryPrice - (rawValue * this.discountPercent) / 100;
    }

    // Increament
    increment(product, qty = 1) {
        this.cartService.updateCartQuantity(product, qty);
        this.calculateTotalAmountAfterApplyCoupon();
    }

    // Decrement
    decrement(product, qty = -1) {
        this.cartService.updateCartQuantity(product, qty);
        this.calculateTotalAmountAfterApplyCoupon();
    }

    public removeItem(product: any) {
        this.cartService.removeCartItem(product);
        this.calculateTotalAmountAfterApplyCoupon();
    }

    handleCoupon() {
        this.couponClient.getCouponValue(this.code).subscribe(
            (response) => {
                this.errorMessage = "";
                this.discountPercent = response;
                localStorage.setItem('discountPercent', this.discountPercent.toString())
                this.calculateTotalAmountAfterApplyCoupon();
            },
            (error) => {
                this.errorMessage = error.error.errorMessage;
            }
        );
    }

    checkout() {
        localStorage.setItem('code', this.code);
        this.router.navigate(['/shop/checkout']);
    }
}
