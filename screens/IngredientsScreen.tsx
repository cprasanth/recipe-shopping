import 'react-native-get-random-values';
import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import IngredientListItem from '../components/IngredientListItem';
import { View, Text } from '../components/Themed';
import { useAppDispatch, useAppState } from '../AppStateProvider';
import { Ingredient, Recipe } from '../types';
import Colors from '../constants/Colors';

const keyExtractor = (id: string) => id;

const IngredientsScreen = (props: any) => {
  const dispatch = useAppDispatch();
  const initialState = {
    name: '',
    quantity: '',
  };
  const [newIngredient, setNewIngredient] = useState(initialState);
  const { name, quantity } = newIngredient;
  const recipeId = props.route.params.recipeId;
  const recipeData = useAppState()['recipes'] as Recipe;
  const recipe = recipeData[recipeId] as Recipe;
  const ingredientsData = recipe && (recipe.ingredients as Ingredient);
  const ingredientListItems = ingredientsData && Object.keys(ingredientsData);

  const onChangeText = (text: string, field: string) =>
    setNewIngredient({ ...newIngredient, [field]: text });

  const addIngredient = () => {
    if (name === '') {
      alert('Enter ingredient name');
    } else if (quantity === '') {
      alert('Enter quantity');
    } else {
      dispatch({
        type: 'ADD_INGREDIENT',
        payload: {
          recipeId,
          id: uuidv4(),
          name,
          quantity,
        },
      });
      setNewIngredient(initialState);
      Keyboard.dismiss();
    }
  };

  const renderIngredients = ({ item }: any) => (
    <IngredientListItem
      ingredient={ingredientsData && ingredientsData[item]}
      recipeId={recipeId}
    />
  );

  return (
    <View style={styles.container}>
      {(!ingredientListItems ||
        (ingredientListItems && ingredientListItems.length < 1)) && (
        <Text style={styles.emptyText}>No ingredients found!</Text>
      )}
      <FlatList
        data={ingredientListItems}
        keyExtractor={keyExtractor}
        renderItem={renderIngredients}
      />
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Add ingredient</Text>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeText(text, 'name')}
          value={name}
          placeholder='Enter name here...'
        />
        <Text>Quantity</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeText(text, 'quantity')}
          value={quantity.toString()}
          placeholder='Enter quantity here...'
        />
        <Button title='Add Ingredient' onPress={addIngredient} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: Colors.dark.tint,
    padding: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  formContainer: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    backgroundColor: Colors.light.grey,
  },
});

export default IngredientsScreen;
