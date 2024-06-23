import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import useAuth from "@/hooks/useAuth";
import { validateEmail } from "@/lib/utils";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

const Signup = () => {
  const toast = useToast();
  const { register, registering } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    if (!formData.email || !formData.password || !formData.firstName) {
      return toast.show("Please fill in all fields", {
        type: "danger",
      });
    }
    if (!validateEmail(formData.email)) {
      return toast.show("Please enter a valid email", {
        type: "danger",
      });
    }
    if (formData.password.length < 4) {
      return toast.show("Password must be at least 4 characters", {
        type: "danger",
      });
    }
    if (formData.firstName.length < 2) {
      return toast.show("First Name must be at least 2 characters", {
        type: "danger",
      });
    }
    register(formData.firstName, formData.email, formData.password);
  };

  return (
    <SafeAreaView>
      <View className="h-full  justify-center px-6">
        <View className="w-full flex items-center justify-center">
          <Text className="text-2xl font-semibold">Create account</Text>
          <Text className="text-gray-500 text-base">
            Join thousands of other users today.
          </Text>
        </View>

        <View className="w-full mt-10 flex space-y-3">
          <TextInput
            label={"First Name"}
            defaultValue={formData.email}
            onChangeText={(val) => setFormData({ ...formData, firstName: val })}
          />
          <TextInput
            label={"Last Name"}
            defaultValue={formData.email}
            onChangeText={(val) => setFormData({ ...formData, lastName: val })}
          />
          <TextInput
            label={"Email"}
            defaultValue={formData.email}
            onChangeText={(val) => setFormData({ ...formData, email: val })}
            right={<TextInput.Icon icon="email" />}
          />
          <TextInput
            label={"Password"}
            defaultValue={formData.email}
            secureTextEntry
            onChangeText={(val) => setFormData({ ...formData, password: val })}
            right={<TextInput.Icon icon="eye" />}
          />
        </View>
        <View className=" h-[13%]">
          <CustomButton
            title="Signup"
            handlePress={handleSubmit}
            containerStyles="mt-8"
            isLoading={registering}
          />
        </View>

        <View className="flex flex-row flex items-center justify-center gap-1 mt-3">
          <Text className="text-base">Already have an account?</Text>
          <Link href={"/login"}>
            <Text className="text-cyan-600 text-base">login</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
