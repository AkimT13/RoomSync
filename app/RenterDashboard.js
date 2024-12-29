
import React from 'react';
import { View, Text } from 'react-native';

const RenterDashboardScreen = () => (
  <View className="flex-1 justify-center items-center bg-roomLightGreen">
    <Text className="text-2xl font-bold text-roomDarkBlue">Welcome to the Renter Dashboard!</Text>
    <Text className="text-lg text-roomDarkBlue mt-4">This is where you’ll interact with landlords.</Text>
  </View>
);

export default RenterDashboardScreen;