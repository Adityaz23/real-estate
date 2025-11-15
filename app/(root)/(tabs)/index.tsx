import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import SearchProperty from "@/components/search";
import { Featured, Regular } from "@/components/cards";
import Filters from "@/components/filters";
export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row">
            {/* will replace the images.avatar with the appwrite data functionality. */}
            <Image source={images.avatar} className="rounded-full size-12" />
            <View className="flex flex-col items-start justify-center ml-2">
              <Text className="text-xs font-rubik text-black-100">
                Hi, Good Morning!
              </Text>
              <Text className="text-base font-rubik-medium text-black-300">
                Aditya
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
          <View className="flex flex-row gap-5 mt-5">
            <Featured />
            <Featured />
            <Featured />
          </View>
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
        <View className="flex flex-row gap-5 mt-5">
          <Regular />
          <Regular />
        </View>
      </View>
      {/* Implementing the cards from the components from the components/cards.tsx */}
    </SafeAreaView>
  );
}
