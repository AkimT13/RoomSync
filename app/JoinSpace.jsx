import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from "../utils/supabase.ts";

export default function JoinSpace({ navigation }) {
  const [spaceId, setSpaceId] = useState('');

  const handleJoinSpace = async () => {
    const user = supabase.auth.user();
    const { error } = await supabase.from('memberships').insert([
      { user_id: user.id, space_id: spaceId }
    ]);

    if (error) Alert.alert(error.message);
    else navigation.navigate('RenterDashboard');
  };

  return (
    <View>
      <Text>Join an Existing Space</Text>
      <TextInput
        placeholder="Space ID"
        onChangeText={setSpaceId}
      />
      <Button title="Join Space" onPress={handleJoinSpace} />
    </View>
  );
}