import {
  Model,
  Table,
  Column,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Length,
  IsDate,
  AutoIncrement,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import User from "./User";
import UserPreset from "./UserPreset";
import ShoppingListItem from "./ShoppingListItem";

enum PresetTypes {
  ABOUT = "about",
  HOME = "home",
  FORM = "form",
  CARD = "card",
}

@Table
class Preset extends Model<Preset> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Length({ min: 2, max: 15 })
  @Column
  name!: string;

  @Column({
    type: "ENUM",
    values: Object.values(PresetTypes),
  })
  type!: PresetTypes;

  @IsDate
  @CreatedAt
  createdAt!: Date;

  @IsDate
  @UpdatedAt
  updatedAt!: Date;

  @IsDate
  @DeletedAt
  deletedAt?: Date;

  @HasMany(() => ShoppingListItem)
  shoppingListItems!: ShoppingListItem[];

  @BelongsToMany(() => User, () => UserPreset)
  users!: User[];
}

export default Preset;
