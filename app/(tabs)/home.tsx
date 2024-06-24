import CustomButton from "@/components/CustomButton";
import { backgoundImage, productImage } from "@/constants";
import useAuth from "@/hooks/useAuth";
import useProducts from "@/hooks/usePosts";
import { Post, Product } from "@/types";
import { da, faker } from "@faker-js/faker";
import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Button,
  MD2Colors,
  Modal,
  Portal,
  Searchbar,
  Switch,
  TextInput,
} from "react-native-paper";
import { useEffect, useState } from "react";
import CustomButton2 from "@/components/CustomButton2";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import axios from "@/lib/axios.config";
import { useToast } from "react-native-toast-notifications";
export default function HomeScreen() {
  const { user } = useAuth();
  const { products } = useProducts();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefleshing] = useState(false);
  const toast = useToast();

  const [posts, setPosts] = useState<any[]>([]);

  setTimeout(() => {
    setLoading(false);
  }, 1000);
  const router = useRouter();

  const search = () => {
    if (posts) {
      return posts?.filter((item) => {
        const values = Object.values(item);
        return values.some((value) => {
          return JSON.stringify(value)
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        });
      });
    }
  };
  const getPosts = async () => {
    try {
      const res: any = await axios.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      Alert.alert("Delete post", "Are you sure you want to delete this post?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            toast.show("The post was deleted successfully", {
              type: "success",
            });
            setRefleshing(true);
            setTimeout(() => {
              setRefleshing(false);
            }, 100);
            getPosts();
            router.replace("/home");
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  });

  return (
    <SafeAreaView className="bg-white mb-5 h-full px-0 pt-0">
      <View className="mb-6 pt-4 px-2 pb-3 bg-[#161622] mt-0 flex flex-col space-y-3">
        <Searchbar
          placeholder="Search a post here"
          onChangeText={(value) => setSearchQuery(value)}
          value={searchQuery}
        />

        <Text className="text-xl text-white font-rubiksemibold">
          Welcome Again, {user?.firstName}
        </Text>
        <Text className=" text-white text-base">
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
          <View className="W-[90%] mx-auto">
            <FlatList
              className="w-full"
              data={posts}
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
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="h-[230px] w-[380px]  rounded-lg mb-3 border border-gray-200 shadow-sm">
                  <ImageBackground
                    className="h-full flex items-center justify-center"
                    src={backgoundImage}
                  >
                    <View className="w-[90%] mx-auto">
                      <Text className="text-2xl text-white font-bold ">
                        {item.title}
                      </Text>
                      <Text className="text-sm text-white font-bold ">
                        {item.body.length > 80
                          ? item.body.slice(0, 80) + "..."
                          : item.body}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              )}
            />
          </View>
          <FlatList
            refreshing={refreshing}
            onRefresh={() => setRefleshing(true)}
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
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="h-[300px] w-[380px] p-2 mt-4 rounded-lg mb-3 border border-gray-200 shadow-sm">
                <View className="h-[50px]  w-full">
                  <Text className="text-lg text-black font-semibold">
                    {item.title}
                  </Text>
                </View>
                <View className="mt-4 p-3">
                  <Text className="text-base text-gray-500 mb-3">
                    {item.body.length > 80
                      ? item.body.slice(0, 80) + "..."
                      : item.body}
                  </Text>
                  <View className="flex flex-row items-enter justify-between">
                    <Text className="text-base text-cyan-800">
                      Comments : {"500"}
                    </Text>
                    <AntDesign
                      onPress={() => handleDelete(item.id)}
                      name="delete"
                      size={24}
                      color="red"
                    />
                  </View>

                  <CustomButton2
                    handlePress={() => router.push(`/product/${item.id}`)}
                    title="View"
                    containerStyles="mt-3"
                    variant="outline"
                    titleStyles="text-base"
                  />
                </View>
              </View>
            )}
          />
        </ScrollView>
      )}
      <StatusBar backgroundColor="#161622" barStyle={"light-content"} />
    </SafeAreaView>
  );
}
