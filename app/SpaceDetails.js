import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { supabase } from '../utils/supabase';


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

  const copyToClipboard = (text) => {
    Clipboard.setString(text); // Copies the text to the clipboard
    console.log(text);
    Alert.alert('Copied to Clipboard', `You copied: ${text}`);
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

  return (
    <View className="p-16 bg-roomLightGreen min-h-screen">
      {/* Go Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
        <Text className="text-black">Go Back</Text>
      </TouchableOpacity>

      {/* Space Details */}
      <Text className="text-2xl font-bold text-roomDarkBlue mb-4">{spaceDetails.name}</Text>
      <Text className="text-lg text-roomDarkBlue">Address: {spaceDetails.address}</Text>
      <Text className="text-roomDarkBlue mt-2">
        Created At: {new Date(spaceDetails.created_at).toLocaleDateString()}
      </Text>

      {/* Add Room Button */}
      <TouchableOpacity
        className="bg-roomPink py-2 px-4 mt-6 rounded"
        onPress={() => navigation.navigate('AddRoom', { spaceId: spaceDetails.id })}
      >
        <Text className="text-white text-center">Add Room</Text>
      </TouchableOpacity>

      {/* Rooms List */}
      <Text className="text-xl font-bold text-roomDarkBlue mt-8 mb-4">Rooms in this Space</Text>
      {loading ? (
        <Text className="text-roomDarkBlue">Loading rooms...</Text>
      ) : rooms.length > 0 ? (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-4 rounded shadow">
              <Text className="text-lg font-bold text-roomDarkBlue">{item.name}</Text>
              <Text className="text-roomDarkBlue">Rent: ${item.rent_amount}</Text>
              
              <Text selectable = {true} className="text-roomDarkBlue">ID: {item.id}</Text>
             
              
             
              <Text className="text-roomDarkBlue">
                Status: {item.is_available ? 'Available' : 'Occupied'}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text className="text-roomDarkBlue">No rooms have been created in this space yet.</Text>
      )}
    </View>
  );
};

export default SpaceDetailsScreen;
