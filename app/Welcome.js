import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import '../global.css'
const WelcomeScreen = ({ navigation }) => (
  <View className="flex-1 justify-center items-center bg-roomLightGreen">
    <Text className="text-3xl font-bold text-roomDarkBlue">Welcome to Living Link!</Text>
    <TouchableOpacity
      onPress={() => navigation.navigate('SignIn')}
      className="bg-roomPink px-4 py-2 mt-4 rounded"
    >
      <Text className="text-white text-lg">Sign In</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate('SignUp')}
      className="bg-roomDarkBlue px-4 py-2 mt-2 rounded"
    >
      <Text className="text-white text-lg">Sign Up</Text>
    </TouchableOpacity>
  </View>
);

export default WelcomeScreen;
