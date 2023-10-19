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
  HasMany,
  DataType,
} from "sequelize-typescript";
import PresetImage from "./PresetImage";
import InvoiceDetail from "./InvoiceItem";
import OrderDetail from "./OrderItem";
import { HasManySetAssociationsMixin, NonAttribute } from "sequelize";

enum PresetTypes {
  ABOUT = "about",
  HOME = "home",
  CART = "card",
  SHOP = "shop",
  DETAIL = "detail",
  PROFILE = "profile",
}

enum PresetCategories {
  BASIC = "basic",
  MEDIUM = "medium",
  PREMIUM = "premium",
}

const presetTypes = Object.values(PresetTypes);
const presetCategories = Object.values(PresetCategories);

@Table
class Preset extends Model<Preset> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Length({ min: 2, max: 15 })
  @Column
  name!: string;

  @Column
  price!: number;

  @Column
  defaultColor!: string;

  @Column({
    type: DataType.ENUM(...presetTypes),
  })
  type!: PresetTypes;

  @Column({
    type: DataType.ENUM(...presetCategories),
  })
  category!: PresetCategories;

  @Column
  url!: string;

  @Column
  isDisabled!: boolean;

  @IsDate
  @Column
  releasedAt!: Date;

  @IsDate
  @CreatedAt
  @Column
  createdAt!: Date;

  @IsDate
  @UpdatedAt
  @Column
  updatedAt!: Date;

  @IsDate
  @DeletedAt
  @Column
  deletedAt?: Date;

  @HasMany(() => InvoiceDetail)
  invoiceDetails!: InvoiceDetail[];

  @HasMany(() => OrderDetail)
  orderDetails!: OrderDetail[];

  @HasMany(() => PresetImage)
  images!: NonAttribute<PresetImage[]>;

  declare setImages: HasManySetAssociationsMixin<PresetImage, PresetImage["id"]>;
}

export default Preset;
