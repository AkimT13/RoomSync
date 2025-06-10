import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../utils/supabase';
import InterestsPicker from '../Auth/InterestsPicker';
import Navbar from './Navbar';

const RenterProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({});
  const [profilePicture, setProfilePicture] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [uploading, setUploading] = useState(false);

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
        setProfilePicture(data.profile_picture_url || '');
        setName(data.name || '');
        setLocation(data.location || '');
        setBudgetMin(data.budget_min ? data.budget_min.toString() : '');
        setBudgetMax(data.budget_max ? data.budget_max.toString() : '');
        setMoveInDate(data.move_in_date || '');
      }
    };

    fetchProfile();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'You need to grant permission to access photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      setUploading(true);

      const response = await fetch(uri);
      const blob = await response.blob();

      const fileName = `${profile.id}-${Date.now()}.jpg`;

      const { data, error } = await supabase.storage
        .from('profilePics')
        .upload(fileName, blob, { cacheControl: '3600', upsert: true });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('profilePics')
        .getPublicUrl(data.path);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ profile_picture_url: urlData.publicUrl })
        .eq('id', profile.id);

      if (updateError) throw updateError;

      setProfilePicture(urlData.publicUrl);
      Alert.alert('Success', 'Profile picture updated!');
    } catch (error) {
      console.error('Error uploading image:', error.message);
      Alert.alert('Error', 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

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

      {/* Profile Picture */}
      <View className="items-center mb-6">
        {profilePicture ? (
          <Image
            source={{ uri: profilePicture }}
            className="w-24 h-24 rounded-full mb-4"
          />
        ) : (
          <View className="w-24 h-24 bg-gray-500 rounded-full justify-center items-center mb-4">
            <Text className="text-white">No Photo</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={pickImage}
          className="bg-livingLightBlue py-2 px-4 rounded"
          disabled={uploading}
        >
          <Text className="text-white">
            {uploading ? 'Uploading...' : 'Change Photo'}
          </Text>
        </TouchableOpacity>
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
      
      <Navbar/>
    </ScrollView>
    
  );
};

export default RenterProfileScreen;
