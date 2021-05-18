import { Component, OnInit, Injectable, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../api-clients/models/product.model';
import { CartService } from '../../services/cart.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
    public products: Product[] = [];
    public search: boolean = false;

    public languages = [
        {
            name: 'English',
            code: 'en',
        },
        {
            name: 'French',
            code: 'fr',
        },
    ];

    public currencies = [
        {
            name: 'Euro',
            currency: 'EUR',
            price: 0.9, // price of euro
        },
        {
            name: 'Rupees',
            currency: 'INR',
            price: 70.93, // price of inr
        },
        {
            name: 'Pound',
            currency: 'GBP',
            price: 0.78, // price of euro
        },
        {
            name: 'Dollar',
            currency: 'USD',
            price: 1, // price of usd
        },
    ];

    ngUnsubscribe = new Subject<void>();
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private translate: TranslateService,
        public productService: ProductService,
        public cartService: CartService
    ) {}

    ngOnInit(): void {
        this.cartService.cart$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => (this.products = response));
    }

    searchToggle() {
        this.search = !this.search;
    }

    changeLanguage(code) {
        if (isPlatformBrowser(this.platformId)) {
            this.translate.use(code);
        }
    }

    get getTotal(): number {
        return this.cartService.getTotalPrice();
    }

    removeItem(product: Product) {
        this.cartService.removeCartItem(product);
    }

    changeCurrency(currency: any) {
        this.productService.Currency = currency;
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
