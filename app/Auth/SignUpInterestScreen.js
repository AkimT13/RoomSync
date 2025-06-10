import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import InterestsPicker from './InterestsPicker';

const SignUpInterestsScreen = ({ navigation }) => {
  const handleSkip = () => {
    navigation.navigate('RenterDashboard'); // Navigate to Renter Dashboard
  };

  const handleSave = () => {
    navigation.navigate('RenterDashboard'); // Navigate to Renter Dashboard after saving
  };

  return (
    <View className="flex-1 bg-gray-800 px-4 py-6 pt-16">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-3xl font-bold text-white mb-2">Select Your Interests</Text>
        <Text className="text-lg text-gray-400">
          These will help us match you with compatible roommates.
        </Text>
      </View>

      {/* Interests Picker Component */}
      <InterestsPicker onSave={handleSave} showSkip onSkip={handleSkip} />
    </View>
  );
};

export default SignUpInterestsScreen;
