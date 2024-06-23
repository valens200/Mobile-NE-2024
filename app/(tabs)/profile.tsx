import CustomButton from "@/components/CustomButton";
import useAuth from "@/hooks/useAuth";
import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

export default function Profile() {
  const { loggingOut, logout } = useAuth();

  const user: any = {
    email: "John@gmail.com",
    name: "John Doe",
  };
  return (
    <SafeAreaView className="bg-white flex items-center justify-center h-full">
      <View className="px-6 w-full flex space-y-4">
        <Image
          source={require("@/assets/images/profile.png")}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
            marginTop: 20,
          }}
        />
        <Text className="text-center text-2xl font-semibold mt-5">
          {user?.name}
        </Text>
        <Text className="text-center text-base text-gray-500">
          {user?.email}
        </Text>
        <View className="text-center flex items-center justify-center">
          <Entypo name="edit" size={24} color="black" />
        </View>

        <View>
          <CustomButton
            title="Logout"
            isLoading={loggingOut}
            handlePress={logout}
            containerStyles="mt-8 border-red-500"
            variant="outline"
            titleStyles="text-red-500"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
