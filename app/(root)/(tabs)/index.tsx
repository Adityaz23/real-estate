import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import SearchProperty from "@/components/search";
import { Featured, Regular } from "@/components/cards";
import Filters from "@/components/filters";
import { useGlobalContext } from "@/lib/globalProvider";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import Noresults from "@/components/Noresults";
export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: latestProperties,
    loading: latestLoadingProperties,
    error: latestError,
  } = useAppwrite({
    fn: getLatestProperties,
  });
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
      limit: 6,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
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
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row">
                {/* will replace the images.avatar with the appwrite data functionality. */}
                <Image
                  source={{ uri: user?.avatar }}
                  className="rounded-full size-12"
                />
                <View className="flex flex-col items-start justify-center ml-2">
                  <Text className="text-xs font-rubik-bold text-rose-400">
                    Hi,{greeting}!
                  </Text>
                  <Text className="text-base font-rubik-medium text-fuchsia-500">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6 mr-1" />
            </View>
            {/* // Search parameters for the apartments */}
            <SearchProperty />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between ">
                <Text className="text-xl font-rubik-bold text-black ">
                  Featured!
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-zinc-700">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {/* hiding the featured tab if there are no results for the filter. */}
              {latestLoadingProperties ? (
                <ActivityIndicator size="large" className="text-black" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <Noresults />
              ) : (
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <Featured item={item} onPress={() => handleCardPress} />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  contentContainerClassName="gap-3 flex mt-5"
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                />
              )}
              <View className="flex flex-row gap-5 mt-5"></View>
            </View>
            <View className="flex flex-row items-center justify-between ">
              <Text className="text-xl font-rubik-bold text-black ">
                Our Recommendation!
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-zinc-700">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <Filters />
            <View className="flex flex-row gap-5 mt-5"></View>
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
