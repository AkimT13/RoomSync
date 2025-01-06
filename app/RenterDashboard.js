// RenterDashboardScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { supabase } from '../utils/supabase';
import JoinRoom from './JoinRoom';
import TaskList from './TaskList';

const RenterDashboardScreen = ({navigation}) => {
  const [hasJoinedRoom, setHasJoinedRoom] = useState(null); // null indicates loading state

  useEffect(() => {
    const checkRoomMembership = async () => {
      try {
        // Get the authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          throw new Error('User not authenticated');
        }

        // Check if the user is associated with any active tenant record
        const { data: tenant, error: tenantError } = await supabase
          .from('tenants')
          .select('*')
          .eq('renter_id', user.id)
          .eq('is_active', true)
          .single();

        if (tenantError && tenantError.code !== 'PGRST116') { // PGRST116: No rows found
          throw new Error('Error checking tenant status');
        }

        setHasJoinedRoom(tenant ? true : false);
      } catch (error) {
        console.error(error.message);
        setHasJoinedRoom(false); // Default to false on error
      }
    };

    checkRoomMembership();
  }, []);

  if (hasJoinedRoom === null) {
    // Still loading
    return (
      <View className="flex-1 justify-center items-center bg-roomLightGreen">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-roomLightGreen px-4 p-24">
      {hasJoinedRoom ? (
        <View className="justify-center items-center">
          <Text className="text-2xl font-bold text-roomDarkBlue">
            Renter Dashboard
          </Text>
          {/* Additional dashboard content goes here */}
          <TaskList />
        </View>
      ) : (
        <JoinRoom onRoomJoined={() => setHasJoinedRoom(true)} />
      )}
    </View>
  );
};

export default RenterDashboardScreen;
