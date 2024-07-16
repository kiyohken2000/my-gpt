import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { navigationProps } from './navigationProps/navigationProps'
import GradientHeader from '../../../components/GradientHeader'

import Chat from '../../../scenes/chat/Chat'
import Donate from '../../../scenes/donate/Donate'

const Stack = createStackNavigator()

export const HomeStacks = () => {
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={navigationProps}
    >
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={({ navigation }) => ({
          title: null,
          headerShown: true,
          headerBackTitleVisible: false,
          headerBackground: () => <GradientHeader />,
          headerTitleAlign: 'center'
        })}
      />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      >
        <Stack.Screen
          name="Donate"
          component={Donate}
          options={({ navigation }) => ({
            title: 'Donate',
            headerBackTitleVisible: false,
            headerBackground: () => <GradientHeader />,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}