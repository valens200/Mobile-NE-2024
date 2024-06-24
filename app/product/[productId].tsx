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

  /**
   * Getting as single post using the post id
   */
  const getPost = (id: number) => {
    try {
      const post = axios.get(`/posts/${id}`);
      return post;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Getting all comments from the database
   * @param comments[]
   */
  const getComments = async (id: number) => {
    try {
      const data: any = await axios.get(`/posts/${id}/comments`);
      setComments(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Using useEffect hook to get the id from parameter and retrive the corresponding post as well as its commments
   */
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
                  <AntDesign name="like1" size={30} color="#f7941d" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo name="star" size={30} color="#f7941d" />
                </TouchableOpacity>
              </View>
              <Card.Actions>
                <Button>View</Button>
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
                    <Text>Loading Comments</Text>
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
