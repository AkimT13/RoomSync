import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { supabase } from '../utils/supabase';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert('Sign-in successful!');
      const {data:{user}} = await supabase.auth.getUser()

      const role = supabase.from('profiles').select('role').eq(user.id)
      console.log(role)
      navigation.navigate(role === 'landlord' ? 'LandLordDashboard' : "RenterDashboard")
      


    }
  };

  return (
    <View className="flex-1 justify-center bg-roomDarkBlue px-4">
        <Text className = 'text-center text-roomLightGreen text-4xl p-3'>Living Link</Text>
        
      <TextInput
        placeholder="Email"
        placeholderTextColor="#a8e6cf"
        value={email}
        onChangeText={setEmail}
        className="bg-roomLightGreen text-roomDarkBlue p-3 rounded mb-4"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#a8e6cf"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="bg-roomLightGreen text-roomDarkBlue p-3 rounded mb-4"
      />
      <TouchableOpacity
        onPress={handleSignIn}
        className="bg-roomPink p-3 rounded mb-2"
      >
        <Text className="text-white text-center">Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        className="bg-roomLightGreen p-3 rounded"
      >
        <Text className="text-roomDarkBlue text-center">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
