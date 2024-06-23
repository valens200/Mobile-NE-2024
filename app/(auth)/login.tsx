import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import useAuth from "@/hooks/useAuth";
import { validateEmail, validatePassword } from "@/lib/utils";
import { Link, router, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

const Login = () => {
  const toast = useToast();
  const { loggingIn, login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      return toast.show("All fields are required", {
        type: "danger",
      });
    }
    if (!validateEmail(formData.email)) {
      return toast.show("Email is invalid", {
        type: "danger",
      });
    }
    if (!validatePassword(formData.password)) {
      return toast.show("Password must be at least 8 characters", {
        type: "danger",
      });
    }
    login(formData.email, formData.password);
  };
  return (
    <SafeAreaView>
      <View className="h-full  justify-center px-6">
        <View className="h-[60%] w-full flex flex-col space-y-5">
          <View className="flex items-center justify-center">
            <Text className="text-2xl font-semibold">
              Login to your account
            </Text>
            <Text className="text-gray-500 text-base">
              Enter your email and password below
            </Text>
          </View>

          <View className="w-full mt-10 flex flex-col space-y-4">
            <TextInput
              label={"Email"}
              value={formData.email}
              onChangeText={(val) => setFormData({ ...formData, email: val })}
              right={<TextInput.Icon icon="email" />}
            />
            <TextInput
              label={"Password"}
              value={formData.password}
              onChangeText={(val) =>
                setFormData({ ...formData, password: val })
              }
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
            />
            <View className="w-full  flex items-center justify-center h-[18%]">
              <CustomButton
                title="Login"
                containerStyles={"h-full"}
                handlePress={handleSubmit}
              />
            </View>
            <View className="flex flex-row gap-1 items-center justify-center mt-1">
              <Text className="text-base">Don't have an account?</Text>
              <Link href={"/signup"}>
                <Text className="text-cyan-600 text-base">signup</Text>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
