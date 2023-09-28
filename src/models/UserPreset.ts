import {
  Model,
  Table,
  Column,
  AutoIncrement,
  IsEmail,
  ForeignKey,
  PrimaryKey,
  BelongsTo
} from "sequelize-typescript";
import User from "./User";
import Preset from "./Preset";
import Review from "./reviews";

@Table
class UserPreset extends Model<UserPreset> {
  
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => User)
  @IsEmail
  @Column
  userEmail!: string;

  @ForeignKey(() => Preset)
  @Column
  presetId!: number;

  @BelongsTo(() => Review)
  reviews?:Review;

  @ForeignKey(() => Review)
  @Column
  reviewId?: number;
}

export default UserPreset;
