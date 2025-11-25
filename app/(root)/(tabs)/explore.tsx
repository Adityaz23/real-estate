import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Featured, Regular } from "@/components/cards";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import Noresults from "@/components/Noresults";
import SearchProperty from "@/components/search";
import Filters from "@/components/filters";
import icons from "@/constants/icons";
export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading,
    error,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);
  const greeting = getGreeting();
  return (
    <SafeAreaView className="bg-white h-full">
      {/* // Now we are going to use the flatlist for the scrolling of the item in our home screen. */}
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Regular item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-white mt-5" />
          ) : (
            <Noresults />
          )
        }
        ListHeaderComponent={
          //We are creating the whole new list header component for our explore page in the expore.tsx
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
            <TouchableOpacity onPress={()=>router.back()} className="flex flex-row bg-rose-200 rounded-full size-11 items-center justify-center">
              <Image source={icons.backArrow} className="size-5"/>
            </TouchableOpacity>
            <Text className="text-base mr-2 text-center font-rubik-medium text-black ">Search for your ideal need!</Text>
            <Image source={icons.bell} className="size-6 w-6 h-6"/>
            </View>
            <SearchProperty />
            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold mt-5 text-black">Found {properties?.length} Properties </Text>
            </View>
          </View>
        }
      />

      {/* Implementing the cards from the components from the components/cards.tsx */}
    </SafeAreaView>
  );
}

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};
