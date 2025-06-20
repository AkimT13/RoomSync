import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { supabase } from '../../utils/supabase';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      return; // Exit the function on error
    }
  
    alert('Sign-in successful!');
  
    // Get the authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.log('Error fetching user:', userError?.message || 'No user logged in.');
      return;
    }
  
    // Fetch the user's profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
  
    if (profileError) {
      console.log('Error fetching profile:', profileError.message);
      return; // Exit the function on error
    }
  
    console.log("Role: " + profile.role);
  
    // Navigate based on the user's role
    navigation.navigate(profile.role === 'landlord' ? 'LandLordDashboard' : 'RenterDashboard');
  };

  return (
    <View className="flex-1 justify-center bg-livingWhite px-4">
        <Text className = 'text-left text-black text-4xl p-3 font-bold'>Welcome!</Text>
        
      <TextInput
        placeholder="Email"
        placeholderTextColor="black"
        value={email}
        onChangeText={setEmail}
        className="bg-inputField text-roomDarkBlue p-5 rounded-3xl mb-5"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="black"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="bg-inputField text-roomDarkBlue p-5 rounded-3xl mb-4"
      />
      <TouchableOpacity className="">
        <Text className="text-black text-right mb-4">Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSignIn}
        className="bg-signIn p-3 rounded-2xl mb-3"
      >
        <Text className="text-white text-center text-xl">Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        className="bg-livingDarkGrey p-3 rounded-2xl"
      >
        <Text className="text-white text-center text-xl">I don't have an account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
