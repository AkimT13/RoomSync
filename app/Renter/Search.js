import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Navbar from './Navbar';

const SearchScreen = ({navigation}) => {
  return (
    <View className="flex-1 bg-roomLightGreen">
    {/* Screen Content */}
    <View className="flex-1 p-16">
      <Text className="text-2xl font-bold text-roomDarkBlue">Search Screen</Text>
      {/* Add your content here */}
    </View>

    {/* Navbar Positioned at the Bottom */}
    <View className="absolute bottom-0 left-0 right-0">
      <Navbar navigation={navigation} />
    </View>
  </View>
  );
};

export default SearchScreen;
