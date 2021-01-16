import 'react-native-get-random-values';
import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  Keyboard,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { useAppState, useAppDispatch } from '../AppStateProvider';
import RecipeListItem from '../components/RecipeListItem';
import { View, Text } from '../components/Themed';
import { Recipe } from '../types';
import Colors from '../constants/Colors';

const keyExtractor = (id: string) => id;

const RecipeScreen = (props: any) => {
  const recipeData = useAppState()['recipes'] as Recipe;
  const recipeListItems = Object.keys(recipeData);
  const dispatch = useAppDispatch();

  const [newRecipe, setNewRecipe] = useState('');

  const addRecipe = () => {
    if (newRecipe === '') {
      alert('Enter your new recipe name');
    } else {
      dispatch({
        type: 'ADD_RECIPE',
        payload: {
          id: uuidv4(),
          name: newRecipe,
        },
      });
      setNewRecipe('');
      Keyboard.dismiss();
    }
  };

  const renderRecipe = ({ item }: any) => {
    const {
      navigation: { navigate },
    } = props;
    const { id, name }: any = recipeData[item];

    return (
      <RecipeListItem
        name={name}
        id={id}
        onPress={() =>
          navigate('IngredientsScreen', { recipeId: id, recipeName: name })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      {recipeListItems.length < 1 && (
        <Text style={styles.emptyText}>No recipes found!</Text>
      )}
      <FlatList
        data={recipeListItems}
        keyExtractor={keyExtractor}
        renderItem={renderRecipe}
      />
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Add Recipe</Text>
        <Text>Recipe name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setNewRecipe(text)}
          value={newRecipe}
          placeholder='Enter name here...'
        />
        <Button title='Add Recipe' onPress={addRecipe} />
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
  formContainer: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    backgroundColor: Colors.light.grey,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default RecipeScreen;
