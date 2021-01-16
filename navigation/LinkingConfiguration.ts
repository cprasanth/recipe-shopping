import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Recipe: {
            screens: {
              RecipeScreen: 'recipe',
            },
          },
          ShoppingList: {
            screens: {
              ShoppingListScreen: 'list',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
