import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { supabase } from '../../utils/supabase';

const InterestsPicker = ({ onSave, isSignUpFlow = false, navigation }) => {
  const [predefinedInterests, setPredefinedInterests] = useState([
    "Sports",
    "Music",
    "Movies",
    "Travel",
    "Gaming",
    "Cooking",
    "Fitness",
    "Art",
    "Technology",
  ]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [customInterest, setCustomInterest] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest)) {
      setSelectedInterests([...selectedInterests, customInterest.trim()]);
      setCustomInterest("");
    } else {
      Alert.alert("Error", "Interest is empty or already added.");
    }
  };

  const saveInterests = async () => {
    try {
      setLoading(true);
      const { data: user, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      const interestsToInsert = selectedInterests.map((interest) => ({
        profile_id: user.id,
        interest,
      }));

      const { error } = await supabase.from("interests").insert(interestsToInsert);

      if (error) {
        throw error;
      }

      Alert.alert("Success", "Interests saved successfully!");
      onSave();
    } catch (error) {
      console.error("Error saving interests:", error);
      Alert.alert("Error", "Failed to save interests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-livingDarkGrey px-4 py-6">
      <Text className="text-2xl font-bold text-livingLightBlue mb-4">
        Select Your Interests
      </Text>

      <FlatList
        data={predefinedInterests}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleInterest(item)}
            className={`p-3 mb-2 rounded ${
              selectedInterests.includes(item) ? "bg-livingLightBlue" : "bg-gray-700"
            }`}
          >
            <Text className="text-white text-center">{item}</Text>
          </TouchableOpacity>
        )}
        className="mb-4"
      />

      <TextInput
        placeholder="Add custom interest"
        value={customInterest}
        onChangeText={setCustomInterest}
        className="bg-gray-700 text-white p-3 rounded mb-2"
      />

      <TouchableOpacity
        onPress={addCustomInterest}
        className="bg-livingLightBlue p-3 rounded mb-6"
      >
        <Text className="text-white text-center">Add Custom Interest</Text>
      </TouchableOpacity>

      {isSignUpFlow && (
        <TouchableOpacity
          onPress={() => navigation.navigate("NextSignUpScreen")}
          className="bg-gray-700 p-3 rounded mb-2"
        >
          <Text className="text-white text-center">Skip</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={saveInterests}
        disabled={loading}
        className={`p-3 rounded ${
          loading ? "bg-gray-500" : "bg-livingLightBlue"
        }`}
      >
        <Text className="text-white text-center">
          {loading ? "Saving..." : isSignUpFlow ? "Save & Continue" : "Save Interests"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InterestsPicker;
