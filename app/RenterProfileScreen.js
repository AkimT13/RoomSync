import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { supabase } from '../utils/supabase';
import InterestsPicker from './InterestsPicker';

const RenterProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({});
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [moveInDate, setMoveInDate] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error('Error fetching user:', userError);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
      } else {
        setProfile(data);
        setName(data.name || '');
        setLocation(data.location || '');
        setBudgetMin(data.budget_min ? data.budget_min.toString() : '');
        setBudgetMax(data.budget_max ? data.budget_max.toString() : '');
        setMoveInDate(data.move_in_date || '');
      }
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          name,
          location,
          budget_min: budgetMin ? parseFloat(budgetMin) : null,
          budget_max: budgetMax ? parseFloat(budgetMax) : null,
          move_in_date: moveInDate || null,
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      Alert.alert('Profile Saved', 'Your profile has been updated successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-800 px-4 py-6 pt-16">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-3xl font-bold text-white mb-2">Profile</Text>
        <Text className="text-lg text-gray-400">
          Update your personal information and preferences.
        </Text>
      </View>

      {/* Name */}
      <Text className="text-white mb-2">Name</Text>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        className="bg-gray-700 text-white p-3 rounded mb-4"
      />

      {/* Location */}
      <Text className="text-white mb-2">Location</Text>
      <TextInput
        placeholder="Enter your location"
        value={location}
        onChangeText={setLocation}
        className="bg-gray-700 text-white p-3 rounded mb-4"
      />

      {/* Budget */}
      <Text className="text-white mb-2">Budget (Min - Max)</Text>
      <View className="flex-row justify-between mb-4">
        <TextInput
          placeholder="Min"
          value={budgetMin}
          onChangeText={setBudgetMin}
          keyboardType="numeric"
          className="bg-gray-700 text-white p-3 rounded w-1/2 mr-2"
        />
        <TextInput
          placeholder="Max"
          value={budgetMax}
          onChangeText={setBudgetMax}
          keyboardType="numeric"
          className="bg-gray-700 text-white p-3 rounded w-1/2"
        />
      </View>

      {/* Move-in Date */}
      <Text className="text-white mb-2">Move-In Date</Text>
      <TextInput
        placeholder="YYYY-MM-DD"
        value={moveInDate}
        onChangeText={setMoveInDate}
        className="bg-gray-700 text-white p-3 rounded mb-4"
      />

      {/* Interests Picker */}
      <Text className="text-white mb-2">Interests</Text>
      <InterestsPicker />

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSaveProfile}
        className="bg-livingLightBlue py-3 rounded mt-6"
      >
        <Text className="text-white text-center text-lg">Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RenterProfileScreen;
