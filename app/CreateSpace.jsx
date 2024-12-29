import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from "../utils/supabase.ts";

export default function CreateSpace({ navigation }) {
  const [spaceName, setSpaceName] = useState('');

  const handleCreateSpace = async () => {
    const user = supabase.auth.user();
    const { error } = await supabase.from('spaces').insert([
      { name: spaceName, landlord_id: user.id }
    ]);

    if (error) Alert.alert(error.message);
    else navigation.navigate('LandlordDashboard');
  };

  return (
    <View>
      <Text>Create a New Space</Text>
      <TextInput
        placeholder="Space Name"
        onChangeText={setSpaceName}
      />
      <Button title="Create Space" onPress={handleCreateSpace} />
    </View>
  );
}