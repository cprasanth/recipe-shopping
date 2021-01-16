export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Recipe: undefined;
  ShoppingList: undefined;
};

export type RecipeParamList = {
  RecipeScreen: undefined;
  IngredientsScreen: undefined;
};

export type ShoppingListParamList = {
  ShoppingListScreen: undefined;
};
export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  [key: string]: string;
}
export interface Recipe {
  id: string;
  name: string;
  ingredients?: Ingredient | undefined;
  [key: string]: string | Ingredient | undefined;
}
export interface ShoppingList {
  id: string;
  name: string;
  quantity: string;
  [key: string]: string;
}

export type Action =
  | { type: 'ADD_RECIPE'; payload: Recipe }
  | { type: 'REMOVE_RECIPE'; payload: { id: string } }
  | { type: 'ADD_INGREDIENT'; payload: Ingredient }
  | { type: 'REMOVE_INGREDIENT'; payload: { id: string; recipeId: string } }
  | { type: 'ADD_TO_LIST'; payload: { id: string } }
  | { type: 'REMOVE_FROM_LIST'; payload: { id: string } };

export type Dispatch = (action: Action) => void;

export type RecipeProviderProps = { children: React.ReactNode };
