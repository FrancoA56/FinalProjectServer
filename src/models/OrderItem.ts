import {
  Model,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  AutoIncrement
} from "sequelize-typescript";

import Preset from "./Preset";
import Order from "./Order";

@Table
class OrderItem extends Model<OrderItem> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Preset)
  @Column
  presetId!: number;

  @ForeignKey(() => Order)
  @Column
  orderId!: number;

  @BelongsTo(() => Preset)
  preset!: Preset;

  @BelongsTo(() => Order)
  order!: Order;
}

export default OrderItem;