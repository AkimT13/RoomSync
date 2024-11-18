import { View, Text, Button, TextInput, Image } from 'react-native'
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
      <View className = " flex flex-col justify-start snap-center w-96 h-full  self-center gap-5">
        <TextInput placeholder='Email' className = "border border-b w-96 h-16 bg-roomLightGreen rounded-xl p-6"/>
        <TextInput placeholder = 'Password' className = "border border-b w-96 h-16 bg-roomLightGreen rounded-xl p-6"/>
        <Text className = "ml-60 text-white">Forgot Password?</Text>
      
        <View className = "flex flex-col text-center bg-roomLightGreen w-96 h-16 rounded-xl pi-6 justify-center mt-4"><Text className = "text-center center font-semibold ">Sign In</Text></View>

        <Text className = 'text-center mt-5 text-white font-semibold'>Or Sign in With</Text>
        <View className = "flex flex-row gap-4 justify-center w-96 border items-center ">
          <Image source = {require('../assets/images/signApple.png')} className = 'w-16 h-16 ' />
          <Image source = {require('../assets/images/googleIcon.png')} className = 'w-16 h-16' />
        </View>

       
        

        
        
            
        
         
        </View>
    </View>
  )
}

export default App
