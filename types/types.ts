export interface Product {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    ingredients: string[];
    quantity?:number
}