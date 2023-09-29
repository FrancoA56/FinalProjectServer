import {
  Model,
  Table,
  Column,
  IsEmail,
  BelongsTo,
  HasMany,
  ForeignKey,
  IsDate,
  CreatedAt,
  PrimaryKey,
  AutoIncrement
} from "sequelize-typescript";
import User from "./User";
import ShoppingListItem from "./ShoppingListItem";

@Table
class ShoppingList extends Model<ShoppingList> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  totalAmount!: number;

  @IsDate
  @CreatedAt
  @Column
  createdAt!: Date;

  @BelongsTo(() => User)
  user!: User;

  @IsEmail
  @Column
  @ForeignKey(() => User)
  userEmail!: string;

  @HasMany(() => ShoppingListItem)
  items!: ShoppingListItem[];
}

export default ShoppingList;
