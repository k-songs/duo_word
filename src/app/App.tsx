import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import { Colors } from '../styles';
import { HomeScreen } from '../app/HomeScreen';
import { TestPage } from '../features/TestPage/TestPage';

export type RootStackParamList = {
  Home: undefined;
  TestPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary || '#4CAF50',
          },
          headerTintColor: Colors.white || '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Duolingo Clone' }}
        />
        <Stack.Screen 
          name="TestPage" 
          component={TestPage} 
          options={{ title: '크러쉬' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

