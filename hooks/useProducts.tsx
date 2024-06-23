/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import useSWR from "swr";
import axios, { authApi } from "../lib/axios.config";
import { Product } from "../types";
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

  // const products = [
  //   {
  //     description:
  //       "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
  //     id: "c9ad9a13-12b9-4002-8fef-732dc43abbf8",
  //     name: "Sleek Granite Mouse",
  //     price: 144,
  //   },
  //   {
  //     description:
  //       "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
  //     id: "b43ab600-1250-43c0-9d2c-7344a80ffdb0",
  //     name: "Unbranded Cotton Table",
  //     price: 478,
  //   },
  //   {
  //     description:
  //       "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
  //     id: "45572749-a6b8-4438-9001-f46db10e65ed",
  //     name: "Generic Plastic Sausages",
  //     price: 956,
  //   },
  //   {
  //     description:
  //       "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
  //     id: "e2611d2f-46e5-4658-aeea-c78279cdb7dc",
  //     name: "Unbranded Plastic Hat",
  //     price: 772,
  //   },
  //   {
  //     description:
  //       "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
  //     id: "afe4709f-e5fc-452f-a377-d07872e8ead7",
  //     name: "Fantastic Soft Table",
  //     price: 296,
  //   },
  // ];

  const {
    data: products,
    isLoading,
    error,
    mutate,
  } = useSWR<Product[]>("/products/all", async (url: string) => {
    if (!user) return;
    const { data } = await authApi.get(url);
    return data.data;
  });

  useEffect(() => {
    mutate();
  }, [user]);

  const createProduct = async (
    product: Omit<Product, "id" | "createdAt">,
    redirect?: boolean
  ) => {
    setCreatingProduct(true);
    try {
      const { data } = await axios.post("/products", product);
      if (data.success) {
        toast.show("Product created successfully", {
          type: "success",
        });
        mutate([...(products || []), data.product]);
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
      setCreatingProduct(false);
    }
  };

  const deleteProduct = async (id: string, redirect?: boolean) => {
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

  const updateProduct = async (product: Product, redirect?: boolean) => {
    setUpdatingProduct(true);
    try {
      const { data } = await axios.put(`/products/${product.id}`, product);
      if (data.success) {
        toast.show("Product updated successfully", {
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
