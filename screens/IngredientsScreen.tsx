import 'react-native-get-random-values';
import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';
import IngredientListItem from '../components/IngredientListItem';
import { View, Text } from '../components/Themed';
import { useAppDispatch, useAppState } from '../AppStateProvider';
import { v4 as uuidv4 } from 'uuid';
import { Ingredient, Recipe } from '../types';

const keyExtractor = (id: string) => id;

const IngredientsScreen = (props: any) => {
  const dispatch = useAppDispatch();
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: 0,
    unit: '',
  });
  const { name, quantity, unit } = newIngredient;
  const recipeId = props.route.params.recipeId;
  const recipeData = useAppState()['recipes'] as Recipe;
  const recipe = recipeData[recipeId] as Recipe;
  const ingredientsData = recipe && (recipe.ingredients as Ingredient);

  const onChangeText = (text: string, field: string) => {
    setNewIngredient({ ...newIngredient, [field]: text });
  };

  const addIngredient = () => {
    if (name !== '' && quantity !== 0 && unit !== '') {
      dispatch({
        type: 'ADD_INGREDIENT',
        payload: {
          recipeId,
          id: uuidv4(),
          name,
          quantity,
          unit,
        },
      });
      setNewIngredient({
        name: '',
        quantity: 0,
        unit: '',
      });
      Keyboard.dismiss();
    }
  };
  const renderIngredients = ({ item }: any) => {
    return (
      <IngredientListItem
        ingredient={ingredientsData && ingredientsData[item]}
        recipeId={recipeId}
      />
    );
  };
  const ingredientListData = ingredientsData && Object.keys(ingredientsData);
  return (
    <View style={styles.container}>
      {ingredientListData && ingredientListData.length > 0 ? (
        <FlatList
          data={ingredientListData}
          keyExtractor={keyExtractor}
          renderItem={renderIngredients}
        />
      ) : (
        <Text style={styles.emptyText}>No ingredients found!</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeText(text, 'name')}
        value={name}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeText(text, 'quantity')}
        value={quantity.toString()}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeText(text, 'unit')}
        value={unit}
      />
      <Button title='Add Recipe' onPress={addIngredient} />
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
  },
  emptyText: {
    textAlign: 'center',
  },
});

export default IngredientsScreen;
