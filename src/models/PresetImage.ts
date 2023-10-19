import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from "sequelize-typescript";
import Preset from "./Preset";

@Table
class PresetImage extends Model<PresetImage> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  url: string;

  @ForeignKey(() => Preset)
  presetId: number;
}

export default PresetImage;
