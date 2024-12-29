import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../utils/supabase.ts';

export default function UserDetails({ route, navigation }) {
  const { userId, email, userType } = route.params;
  const [details, setDetails] = useState({ name: '' });

  const handleChange = (key, value) => {
    setDetails({ ...details, [key]: value });
  };

  const handleSubmit = async () => {
    const { error } = await supabase.from('users').insert([
      { id: userId, email, user_type: userType, name: details.name }
    ]);

    if (error) Alert.alert(error.message);
    else navigation.navigate(userType === 'landlord' ? 'CreateSpace' : 'JoinSpace');
  };

  return (
    <View>
      <Text>Additional Information</Text>
      <TextInput
        placeholder="Name"
        onChangeText={(value) => handleChange('name', value)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}