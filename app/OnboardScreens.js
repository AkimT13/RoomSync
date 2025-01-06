import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from './Welcome';
import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';
import RoleSelectionScreen from './RoleSelection';
import CreateSpaceScreen from './CreateSpaceScreen';
import LandlordDashboardScreen from './LandlordDashboard';
import RenterDashboardScreen from './RenterDashboard';
import SpaceDetailsScreen from './SpaceDetails';
import AddRoomScreen from './AddRoom';
import CreateTask from './CreateTask';


const Stack = createStackNavigator();

const OnboardingNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen options={ {headerShown:false} } name="Welcome" component={WelcomeScreen} />
      <Stack.Screen options={ {headerShown:false} } name="SignIn" component={SignInScreen} />
      <Stack.Screen options={ {headerShown:false} } name="SignUp" component={SignUpScreen} />
      <Stack.Screen options = {{headerShown: false}} name="RoleSelection" component = {RoleSelectionScreen} />
      <Stack.Screen options = {{headerShown: false}} name = "CreateSpace" component = {CreateSpaceScreen} />
      <Stack.Screen options = {{headerShown: false}} name = "LandLordDashboard" component = {LandlordDashboardScreen} />
      <Stack.Screen options = {{headerShown: false}} name = "RenterDashboard" component = {RenterDashboardScreen} />
      <Stack.Screen options = {{headerShown: false}} name = "SpaceDetails" component = {SpaceDetailsScreen} />
      <Stack.Screen options = {{headerShown: false}} name = "AddRoom" component = {AddRoomScreen} />
      <Stack.Screen options = {{headerShown: false}} name = "CreateTask" component = {CreateTask} />

      
    </Stack.Navigator>
  </NavigationContainer>
);

export default OnboardingNavigator;
