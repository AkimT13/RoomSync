import { Text, View, Image, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { NativeViewGestureHandler } from "react-native-gesture-handler";
import "../global.css";
import { useFonts } from "expo-font";
import {
  InriaSerif_400Regular,
  InriaSerif_700Bold,
} from "@expo-google-fonts/inria-serif";

export default function Login() {
  const [signInPage, changePage] = useState(true);

  const toggle = () => {
    changePage(!signInPage);
  };

  return signInPage ? (
    <View
      style={{ fontFamily: "InriaSerif_Bold", color: "#A1E887" }}
      className=" text-roomLightGreen flex-1 bg-cover bg-roomDarkBlue"
    >
      <Text className="text-center text-roomLightGreen font-roomFont mt-72 text-7xl ">
        LivingLink
      </Text>
      <View className="p-5 w-1/2">
        <Text className="text-4xl text-white text-center font-bold mr-8">
          Sign In
        </Text>
      </View>
      <View className=" flex flex-col justify-start snap-center w-96 h-full  self-center gap-5">
        <TextInput
          placeholder="Email"
          className="border border-b w-96 h-16 bg-roomLightGreen rounded-xl p-6"
        />
        <TextInput
          placeholder="Password"
          className="border border-b w-96 h-16 bg-roomLightGreen rounded-xl p-6"
        />
        <Pressable>
          <View className="w-auto h-auto  ml-60" onClick>
            <Text className=" text-white cursor-pointer">Forgot Password?</Text>
          </View>
        </Pressable>

        <Pressable>
          <View className="flex flex-col text-center bg-roomLightGreen w-96 h-16 rounded-xl pi-6 justify-center mt-4">
            <Text className="text-center center font-semibold">Sign In</Text>
          </View>
        </Pressable>
        <Text>
          Current Page: {signInPage ? "Sign In Page" : "Sign Up Page"}
        </Text>

        <Text className="text-center mt-5 text-white font-semibold">
          Or Sign in With
        </Text>
        <View className="flex flex-row gap-4 justify-center w-96  items-center ">
          <Image
            source={require("../assets/images/signApple.png")}
            className="w-16 h-16 "
          />
          <Image
            source={require("../assets/images/googleIcon.png")}
            className="w-16 h-16"
          />
        </View>

        <Pressable onPress={toggle}>
          <Text className="text-center text-white mt-2">
            Don't have an account?{" "}
            <Text className="font-bold text-white">Sign Up</Text>{" "}
          </Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <View className="flex bg-roomDarkBlue w-full h-full justify-center">
      <Pressable onPress={toggle}>
        <Text className="text-white">Press to go back</Text>
      </Pressable>
    </View>
  );
}
