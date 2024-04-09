import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { navigationProps } from './navigationProps/navigationProps'
import GradientHeader from '../../../components/GradientHeader'

import Chat from '../../../scenes/chat/Chat'

import { versionName } from '../../../config'

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
          title: `version. ${versionName}`,
          headerShown: true,
          headerBackTitleVisible: false,
          headerBackground: () => <GradientHeader />,
          headerTitleAlign: 'center'
        })}
      />
    </Stack.Navigator>
  )
}