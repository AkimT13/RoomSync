import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../utils/supabase';

const AddRoomScreen = ({ route, navigation }) => {
  const { spaceId } = route.params; // Get space ID passed from SpaceDetailsScreen
  const [roomName, setRoomName] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [isOccupied, setIsOccupied] = useState(false);
  const [roomId, setRoomId] = useState(null);

  const handleAddRoom = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .insert({
          space_id: spaceId,
          name: roomName,
          rent_amount: rentAmount,
          is_available: !isOccupied, // Room is available only if not occupied
        })
        .select('*')
        .single(); // Return the inserted room

      if (error) {
        throw new Error(error.message);
      }

      setRoomId(data.id);
      Alert.alert('Success', 'Room added successfully!');
    } catch (err) {
      console.error('Error adding room:', err.message);
      Alert.alert('Error', 'Failed to add room');
    }
  };

  return (
    <View className="p-16 pt-20 bg-roomLightGreen min-h-screen ">
        <TouchableOpacity onPress = {()=>navigation.goBack()}>
        <Text className = "">Return to space</Text>
        </TouchableOpacity>
       
      <Text className="text-2xl font-bold text-roomDarkBlue mb-4">Add Room</Text>

      <TextInput
        placeholder="Room Name"
        className="border-b border-roomDarkBlue mb-4 p-2 text-roomDarkBlue"
        value={roomName}
        onChangeText={setRoomName}
      />
      <TextInput
        placeholder="Rent Amount"
        className="border-b border-roomDarkBlue mb-4 p-2 text-roomDarkBlue"
        keyboardType="numeric"
        value={rentAmount}
        onChangeText={setRentAmount}
      />
      <TouchableOpacity
        className={`py-2 px-4 mb-4 rounded ${
          isOccupied ? 'bg-roomPink' : 'bg-gray-400'
        }`}
        onPress={() => setIsOccupied(!isOccupied)}
      >
        <Text className="text-white text-center">
          {isOccupied ? 'Room is Occupied' : 'Room is Not Occupied'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-roomDarkBlue py-2 px-4 rounded"
        onPress={handleAddRoom}
      >
        <Text className="text-white text-center">Add Room</Text>
      </TouchableOpacity>

      {roomId && (
        <View className="mt-6">
          <Text className="text-roomDarkBlue">
            Room ID: <Text className="font-bold">{roomId}</Text>
          </Text>
          <Text className="text-roomDarkBlue mt-2">Link to Join Room:</Text>
          <Text className="text-roomPink mt-1">
            https://api.yourdomain.com/join-room?space_id={spaceId}&room_id={roomId}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AddRoomScreen;
