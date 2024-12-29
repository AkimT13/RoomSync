// CreateSpaceScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { supabase } from '../utils/supabase';

const CreateSpaceScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleCreateSpace = async () => {
    const {data:{user}} = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from('spaces')
        .insert({ name, address, landlord_id: user.id });

      if (error) {
        console.log('Error creating space: ' + error.message);
      } else {
        alert('Space created successfully!');
        navigation.navigate('LandLordDashboard'); // Redirect to dashboard
      }
    }
  };

  return (
    <View className="flex-1 justify-center bg-roomPink px-4">
      <Text className="text-2xl font-bold text-roomDarkBlue mb-4">Create Your Space</Text>
      <TextInput
        placeholder="Space Name"
        value={name}
        onChangeText={setName}
        className="bg-roomLightGreen text-roomDarkBlue p-3 rounded mb-4"
      />
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        className="bg-roomLightGreen text-roomDarkBlue p-3 rounded mb-4"
      />
      <TouchableOpacity
        onPress={handleCreateSpace}
        className="bg-roomDarkBlue p-3 rounded"
      >
        <Text className="text-white text-center">Create Space</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateSpaceScreen;
