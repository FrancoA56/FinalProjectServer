import {
  Model,
  Table,
  Column,
  Validate,
  IsEmail,
  Length,
  ForeignKey
} from "sequelize-typescript";
import User from "./User";
import Preset from "./Preset";

@Table
class UserPreset extends Model<UserPreset> {
  @IsEmail
  @Column
  userEmail!: string;

  @Column
  userPresetId!: number;

  @Validate({
    min: 1,
    max: 5,
  })
  @Column
  rating!: number;

  @Length({ min: 4, max: 200 })
  @Column
  ratingMessage!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Preset)
  @Column
  presetId!: number;
}

export default UserPreset;
