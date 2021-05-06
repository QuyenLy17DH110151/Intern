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
  productId: string;
  public labels: string[] = [];

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private _router: ActivatedRoute
  ) {
    this._router.params.subscribe((response) => {
      console.log("response", response);
      this.getProduct(response.slug);
    });
    // console.log(this._router.snapshot.params.slug);
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
      let labels: any[] = [];
      let category = this.productAPI.category;

      if (category && category.c1Lable) {
        //options.push(category.c1Options.split(/[ ,]+/))
        labels.push(
          {
            label: category.c1Lable,
            options: category.c1Options.split(/[ ,]+/)
          }
        )
      }
      if (category && category.c2Lable) {
        labels.push(
          {
            label: category.c2Lable,
            options: category.c2Options.split(/[ ,]+/)
          }
        )

      }
      if (category && category.c3Lable) {
        labels.push(
          {
            label: category.c3Lable,
            options: category.c3Options.split(/[ ,]+/)
          }
        )
      }
      if (category && category.c4Lable) {
        labels.push(
          {
            label: category.c4Lable,
            options: category.c4Options.split(/[ ,]+/)
          }
        )
      }
      if (category && category.c5Lable) {
        labels.push(
          {
            label: category.c5Lable,
            options: category.c5Options.split(/[ ,]+/)
          }
        )
      }
      this.labels = labels;
      console.log(this.labels)
    });
  }

}
