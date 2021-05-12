import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { Product as ProductAPI } from 'src/app/api-clients/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { SizeModalComponent } from '../../../shared/components/modal/size-modal/size-modal.component';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
    selector: 'app-three-column',
    templateUrl: './three-column.component.html',
    styleUrls: ['./three-column.component.scss'],
})
export class ThreeColumnComponent implements OnInit {
    public product: Product = {};
    public counter: number = 1;
    public activeSlide: any = 0;
    public selectedSize: any;
    public productAPI: ProductAPI;
    date: Date;
    productId: string;
    @ViewChild('sizeChart') SizeChart: SizeModalComponent;

    public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
    public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

    constructor(
        private router: Router,
        public productService: ProductService,
        private _router: ActivatedRoute,
        private cartService: CartService
    ) {
        this._router.params.subscribe((response) => {
            this.getProduct(response.slug);
        });
        // console.log(this._router.snapshot.params.slug);
    }

    ngOnInit(): void {
        this.date = this.addDays(1);
    }

    addDays(days: number): Date {
        var futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        return futureDate;
    }

    // Increament
    increment() {
        this.counter++;
    }

    // Decrement
    decrement() {
        if (this.counter > 1) this.counter--;
    }

    // Add to cart
    addToCart(productAPI) {
        debugger;
        productAPI.quantity = this.counter || 1;
        this.cartService.addToCart(productAPI);
    }

    // Buy Now
    buyNow(productAPI) {
        productAPI.quantity = this.counter || 1;
        this.cartService.addToCart(productAPI);
        this.router.navigate(['/shop/cart']);
    }

    // Add to Wishlist
    addToWishlist(product: any) {
        this.productService.addToWishlist(product);
    }

    getProduct(productId: string) {
        this.productService.getProductDetail(productId).subscribe((response) => {
            this.productAPI = response;
        });
    }
}
