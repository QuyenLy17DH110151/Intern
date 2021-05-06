import { Component, OnInit } from '@angular/core';
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
    couponId: string = '';
    orderValue: number;
    Inputedcoupon: Coupon = null;
    errorMessage: string;
    deliveryPrice = 20000;

    constructor(
        private cartService: CartService,
        public productService: ProductService,
        private couponClient: CouponClient
    ) {
        this.cartService.cartItems.subscribe((response) => (this.products = response));
    }

    ngOnInit() {
        console.log('cart: ', this.products);
    }

    public get getTotal(): Observable<number> {
        return this.cartService.cartTotalAmount();
    }

    public get getTotalAfterApplyCoupon(): Observable<number> {
        const discountPercent = this.Inputedcoupon ? this.Inputedcoupon.value : 0;
        return this.cartService.cartTotalAmountFinally(this.deliveryPrice, discountPercent);
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
        this.couponClient.getCouponById(this.couponId).subscribe(
            (response) => (this.Inputedcoupon = response),
            (error) => (this.errorMessage = error)
        );
    }
}
