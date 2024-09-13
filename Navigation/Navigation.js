import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import MoviesScreen from '../Screens/MoviesScreen';
import PersonScreen from '../Screens/PersonScreen';
import SearchScreen from '../Screens/SearchScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' options={{headerShown:false}} component={HomeScreen}/>
            <Stack.Screen name='Movie' options={{headerShown:false}} component={MoviesScreen}/>
            <Stack.Screen name='Person' options={{headerShown:false}} component={PersonScreen}/>
            <Stack.Screen name='Search' options={{headerShown:false}} component={SearchScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}