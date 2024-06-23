import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  variant?: "primary" | "outline";
  containerStyles?: string;
  titleStyles?: string;
  isLoading?: boolean;
}
const CustomButton = ({
  title,
  handlePress,
  variant = "primary",
  containerStyles,
  titleStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={handlePress}
      className={` w-[100%]  rounded-md flex flex-row justify-center items-center  ${containerStyles}`}
    >
      <Button
        className="h-full w-full items-center justify-center"
        icon="login"
        mode="contained"
        onPress={() => {handlePress}}
      >
        {title}
      </Button>
      {isLoading && (
        <ActivityIndicator
          size={"small"}
          animating={isLoading}
          color={variant === "primary" ? "white" : "cyan"}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
