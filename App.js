import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './screens/LandingPage';
import DetailPage from './screens/DetailPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingPage} options={{ title: 'Metal Prices' }} />
        <Stack.Screen name="Details" component={DetailPage} options={{ title: 'Metal Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
