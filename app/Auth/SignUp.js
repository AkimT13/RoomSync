import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { supabase } from '../../utils/supabase';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState(''); // New state for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      alert(signUpError.message);
      return;
    }

    const user = signUpData.user;
    if (user) {
      // Insert user details into profiles table
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: user.id,
          name: name, // Store the name
        }
      ]);

      if (profileError) {
        console.error("Error saving profile:", profileError.message);
      } else {
        alert('Sign-up successful! Confirm your email to continue');

        // Auto sign-in after sign-up
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (signInError) {
          console.error("Error with auto sign-in after sign-up:", signInError.message);
        } else {
          navigation.navigate('RoleSelection');
        }
      }
    }
  };

  return (
    <View className="flex-1 justify-center bg-roomDarkBlue px-4">
      <Text className="text-center text-roomLightGreen text-6xl p-3 font-semibold">Living Link</Text>
      <Text className="text-white text-2xl p-3 font-semibold">Sign Up</Text>

      {/* Name Input */}
      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#fff"
        value={name}
        onChangeText={setName}
        className="bg-roomLightGreen text-roomDarkBlue p-3 rounded-lg mb-4"
      />

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={setEmail}
        className="bg-roomLightGreen text-roomDarkBlue p-3 rounded-lg mb-4"
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#fff"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="bg-roomLightGreen text-roomDarkBlue p-3 rounded-lg mb-4"
      />

      {/* Sign-Up Button */}
      <TouchableOpacity
        onPress={handleSignUp}
        className="bg-roomPink p-3 rounded-lg mb-2"
      >
        <Text className="text-white text-center">Sign Up</Text>
      </TouchableOpacity>

      {/* Navigate to Sign-In */}
      <TouchableOpacity
        onPress={() => navigation.navigate('SignIn')}
        className="bg-roomLightGreen p-3 rounded"
      >
        <Text className="text-roomDarkBlue text-center">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
