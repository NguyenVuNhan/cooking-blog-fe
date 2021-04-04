import ShoppingList from "components/organism/ShoppingList";
import React from "react";
import { createContext, FC, useState } from "react";

export interface ShoppingListItem {
  item: string;
  recipe: string;
  checked: boolean;
  description: string;
}

interface ShoppingListContextType {
  open: boolean;
  openShoppingList: () => void;
  closeShoppingList: () => void;
  addOneToShoppingList: (
    item: string,
    recipe: string,
    description: string
  ) => void;
  addAllToShoppingList: (recipe: Recipe) => void;
  clearShoppingList: () => void;
  shoppingList: ShoppingListItem[];
}

export const ShoppingListCtx = createContext<ShoppingListContextType>({
  open: false,
  openShoppingList: () => {},
  closeShoppingList: () => {},
  addOneToShoppingList: () => {},
  addAllToShoppingList: () => {},
  clearShoppingList: () => {},
  shoppingList: [],
});

const ShoppingListProvider: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);

  const openShoppingList = () => setOpen(true);

  const closeShoppingList = () => setOpen(false);

  const addOneToShoppingList = (
    item: string,
    recipe: string,
    quantity: string
  ) => {
    const description = quantity ? `${quantity} of item` : item;
    setShoppingList([
      ...shoppingList,
      { item, recipe, description, checked: false },
    ]);
  };

  const addAllToShoppingList = (recipe: Recipe) => {
    const newItems = recipe.ingredients.map(({ ingredient, quantity }) => {
      const description = quantity
        ? `${quantity} of ${ingredient}`
        : ingredient;

      return {
        item: ingredient,
        recipe: recipe.title,
        description,
        checked: false,
      };
    });
    setShoppingList([...shoppingList, ...newItems]);
  };

  const clearShoppingList = () => setShoppingList([]);

  return (
    <ShoppingListCtx.Provider
      value={{
        open,
        openShoppingList,
        closeShoppingList,
        shoppingList,
        addOneToShoppingList,
        addAllToShoppingList,
        clearShoppingList,
      }}
    >
      {children}
      <ShoppingList />
    </ShoppingListCtx.Provider>
  );
};

export default ShoppingListProvider;
