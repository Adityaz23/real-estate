import { Account, Avatars, Client, Databases, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export const config = {
  platform: "com.aditya.dorium",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  gallariesId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_GALLERY!,
  reviewId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_REVIEW!,
  propertiesId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_PROPERTIES!,
  agentsId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_ID!
};

export const client = new Client();
client
  .setEndpoint(config.endpoint!)
  .setPlatform(config.platform!)
  .setProject(config.projectId!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
// login function ->
export async function login() {
  try {
    const redirectURI = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectURI
    );

    if (!response) throw new Error("Failed to login!");

    const browserResult = await WebBrowser.openAuthSessionAsync(
      response.toString(),
      redirectURI
    );

    if (browserResult.type !== "success") throw new Error("Failed to login!");

    const url = new URL(browserResult.url);
    // extracting the user id and secret of the user.
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    // if nothing exists ->
    if (!secret || !userId) throw new Error("Failed to login!");

    const session = await account.createSession(userId, secret);
    // if no session exists ->
    if (!session) throw new Error("Failed to create a session!");
    return true;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// logout function ->
export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// fetching the data of the current user ->
export async function getUser() {
  try {
    const response = await account.get();
    if (response.$id) {
      //generating the image of the user ->
      const userAvatar = avatar.getInitials(response.name);
      return {
        ...response,
        avatar: userAvatar.toString(),  
    };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
