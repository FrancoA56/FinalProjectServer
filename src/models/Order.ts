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
  import OrderItem from "./OrderItem";
  
  @Table
  class Order extends Model<Order> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;
  
    @IsDate
    @CreatedAt
    @Column
    createdAt!: Date;
  
    @IsEmail
    @Column
    @ForeignKey(() => User)
    userEmail!: string;

    @BelongsTo(() => User)
    user!: User;
  
    @HasMany(() => OrderItem)
    orderItems!: OrderItem[];
  
  }
  
  export default Order;