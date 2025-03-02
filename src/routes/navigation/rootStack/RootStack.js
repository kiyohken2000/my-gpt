import React, { useState, useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack'
import { HomeStacks } from "../stacks/HomeStacks";
import { HomeTitleContext } from "../../../contexts/HomeTitleContext";

const Stack = createStackNavigator()

export default function RootStack() {
  const [title, setTitle] = useState('default title')

  return (
    <HomeTitleContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      <HomeTitleContext.Consumer>
        {(ctx) => (
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen
              name='HomeStacks'
              component={HomeStacks}
            />
          </Stack.Navigator>
      )}
      </HomeTitleContext.Consumer>
    </HomeTitleContext.Provider>
  )
}