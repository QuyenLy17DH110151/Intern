export class CreateProductRatingRequest {
    fullName: string;

    productId: number;

    email: string;

    reviewTitle: string;

    reviewContent: string;

    constructor(fullName: string, email: string, productId: number, reviewTitle: string, reviewContent: string) {
        this.fullName = fullName;
        this.email = email;
        this.productId = productId;
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
    }
}