import CustomButton from "@/components/CustomButton";
import useAuth from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { NetworkInfo } from "react-native-network-info";

import {
  Button,
  Modal,
  PaperProvider,
  Portal,
  Switch,
  TextInput,
} from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile() {
  const { loggingOut, logout } = useAuth();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const user: any = {
    email: "John@gmail.com",
    name: "John Doe",
  };

  const getIp = async () => {
    await NetworkInfo.getIPAddress().then((ip) => {
      console.log("IP address", ip);
    });
  };
  useEffect(() => {
    getIp();
  }, []);

  return (
    <PaperProvider>
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
            <TouchableOpacity onPress={() => setShowUpdateModal(true)}>
              <Entypo name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View className="h-[19%]">
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
        <Portal>
          <Modal
            visible={showUpdateModal}
            onDismiss={() => setShowUpdateModal(false)}
            contentContainerStyle={styles.modal}
          >
            <View className="px-6 w-full flex space-y-4">
              <Image
                source={require("@/assets/images/profile.png")}
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: "center",
                  marginTop: 20,
                }}
              />
              <Text className="text-center text-xl font-semibold mt-5">
                {user?.name}
              </Text>
              <View className="flex flex-col space-y-4">
                <TextInput label={"First name"} />
                <TextInput label={"Last name"} />
                {/* secureTextEntry */}
                <TextInput
                  label={"Email"}
                  right={<TextInput.Icon icon="email" />}
                />
                <View className="flex items-center justify-between flex-row">
                  <Text>Female/Male</Text>
                  <Switch value={false} />
                </View>
                <Button icon="update" mode="contained" onPress={() => {}}>
                  Update profile
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "80%",
    backgroundColor: "white",
    margin: "auto",
    borderRadius: 10,
    paddingBottom: 40,
  },
});
