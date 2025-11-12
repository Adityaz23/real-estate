import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* // Now we are going to implement the tabs and the navigation of our app. */}
      <Text className="font-bold my-10 font-rubik text-3xl">Welcome to Dorium</Text>
      <Link href="/sign-in">Sign-In</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/1">Property</Link>
    </View>
  );
}
