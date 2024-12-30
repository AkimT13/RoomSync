import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { supabase } from '../utils/supabase';

const LandlordDashboardScreen = ({ navigation }) => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    setLoading(true);

    const {data:{user}} = await supabase.auth.getUser();
    if (!user) {
      alert('User not authenticated');
      return;
    }

    const { data, error } = await supabase
      .from('spaces')
      .select('*')
      .eq('landlord_id', user.id);

    if (error) {
      alert('Error fetching spaces: ' + error.message);
    } else {
      setSpaces(data);
    }
    setLoading(false);
  };

  const handleAddSpace = () => {
    navigation.navigate('CreateSpace');
  };

  

  const renderSpaceItem = ({ item }) => (
    <View className="bg-roomLightGreen p-4 rounded mb-4 shadow-md">
      <Text className="text-lg font-bold text-roomDarkBlue">{item.name}</Text>
      <Text className="text-roomDarkBlue">Address: {item.address}</Text>
      <TouchableOpacity onPress = {() => navigation.navigate('SpaceDetails', { space: item })} className="bg-roomPink px-3 py-1 mt-3 rounded">
        <Text className="text-white text-center">View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-roomDarkBlue px-4 pt-16 ">
      <Text className="text-2xl font-bold text-roomLightGreen mb-6">Landlord Dashboard</Text>

      {loading ? (
        <Text className="text-roomLightGreen">Loading spaces...</Text>
      ) : (
        <>
          <FlatList
            data={spaces}
            renderItem={renderSpaceItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text className="text-roomLightGreen">
                You don't have any spaces yet. Add one below!
              </Text>
            }
          />
          <TouchableOpacity
            onPress={handleAddSpace}
            className="bg-roomPink px-4 py-3 mt-6 rounded mb-10"
          >
            <Text className="text-white text-center text-lg ">Add New Space</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default LandlordDashboardScreen;
