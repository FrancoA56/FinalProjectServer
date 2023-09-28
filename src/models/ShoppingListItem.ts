import { Model, Table, Column, BelongsTo, ForeignKey } from "sequelize-typescript";
import Preset from "./Preset";
import ShoppingList from "./ShoppingList";

@Table
class ShoppingListItem extends Model<ShoppingListItem> {

  @Column
  quantity!: number;

  @BelongsTo(() => Preset)
  preset!: Preset;

  @BelongsTo(() => ShoppingList)
  shoppingList!: ShoppingList;

  @ForeignKey(() => Preset)
  @Column
  presetId!: number;

  @ForeignKey(() => ShoppingList)
  @Column
  shoppingListId!: number;
}

export default ShoppingListItem;
