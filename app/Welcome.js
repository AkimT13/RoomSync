import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import '../global.css'
import { TextInput } from 'react-native-gesture-handler';
const WelcomeScreen = ({ navigation }) => (
  <View className="flex-1 justify-center items-center">
    <View className="">
      <Text className="text-3xl font-bold text-black">Welcome!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignIn')}
        className="bg-signIn px-4 py-2 mt-4 rounded">
        <Text className="text-white text-lg text-center">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        className="bg-livingDarkGrey px-4 py-2 mt-2 rounded">
        <Text className="text-white text-lg text-center">I don't have an account</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default WelcomeScreen;
