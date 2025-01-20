import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-roomLightGreen px-4">
      <Text className="text-2xl font-bold text-roomDarkBlue">Your Profile</Text>
      {/* Add options to edit name, email, or other profile details */}
      <TouchableOpacity className="bg-roomPink p-3 mt-4 rounded-lg">
        <Text className="text-white text-center">Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
