export interface Product {
    id: string;
    productName: string;
    description: string;
    cost: number;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    status:string;
    roles: any[]
}
export interface Post{
    userId: number;
    id: number;
    title: string;
    body: string;
}