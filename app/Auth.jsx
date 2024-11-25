import { Text, View, Image, TextInput, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import "../global.css";
import { supabase } from "../utils/supabase.ts";
import {AppleAuth} from "../components/AppleAuth.tsx"

export default function Auth() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });
  const [signInPage, changePage] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  const toggle = () => {
  
    changePage((prev) => !prev);
  };

  return signInPage ? (
    <View className="text-roomLightGreen flex-1 bg-cover bg-roomDarkBlue">
      <Text className="text-center text-roomLightGreen font-roomFont mt-72 text-7xl">
        LivingLink
      </Text>
      <View className="p-5 w-1/2">
        <Text className="text-4xl text-white text-center font-bold mr-8">
          Sign In
        </Text>
      </View>
      <View className="flex flex-col justify-start snap-center w-96 h-full self-center gap-5">
        <TextInput
          placeholder="Email"
          className="border border-b w-96 h-16 bg-roomLightGreen rounded-xl p-6"
          onChangeText={(text) => handleInputChange("email", text)}
          value ={formData.email}
        />
        <TextInput
          placeholder="Password"
          className="border border-b w-96 h-16 bg-roomLightGreen rounded-xl p-6"
          onChangeText={(text) => handleInputChange("password", text)}
          value={formData.password}
        />
        <Pressable>
          <View className="w-auto h-auto ml-60">
            <Text className="text-white cursor-pointer">Forgot Password?</Text>
          </View>
        </Pressable>
        <Pressable onPress={signInWithEmail}>
          <View className="flex flex-col text-center bg-roomLightGreen w-96 h-16 rounded-xl justify-center mt-4">
            <Text className="text-center font-semibold">Sign In</Text>
          </View>
        </Pressable>
        <Text className="text-center mt-5 text-white font-semibold">
          Or Sign in With
        </Text>
        <View className="flex flex-col gap-4 justify-center w-96 items-center">
          
          <Image
            source={require("../assets/images/googleIcon.png")}
            className="w-16 h-16"
          />
        </View>
        <Pressable onPress={toggle} className = "border">
          <Text className="text-center text-white mt-2">
            Don't have an account?{" "}
            <Text className="font-bold text-white">Sign Up</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <View className="flex-1 bg-cover bg-roomDarkBlue">
      <Pressable onPress={toggle} className = ''>
        <View className="absolute top-20 left-5 flex flex-row items-center justify-center bg-roomPink px-8 py-3 rounded-full shadow-md">
          <Text className="text-white text-sm font-medium">Back</Text>
        </View>
      </Pressable>
      <View>
        <Text className="font-bold text-white top-40 left-10 text-4xl">
          Create your account
        </Text>
      </View>
      <View className="flex flex-col justify-start snap-center w-96 h-full self-center gap-5">
        <TextInput
          placeholder="Full Name"
          className="border border-b w-96 h-16 bg-roomLightGreen rounded-xl p-6 top-48"
          onChangeText={(text) => handleInputChange("fullName", text)}
          value={formData.fullName}
        />
        <TextInput
          placeholder="Enter Email"
          className="border border-b w-96 h-16 bg-roomLightGreen rounded-xl p-6 top-48"
          onChangeText={(text) => handleInputChange("email", text)}
          value={formData.email}
        />
        <TextInput
          placeholder="Enter Password"
          className="border border-b w-96 h-16 bg-roomLightGreen rounded-xl p-6 top-48"
          onChangeText={(text) => handleInputChange("password", text)}
          value={formData.password}
        />
        {/* <TextInput
          placeholder="Confirm Password"
          className="border border-b w-96 h-16 bg-roomLightGreen rounded-xl p-6 top-48"
          onChangeText={(text) => handleInputChange("confirmPassword", text)}
          value={formData.confirmPassword}
        />    */}
        
        
          <View className="flex flex-col text-center bg-roomLightGreen w-96 h-16 rounded-xl justify-center top-56 ">
            <Pressable onPress={signUpWithEmail} className = "">
            <Text className="text-center font-semibold">Sign Up</Text>
            </Pressable>
          </View>
        
        
        
      </View>

    </View>
  );
}
