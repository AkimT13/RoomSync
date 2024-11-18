import { View, Text, Button, TextInput } from 'react-native'
import React from 'react'
import '../global.css'
import { useFonts } from "expo-font";
import { InriaSerif_400Regular, InriaSerif_700Bold } from "@expo-google-fonts/inria-serif";


const App = () => {
  const action = () =>{
    return 'stuff'
  }
    
  return (
    <View style={{ fontFamily: "InriaSerif_Bold",color: "#A1E887"}} className = " text-roomLightGreen flex-1 bg-cover bg-roomDarkBlue">
      <Text className = "text-center text-roomLightGreen font-roomFont mt-72 text-7xl ">RoomSync</Text>
      <View className = 'p-5 w-1/2'>
        <Text className = 'text-4xl text-white text-center font-bold'>Sign In</Text>
       
        


      </View>
      <View className = " flex flex-row justify-start snap-center w-96 h-1/3  border self-center ">
        <TextInput placeholder='Email' className = "border border-b w-96 h-11 bg-roomLightGreen rounded-xl p-6"/>
      
        
        
            
        
         
        </View>
    </View>
  )
}

export default App
