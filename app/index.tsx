import CustomButton from "@/components/CustomButton";
import useAuth from "@/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
  };
  if (user) {
    console.log(user.lastName);
  }
  return (
    <SafeAreaView className="bg-white">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="h-full items-center justify-center px-6 font-rubik">
          <Image
            source={require("../assets/images/welcome.png")}
            resizeMode="contain"
            className="w-[340px] h-[440px]"
          />
          <Text className="text-2xl font-bold font-rubik">
            Welcome to our app
          </Text>
          <Text className="text-center text-lg text-gray-500 py-4 ">
            Already logged in as { " "}
            <Text className="text-black font-semibold text-cyan-600">
              {user?.firstName}
            </Text>
          </Text>
          {user ? (
            <View className="w-full h-[10%] mt-6">
              <CustomButton
                title="Go to Home"
                handlePress={() => router.push("/home")}
                containerStyles="mb-3"
              />
              <CustomButton
                title="Logout"
                handlePress={logout}
                variant="outline"
                containerStyles="mt-3 border-red-500"
                titleStyles=" text-red-500"
              />
            </View>
          ) : (
            <View className="w-full h-[70px] mt-6">
              <CustomButton
                title="Continue"
                containerStyles={""}
                handlePress={async () =>
                  // (await getToken()) == null
                     router.push("/home")
                    // : router.push("/login")
                }
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Onboarding;
