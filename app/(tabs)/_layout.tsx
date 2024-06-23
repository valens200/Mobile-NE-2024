import { Tabs } from "expo-router";
import { View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const TabBarIcon = ({
  name,
  color,
  icon,
  isFocused,
}: {
  name: string;
  color: string;
  icon: string;
  isFocused: boolean;
}) => {
  return (
    <View>
      {icon == "home" && <AntDesign name="home" size={30} color={color} />}
      {icon == "add" && <FontAwesome6 name="add" size={30} color={color} />}
      {icon == "profile" && <Ionicons name="person-add-sharp" size={30} color={color} />}
    </View>
  );
};
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F7941D",
        tabBarInactiveTintColor: "white",
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          height: 65,
          padding:7,
          backgroundColor: Colors.dark.black2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon="home"
              isFocused={focused}
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add-product"
        options={{
          title: "Add",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              color={color}
              icon={"add"}
              isFocused={focused}
              name={focused ? "add" : "add-outline"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
              icon={"profile"}
              isFocused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
