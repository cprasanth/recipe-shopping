import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useAppState } from '../AppStateProvider';
import ShoppingListItem from '../components/ShoppingListItem';
import { View, Text } from '../components/Themed';
import { ShoppingList } from '../types';

const keyExtractor = (id: string) => id;
const ShoppingListScreen = () => {
  const shoppingList = useAppState()['shoppingList'] as ShoppingList;

  const renderShoppingList = ({ item }: any) => {
    const ingredient = shoppingList[item];
    return <ShoppingListItem ingredient={ingredient} />;
  };
  const shoppingListData = Object.keys(shoppingList);
  return (
    <View style={styles.container}>
      {shoppingListData.length > 0 ? (
        <FlatList
          data={shoppingListData}
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
