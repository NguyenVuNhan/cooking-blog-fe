import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
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
  removeItem: (recipe: string, ingredient?: string) => void;
  shoppingList: ShoppingListItem[];
}

export const ShoppingListCtx = createContext<ShoppingListContextType>({
  open: false,
  openShoppingList: () => {},
  closeShoppingList: () => {},
  addOneToShoppingList: () => {},
  addAllToShoppingList: () => {},
  clearShoppingList: () => {},
  removeItem: () => {},
  shoppingList: [],
});

const ShoppingListProvider: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [snackOpen, setSnackOpen] = React.useState(false);

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

    setSnackOpen(true);
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
    setSnackOpen(true);
  };

  const clearShoppingList = () => setShoppingList([]);

  const removeItem = (recipe: string, ingredient?: string) => {
    const newList = shoppingList.filter(
      (item) =>
        !(
          item.recipe === recipe &&
          (ingredient ? item.item === ingredient : true)
        )
    );
    setShoppingList([...newList]);
  };

  const handleSnackClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

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
        removeItem,
      }}
    >
      {children}
      <Snackbar
        open={snackOpen}
        autoHideDuration={1000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackClose} severity="success">
          New item added to shopping list
        </Alert>
      </Snackbar>
      <ShoppingList />
    </ShoppingListCtx.Provider>
  );
};

export default ShoppingListProvider;
