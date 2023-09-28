import {
  Model,
  Table,
  Column,
  IsEmail,
  BelongsTo,
  HasMany,
  ForeignKey,
} from "sequelize-typescript";
import User from "./User";
import ShoppingListItem from "./ShoppingListItem";

@Table
class ShoppingList extends Model<ShoppingList> {
  @IsEmail
  @Column
  @ForeignKey(() => User)
  userEmail!: string;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => ShoppingListItem)
  items!: ShoppingListItem[];
}

export default ShoppingList;
