import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from './Welcome';
import SignInScreen from './Auth/SignIn';
import SignUpScreen from './Auth/SignUp';
import RoleSelectionScreen from './Auth/RoleSelection';
import CreateSpaceScreen from './Landlord/CreateSpaceScreen';
import LandlordDashboardScreen from './Landlord/LandlordDashboard';
import RenterDashboardScreen from './Renter/RenterDashboard';
import SpaceDetailsScreen from './Landlord/SpaceDetails';
import AddRoomScreen from './Landlord/AddRoom';
import CreateTaskScreen from './Renter/CreateTask';
import RenterProfileScreen from './Renter/RenterProfileScreen';
import MessagesScreen from './Messages'
import SearchScreen from './Renter/Search'
import SignUpInterestsScreen from './Auth/SignUpInterestScreen';


const Stack = createStackNavigator();

const OnboardingNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen options={ {headerShown:false} } name="Welcome" component={WelcomeScreen} />
      <Stack.Screen options={ {headerShown:false} } name="SignIn" component={SignInScreen} />
      <Stack.Screen options={ {headerShown:false} } name="SignUp" component={SignUpScreen} />
      <Stack.Screen options = {{headerShown: false}} name="RoleSelection" component = {RoleSelectionScreen} />
      <Stack.Screen options = {{headerShown: false}} name="SignUpInterests" component = {SignUpInterestsScreen} />

      <Stack.Screen options = {{headerShown: false}} name = "CreateSpace" component = {CreateSpaceScreen} />
      <Stack.Screen options = {{headerShown: false}} name = "LandLordDashboard" component = {LandlordDashboardScreen} />
      <Stack.Screen options = {{headerShown: false}} name = "RenterDashboard" component = {RenterDashboardScreen} />
      <Stack.Screen options = {{headerShown: false}} name = "SpaceDetails" component = {SpaceDetailsScreen} />
      <Stack.Screen options = {{headerShown: false}} name = "AddRoom" component = {AddRoomScreen} />
      <Stack.Screen options = {{headerShown: false}} name = "CreateTask" component = {CreateTaskScreen} />
      <Stack.Screen options = {{headerShown: false}} name = "RenterProfile" component = {RenterProfileScreen} />
      <Stack.Screen options = {{headerShown: false}} name = "MessagesScreen" component = {MessagesScreen} />
      <Stack.Screen options = {{headerShown: false}} name = "SearchScreen" component = {SearchScreen} />

      


      
    </Stack.Navigator>
  </NavigationContainer>
);

export default OnboardingNavigator;
