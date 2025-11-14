import icons from "@/constants/icons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDebouncedCallback } from "use-debounce";
export default function SearchProperty() {
  //modifying the search parameter ->
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);
  const debouncedSearch = useDebouncedCallback((text: string) => router.setParams({ query: text }),500
  );
  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };
  return (
    // going to use the debounce package for the search to look great!
    <View
      className="flex flex-row w-full px-4 rounded-lg bg-slate-200 border-[1px] border-black items-center justify-between mt-5 py-2 overflow-hidden size-10"
      style={{ borderRadius: 12 }}
    >
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for property"
          className="text-md font-rubik-semibold text-gray-600 ml-2 flex-1"
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className="size-6" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
