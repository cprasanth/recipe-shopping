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
  const dispatch = useAppDispatch();

  const [newRecipe, setNewRecipe] = useState('');

  const onChangeName = (text: string) => {
    setNewRecipe(text);
  };
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
  const recipeListData = Object.keys(recipeData);
  return (
      <View style={styles.container}>
        {recipeListData.length > 0 ? (
          <FlatList
            data={recipeListData}
            keyExtractor={keyExtractor}
            renderItem={renderRecipe}
           
          />
        ) : (
          <Text style={styles.emptyText}>No recipes found!</Text>
        )}
        <View style={styles.formContainer}>
          <Text>New recipe</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChangeName(text)}
            value={newRecipe}
            placeholder='Enter here...'
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
  },
  formContainer: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    backgroundColor: Colors.light.grey,
  },
});

export default RecipeScreen;
