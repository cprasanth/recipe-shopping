import React from 'react';
import {
  StyleSheet,
  Button,
} from 'react-native';
import { useAppDispatch } from '../AppStateProvider';
import Colors from '../constants/Colors';
import { Ingredient } from '../types';
import { View, Text } from '../components/Themed';

const IngredientListItem = ({ ingredient, recipeId }: any) => {
  const dispatch = useAppDispatch();
  const { id, name, quantity }: Ingredient = ingredient;
  return (
    <View style={styles.recipeInfo}>
      <View style={styles.details}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>
          {quantity}
        </Text>
      </View>
      <Button
        title='X'
        onPress={() =>
          dispatch({
            type: 'REMOVE_INGREDIENT',
            payload: { id, recipeId },
          })
        }
      />
    </View>
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
});

export default IngredientListItem;
