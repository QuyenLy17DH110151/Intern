import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuickViewComponent } from '../../modal/quick-view/quick-view.component';
import { CartModalComponent } from '../../modal/cart-modal/cart-modal.component';
import { Product } from 'src/app/api-clients/models/product.model';
import { ProductService } from '../../../services/product.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductRatingClient } from 'src/app/api-clients/productRating.client';
import { interval } from 'rxjs';
import { WishListService } from 'src/app/shared/services/wishlist.service';

@Component({
    selector: 'app-product-box-one',
    templateUrl: './product-box-one.component.html',
    styleUrls: ['./product-box-one.component.scss'],
})
export class ProductBoxOneComponent implements OnInit {
    @Input() product: Product;
    @Input() currency: any = this.productService.Currency; // Default Currency
    @Input() thumbnail: boolean = false; // Default False
    @Input() onHowerChangeImage: boolean = false; // Default False
    @Input() cartModal: boolean = false; // Default False
    @Input() loader: boolean = false;
    starAvg: number = 5;
    killOb: boolean = true;
    @ViewChild('quickView') QuickView: QuickViewComponent;
    @ViewChild('cartModal') CartModal: CartModalComponent;
    public isWishlist: boolean = false;

    public ImageSrc: string;

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private productRatingClient: ProductRatingClient,
        private wishListService: WishListService
    ) {
        this.getStarAvg();
    }

    ngOnInit(): void {
        if (this.loader) {
            setTimeout(() => {}, 2000); // Skeleton Loader
        }

        this.isWishlist = this.wishListService.isWishlist(this.product.id);
    }

    getStarAvg() {
        let subscription = interval(1000).subscribe({
            next: () => {
                if (this.product.id != null) {
                    this.productRatingClient.getStart(this.product.id).subscribe((rp) => {
                        this.starAvg = (rp.avgValueDouble + 0.5) | 0;
                    });
                    unsubscribe();
                }
            },
            error: () => {},
            complete: () => {},
        });

        let unsubscribe = () => {
            subscription.unsubscribe();
        };
    }

    // Get Product Color
    Color(variants) {
        const uniqColor = [];
        for (let i = 0; i < Object.keys(variants).length; i++) {
            if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
                uniqColor.push(variants[i].color);
            }
        }
        return uniqColor;
    }

    // Change Variants
    ChangeVariants(color, product) {
        product.variants.map((item) => {
            if (item.color === color) {
                product.images.map((img) => {
                    if (img.image_id === item.image_id) {
                        this.ImageSrc = img.src;
                    }
                });
            }
        });
    }

    // Change Variants Image
    ChangeVariantsImage(src) {
        this.ImageSrc = src;
    }

    addToCart(product) {
        this.cartService.addToCart(product);
    }

    addToWishlist(product: any) {
        if (this.isWishlist) {
            this.wishListService.removeWishlistItem(product);
            this.isWishlist = !this.isWishlist;
            return;
        }

        this.wishListService.addToWishlist(product);
        this.isWishlist = !this.isWishlist;
    }

    addToCompare(product: any) {
        this.productService.addToCompare(product);
    }
}
