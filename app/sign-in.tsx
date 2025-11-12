import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { userGlobalContext } from "@/lib/globalProvider";
import { Redirect } from "expo-router";

export default function SignIn() {
  const SignIn = () =>{
    const {refetch,loading,isLoggedIn} = userGlobalContext();
    if(!loading && !isLoggedIn) return <Redirect href="/"/>
  }
  const handleLogin = async () => {

    const result = await login();
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login!");
    }
  };
  return (
    <View>
      <SafeAreaView className="bg-white h-full">
        <ScrollView contentContainerClassName="h-full">
          <Image
            source={images.onboarding}
            className="w-full h-4/6"
            resizeMode="contain"
          />
          <View className="px-10">
            <Text className="text-base text-center uppercase font-rubik text-blue-400">
              Welcome to Dorium!
            </Text>
            <Text className="text-3xl font-rubik-bold text-purple-300 text-center mt-2">
              Let's get you closer to {"\n"}
              <Text className="text-purple-300">To your ideal home</Text>
            </Text>
            <Text className="text-lg font-rubik text-center mt-12 text-neutral-600">
              Login to Dorium with google
            </Text>
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-pink-100 shadow-black-300 shadow-lg rounded-full w-full py-4 mt-5"
            >
              <View className="flex flex-row items-center justify-center">
                <Image
                  source={icons.google}
                  className="h-5 w-5 ml-2"
                  resizeMode="contain"
                />
                <Text className="text-lg text-center font-rubik-medium ml-2 text-rose-400">
                  Continue with google
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
