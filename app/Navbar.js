import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const Navbar = ({ navigation }) => {
  return (
    <View className="flex-row justify-around items-center bg-roomDarkBlue py-4">
      {/* Dashboard Button */}
      <TouchableOpacity onPress={() => navigation.navigate('RenterDashboard')}>
      <Entypo name="home" size={24} color="white" />
      </TouchableOpacity>

      {/* Tasks Button */}
      <TouchableOpacity onPress={() => navigation.navigate('MessagesScreen')}>
      <FontAwesome5 name="tasks" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
      <FontAwesome name="search" size={24} color="white" />
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <FontAwesome5 name="user-alt" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
