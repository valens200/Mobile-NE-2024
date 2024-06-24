/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import useSWR from "swr";
import axios, { authApi } from "../lib/axios.config";
import { Post, Product } from "../types";
import useAuth from "./useAuth";
import { useRouter } from "expo-router";
import { faker } from "@faker-js/faker";

export default function useProducts() {
  const toast = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState(false);

  // const products: Product[] = Array.from({ length: 5 }, () => ({
  //   id: faker.datatype.uuid(),
  //   name: faker.commerce.productName(),
  //   description: faker.commerce.productDescription(),
  //   price: parseFloat(faker.commerce.price()),
  // }));

  const {
    data: products,
    isLoading,
    error,
    mutate,
  } = useSWR<Post[]>("/posts", async (url: string) => {
    const { data } = await axios.get(url);
    return data;
  });

  useEffect(() => {
    mutate();
  }, [user]);

  const createProduct = async (
    product: Omit<Post, "id" | "createdAt">,
    redirect?: boolean
  ) => {
    setCreatingProduct(true);
    try {
      const { data } = await axios.post("/posts", product);
      console.log(data)
      if (data) {
        toast.show("Product created successfully", {
          type: "success",
        });
      } else {
        toast.show("An error occurred", {
          type: "danger",
        });
      }
    } catch (error) {
      console.error(error);
      toast.show("An error occurred", {
        type: "danger",
      });
    } finally {
      setCreatingProduct(false);
    }
  };

  const deleteProduct = async (id: number, redirect?: boolean) => {
    setDeletingProduct(true);
    try {
      const { data } = await axios.delete(`/products/${id}`);
      if (data.success) {
        toast.show("Product deleted successfully", {
          type: "success",
        });
        mutate(products?.filter((product) => product.id !== id));
        if (redirect) {
          router.push(`/home`);
        }
      } else {
        toast.show("An error occurred", {
          type: "danger",
        });
      }
    } catch (error) {
      console.error(error);
      toast.show("An error occurred", {
        type: "danger",
      });
    } finally {
      setDeletingProduct(false);
    }
  };

  const updateProduct = async (product: Post, redirect?: boolean) => {
    setUpdatingProduct(true);
    try {
      const { data } = await axios.put(`/products/${product.id}`, product);
      if (data.success) {
        toast.show("Post updated successfully", {
          type: "success",
        });
        mutate(products?.map((p) => (p.id === product.id ? product : p)));
        if (redirect) {
          router.push(`/home`);
        }
      } else {
        toast.show("An error occurred", {
          type: "danger",
        });
      }
    } catch (error) {
      console.error(error);
      toast.show("An error occurred", {
        type: "danger",
      });
    } finally {
      setUpdatingProduct(false);
    }
  };

  return {
    products,
    isLoading,
    error,
    createProduct,
    deleteProduct,
    updateProduct,
    creatingProduct,
    deletingProduct,
    updatingProduct,
  };
}
