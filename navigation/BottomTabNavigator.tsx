import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import TabTwoScreen from '../screens/TabTwoScreen';
import HomeScreen from "../screens/HomeScreen";
import { BottomTabParamList, HomeParamList, TabTwoParamList } from '../types';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarLabelStyle: {fontSize: 12, padding: 5},
        headerShown: false,
        tabBarStyle: {padding: 10}
      }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Coming_Soon"
        component={TabTwoScreen}
        options={{
          tabBarLabel: 'Coming Soon',
          tabBarIcon: ({ color }) => <MaterialIcons name="video-library" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Downloads"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="download" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const HomeStack = createNativeStackNavigator<HomeParamList>()

function TabOneNavigator() {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  )
}

const TabTwoStack = createNativeStackNavigator<TabTwoParamList>()

function TabTwoNavigator() {
  return(
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name='HomeScreen'
        component={TabTwoScreen}
      />
    </TabTwoStack.Navigator>
  )
}
