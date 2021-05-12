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
    errorMessage: string;
    private subscription;

    constructor(
        public cartService: CartService,
        private couponClient: CouponClient,
        private router: Router
    ) {}

    ngOnInit() {
        this.subscription = this.cartService.subscribe((response) => (this.products = response));
    }

    public get getTotal(): number {
        return this.cartService.getTotalPrice();
    }

    public get cartTotalAmount(): number {
        return this.cartService.cartTotalAmount(null, this.discountPercent);
    }

    // Increament
    increment(product, qty = 1) {
        this.cartService.updateCartQuantity(product, qty);
    }

    // Decrement
    decrement(product, qty = -1) {
        this.cartService.updateCartQuantity(product, qty);
    }

    public removeItem(product: any) {
        this.cartService.removeCartItem(product);
    }

    handleCoupon() {
        this.couponClient.getCouponValue(this.code).subscribe(
            (response) => {
                this.errorMessage = '';
                this.discountPercent = response;
                localStorage.setItem('discountPercent', this.discountPercent.toString());
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
