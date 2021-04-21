export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity_available: number;
}

export interface Purchase {
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    zipCode: number;
    products: Product[]
}