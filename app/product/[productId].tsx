import useAuth from "@/hooks/useAuth";
import useProducts from "@/hooks/usePosts";
import axios from "@/lib/axios.config";
import { Post } from "@/types";
import { router, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

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

  const getComments = async (id: number) => {
    try {
      const data: any = await axios.get(`/posts/${id}/comments`);
      setComments(data.data)
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
      <View className="flex flex-row items-center  ">
        <TouchableOpacity onPress={() => router.back()}>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => {}} />
          </Appbar.Header>
        </TouchableOpacity>
        <Text className="text-lg font-bold mt-5">Comments</Text>
      </View>

      <View className="mb-12  mt-4 flex flex-col space-y-3">
        <Text className="text-xl text-gray-800 font-rubiksemibold">
          Post : {post?.title}
        </Text>
        <Text className="text-gray-500 text-base">Here are the comments</Text>

        <FlatList
          data={comments}
          ListEmptyComponent={() => (
            <View className="h-full justify-center items-center bg-gray-50 rounded-lg">
              <Text className="text-lg text-gray-700 pt-3 ">
                No comments yet for this post
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="p-3  rounded-lg mb-3 border flex space-y-2 border-gray-200 shadow-sm">
              <Text className="text-lg  font-semibold">{item?.name}</Text>
              <Text className="text-lg text-gray-500 font-semibold">
                {item?.email}
              </Text>
              <Text className="text-base text-gray-500 mb-3">{item?.body}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
