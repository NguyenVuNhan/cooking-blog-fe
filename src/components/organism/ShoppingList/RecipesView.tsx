import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { FC, Fragment, useContext, useState } from "react";
import {
  ShoppingListCtx,
  ShoppingListItem,
} from "providers/ShoppingListProvider";
import BookIcon from "@material-ui/icons/Book";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

interface Props {
  className?: string;
}

interface ShoppingList {
  [key: string]: ShoppingListItem[];
}

interface ItemProps {
  label: string;
  shoppingListItems: ShoppingListItem[];
}

const Item: FC<ItemProps> = ({ label, shoppingListItems }) => {
  const [expand, setExpand] = useState(false);

  const handleClick = () => {
    setExpand(!expand);
  };

  return (
    <Fragment>
      <ListItem className="pb-0" disableGutters button onClick={handleClick}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary={label} />
        {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={expand} timeout="auto">
        <List component="div">
          {shoppingListItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Checkbox />
              </ListItemIcon>
              <ListItemText
                primary={item.description}
                secondary={item.recipe}
              />
              <IconButton size="small">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Fragment>
  );
};

const RecipesView: FC<Props> = () => {
  const { shoppingList } = useContext(ShoppingListCtx);

  const data: ShoppingList = shoppingList.reduce((prev, curr) => {
    if (prev[curr.recipe] !== undefined) {
      prev[curr.recipe].push(curr);
    } else {
      prev[curr.recipe] = [curr];
    }
    return prev;
  }, {} as ShoppingList);

  return (
    <List>
      {Object.keys(data).map((value, index) => (
        <Item key={index} label={value} shoppingListItems={data[value]} />
      ))}
    </List>
  );
};

export default RecipesView;
