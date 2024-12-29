import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { supabase } from '../utils/supabase';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert('Sign-up successful! Confirm your email to continue');
      

      const {error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      if(error) {
        console.log("Error with auto sign in after sign up" + error.message)
      }
      else{
        navigation.navigate('RoleSelection');

      }

      
      
      
    }
  };

  return (
    <View className="flex-1 justify-center bg-roomDarkBlue px-4">
      <Text className = 'text-center text-roomLightGreen text-6xl p-3 font-semibold '>Living Link</Text>
      <Text className = 'text-white text-2xl p-3 font-semibold'>Sign Up</Text>
      <View className=" justify-center bg-roomDarkBlue px-4 w-12" >


      </View>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={setEmail}
        className="bg-roomLightGreen text-roomDarkBlue p-3 rounded-lg mb-4"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#fff"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="bg-roomLightGreen text-roomDarkBlue p-3 rounded-lg mb-4"
      />
      <TouchableOpacity
        onPress={handleSignUp}
        className="bg-roomPink p-3 rounded-lg mb-2"
      >
        <Text className="text-white text-center">Sign Up</Text>
      </TouchableOpacity>
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
