import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../utils/supabase';

const RenterDashboardScreen = () => {
  const [roomId, setRoomId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoinRoom = async () => {
    if (!roomId.trim()) {
      Alert.alert('Error', 'Please enter a valid Room ID');
      return;
    }

    try {
      setLoading(true);

      // Get the authenticated user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error('User not authenticated');
      }

      // Check if the room exists
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', roomId)
        .single();

      if (roomError || !room) {
        throw new Error('Room not found');
      }

      // Ensure the room is available
      if (!room.is_available) {
        throw new Error('This room is already occupied');
      }

      // Add the renter to the tenants table
      const { error: addTenantError } = await supabase
        .from('tenants')
        .insert({
          space_id: room.space_id, // Reference the space associated with the room
          renter_id: user.id,
          is_active: true,
          amount_due: room.rent_amount, // Set initial rent amount
        });

      if (addTenantError) {
        throw new Error('Failed to join the room');
      }

      // Update the room to set it as unavailable and assign the tenant
      const { error: updateRoomError } = await supabase
        .from('rooms')
        .update({ tenant_id: user.id, is_available: false })
        .eq('id', roomId);

      if (updateRoomError) {
        throw new Error('Failed to update room status');
      }

      Alert.alert('Success', `You have successfully joined the room: ${room.name}`);
      setRoomId(''); // Clear input
    } catch (error) {
      console.error(error.message);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-roomLightGreen px-4">
      <Text className="text-2xl font-bold text-roomDarkBlue mb-6">
        Welcome to the Renter Dashboard!
      </Text>
      <Text className="text-lg text-roomDarkBlue mb-4">
        Enter the Room ID provided by your landlord to join a specific room.
      </Text>

      <TextInput
        placeholder="Enter Room ID"
        className="bg-white p-3 rounded w-full text-roomDarkBlue mb-4"
        value={roomId}
        onChangeText={setRoomId}
      />

      <TouchableOpacity
        onPress={handleJoinRoom}
        className={`py-3 px-6 rounded ${
          loading ? 'bg-gray-400' : 'bg-roomPink'
        }`}
        disabled={loading}
      >
        <Text className="text-white text-center">{loading ? 'Joining...' : 'Join Room'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RenterDashboardScreen;
