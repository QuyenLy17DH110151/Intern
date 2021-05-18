import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../api-clients/models/product.model';
import { WishListService } from 'src/app/shared/services/wishlist.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
    public products: Product[] = [];
    ngUnsubscribe = new Subject<void>();

    constructor(
        private router: Router,
        public cartService: CartService,
        private wishListService: WishListService
    ) {}

    ngOnInit() {
        this.wishListService.wishList$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => (this.products = response));
    }

    async addToCart(product: any) {
        await this.cartService.addToCart(product);
        this.removeItem(product);
        this.router.navigate(['/shop/cart']);
    }

    removeItem(product: any) {
        this.wishListService.removeWishlistItem(product);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
