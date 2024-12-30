import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { supabase } from '../utils/supabase';


import OnboardingNavigator from './OnboardScreens'



export default function App() {

  return(


    
    <OnboardingNavigator/>
  )

}
  
