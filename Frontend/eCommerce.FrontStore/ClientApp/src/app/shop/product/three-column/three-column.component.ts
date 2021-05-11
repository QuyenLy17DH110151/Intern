import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ProductDetailsMainSlider,
  ProductDetailsThumbSlider,
} from "../../../shared/data/slider";
import { Product as ProductAPI } from "src/app/api-clients/models/product.model";
import { ProductService } from "../../../shared/services/product.service";
import { SizeModalComponent } from "../../../shared/components/modal/size-modal/size-modal.component";
import { flatten } from "@angular/compiler";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductRatingClient } from "src/app/api-clients/productRating.client";
import { CreateProductRatingRequest, GetProductRatingRequest, GetStarResponse, ProductRatingResponse } from "src/app/api-clients/models/productRating";
import { PagerService } from "src/app/shared/services/page.service";

@Component({
  selector: "app-three-column",
  templateUrl: "./three-column.component.html",
  styleUrls: ["./three-column.component.scss"],
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
  @ViewChild("sizeChart") SizeChart: SizeModalComponent;
  @ViewChild('tabSet', { static: false }) tabSet;
  pages: string[] = ["tab-0", "tab-1", "tab-2"];
  pagedItems: any[];
  public getStarResponse: GetStarResponse = null;
  public totalRowsReview: number = 0;
  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;
  public withRatingCss: any[] = [];
  public starAvg: number = 0
  pager: any = {
    pages: []
  };

  constructor(
    private productRatingClient: ProductRatingClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private _router: ActivatedRoute,
    private pagerService: PagerService
  ) {
    this._router.params.subscribe((response) => {
      // console.log("response", response);
      this.getProduct(response.slug);
    });
    // console.log(this._router.snapshot.params.slug);
    this.createFromReview();
    //set page review 

  }

  getWidthRating() {
    let stars = this.getStarResponse;

    this.withRatingCss = [];
    //set width star one
    if (stars.starOne != 0) {
      this.withRatingCss.push(
        {
          indexStar: 1,
          active: Math.ceil(stars.starOne / stars.numberStart * 300),
          nonActive: 300 - Math.ceil(stars.starOne / stars.numberStart * 300)
        }
      )
    }

    if (stars.starOne == 0) {
      this.withRatingCss.push(
        {
          indexStar: 1,
          active: 0,
          nonActive: 300
        }
      )
    }

    //set width star tow
    if (stars.starTwo != 0) {
      this.withRatingCss.push(
        {
          indexStar: 2,
          active: Math.ceil(stars.starTwo / stars.numberStart * 300),
          nonActive: 300 - Math.ceil(stars.starTwo / stars.numberStart * 300)
        }
      )
    }

    if (stars.starTwo == 0) {
      this.withRatingCss.push(
        {
          indexStar: 2,
          active: 0,
          nonActive: 300
        }
      )
    }

    //set width star three
    if (stars.starThree != 0) {
      this.withRatingCss.push(
        {
          indexStar: 3,
          active: Math.ceil(stars.starThree / stars.numberStart * 300),
          nonActive: 300 - Math.ceil(stars.starThree / stars.numberStart * 300)
        }
      )
    }

    if (stars.starThree == 0) {
      this.withRatingCss.push(
        {
          indexStar: 3,
          active: 0,
          nonActive: 300
        }
      )
    }

    //set with star four
    if (stars.starFour != 0) {
      this.withRatingCss.push(
        {
          indexStar: 4,
          active: Math.ceil(stars.starFour / stars.numberStart * 300),
          nonActive: 300 - Math.ceil(stars.starFour / stars.numberStart * 300)
        }
      )
    }

    if (stars.starFour == 0) {
      this.withRatingCss.push(
        {
          indexStar: 4,
          active: 0,
          nonActive: 300
        }
      )
    }


    //set width star five
    if (stars.starFive != 0) {
      this.withRatingCss.push(
        {
          indexStar: 1,
          active: Math.ceil(stars.starFive / stars.numberStart * 300),
          nonActive: 300 - Math.ceil(stars.starFive / stars.numberStart * 300)
        }
      )
    }

    if (stars.starFive == 0) {
      this.withRatingCss.push(
        {
          indexStar: 1,
          active: 0,
          nonActive: 300
        }
      )
    }
  }

  getStarAvg() {
    if (this.reviews.length == 0) {
      this.starAvg = 5;
      return;
    }
    let sumValue = 0;
    let stars = this.getStarResponse;
    sumValue += stars.starOne;
    sumValue += stars.starTwo * 2;
    sumValue += stars.starThree * 3;
    sumValue += stars.starFour * 4;
    sumValue += stars.starFive * 5;
    let avgValue = sumValue / stars.numberStart;
    avgValue *= 10;
    avgValue = Math.ceil(avgValue);
    this.starAvg = avgValue / 10;
  }

  getDataStar() {
    this.productRatingClient.getStart(this.productAPI.id).subscribe(
      rp => {
        this.getStarResponse = rp;
        this.getWidthRating();
        this.getStarAvg();
      }
    )

  }

  getDataPageReview(pageIndex: number) {
    this.productRatingClient.getProductRating(new GetProductRatingRequest(this.productAPI.id, pageIndex - 1, 5)).subscribe(
      respone => {
        this.reviews = respone.items;
        this.totalRowsReview = respone.totalRows;
        this.setPage(pageIndex);
      }
    )

  }

  rating(num: number) {
    this.ratingNumber = num;
  }

  createFromReview() {
    this.formReview = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      reviewTitle: ['', [Validators.required]],
      reviewContent: ['', [Validators.required]]
    })
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
        new CreateProductRatingRequest(this.formReview.value.fullName, this.formReview.value.email, this.productAPI.id,
          this.formReview.value.reviewTitle, this.formReview.value.reviewContent, this.ratingNumber);

      this.productRatingClient.addProductRating(createProductRatingRequest).subscribe(rs => {
        this.createFromReview();
        this.ratingNumber = 5;
        this.getDataPageReview(1);
        this.getDataStar();
        this.goToReview();
      })

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
  async addToCart(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if (status) this.router.navigate(["/shop/cart"]);
  }

  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if (status) this.router.navigate(["/shop/checkout"]);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  getProduct(productId: string) {
    this.productService.getProductDetail(productId).subscribe((response) => {
      this.productAPI = response;
      this.getDataPageReview(1);
      this.getDataStar();
    });
  }



  goToReview(): void {
    this.tabSet.select(this.pages[1]);
  }
}