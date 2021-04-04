import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  ShoppingListCtx,
  ShoppingListItem,
} from "providers/ShoppingListProvider";
import React, { FC, Fragment, useContext, useState } from "react";

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
  const { removeItem } = useContext(ShoppingListCtx);

  const handleClick = () => {
    setExpand(!expand);
  };

  return (
    <Fragment>
      <ListItem className="pb-0" disableGutters>
        <ListItemIcon>
          <Checkbox />
        </ListItemIcon>
        <ListItemText primary={label} className="h-100" />
        <IconButton onClick={handleClick} size="small">
          {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </ListItem>
      <Collapse in={expand} timeout="auto">
        <List component="div">
          {shoppingListItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.description}
                secondary={item.recipe}
                className="ml-5"
              />
              <IconButton
                onClick={() => removeItem(item.recipe, item.item)}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Fragment>
  );
};

const AislesView: FC<Props> = () => {
  const { shoppingList } = useContext(ShoppingListCtx);

  const data: ShoppingList = shoppingList.reduce((prev, curr) => {
    if (prev[curr.item] !== undefined) {
      prev[curr.item].push(curr);
    } else {
      prev[curr.item] = [curr];
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

export default AislesView;
