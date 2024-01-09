
import React, { useState, useEffect } from 'react';

import { Button, View, Text, FlatList, StyleSheet, StatusBar, Pressable } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChiefScreen from './ChiefScreen.js';

import styles from './myStyles.js'


function HomeScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'left', justifyContent: 'left', backgroundColor: '#1822db' }}>

      <View style={{ marginVertical: 10 }} />
      
      <Pressable style={styles.buttonPressable} onPress={onPressFunction = () => {navigation.navigate('Chief')}}>
      <Text style={styles.buttonText}> CHIEF PANEL </Text>
      </Pressable>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        
        <Stack.Screen
        name="Home"
        component={HomeScreen}
        />

        <Stack.Screen
        name="Chief"
        component={ChiefScreen}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;