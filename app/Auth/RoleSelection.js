import { View, Text, Pressable } from 'react-native';
import React from 'react';
import {supabase} from '../../utils/supabase'


export default function RoleSelectionScreen({navigation }) {
    const handleRoleSelection = async (role) => {
        const {data:{user}} = await supabase.auth.getUser();
        
        console.log("User email: " + user.email)
        console.log(user)
        console.log("User ID: " + user['id'])
    
        if (user) {
          const { error } = await supabase
            .from('profiles')
            .update({ role:role })
            .eq('id',user.id)
            
            
            
    
          if (error) {
            alert('Error saving role: ' + error.message);
          } else {
            // Navigate to the next step based on the role
            navigation.navigate(role === 'landlord' ? 'CreateSpace' : 'SignUpInterests');
          }
        }
    
  
        
        

    }
 

  return (
    <View className="bg-roomDarkBlue w-full h-full">
      <Text className="text-roomPink top-40 left-9 font-bold text-4xl">Let's get started...</Text>
      <View className="flex flex-col items-center gap-6">
        <Text className="font-roomFont text-roomLightGreen text-4xl top-64 font-bold">I am a...</Text>
        <Pressable
          className="bg-roomLightGreen w-48 h-16 rounded-full justify-center top-64 shadow-md"
          onPress={() => handleRoleSelection('landlord')}
        >
          <Text className="text-center text-xl font-roomFont">Landlord</Text>
        </Pressable>
        <Pressable
          className="bg-roomLightGreen w-48 h-16 rounded-full justify-center top-64 shadow-md"
          onPress={() => handleRoleSelection('renter')}
        >
          <Text className="text-center text-xl font-roomFont">Renter</Text>
        </Pressable>
      </View>
    </View>
  );
}