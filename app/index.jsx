import { View, Text } from 'react-native'
import React from 'react'
import '../global.css'
import { useFonts } from "expo-font";
import { InriaSerif_400Regular, InriaSerif_700Bold } from "@expo-google-fonts/inria-serif";

const App = () => {
    const [fontsLoaded] = useFonts({
        InriaSerif_Regular: InriaSerif_400Regular,
        InriaSerif_Bold: InriaSerif_700Bold,
      });
  return (
    <View style={{ fontFamily: "InriaSerif_Regular",color: "#A1E887"}} className = " text-roomLightGreen flex-1 bg-cover bg-roomDarkBlue">
      <Text className = "text-center text-roomLightGreen font-roomFont mt-72 text-6xl ">RoomSync</Text>
    </View>
  )
}

export default App
