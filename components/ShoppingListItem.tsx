import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { View, Text } from '../components/Themed';
import { useAppDispatch } from '../AppStateProvider';
import Colors from '../constants/Colors';

const ShoppingListItem = ({ ingredient }: any) => {
  const dispatch = useAppDispatch();
  const { id, name, quantity }: any = ingredient;

  return (
    <TouchableHighlight underlayColor={Colors.light.tint}>
      <View style={styles.recipeInfo}>
        <View style={styles.details}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.quantity}>{quantity}</Text>
        </View>
        <TouchableHighlight
          onPress={() =>
            dispatch({
              type: 'REMOVE_FROM_LIST',
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
    fontSize: 18,
  },
  quantity: {
    color: Colors.light.text,
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

export default ShoppingListItem;
