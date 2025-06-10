import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { supabase } from '../../utils/supabase';
import JoinRoom from './JoinRoom';
import TaskList from './TaskList';
import Navbar from './Navbar';

const RenterDashboardScreen = ({ navigation }) => {
  const [hasJoinedRoom, setHasJoinedRoom] = useState(null);
  const [space, setSpace] = useState(null);
  const [renters, setRenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRoomMembership = async () => {
      try {
        // Get the authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          throw new Error('User not authenticated');
        }

        // Check if user is associated with a space
        const { data: tenant, error: tenantError } = await supabase
          .from('tenants')
          .select('space_id')
          .eq('renter_id', user.id)
          .eq('is_active', true)
          .single();

        if (tenantError || !tenant) {
          setHasJoinedRoom(false);
          return;
        }

        setHasJoinedRoom(true);

        // Fetch space details
        const { data: spaceData, error: spaceError } = await supabase
          .from('spaces')
          .select('*')
          .eq('id', tenant.space_id)
          .single();

        if (spaceError) console.error("Error fetching space:", spaceError.message);
        else setSpace(spaceData);

        // Fetch renters in the same space
        const { data: rentersData, error: rentersError } = await supabase
          .from('tenants')
          .select('renter_id, profiles(name, role)')
          .eq('space_id', tenant.space_id);

        if (rentersError) console.error("Error fetching renters:", rentersError.message);
        else setRenters(rentersData);
      } catch (error) {
        console.error(error.message);
        setHasJoinedRoom(false);
      } finally {
        setLoading(false);
      }
    };

    checkRoomMembership();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <ActivityIndicator size="large" color="#F5A623" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-800 pt-16">
      {hasJoinedRoom ? (
        <View className="flex-1 px-6">
          {/* Header */}
          <View className="bg-roomDarkBlue py-6 px-4 rounded-b-lg shadow-lg">
            <Text className="text-3xl font-extrabold text-white">
              Your Dashboard
            </Text>
            {space && (
              <Text className="text-lg text-white mt-2 opacity-80">
                Welcome to {space.name}
              </Text>
            )}
          </View>

          {/* Task List */}
          <View className="flex-1 py-6">
            <Text className="text-2xl font-semibold text-white mb-4">
              Tasks Assigned to You
            </Text>
            <TaskList navigation={navigation} />
          </View>

          {/* Roommate List */}
          <View className="bg-gray-700 px-4 py-4 rounded-lg">
            <Text className="text-xl font-semibold text-white mb-2">
              Your Roommates
            </Text>
            <FlatList
              data={renters}
              keyExtractor={(item) => item.renter_id}
              renderItem={({ item }) => (
                <View className="bg-gray-600 p-4 rounded mb-3 shadow-md">
                  <Text className="text-white font-bold">
                    {item.profiles.name}
                  </Text>
                  <Text className="text-gray-400">{item.profiles.role}</Text>
                </View>
              )}
            />
          </View>
        </View>
      ) : (
        <JoinRoom onRoomJoined={() => setHasJoinedRoom(true)} />
      )}

      {/* Navbar */}
      <Navbar navigation={navigation} />
    </View>
  );
};

export default RenterDashboardScreen;
