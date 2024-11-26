import { View, Text, Button, TextInput, Image, Pressable } from 'react-native'
import React, { useState } from "react";
import '../global.css'
import { useFonts } from "expo-font";

export default function Choice(){



    return(
        <View className = "bg-roomDarkBlue w-full h-full">
            <Text className = "text-roomPink top-40 left-9 font-bold text-4xl">Lets get started...</Text>
            <View className = "flex flex-col items-center gap-6">
                <Text className = "font-roomFont text-roomLightGreen text-4xl top-64 font-bold">I am a...</Text>
                <Pressable className = "bg-roomLightGreen w-48 h-16 rounded-full justify-center top-64 shadow-md">
                    <Text className = "text-center text-xl font-roomFont">Landlord</Text>
                </Pressable>
                <Pressable className = "bg-roomLightGreen w-48 h-16 rounded-full justify-center top-64 shadow-md">
                    <Text className = "text-center text-xl font-roomFont">Renter</Text>
                </Pressable>
            </View>

            <View className = "absolute bottom-24 right-8">
                <Pressable className = "bg-roomPink w-28 h-14 bottom-0 right-0 rounded-full justify-center shadow-md">
                    <Text className = "font-roomFont text-center">Next</Text>
                </Pressable>
            </View>
        </View>




    )



}