import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { supabase } from '../../utils/supabase';

const SpaceDetailsScreen = ({ route, navigation }) => {
  const { space } = route.params; // Passed space data
  const [spaceDetails, setSpaceDetails] = useState(space); // Use passed data as initial state
  const [rooms, setRooms] = useState([]); // State to store rooms
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpaceDetails = async () => {
      const updatedSpace = await fetchSpaceDetails(space.id);
      if (updatedSpace) {
        setSpaceDetails(updatedSpace);
      }
      await loadRooms(space.id);
    };

    loadSpaceDetails();
  }, [space.id]);

  const fetchSpaceDetails = async (spaceId) => {
    const { data, error } = await supabase
      .from('spaces')
      .select('*')
      .eq('id', spaceId)
      .single();

    if (error) {
      console.error('Error fetching space details:', error.message);
      return null;
    }
    return data;
  };

  const loadRooms = async (spaceId) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('space_id', spaceId);

      if (error) {
        throw new Error(error.message);
      }

      setRooms(data);
    } catch (error) {
      console.error('Error loading rooms:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert('Copied to Clipboard', 'Share this with your tenant');
    } catch (error) {
      console.error('Error copying to clipboard:', error.message);
      Alert.alert('Error', 'Failed to copy to clipboard.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-livingDarkGrey px-4 py-6 pt-16">
      {/* Header Section */}
      <View className="bg-livingDarkGreen py-6 px-4 rounded-b-lg shadow-lg mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
          <Text className="text-livingLightGrey text-lg">← Back</Text>
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-livingLightGrey">{spaceDetails.name}</Text>
        <Text className="text-lg text-livingLightGrey mt-2">Address: {spaceDetails.address}</Text>
        <Text className="text-livingLightGrey mt-1">
          Created At: {new Date(spaceDetails.created_at).toLocaleDateString()}
        </Text>
      </View>

      {/* Add Room Button */}
      <TouchableOpacity
        className="bg-livingLightBlue py-3 rounded mb-6"
        onPress={() => navigation.navigate('AddRoom', { spaceId: spaceDetails.id })}
      >
        <Text className="text-center text-white text-lg">+ Add Room</Text>
      </TouchableOpacity>

      {/* Rooms Section */}
      <View className="bg-livingLightGrey p-4 rounded-lg shadow">
        <Text className="text-xl font-bold text-livingDarkGreen mb-4">Rooms in this Space</Text>
        {loading ? (
          <Text className="text-livingDarkGreen">Loading rooms...</Text>
        ) : rooms.length > 0 ? (
          <FlatList
            data={rooms}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="bg-livingWhite p-4 mb-4 rounded shadow">
                <Text className="text-lg font-bold text-livingDarkGreen">{item.name}</Text>
                <Text className="text-livingDarkGreen">Rent: ${item.rent_amount}</Text>
                <TouchableOpacity
                  onPress={() => copyToClipboard(item.id)}
                  className="mt-2 bg-livingLightBlue py-2 px-3 rounded"
                >
                  <Text className="text-white text-center">Copy Room ID</Text>
                </TouchableOpacity>
                <Text className="text-livingDarkGreen mt-2">
                  Status: {item.is_available ? 'Available' : 'Occupied'}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text className="text-livingDarkGreen">No rooms have been created in this space yet.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default SpaceDetailsScreen;