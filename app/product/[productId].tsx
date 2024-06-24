import useAuth from "@/hooks/useAuth";
import useProducts from "@/hooks/usePosts";
import axios from "@/lib/axios.config";
import { Post } from "@/types";
import { router, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Appbar, Button, Card, MD2Colors, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { AntDesign } from "@expo/vector-icons";
import { Avatar, Text as T } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

const Login = () => {
  const toast = useToast();
  const { loggingIn, login } = useAuth();
  const [comments, setComments] = useState([]);
  const pathname = usePathname();
  const { products } = useProducts();

  const [post, setPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    email: "",
    password: "",
  });

  const getPost = (id: number) => {
    try {
      const post = axios.get(`/posts/${id}`);
      return post;
    } catch (error) {
      console.log(error);
    }
  };
  const getComments = async (id: number) => {
    try {
      const data: any = await axios.get(`/posts/${id}/comments`);
      setComments(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (pathname) {
      const id = pathname.split("/")[2];
      const product = products?.find((p: Post) => p.id.toString() === id);
      if (product) {
        setPost(product);
        setFormData({
          ...formData,
          title: product.title,
          body: product.body,
        });
      }
      getComments(parseInt(id));
    }
  }, [pathname]);

  return (
    <SafeAreaView className="bg-white mb-5 h-full px-3 pt-3">
      <ScrollView>
        <View className="flex flex-row items-center  ">
          <TouchableOpacity onPress={() => router.back()}>
            <Appbar.Header>
              <Appbar.BackAction onPress={() => {}} />
            </Appbar.Header>
          </TouchableOpacity>
          <Text className="text-lg font-bold mt-5">Comments</Text>
        </View>

        <View className="mb-12  mt-4 flex flex-col space-y-3">
          <Card className="fixe fix top-0">
            <Card.Cover
              source={{
                uri: "data:image/jpeg;base64,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",
              }}
            />
            <Card.Content>
              <T variant="titleLarge">{post?.title}</T>
              <T variant="bodyMedium">
                {post?.body.length! > 80
                  ? post?.body.slice(0, 80) + "........."
                  : post?.body}
              </T>
            </Card.Content>
            <View className=" flex flex-row items-center justify-between px-4 ">
              <View className="flex flex-row items-center space-x-2">
                <TouchableOpacity>
                  <AntDesign name="like1" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo name="star" size={30} color="black" />
                </TouchableOpacity>
              </View>
              <Card.Actions>
                <Button>Delete</Button>
                <Button>Update</Button>
              </Card.Actions>
            </View>
          </Card>
          <Text className="text-gray-500 text-base">Here are the comments</Text>

          <FlatList
            data={comments}
            ListEmptyComponent={() => (
              <View className="h-full justify-center items-center bg-gray-50 rounded-lg">
                {!comments ? (
                  <Text className="text-lg text-gray-700 pt-3 ">
                    No comments yet for this post
                  </Text>
                ) : (
                  <View className="w-full h-full flex items-center justify-center">
                    <ActivityIndicator
                      size="large"
                      animating={true}
                      color={MD2Colors.red800}
                    />
                    <Text>Loading products</Text>
                  </View>
                )}
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="p-3  rounded-lg mb-3 border flex space-y-2 border-gray-200 shadow-sm">
                <Text className="text-lg  font-semibold">{item?.name}</Text>
                <Text className="text-lg text-gray-500 font-semibold">
                  {item?.email}
                </Text>
                <Text className="text-base text-gray-500 mb-3">
                  {item?.body}
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
