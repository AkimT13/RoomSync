import { View, Text, Button, TextInput, Image } from 'react-native'
import React from 'react'
import '../global.css'
import { useFonts } from "expo-font";
import { InriaSerif_400Regular, InriaSerif_700Bold } from "@expo-google-fonts/inria-serif";
import Auth from './Auth';
import Choice from './Choice';



const App = () => {
  const action = () =>{
    return 'stuff'
  }
    
  return (

    <Choice/>



    
  )
}

export default App
