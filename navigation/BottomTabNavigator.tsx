import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Recipe from '../screens/RecipeScreen';
import Ingredients from '../screens/IngredientsScreen';
import ShoppingList from '../screens/ShoppingListScreen';
import {
  BottomTabParamList,
  RecipeParamList,
  ShoppingListParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='Recipe'
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name='Recipe'
        component={RecipeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='chef-hat' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='ShoppingList'
        component={ShoppingListNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='cart' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

const TabBarIcon = (props: { name: string; color: string }) => (
  <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />
);

const RecipeStack = createStackNavigator<RecipeParamList>();

const RecipeNavigator = () => (
  <RecipeStack.Navigator>
    <RecipeStack.Screen
      name='RecipeScreen'
      component={Recipe}
      options={{ headerTitle: 'Recipes' }}
    />
    <RecipeStack.Screen
      name='IngredientsScreen'
      component={Ingredients}
      options={({ route }: any) => ({
        headerTitle: `Ingredients for ${route.params.recipeName.toLowerCase()}`,
      })}
    />
  </RecipeStack.Navigator>
);

const ShoppingListStack = createStackNavigator<ShoppingListParamList>();

const ShoppingListNavigator = () => (
  <ShoppingListStack.Navigator>
    <ShoppingListStack.Screen
      name='ShoppingListScreen'
      component={ShoppingList}
      options={{ headerTitle: 'Shopping List' }}
    />
  </ShoppingListStack.Navigator>
);

export default BottomTabNavigator;
