import { Post, Product } from "@/types";

export const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const validatePassword = (password: string) => {
    return password.length >= 8;
}

export const validateProduct = (product: Omit<Post, "id">) => {
    return {
        name: {
            valid: product.title.length > 0,
            message: "Name is required"
        },
        description: {
            valid: product.body.length > 0,
            message: "Description is required"
        },
      
    }
}