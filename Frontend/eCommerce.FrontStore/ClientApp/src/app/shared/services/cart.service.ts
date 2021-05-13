import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../api-clients/models/product.model';
@Injectable({
    providedIn: 'root',
})
export class CartService {
    public Currency = {
        name: 'VND',
        currency: 'VND',
        price: 1,
    };
    public DELIVERY_PRICE = 9999;
    public OpenCart: boolean = false;
    public cartItems: Product[] = JSON.parse(localStorage['cartItems'] || '[]');
    private _cart$ = new BehaviorSubject<Product[]>(this.cartItems);
    cart$ = this._cart$.asObservable();

    constructor(private http: HttpClient, private toastrService: ToastrService) {}

    // subscribe() {
    //     //this._cart$.getValue()
    //     this.cartItems = JSON.parse(localStorage['cartItems'] || '[]');
    //     this._cart$.next(this.cartItems);
    //     return this._cart$.asObservable();
    //     //return this._cart$.subscribe(observer);
    // }

    // setCartItems(products) {
    //     this.cartItems.push(...products);
    //     this._cart$.next(products);
    // }

    // Add to Cart
    public addToCart(product: Product): void {
        const cartItem = this.cartItems.find((item) => item.id === product.id);
        product.quantity = product.quantity ? product.quantity : 1;

        if (cartItem) {
            cartItem.quantity += product.quantity;
        } else {
            this.cartItems.push(product);
        }

        this._cart$.next(this.cartItems);
        this.OpenCart = true; // If we use cart variation modal
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }

    // Remove Cart items
    public removeCartItem(product: Product): any {
        const index = this.cartItems.indexOf(product);
        this.cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        // update streams
        this._cart$.next(this.cartItems);
    }

    // remove all the  items added to the cart
    removeAllCartItem() {
        this.cartItems.length = 0;
        this._cart$.next(this.cartItems);
    }

    getTotalPrice() {
        let total = 0;
        this.cartItems.forEach((item) => {
            total += item.price * item.quantity;
        });

        return total;
    }

    cartTotalAmount(deliveryPrice, discountPercent) {
        const shipFee = deliveryPrice ? deliveryPrice : this.DELIVERY_PRICE;
        const totalPrice = this.getTotalPrice();
        return totalPrice + shipFee - (totalPrice * discountPercent) / 100;
    }

    // Update Cart Quantity
    public updateCartQuantity(product: Product, quantity: number): Product | boolean {
        return this.cartItems.find((items, index) => {
            if (items.id === product.id) {
                const qty = this.cartItems[index].quantity + quantity;

                if (qty !== 0) {
                    this.cartItems[index].quantity = qty;
                }

                localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
                this._cart$.next(this.cartItems);
                return true;
            }
        });
    }

    public get itemNumber(): number {
        let itemNumber = 0;
        this.cartItems.forEach((item) => {
            itemNumber += item.quantity;
        });

        return itemNumber;
    }

    public resetLocalStorage() {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('code');
    }
}
