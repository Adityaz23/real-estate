import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { categories } from "@/constants/data";

export default function Filters() {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selected, setSelected] = useState(params.filter || "All");

  const handleCategoryPress = (category: string) => {
    // reseting the double tab functionality to be set again to the all category.
    if (selected === category) {
      setSelected("All");
      router.setParams({ filter: "All" });
      return;
    }
    setSelected(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          className={`flex flex-col mr-4 items-start px-4 py-2 rounded-full ${selected === item.category ? "bg-fuchsia-200" : "bg-rose-200 border border-pink-500"} `}
          onPress={() => handleCategoryPress(item.category)}
        >
          <Text
            className={`text-sm ${selected === item.category ? "text-red-700" : "text-gray-800 font-rubik "} font-rubik-bold mt-0.5`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
