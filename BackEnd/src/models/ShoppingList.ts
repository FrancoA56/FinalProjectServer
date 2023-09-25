import {
  Model,
  Table,
  Column,
  IsEmail,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import User from "./User";
import ShoppingListItem from "./ShoppingListItem";

@Table
class ShoppingList extends Model<ShoppingList> {
  @IsEmail
  @Column
  userEmail!: string;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => ShoppingListItem)
  items!: ShoppingListItem[];
}

export default ShoppingList;
