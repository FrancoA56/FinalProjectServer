import {
  Model,
  Table,
  Column,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  IsEmail,
  Length,
  IsUrl,
  IsDate,
  HasMany,
  HasOne,
  AutoIncrement,
} from "sequelize-typescript";

import Invoice from "./Invoice";
import Order from "./Order";
import Review from "./Review";

@Table
class User extends Model<User> {
  
  @AutoIncrement
  @Column
  id?:number;

  @IsEmail
  @PrimaryKey
  @Column
  email!: string;

  @Length({ min: 8 })
  @Column
  password!: string;

  @Length({ min: 2, max: 30 })
  @Column
  name!: string;

  @IsUrl
  @Column
  logo!: string;

  @Column
  about!: string;

  @Column
  firstname!: string;

  @Column
  lastname!: string;

  @Column
  country!: string;

  @Column
  city!: string;

  @Column
  zipcode!: number;

  @Column
  isDisabled!: boolean;

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

  @HasMany(() => Invoice)
  invoices!: Invoice[];

  @HasOne(() => Order)
  order!: Order;

  @HasMany(() => Review)
  reviews!: Review[];
}

export default User;
