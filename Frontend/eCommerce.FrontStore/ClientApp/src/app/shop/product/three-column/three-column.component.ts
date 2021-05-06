import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ProductDetailsMainSlider,
  ProductDetailsThumbSlider,
} from "../../../shared/data/slider";
import { Product } from "../../../shared/classes/product";
import { Product as ProductAPI } from "src/app/api-clients/models/product.model";
import { ProductService } from "../../../shared/services/product.service";
import { SizeModalComponent } from "../../../shared/components/modal/size-modal/size-modal.component";
import { flatten } from "@angular/compiler";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductRatingClient } from "src/app/api-clients/productRating.client";
import { CreateProductRatingRequest } from "src/app/api-clients/models/productRating";

@Component({
  selector: "app-three-column",
  templateUrl: "./three-column.component.html",
  styleUrls: ["./three-column.component.scss"],
})
export class ThreeColumnComponent implements OnInit {
  public product: Product = {};
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public productAPI: ProductAPI;
  public ratingNumber: boolean[] = [true, true, true, true, true];
  productId: string;

  public formReview: FormGroup;
  public displayErro: boolean = false;
  2
  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(
    private productRatingClient: ProductRatingClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private _router: ActivatedRoute
  ) {
    this._router.params.subscribe((response) => {
      // console.log("response", response);
      this.getProduct(response.slug);
    });
    // console.log(this._router.snapshot.params.slug);
    this.createFromReview();
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

  submitReview() {
    this.displayErro = true;

    if (!this.formReview.invalid) {

      let createProductRatingRequest: CreateProductRatingRequest =
        new CreateProductRatingRequest(this.formReview.value.fullName, this.formReview.value.email, this.product.id,
          this.formReview.value.reviewTitle, this.formReview.value.reviewContent);

      this.productRatingClient.addProductRating(createProductRatingRequest);

      this.displayErro = false;
    }
  }

  ngOnInit(): void { }

  // Get Product Color
  Color(variants) {
    const uniqColor = [];
    // for (let i = 0; i < Object.keys(variants).length; i++) {
    //   if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
    //     uniqColor.push(variants[i].color);
    //   }
    // }
    return uniqColor;
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = [];
    // for (let i = 0; i < Object.keys(variants).length; i++) {
    //   if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
    //     uniqSize.push(variants[i].size);
    //   }
    // }
    return uniqSize;
  }

  selectSize(size) {
    this.selectedSize = size;
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
      console.log(this.productAPI);
    });
  }

  rating(number: number) {
    let i = 0;
    for (; i < number; i++) {
      this.ratingNumber[i] = true;
    }
    for (; i < 5; i++) {
      this.ratingNumber[i] = false;
    }
  }
}
