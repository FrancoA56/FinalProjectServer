import {
  Model,
  Table,
  Column,
  Validate,
  IsEmail,
  BelongsToMany,
} from "sequelize-typescript";
import User from "./User";
import Preset from "./Preset";

@Table
class UserPreset extends Model<UserPreset> {
  @IsEmail
  @Column
  userEmail!: string;

  @Column
  presetId!: number;

  @Validate({
    min: 1,
    max: 5,
  })
  @Column
  rating!: number;

  @BelongsToMany(() => User, () => UserPreset)
  user!: User;

  @BelongsToMany(() => Preset, () => UserPreset)
  preset!: Preset;
}

export default UserPreset;
