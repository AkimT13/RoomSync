import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { supabase } from '../utils/supabase';

const SpaceDetailsScreen = ({ route,navigation }) => {
  const { space } = route.params; // Get the space object from navigation params
  const [rooms, setRooms] = useState([]); // State to hold the rooms

  useEffect(() => {
    // Fetch rooms when the component loads
    const loadRooms = async () => {
      const fetchedRooms = await fetchRooms(space.id); // Query rooms with space.id
      setRooms(fetchedRooms);
    };

    loadRooms();
  }, [space.id]); // Dependency on space ID

  // Function to fetch rooms
  const fetchRooms = async (spaceId) => {
    const { data: rooms, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('space_id', spaceId);

    if (error) {
      console.error('Error fetching rooms:', error.message);
      return [];
    }

    return rooms;
  };
  const handleBack = () =>{
    navigation.navigate("LandLordDashboard")
  }

  return (
    <View className="flex-1 bg-roomLightGreen p-16 ">
        <TouchableOpacity onPress={handleBack}>

            <Text >Back</Text>
        </TouchableOpacity>
        
      <Text className="text-2xl font-bold text-roomDarkBlue">{space.name}</Text>
      <Text className="text-lg text-roomDarkBlue mt-4">Address: {space.address}</Text>
      <Text className="text-roomDarkBlue mt-2">Rooms:</Text>

      {/* List of Rooms */}
      {rooms.length > 0 ? (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-roomPink p-3 mb-3 rounded ">
              <Text className="text-white font-bold">{item.name}</Text>
              <Text className="text-white">Rent: ${item.rent_amount}</Text>
              <Text className="text-white">
                {item.is_available ? 'Available' : 'Occupied'}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text className="text-roomDarkBlue mt-4">No rooms found for this space.</Text>
      )}
    </View>
  );
};

export default SpaceDetailsScreen;
