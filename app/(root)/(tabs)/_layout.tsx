import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

// custom tab icon component ->
const TabIcon = ({focused, icon, title} : {focused:boolean; icon:any; title:string})=>{
<View>
    <Image />
</View>
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: () => (
            <View>
              <Text>Home</Text>
            </View>
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}

const styles = StyleSheet.create({});
