import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import useProducts from "@/hooks/usePosts";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { validateProduct } from "@/lib/utils";
import { router } from "expo-router";

const AddProduct = () => {
  const toast = useToast();
  const { createProduct, creatingProduct } = useProducts();

  const [formData, setFormData] = useState({
    id: 0,
    userId: 0,
    title: "",
    body: "",
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.body) {
      return toast.show("Please fill in all fields", {
        type: "danger",
      });
    }

    if (typeof formData.title == "number") {
      return toast.show("The title should not be a number ", {
        type: "danger",
      });
    }
    const validationResults = validateProduct(formData);
    if (!validationResults.name.valid) {
      return toast.show(validationResults.name.message, {
        type: "danger",
      });
    }
    if (!validationResults.description.valid) {
      return toast.show(validationResults.description.message, {
        type: "danger",
      });
    }
    createProduct(formData, true);
  };

  return (
    <SafeAreaView className="p-3 px-5 h-full justify-center">
      <View>
        <Text className="text-xl font-rubiksemibold text-gray-800">
          Add new Post
        </Text>
        <Text className="text-gray-600 text-base">
          Fill in the form below to add a new product
        </Text>
      </View>
      <View className="mb-5 mt-8">
        <CustomInput
          value={formData.title}
          label="Post Title"
          placeholder="Enter product name"
          onChangeText={(val) => setFormData({ ...formData, title: val })}
        />
        <CustomInput
          value={formData.body}
          label="Description"
          placeholder="Enter product description"
          onChangeText={(val) => setFormData({ ...formData, body: val })}
          multiline
          numberOfLines={4}
          containerStyles="mt-3"
        />
        {/* <CustomInput
          value={
            formData.price.toString() === "NaN" ? "" : formData.price.toString()
          }
          label="Price (in USD)"
          placeholder="Enter product price"
          onChangeText={(val) =>
            setFormData({ ...formData, price: parseInt(val) })
          }
          keyboardType="numeric"
          containerStyles="mt-3"
        /> */}
        <View className="h-[15%] ">
          <CustomButton
            title="Add Product"
            handlePress={handleSubmit}
            isLoading={creatingProduct}
            containerStyles="mt-8 h-full"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddProduct;
