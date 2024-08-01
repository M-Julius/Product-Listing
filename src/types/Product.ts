export interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

export interface ResponseProduct {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface DetailedProduct extends Product {
    description: string;
    category: string;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
        depth: number;
        height: number;
        width: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Array<{
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }>;
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    images: string[];
    thumbnail: string;
}