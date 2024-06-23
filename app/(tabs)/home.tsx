import CustomButton from "@/components/CustomButton";
import { backgoundImage, productImage } from "@/constants";
import useAuth from "@/hooks/useAuth";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/types";
import { da, faker } from "@faker-js/faker";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, MD2Colors, Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const { user } = useAuth();
  const { products } = useProducts();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  setTimeout(() => {
    setLoading(false);
  }, 3000);
  const router = useRouter();

  const search = () => {
    return products?.filter((item) => {
      const values = Object.values(item);
      return values.some((value) => {
        return JSON.stringify(value)
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
    });
  };

  return (
    <SafeAreaView className="bg-white mb-5 h-full px-3 pt-3">
      <View className="mb-6 mt-4 flex flex-col space-y-3">
        <Searchbar
          placeholder="Search a product here"
          onChangeText={(value) => setSearchQuery(value)}
          value={searchQuery}
        />

        <Text className="text-xl text-gray-800 font-rubiksemibold">
          Welcome, {user?.firstName}
        </Text>
        <Text className="text-gray-500 text-base">
          Here are the products you have created
        </Text>
      </View>
      {loading ? (
        <View className="w-full h-full flex items-center justify-center">
          <ActivityIndicator
            size="large"
            animating={true}
            color={MD2Colors.red800}
          />
          <Text>Loading products</Text>
        </View>
      ) : (
        <ScrollView>
          <View>
            <FlatList
              className="w-full"
              data={products}
              horizontal={true}
              ListEmptyComponent={() => (
                <View className="h-full justify-center mx-4 items-center bg-gray-50 rounded-lg">
                  <Image
                    source={require("../../assets/images/no-data.png")}
                    style={{ width: 20, height: 200 }}
                    className="rounded-lg"
                  />
                  <Text className="text-lg text-gray-700 pt-3 ">
                    You haven't created any products
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="h-[200px] w-[380px]  rounded-lg mb-3 border border-gray-200 shadow-sm">
                  <ImageBackground
                    className="h-full flex items-center justify-center"
                    src={backgoundImage}
                  >
                    <View className="w-[90%] mx-auto">
                      <Text className="text-2xl text-white font-bold ">
                        {item.productName}
                      </Text>
                      <Text className="text-sm text-white font-bold ">
                        {item.description}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              )}
            />
          </View>
          <FlatList
            className="w-full"
            data={search()}
            ListEmptyComponent={() => (
              <View className="h-full justify-center  items-center bg-gray-50 rounded-lg">
                <Image
                  source={require("../../assets/images/no-data.png")}
                  style={{ width: 20, height: 200 }}
                  className="rounded-lg"
                />
                <Text className="text-lg text-gray-700 pt-3 ">
                  You haven't created any products
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="h-[300px] w-[380px] p-2 mt-4 rounded-lg mb-3 border border-gray-200 shadow-sm">
                <ImageBackground src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcPBxvGOv3-CkNRq0LUaViCbe6p6SlqV8VAw&s">
                  <View className="h-[100px] p-4 w-full">
                    <Text className="text-lg text-white font-semibold">
                      {item.name}
                    </Text>
                  </View>
                </ImageBackground>
                <View className="mt-4 p-3">
                  <Text className="text-base text-gray-500 mb-3">
                    {item.description.length > 80
                      ? item.description.slice(0, 80) + "..."
                      : item.description}
                  </Text>
                  <Text className="text-base text-cyan-800">${item.cost}</Text>
                  {/* <CustomButton
                    handlePress={() => router.push(`/product/${item.id}`)}
                    title="View"
                    containerStyles="mt-3"
                    variant="outline"
                    titleStyles="text-base"
                  /> */}
                </View>
              </View>
            )}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
