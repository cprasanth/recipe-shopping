import React from 'react';
import { StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { View, Text } from '../components/Themed';
import { useAppDispatch } from '../AppStateProvider';
import Colors from '../constants/Colors';

const RecipeListItem = ({ name, id, onPress }: any) => {
  const dispatch = useAppDispatch();

  const addToShoppingList = (id: string) => {
    dispatch({
      type: 'ADD_TO_LIST',
      payload: { id: id },
    });
    Alert.alert('Added to shopping list', `Ingredients for ${name} added to your shopping list`);
  };
  return (
    <TouchableHighlight underlayColor={Colors.light.tint} onPress={onPress}>
      <View style={styles.recipeInfo}>
        <View style={styles.details}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <TouchableHighlight onPress={() => addToShoppingList(id)}>
          <View style={styles.buttonIcon}>
            <Text style={styles.buttonText}>Add to basket</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() =>
            dispatch({
              type: 'REMOVE_RECIPE',
              payload: { id: id },
            })
          }
        >
          <View style={styles.buttonIcon}>
            <Text style={styles.buttonText}>X</Text>
          </View>
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  recipeInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    borderBottomColor: Colors.light.tint,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  details: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 20,
  },
  title: {
    color: Colors.light.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonIcon: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: Colors.dark.tint,
  },
});

export default RecipeListItem;
