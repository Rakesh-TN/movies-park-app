import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' options={{headerShown:false}} component={HomeScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}