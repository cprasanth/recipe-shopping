import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useAppState } from '../AppStateProvider';
import ShoppingListItem from '../components/ShoppingListItem';
import { View, Text } from '../components/Themed';
import { ShoppingList } from '../types';

const keyExtractor = (id: string) => id;

const ShoppingListScreen = () => {
  const shoppingList = useAppState()['shoppingList'] as ShoppingList;
  const shoppingListItems = Object.keys(shoppingList);

  const renderShoppingList = ({ item }: any) => (
    <ShoppingListItem ingredient={shoppingList[item]} />
  );

  return (
    <View style={styles.container}>
      {shoppingListItems.length > 0 ? (
        <FlatList
          data={shoppingListItems}
          keyExtractor={keyExtractor}
          renderItem={renderShoppingList}
        />
      ) : (
        <Text style={styles.emptyText}>Your shopping list is empty!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
});

export default ShoppingListScreen;
