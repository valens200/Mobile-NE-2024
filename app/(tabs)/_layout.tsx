import { Tabs } from "expo-router";
import { View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

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
      <MaterialCommunityIcons
        name="microsoft-xbox-controller-menu"
        size={30}
        color={color}
      />
    </View>
  );
};
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F7941D",
        tabBarInactiveTintColor: "black",
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          height: 65,
          backgroundColor: "#ffffff",
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
              icon={"main"}
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
              icon={"main"}
              isFocused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
