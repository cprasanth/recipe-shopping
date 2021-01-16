import React from 'react';
import { createContext, useReducer, useContext } from 'react';
import { recipeData } from './recipeData';
import {
  Recipe,
  Action,
  Dispatch,
  RecipeProviderProps,
  Ingredient,
  ShoppingList,
} from './types';

const AppStateContext = createContext<Recipe | undefined>(undefined);
const AppDispatchContext = createContext<Dispatch | undefined>(undefined);

const recipeReducer = (state: Recipe, action: Action): any => {
  const { id, recipeId, name, quantity, unit }: any = action.payload;
  const recipeData = state['recipes'] as Recipe;
  switch (action.type) {
    case 'ADD_RECIPE': {
      return {
        ...state,
        recipes: {
          ...(state['recipes'] as Recipe),
          [id]: action.payload,
        },
      };
    }
    case 'REMOVE_RECIPE': {
      const { [id]: omit, ...remainingRecipes } = state['recipes'] as Recipe;
      return {
        ...state,
        recipes: remainingRecipes,
      };
    }
    case 'ADD_INGREDIENT': {
      const recipe = recipeData[recipeId] as Recipe;
      return {
        ...state,
        recipes: {
          ...(state['recipes'] as Recipe),
          [recipeId]: {
            ...recipe,
            ingredients: {
              ...recipe['ingredients'],
              [id]: {
                id,
                name,
                quantity: parseFloat(quantity),
                unit,
              },
            },
          },
        },
      };
    }
    case 'REMOVE_INGREDIENT': {
      const recipe = recipeData[recipeId] as Recipe;
      const { [id]: omit, ...newIngredients } = recipe[
        'ingredients'
      ] as Ingredient;
      return {
        ...state,
        recipes: {
          ...(state['recipes'] as Recipe),
          [recipeId]: {
            ...recipe,
            ingredients: newIngredients,
          },
        },
      };
    }
    case 'ADD_TO_LIST': {
      const recipe = recipeData[id] as Recipe;
      return {
        ...state,
        shoppingList: {
          ...(state['shoppingList'] as ShoppingList),
          ...recipe['ingredients'],
        },
      };
    }
    case 'REMOVE_FROM_LIST': {
      const { [id]: omit, ...remainingList } = state[
        'shoppingList'
      ] as ShoppingList;
      return {
        ...state,
        shoppingList: remainingList,
      };
    }
  }
};

const AppProvider = ({ children }: RecipeProviderProps) => {
  const [state, dispatch] = useReducer(recipeReducer, recipeData);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};
const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within an AppProvider');
  }
  return context;
};
export { AppProvider, useAppState, useAppDispatch };
