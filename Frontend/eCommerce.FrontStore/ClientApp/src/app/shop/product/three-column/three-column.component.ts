import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../shared/data/slider';
import { Product as ProductAPI } from 'src/app/api-clients/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { SizeModalComponent } from '../../../shared/components/modal/size-modal/size-modal.component';
import { flatten } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductRatingClient } from 'src/app/api-clients/productRating.client';
import {
    CreateProductRatingRequest,
    GetProductRatingRequest,
    GetStarResponse,
    ProductRatingResponse,
} from 'src/app/api-clients/models/productRating';
import { PagerService } from 'src/app/shared/services/page.service';
import { Product } from 'src/app/shared/classes/product';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
    selector: 'app-three-column',
    templateUrl: './three-column.component.html',
    styleUrls: ['./three-column.component.scss'],
})
export class ThreeColumnComponent implements OnInit {
    public counter: number = 1;
    public activeSlide: any = 0;
    public selectedSize: any;
    public productAPI: ProductAPI;
    public ratingNumber: number = 5;
    public reviews: ProductRatingResponse[] = [];
    date: Date;
    productId: string;
    public formReview: FormGroup;
    public displayErro: boolean = false;
    public labels: string[] = [];
    public product: Product = {};
    @ViewChild('sizeChart') SizeChart: SizeModalComponent;
    @ViewChild('tabSet', { static: false }) tabSet;
    pages: string[] = ['tab-0', 'tab-1', 'tab-2'];
    pagedItems: any[];
    public getStarResponse: GetStarResponse = null;
    public totalRowsReview: number = 0;
    public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
    public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;
    public withRatingCss: any[] = [];
    public starAvg: number = 0;
    public isStartToTopReview: boolean = false;
    pager: any = {
        pages: [],
    };

    constructor(
        private renderer: Renderer2,
        private productRatingClient: ProductRatingClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public productService: ProductService,
        private _router: ActivatedRoute,
        private pagerService: PagerService,
        public cartService:CartService
    ) {
        this._router.params.subscribe((response) => {
            // console.log("response", response);
            this.getProduct(response.slug);
        });
        // console.log(this._router.snapshot.params.slug);
        this.createFromReview();
        //set page review
    }

    getActiveStar(index: number, numberStar: number) {
        return numberStar > this.getStarResponse.startValues.length - 1 - index;
    }

    getDataStar() {
        this.productRatingClient.getStart(this.productAPI.id).subscribe((rp) => {
            this.getStarResponse = rp;
            console.log(this.getStarResponse);
        });
    }

    getWidth(value: number, isEnable: boolean) {
        if (isEnable) {
            return Math.ceil((value / this.getStarResponse.numberStart) * 300);
        }
        return 300 - Math.ceil((value / this.getStarResponse.numberStart) * 300);
    }

    getDataPageReview(pageIndex: number) {
        this.productRatingClient
            .getProductRating(new GetProductRatingRequest(this.productAPI.id, pageIndex - 1, 5))
            .subscribe((respone) => {
                this.reviews = respone.items;
                this.totalRowsReview = respone.totalRows;
                this.setPage(pageIndex);
            });
    }

    rating(num: number) {
        this.ratingNumber = num;
    }

    createFromReview() {
        this.formReview = this.formBuilder.group({
            fullName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            reviewTitle: ['', [Validators.required]],
            reviewContent: ['', [Validators.required]],
        });
    }

    get formReviewValidators() {
        return this.formReview.controls;
    }

    isStar(index: number, numStar: number): boolean {
        if (numStar == -1) {
            return this.ratingNumber >= index;
        }
        return numStar >= index;
    }

    getDisplayPagination() {
        return this.pager.totalPages > 1;
    }

    submitReview() {
        this.displayErro = true;

        if (!this.formReview.invalid) {
            let createProductRatingRequest: CreateProductRatingRequest =
                new CreateProductRatingRequest(
                    this.formReview.value.fullName,
                    this.formReview.value.email,
                    this.productAPI.id,
                    this.formReview.value.reviewTitle,
                    this.formReview.value.reviewContent,
                    this.ratingNumber
                );

            this.productRatingClient
                .addProductRating(createProductRatingRequest)
                .subscribe((rs) => {
                    this.createFromReview();
                    this.ratingNumber = 5;
                    this.getDataPageReview(1);
                    this.getDataStar();
                    this.goToReview();
                });

            this.displayErro = false;
        }
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.totalRowsReview, page, 5);
        // this.allItems = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 10]
        // // get current page of items
        // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

        //set layout go to top review
        if (this.isStartToTopReview) {
            try {
                const errorField = this.renderer.selectRootElement('.first-review');
                errorField.scrollIntoView();
            } catch (err) {}
        }
        this.isStartToTopReview = true;
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
    async addToCart(productAPI: ProductAPI) {
        productAPI.quantity = this.counter || 1;
        await this.cartService.addToCart(productAPI);
    }

    // Buy Now
    async buyNow(productAPI: ProductAPI) {
        productAPI.quantity = this.counter || 1;
        await this.cartService.addToCart(productAPI);
        if (status) this.router.navigate(['/shop/cart']);
    }

    // Add to Wishlist
    addToWishlist(product: any) {
        this.productService.addToWishlist(product);
    }

    goToReview(): void {
        this.tabSet.select(this.pages[1]);
    }

    getProduct(productId: string) {
        this.productService.getProductDetail(productId).subscribe((response) => {
            this.productAPI = response;
            let labels: any[] = [];
            let category = this.productAPI.category;

            if (category && category.c1Lable) {
                //options.push(category.c1Options.split(/[ ,]+/))
                labels.push({
                    label: category.c1Lable,
                    options: category.c1Options.split(/[ ,]+/),
                });
            }
            if (category && category.c2Lable) {
                labels.push({
                    label: category.c2Lable,
                    options: category.c2Options.split(/[ ,]+/),
                });
            }
            if (category && category.c3Lable) {
                labels.push({
                    label: category.c3Lable,
                    options: category.c3Options.split(/[ ,]+/),
                });
            }
            if (category && category.c4Lable) {
                labels.push({
                    label: category.c4Lable,
                    options: category.c4Options.split(/[ ,]+/),
                });
            }
            if (category && category.c5Lable) {
                labels.push({
                    label: category.c5Lable,
                    options: category.c5Options.split(/[ ,]+/),
                });
            }
            this.labels = labels;
            this.getDataPageReview(1);
            this.getDataStar();
        });
    }
}
