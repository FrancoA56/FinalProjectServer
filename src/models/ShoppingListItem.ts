import { Model, Table, Column, BelongsTo } from "sequelize-typescript";
import Preset from "./Preset";
import ShoppingList from "./ShoppingList";

@Table
class ShoppingListItem extends Model<ShoppingListItem> {
  @Column
  presetId!: number;

  @Column
  quantity!: number;

  @BelongsTo(() => Preset)
  preset!: Preset;

  @BelongsTo(() => ShoppingList)
  shoppingList!: ShoppingList;
}

export default ShoppingListItem;
