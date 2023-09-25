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
  IsDate,
} from "sequelize-typescript";

@Table
class Admin extends Model<Admin> {
  @IsEmail
  @PrimaryKey
  @Column
  email!: string;

  @Length({ min: 8, max: 30 })
  @Column
  password!: string;

  @Length({ min: 2, max: 15 })
  @Column
  name!: string;

  @IsDate
  @CreatedAt
  createdAt!: Date;

  @IsDate
  @UpdatedAt
  updatedAt!: Date;

  @IsDate
  @DeletedAt
  deletedAt?: Date;
}

export default Admin;
